import type { Payload } from 'payload'

export const seed = async (payload: Payload): Promise<void> => {
  // Check if test user already exists
  const existingUser = await payload.find({
    collection: 'users',
    where: {
      email: {
        equals: 'test@test.com',
      },
    },
  })

  let testUser
  if (existingUser.docs.length > 0) {
    console.log('Test user already exists')
    testUser = existingUser.docs[0]
  } else {
    // Create test user
    testUser = await payload.create({
      collection: 'users',
      data: {
        email: 'test@test.com',
        password: 'test',
        name: 'test',
      },
    })
    console.log('Test user created successfully')
  }

  // Create sample categories
  const existingCategories = await payload.find({
    collection: 'categories',
    limit: 1,
  })

  if (existingCategories.docs.length === 0) {
    await payload.create({
      collection: 'categories',
      data: {
        title: 'Technology',
        slug: 'technology',
        content: 'Tech related posts',
        owner: testUser.id,
      },
    })

    await payload.create({
      collection: 'categories',
      data: {
        title: 'Education',
        slug: 'education',
        content: 'Educational content',
        owner: testUser.id,
      },
    })

    await payload.create({
      collection: 'categories',
      data: {
        title: 'News',
        slug: 'news',
        content: 'Latest news',
        owner: testUser.id,
      },
    })

    console.log('Sample categories created')
  }
}

