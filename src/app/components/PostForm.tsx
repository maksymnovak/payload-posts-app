'use client'

import React, { useState, useEffect } from 'react'
import { createPost } from '@/server/actions/createPost'
import { getCategories } from '@/server/actions/getCategories'
import { useRouter } from 'next/navigation'
import { logoutUser } from '@/server/actions/authorizeUser'
import CategoryDropdown from './CategoryDropdown'

type Category = {
  id: string
  title: string
}

export default function PostForm() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const fetchCategories = async () => {
      const result = await getCategories()
      if (result.success && result.categories) {
        setCategories(result.categories as Category[])
      }
    }
    fetchCategories()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')

      const result = await createPost({
        title,
        slug,
        content,
        categories: selectedCategories,
      })

      if (result.success) {
        setSuccess('Post created successfully!')
        setTitle('')
        setContent('')
        setSelectedCategories([])

        setTimeout(() => {
          setSuccess('')
          router.refresh()

          setTimeout(() => {
            const postsSection = document.querySelector('.posts-list')
            if (postsSection) {
              postsSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }
          }, 100)
        }, 800)
      } else {
        setError(result.error || 'Failed to create post')
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    await logoutUser()
    router.refresh()
  }

  return (
    <>
      <div className="header">
        <button
          type="button"
          className="button-secondary"
          onClick={handleLogout}
          style={{ marginLeft: 'auto' }}
        >
          Logout
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter post title"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter post content"
            required
          />
        </div>

        <div className="form-group">
          <label>Categories</label>
          <CategoryDropdown
            categories={categories}
            selectedCategories={selectedCategories}
            onChange={setSelectedCategories}
          />
        </div>

        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}

        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Post'}
        </button>
      </form>
    </>
  )
}
