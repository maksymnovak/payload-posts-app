'use client'

import React, { useEffect, useRef, useState } from 'react'

type Category = {
  id: string
  title: string
}

type CategoryDropdownProps = {
  categories: Category[]
  selectedCategories: string[]
  onChange: (selected: string[]) => void
}

const dropdownButtonClasses =
  'flex w-full items-center justify-between rounded-lg border border-zinc-700 bg-zinc-950/60 px-4 py-3 text-sm text-zinc-100 transition hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40'

export default function CategoryDropdown({
  categories,
  selectedCategories,
  onChange,
}: CategoryDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleToggle = (categoryId: string) => {
    if (selectedCategories.includes(categoryId)) {
      onChange(selectedCategories.filter((id) => id !== categoryId))
    } else {
      onChange([...selectedCategories, categoryId])
    }
  }

  const filteredCategories = categories.filter((cat) =>
    cat.title.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div ref={dropdownRef} className="relative">
      <button type="button" onClick={() => setIsOpen(!isOpen)} className={dropdownButtonClasses}>
        <span>
          {selectedCategories.length > 0
            ? `${selectedCategories.length} selected`
            : 'Select categories'}
        </span>
        <span className="text-xs text-zinc-500">{isOpen ? '▲' : '▼'}</span>
      </button>

      {isOpen && (
        <div className="absolute z-30 mt-2 w-full overflow-hidden rounded-xl border border-zinc-700/70 bg-zinc-950/95 shadow-2xl backdrop-blur">
          <div className="border-b border-white/5 p-3">
            <input
              type="text"
              placeholder="🔍 Search items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
            />
          </div>

          <div className="max-h-60 overflow-y-auto divide-y divide-white/5">
            {filteredCategories.map((cat) => (
              <label
                key={cat.id}
                className="flex cursor-pointer items-center gap-3 px-4 py-3 text-sm text-zinc-100 transition hover:bg-white/5"
              >
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat.id)}
                  onChange={() => handleToggle(cat.id)}
                  className="h-4 w-4 rounded border-zinc-600 bg-zinc-900 text-indigo-500 focus:ring-indigo-500"
                />
                <span>{cat.title}</span>
              </label>
            ))}

            {filteredCategories.length === 0 && (
              <div className="px-4 py-3 text-sm text-zinc-500">No categories found</div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
