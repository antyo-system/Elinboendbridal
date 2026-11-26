export const SITE_URL = 'https://www.elinboendbridal.com'

interface PageSeoOptions {
  title: string
  description: string
  canonicalPath?: string
  ogImage?: string
}

/**
 * Dynamically updates document title, meta description, canonical URL, and OpenGraph tags
 * for Single-Page Application (SPA) SEO & Googlebot rendering.
 */
export function updatePageSeo({
  title,
  description,
  canonicalPath = '/',
  ogImage,
}: PageSeoOptions): void {
  if (typeof document === 'undefined') return

  document.title = title

  const setMeta = (selector: string, content: string) => {
    const el = document.querySelector<HTMLMetaElement>(selector)
    if (el) el.setAttribute('content', content)
  }

  setMeta('meta[name="description"]', description)
  setMeta('meta[property="og:title"]', title)
  setMeta('meta[property="og:description"]', description)
  setMeta('meta[name="twitter:title"]', title)
  setMeta('meta[name="twitter:description"]', description)

  const canonicalUrl = `${SITE_URL}${canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`}`
  const canonicalLink = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (canonicalLink) {
    canonicalLink.setAttribute('href', canonicalUrl)
  }
  setMeta('meta[property="og:url"]', canonicalUrl)

  if (ogImage) {
    setMeta('meta[property="og:image"]', ogImage)
    setMeta('meta[name="twitter:image"]', ogImage)
  }
}
