'use server'

import { getPayload } from 'payload'
import config from '@/payload.config'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

type CreatePostInput = {
  title: string
  content: string
  categories?: string[]
}

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .replace(/-{2,}/g, '-')

const generateUniqueSlug = async (payload: Awaited<ReturnType<typeof getPayload>>, title: string) => {
  const baseSlug = slugify(title) || `post-${Date.now()}`
  let slug = baseSlug
  let suffix = 1

  while (true) {
    const existing = await payload.find({
      collection: 'posts',
      where: {
        slug: {
          equals: slug,
        },
      },
      limit: 1,
    })

    if (existing.docs.length === 0) {
      return slug
    }

    slug = `${baseSlug}-${suffix++}`
  }
}

export async function createPost(formData: CreatePostInput) {
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

    const slug = await generateUniqueSlug(payload, formData.title)

    const post = await payload.create({
      collection: 'posts',
      data: {
        title: formData.title,
        slug,
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
