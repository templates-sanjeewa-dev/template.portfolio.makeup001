import React from 'react'

const links = [
  {
    description: 'Hero, featured work, services, testimonial, and closing CTA.',
    href: '/admin/globals/home',
    label: 'Edit homepage',
  },
  {
    description: 'Add or update complete makeup stories and galleries.',
    href: '/admin/collections/portfolio-projects',
    label: 'Manage portfolio',
  },
  {
    description: 'Write beauty guidance, stories, and SEO-focused articles.',
    href: '/admin/collections/journal-posts',
    label: 'Write journal',
  },
  {
    description: 'Review new availability requests and follow-up status.',
    href: '/admin/collections/enquiries',
    label: 'View enquiries',
  },
]

export const DashboardWelcome = () => (
  <section className="studio-dashboard">
    <div className="studio-dashboard__intro">
      <p>Website manager</p>
      <h1>Everything important, in one place.</h1>
      <span>
        Use the shortcuts below for the most common updates. Draft content can be previewed before
        it is published.
      </span>
    </div>

    <div className="studio-dashboard__grid">
      {links.map((item) => (
        <a href={item.href} key={item.href}>
          <strong>{item.label}</strong>
          <span>{item.description}</span>
          <em aria-hidden="true">↗</em>
        </a>
      ))}
    </div>
  </section>
)
