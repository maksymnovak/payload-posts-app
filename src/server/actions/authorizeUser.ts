'use server'

import { getPayload } from 'payload'
import config from '@/payload.config'
import { cookies } from 'next/headers'

export async function authorizeUser(email: string, password: string) {
  try {
    const payload = await getPayload({ config })

    const result = await payload.login({
      collection: 'users',
      data: {
        email,
        password,
      },
    })

    if (result.token && result.user) {
      const cookieStore = await cookies()
      cookieStore.set('payload-token', result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7,
      })

      cookieStore.set('user-id', String(result.user.id), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7,
      })

      return {
        success: true,
        user: result.user,
      }
    }

    return {
      success: false,
      error: 'Invalid credentials',
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Authentication failed',
    }
  }
}

export async function getCurrentUser() {
  try {
    const payload = await getPayload({ config })
    const cookieStore = await cookies()
    const userId = cookieStore.get('user-id')?.value

    if (!userId) {
      return null
    }

    try {
      const user = await payload.findByID({
        collection: 'users',
        id: userId,
      })

      return user
    } catch (error: any) {
      if (error?.status === 404) {
        return null
      }

      throw error
    }
  } catch (error) {
    return null
  }
}

export async function logoutUser() {
  const cookieStore = await cookies()
  cookieStore.delete('payload-token')
  cookieStore.delete('user-id')
  return { success: true }
}
