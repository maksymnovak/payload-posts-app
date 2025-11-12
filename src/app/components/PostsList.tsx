import React from 'react'
import { getPosts } from '@/server/actions/createPost'
import PostItem from './PostItem'

type Category = {
  id: string
  title: string
}

type Post = {
  id: string
  title: string
  slug: string
  content: string
  owner: { name?: string } | null
  categories: Category[]
  createdAt: string
}

export default async function PostsList() {
  const result = await getPosts()
  const posts = (result.success && result.posts ? result.posts : []) as Post[]

  if (posts.length === 0) {
    return <div style={{ color: '#888' }}>No posts yet. Create your first post above!</div>
  }

  return (
    <div className="posts-list">
      {posts.map((post) => (
        <PostItem
          key={post.id}
          title={post.title}
          content={post.content}
          owner={post.owner}
          categories={post.categories}
          createdAt={post.createdAt}
        />
      ))}
    </div>
  )
}
