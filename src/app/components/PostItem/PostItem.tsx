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
    <article className="rounded-2xl border border-white/10 bg-zinc-900/70 p-6 shadow-lg shadow-black/40">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-white">{title}</h3>
          <p className="text-sm text-zinc-500">by {owner?.name || 'Unknown'} · {formattedDate}</p>
          <p className="text-sm leading-relaxed text-zinc-300">{content}</p>
        </div>

        {categories && categories.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 md:w-48 md:justify-end">
            {categories.map((cat) => (
              <span
                key={cat.id}
                className="inline-flex items-center rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-200"
              >
                {cat.title || 'Category'}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}
