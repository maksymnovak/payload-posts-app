import React from 'react'

type Category = {
  id: string
  title: string
}

type PostItemProps = {
  title: string
  content: string
  owner: { name?: string } | null
  categories: Category[]
  createdAt: string
}

export default function PostItem({ title, content, owner, categories, createdAt }: PostItemProps) {
  const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <div className="post-item">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
        <div style={{ flex: 1 }}>
          <div className="post-title">{title}</div>
          <div className="post-meta">
            by {owner?.name || 'Unknown'} | Created: {formattedDate}
          </div>
          <div className="post-content">{content}</div>
        </div>

        {categories && categories.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-end' }}>
            {categories.map((cat) => (
              <span key={cat.id} className="category-tag">
                {cat.title || 'Category'}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

