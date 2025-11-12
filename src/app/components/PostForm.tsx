'use client'

import React, { useState, useEffect } from "react";
import { createPost } from "@/server/actions/createPost";
import { getCategories } from "@/server/actions/getCategories";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/server/actions/authorizeUser";

type Category = {
  id: string;
  title: string;
};

export default function PostForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      const result = await getCategories();
      if (result.success && result.categories) {
        setCategories(result.categories as Category[]);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      // Auto-generate slug from title
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

      const result = await createPost({
        title,
        slug,
        content,
        categories: selectedCategories,
      });

      if (result.success) {
        setSuccess("Post created successfully!");
        setTitle("");
        setContent("");
        setSelectedCategories([]);
        setSearchQuery("");
        setIsDropdownOpen(false);
        
        // Smooth refresh without full page reload
        setTimeout(() => {
          setSuccess("");
          router.refresh();
          
          // Smooth scroll to posts section after refresh
          setTimeout(() => {
            const postsSection = document.querySelector('.posts-list');
            if (postsSection) {
              postsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }, 100);
        }, 800);
      } else {
        setError(result.error || "Failed to create post");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logoutUser();
    router.refresh();
  };

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
          <div style={{ position: "relative" }}>
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                border: "1px solid #444",
                borderRadius: "8px",
                background: "#2a2a2a",
                color: "#fff",
                textAlign: "left",
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>
                {selectedCategories.length > 0
                  ? `${selectedCategories.length} selected`
                  : "Select categories"}
              </span>
              <span>▼</span>
            </button>

            {isDropdownOpen && (
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
                  {categories
                    .filter((cat) =>
                      cat.title.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((cat) => (
                      <label
                        key={cat.id}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.75rem",
                          padding: "0.75rem 1rem",
                          cursor: "pointer",
                          borderBottom: "1px solid #333",
                          transition: "background 0.2s",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "#333";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "transparent";
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(cat.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedCategories([
                                ...selectedCategories,
                                cat.id,
                              ]);
                            } else {
                              setSelectedCategories(
                                selectedCategories.filter((id) => id !== cat.id)
                              );
                            }
                          }}
                          style={{
                            width: "18px",
                            height: "18px",
                            cursor: "pointer",
                          }}
                        />
                        <span style={{ color: "#fff" }}>{cat.title}</span>
                      </label>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Post"}
        </button>
      </form>
    </>
  );
}

