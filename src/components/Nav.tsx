'use client'
import React, { useState } from 'react'
import { Link } from '@payloadcms/ui'
import '../style/custom.css'

const Nav: React.FC = () => {
  const [openGroups, setOpenGroups] = useState<{ [key: string]: boolean }>({
    communication: true,
    content: true,
    career: true,
    authentication: true,
  })

  const toggleGroup = (group: string) => {
    setOpenGroups((prev) => ({
      ...prev,
      [group]: !prev[group],
    }))
  }

  return (
    <nav className="side-nav">
      {/* Nav Groups */}
      <div className="nav-content">
        {/* MEDIA */}
        <div className="nav-group">
          <div className="nav-group-header">
            <span>Media</span>
          </div>
          <ul className="nav-links">
            <li>
              <Link href="/admin/collections/social-videos">
                <span className="nav-icon">📁</span>
                Social Videos
              </Link>
            </li>
            <li>
              <Link href="/admin/collections/categories">
                <span className="nav-icon">📁</span>
                Gallery Categories
              </Link>
            </li>
            <li>
              <Link href="/admin/collections/gallery">
                <span className="nav-icon">📸</span>
                Gallery
              </Link>
            </li>
            <li>
              <Link href="/admin/collections/chairman-categories">
                <span className="nav-icon">📸</span>
                Chairman Image Category
              </Link>
            </li>
            <li>
              <Link href="/admin/collections/md-gallery">
                <span className="nav-icon">📸</span>
                Chairman Gallery
              </Link>
            </li>
            <li>
              <Link href="/admin/collections/media">
                <span className="nav-icon">🖼️</span>
                Media
              </Link>
            </li>
          </ul>
        </div>

        {/* CONTENT */}
        <div className="nav-group">
          <div className="nav-group-header" onClick={() => toggleGroup('content')}>
            <span>Content</span>
            <span className={`nav-arrow ${openGroups.content ? 'open' : ''}`}>▼</span>
          </div>
          {openGroups.content && (
            <ul className="nav-links">
              <li>
                <Link href="/admin/collections/blogs">
                  <span className="nav-icon">📝</span>
                  Blogs
                </Link>
              </li>
              <li>
                <Link href="/admin/collections/news">
                  <span className="nav-icon">📝</span>
                  News
                </Link>
              </li>
              <li>
                <Link href="/admin/collections/youtube-news">
                  <span className="nav-icon">📝</span>
                  Youtube-News
                </Link>
              </li>
              <li>
                <Link href="/admin/collections/featured-products">
                  <span className="nav-icon">📝</span>
                  Featured Products
                </Link>
              </li>
              <li>
                <Link href="/admin/collections/companies">
                  <span className="nav-icon">📝</span>
                  Companies
                </Link>
              </li>
              <li>
                <Link href="/admin/collections/brands">
                  <span className="nav-icon">📝</span>
                  Brands
                </Link>
              </li>
            </ul>
          )}
        </div>
        {/* CAREER */}
        <div className="nav-group">
          <div className="nav-group-header" onClick={() => toggleGroup('career')}>
            <span>Career</span>
            <span className={`nav-arrow ${openGroups.career ? 'open' : ''}`}>▼</span>
          </div>
          {openGroups.career && (
            <ul className="nav-links">
              <li>
                <Link href="/admin/collections/careers">
                  <span className="nav-icon">‍‍💻</span>
                  Career
                </Link>
              </li>
              <li>
                <Link href="/admin/collections/applications">
                  <span className="nav-icon">👨‍💻</span>
                  Applications
                </Link>
              </li>
            </ul>
          )}
        </div>
        {/* COMMUNICATION */}
        <div className="nav-group">
          <div className="nav-group-header" onClick={() => toggleGroup('communication')}>
            <span>Communication</span>
            <span className={`nav-arrow ${openGroups.communication ? 'open' : ''}`}>▼</span>
          </div>
          {openGroups.communication && (
            <ul className="nav-links">
              <li>
                <Link href="/admin/collections/contacts">
                  <span className="nav-icon">📞</span>
                  Contacts
                </Link>
              </li>
            </ul>
          )}
        </div>
        {/* AUTHENTICATION */}
        <div className="nav-group">
          <div className="nav-group-header" onClick={() => toggleGroup('authentication')}>
            <span>Authentication</span>
          </div>
          <ul className="nav-links">
            <li>
              <Link href="/admin/collections/users">
                <span className="nav-icon">👤</span>
                Users
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav
