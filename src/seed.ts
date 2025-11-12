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

  if (existingUser.docs.length > 0) {
    console.log('Test user already exists')
    return
  }

  // Create test user
  await payload.create({
    collection: 'users',
    data: {
      email: 'test@test.com',
      password: 'test',
      name: 'test',
    },
  })

  console.log('Test user created successfully')
}

