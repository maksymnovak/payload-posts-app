'use client'

import React, { useEffect, useState } from 'react'
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

export default function PostsList() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      const result = await getPosts()
      if (result.success && result.posts) {
        setPosts(result.posts as Post[])
      }
      setLoading(false)
    }

    fetchPosts()
  }, [])

  if (loading) {
    return <div>Loading posts...</div>
  }

  if (posts.length === 0) {
    return <div style={{ color: '#888' }}>No posts yet. Create your first post above!</div>
  }

  return (
    <div className="posts-list">
      {posts.map((post) => (
        <div key={post.id} className="post-item">
          <div className="post-title">{post.title}</div>
          <div className="post-meta">
            Slug: {post.slug} | Created: {new Date(post.createdAt).toLocaleDateString()}
          </div>
          {post.categories && post.categories.length > 0 && (
            <div style={{ marginTop: '0.5rem' }}>
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

