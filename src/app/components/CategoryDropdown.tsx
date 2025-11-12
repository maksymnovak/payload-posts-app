'use client'

import React, { useState, useEffect, useRef } from 'react'

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
    cat.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div ref={dropdownRef} style={{ position: "relative" }}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: "100%",
          padding: "0.75rem 1rem",
          border: "1px solid #444",
          borderRadius: "8px",
          background: "#2a2a2a",
          color: "#fff",
          cursor: "pointer",
          textAlign: "left",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          transition: "none",
          transform: "none",
          boxShadow: "none",
        }}
      >
        <span>
          {selectedCategories.length > 0
            ? `${selectedCategories.length} selected`
            : "Select categories"}
        </span>
        <span>{isOpen ? "▲" : "▼"}</span>
      </button>

      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            marginTop: "0.5rem",
            background: "#2a2a2a",
            border: "1px solid #444",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
            zIndex: 10,
            maxHeight: "250px",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ padding: "0.75rem" }}>
            <input
              type="text"
              placeholder="🔍 Search items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                padding: "0.5rem",
                border: "1px solid #444",
                borderRadius: "6px",
                background: "#1a1a1a",
                color: "#fff",
              }}
            />
          </div>

          <div style={{ overflowY: "auto", flex: 1 }}>
            {filteredCategories.map((cat) => (
              <label
                key={cat.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem 1rem',
                  borderBottom: '1px solid #333',
                  cursor: 'default',
                }}
              >
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat.id)}
                  onChange={() => handleToggle(cat.id)}
                  style={{
                    width: '18px',
                    height: '18px',
                    cursor: 'default',
                  }}
                />
                <span style={{ color: "#fff" }}>{cat.title}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

