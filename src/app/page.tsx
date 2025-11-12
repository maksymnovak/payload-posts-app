import React from 'react'
import { getCurrentUser } from '@/server/actions/authorizeUser'
import LoginForm from './components/LoginForm'
import PostForm from './components/PostForm'
import PostsList from './components/PostsList'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function Home() {
  const user = await getCurrentUser()

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-8">
      <section className="rounded-2xl bg-zinc-900/80 p-8 shadow-xl ring-1 ring-white/10">
        {!user ? (
          <LoginForm />
        ) : (
          <>
            <div className="mb-8 space-y-2 text-center">
              <h1 className="text-3xl font-semibold tracking-tight text-white">
                Hello, {user.name || user.email}!
              </h1>
              <p className="text-sm text-zinc-400">Create a new post</p>
            </div>
            <PostForm />
          </>
        )}
      </section>

      {user && (
        <section className="rounded-2xl bg-zinc-900/80 p-8 shadow-xl ring-1 ring-white/10">
          <h2 className="mb-6 text-2xl font-semibold text-white">Recent Posts</h2>
          <PostsList />
        </section>
      )}
    </div>
  )
}

