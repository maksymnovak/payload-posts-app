'use server'

import { getPayload } from 'payload'
import config from '@/payload.config'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

export async function createPost(formData: {
  title: string
  slug: string
  content: string
  categories?: string[]
}) {
  try {
    const payload = await getPayload({ config })
    const cookieStore = await cookies()
    const userId = cookieStore.get('user-id')?.value

    if (!userId) {
      return {
        success: false,
        error: 'Not authenticated',
      }
    }

    const post = await payload.create({
      collection: 'posts',
      data: {
        title: formData.title,
        slug: formData.slug,
        content: formData.content,
        categories: formData.categories || [],
        owner: userId,
      },
    })

    revalidatePath('/')

    return {
      success: true,
      post,
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Failed to create post',
    }
  }
}

export async function getPosts() {
  try {
    const payload = await getPayload({ config })

    const posts = await payload.find({
      collection: 'posts',
      depth: 2,
      limit: 20,
      sort: '-createdAt',
    })

    return {
      success: true,
      posts: posts.docs,
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Failed to get posts',
      posts: [],
    }
  }
}
