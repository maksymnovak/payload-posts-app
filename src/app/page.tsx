import React from 'react'
import { getCurrentUser } from '@/server/actions/authorizeUser'
import LoginForm from './components/LoginForm'
import PostForm from './components/PostForm'
import PostsList from './components/PostsList'

// Disable caching for this page
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function Home() {
  const user = await getCurrentUser()

  return (
    <div className="container">
      <div className="card">
        {!user ? (
          <LoginForm />
        ) : (
          <>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <h1>Hello, {user.name || user.email}!</h1>
              <p style={{ color: '#888', marginTop: '0.5rem' }}>Create a new post</p>
            </div>
            <PostForm />
          </>
        )}
      </div>

      {user && (
        <div className="card">
          <h2 style={{ marginBottom: '1.5rem' }}>Recent Posts</h2>
          <PostsList />
        </div>
      )}
    </div>
  )
}

