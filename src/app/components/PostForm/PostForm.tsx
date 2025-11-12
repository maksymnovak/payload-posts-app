'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createPost } from '@/server/actions/createPost'
import { getCategories } from '@/server/actions/getCategories'
import { logoutUser } from '@/server/actions/authorizeUser'
import CategoryDropdown from '../CategoryDropdown'

type Category = {
  id: string
  title: string
}

const inputClasses =
  'w-full rounded-lg border border-zinc-700 bg-zinc-950/60 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40'

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
      const result = await createPost({
        title,
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
      <div className="mb-8 flex items-center justify-end">
        <button
          type="button"
          onClick={handleLogout}
          className="inline-flex items-center justify-center rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-zinc-200 transition hover:border-white/30 hover:bg-white/10"
        >
          Logout
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="title" className="block text-sm font-medium text-zinc-300">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter post title"
            className={inputClasses}
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="content" className="block text-sm font-medium text-zinc-300">
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter post content"
            className={`${inputClasses} min-h-[140px] resize-vertical`}
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-zinc-300">Categories</label>
          <CategoryDropdown
            categories={categories}
            selectedCategories={selectedCategories}
            onChange={setSelectedCategories}
          />
        </div>

        {error && (
          <div className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        )}

        {success && (
          <div className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
            {success}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="inline-flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-violet-500 px-4 py-3 text-sm font-semibold shadow-lg shadow-indigo-500/30 transition hover:shadow-indigo-500/50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? 'Creating...' : 'Create Post'}
        </button>
      </form>
    </>
  )
}
