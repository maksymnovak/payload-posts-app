'use client'

import React, { useEffect, useRef, useState } from 'react'
import styles from './CategoryDropdown.module.css'

type Category = {
  id: string
  title: string
}

type CategoryDropdownProps = {
  categories: Category[]
  selectedCategories: string[]
  onChange: (selected: string[]) => void
}

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
    <div ref={dropdownRef} className={styles.container}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={styles.button}
      >
        <span>
          {selectedCategories.length > 0
            ? `${selectedCategories.length} selected`
            : 'Select categories'}
        </span>
        <span>{isOpen ? '▲' : '▼'}</span>
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          <div className={styles.searchWrapper}>
            <input
              type="text"
              placeholder="🔍 Search items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          <div className={styles.list}>
            {filteredCategories.map((cat) => (
              <label key={cat.id} className={styles.item}>
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat.id)}
                  onChange={() => handleToggle(cat.id)}
                  className={styles.checkbox}
                />
                <span className={styles.label}>{cat.title}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
