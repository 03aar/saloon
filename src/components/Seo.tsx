import { useEffect } from 'react'

const SITE_NAME = 'Bloop'
const SITE_URL = 'https://bloop.com'
const DEFAULT_DESCRIPTION = 'Bloop — creator partnerships, curated.'

type SeoProps = {
  /** Page title. Rendered as "<title> · Bloop" unless it already contains "Bloop". */
  title: string
  /** Meta description and og:description. Falls back to the site default. */
  description?: string
  /** Path (e.g. "/about") used to build the canonical og:url. */
  path?: string
  /** og:type — defaults to "website"; use "article" for Pulse posts. */
  type?: 'website' | 'article'
}

function setMetaByName(name: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('name', name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setMetaByProperty(property: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('property', property)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

/**
 * Sets document.title and the description / Open Graph meta tags for the
 * current route. Dependency-free — no react-helmet. Mount once per page
 * (near the top of the component) with real, page-specific copy.
 */
// oxlint-disable-next-line react/only-export-components -- useSeo is intentionally exported alongside the Seo component for call sites that prefer a hook.
export function useSeo({ title, description, path, type = 'website' }: SeoProps) {
  useEffect(() => {
    const fullTitle = title.includes(SITE_NAME) ? title : `${title} · ${SITE_NAME}`
    const desc = description ?? DEFAULT_DESCRIPTION
    const url = path ? `${SITE_URL}${path}` : SITE_URL

    const prevTitle = document.title
    document.title = fullTitle

    setMetaByName('description', desc)
    setMetaByProperty('og:title', fullTitle)
    setMetaByProperty('og:description', desc)
    setMetaByProperty('og:type', type)
    setMetaByProperty('og:url', url)
    setMetaByProperty('og:site_name', SITE_NAME)

    return () => {
      document.title = prevTitle
    }
  }, [title, description, path, type])
}

/** Component form of useSeo, for JSX-first call sites. Renders nothing. */
export function Seo(props: SeoProps) {
  useSeo(props)
  return null
}
