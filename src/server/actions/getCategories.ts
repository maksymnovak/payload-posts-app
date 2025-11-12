'use server'

import { getPayload } from 'payload'
import config from '@/payload.config'

export async function getCategories() {
  try {
    const payload = await getPayload({ config })
    
    const categories = await payload.find({
      collection: 'categories',
      limit: 100,
      sort: 'title',
    })

    return {
      success: true,
      categories: categories.docs,
    }
  } catch (error: any) {
    console.error('Get categories error:', error)
    return {
      success: false,
      error: error.message || 'Failed to get categories',
      categories: [],
    }
  }
}

