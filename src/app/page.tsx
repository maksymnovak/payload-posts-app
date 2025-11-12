import React from 'react'
import { getCurrentUser } from '@/server/actions/authorizeUser'
import LoginForm from './components/LoginForm'
import PostForm from './components/PostForm'
import PostsList from './components/PostsList'

export default async function Home() {
  const user = await getCurrentUser()

  return (
    <div className="container">
      <div className="card">
        <h1>Payload Posts App</h1>
        
        {!user ? (
          <LoginForm />
        ) : (
          <>
            <div className="welcome">
              Здравствуйте {user.name || user.email}
            </div>
            <PostForm />
          </>
        )}
      </div>

      {user && (
        <div className="card">
          <h2>Recent Posts</h2>
          <PostsList />
        </div>
      )}
    </div>
  )
}

