import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useMemo, useState } from 'react'
import legacyDocument from '../../index.html?raw'

export const Route = createFileRoute('/')({
  component: HomePage,
})

const parsedBodyMarkup = legacyDocument
  .match(/<body[^>]*>([\s\S]*?)<script\s+src="script\.js"><\/script>\s*<\/body>/i)?.[1]
  ?.trim()

if (!parsedBodyMarkup) {
  throw new Error('Unable to read the preserved page markup from index.html')
}

const bodyMarkup: string = parsedBodyMarkup

function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  const markup = useMemo(
    () =>
      bodyMarkup
        .replace(
          'class="menu-toggle" aria-controls="primary-nav" aria-expanded="false"',
          `class="menu-toggle" aria-controls="primary-nav" aria-expanded="${menuOpen}"`,
        )
        .replace('class="primary-nav"', `class="primary-nav${menuOpen ? ' open' : ''}"`)
        .replace(
          '<div class="toast" role="status" aria-live="polite"></div>',
          `<div class="toast${toastMessage ? ' show' : ''}" role="status" aria-live="polite">${toastMessage}</div>`,
        ),
    [menuOpen, toastMessage],
  )

  useEffect(() => {
    if (!toastMessage) return
    const timeout = window.setTimeout(() => setToastMessage(''), 3200)
    return () => window.clearTimeout(timeout)
  }, [toastMessage])

  function handleClick(event: React.MouseEvent<HTMLDivElement>) {
    const target = event.target as HTMLElement
    if (target.closest('.menu-toggle')) {
      setMenuOpen((open) => !open)
      return
    }
    if (target.closest('.primary-nav a')) setMenuOpen(false)
  }

  function handleSubmit(event: React.FormEvent<HTMLDivElement>) {
    const target = event.target
    if (!(target instanceof HTMLFormElement) || !target.matches('.lead-form')) return

    event.preventDefault()
    const data = new FormData(target)
    const details = [...data.entries()]
      .filter(([, value]) => String(value).trim())
      .map(
        ([key, value]) =>
          `${key.replace(/\b\w/g, (character) => character.toUpperCase())}: ${value}`,
      )
      .join('\n')
    const title = target.dataset.formTitle || 'Website enquiry'
    const message = `Hello EduAcharya, I am submitting the ${title} form.\n\n${details}`

    setToastMessage('Opening WhatsApp with your enquiry…')
    window.open(
      `https://wa.me/919633830220?text=${encodeURIComponent(message)}`,
      '_blank',
      'noopener',
    )
  }

  return (
    <div
      onClick={handleClick}
      onSubmit={handleSubmit}
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  )
}
