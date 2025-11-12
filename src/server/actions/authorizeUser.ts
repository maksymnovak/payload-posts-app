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

    if (result.token) {
      // Store token in cookie
      const cookieStore = await cookies()
      cookieStore.set('payload-token', result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
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
    console.error('Authorization error:', error)
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
    const token = cookieStore.get('payload-token')?.value

    if (!token) {
      return null
    }

    const user = await payload.auth({ headers: { Authorization: `JWT ${token}` } })
    
    return user.user
  } catch (error) {
    console.error('Get current user error:', error)
    return null
  }
}

export async function logoutUser() {
  const cookieStore = await cookies()
  cookieStore.delete('payload-token')
  return { success: true }
}

