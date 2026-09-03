import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from '@tanstack/react-router'
import type { ReactNode } from 'react'
import appCss from '../styles.css?url'

const siteUrl = 'https://eduacharyainstitution.in/'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { title: 'EduAcharya Institute | B.Tech Credit Transfer' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        name: 'description',
        content:
          'Explore B.Tech credit transfer guidance, eligibility, university approvals and student experiences with EduAcharya Institute.',
      },
      { name: 'robots', content: 'index, follow' },
      { property: 'og:type', content: 'website' },
      {
        property: 'og:title',
        content: 'EduAcharya Institute | B.Tech Credit Transfer',
      },
      {
        property: 'og:description',
        content:
          'Explore B.Tech credit transfer guidance, eligibility, university approvals and student experiences with EduAcharya Institute.',
      },
      { property: 'og:url', content: siteUrl },
      { property: 'og:image', content: `${siteUrl}assets/engineering-success-hero.webp` },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    links: [
      { rel: 'canonical', href: siteUrl },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@600;700;800&display=swap',
      },
      { rel: 'stylesheet', href: appCss },
    ],
    scripts: [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'EducationalOrganization',
          name: 'EduAcharya Institute of Advanced Management & Technology',
          url: siteUrl,
          telephone: '+91-974-63-63-807',
          email: 'enquiry@eduacharyainstitution.in',
        }),
      },
    ],
  }),
  component: Outlet,
  shellComponent: RootDocument,
  notFoundComponent: () => (
    <main className="container section">
      <h1>Page not found</h1>
      <a className="button button-primary" href="/">
        Return home
      </a>
    </main>
  ),
})

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}
