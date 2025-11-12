import React from 'react'
import { getPosts } from '@/server/actions/createPost'

type Post = {
  id: string
  title: string
  slug: string
  content: string
  owner: any
  categories: any[]
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
        <div key={post.id} className="post-item">
          <div className="post-title">{post.title}</div>
          <div className="post-meta">
            by {post.owner?.name || 'Unknown'} | Created: {new Date(post.createdAt).toLocaleDateString('en-US', { 
              month: 'long', 
              day: 'numeric', 
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </div>
          {post.categories && post.categories.length > 0 && (
            <div style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }}>
              {post.categories.map((cat: any) => (
                <span key={cat.id} className="category-tag">
                  {cat.title || 'Category'}
                </span>
              ))}
            </div>
          )}
          <div className="post-content">{post.content}</div>
        </div>
      ))}
    </div>
  )
}

