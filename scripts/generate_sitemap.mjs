import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const SITE_URL = 'https://www.elinboendbridal.com'
const today = new Date().toISOString().split('T')[0]

const staticRoutes = [
  { path: '/', changefreq: 'daily', priority: '1.0' },
  { path: '/fitting', changefreq: 'weekly', priority: '0.9' },
  { path: '/articles', changefreq: 'weekly', priority: '0.8' },
  { path: '/about', changefreq: 'monthly', priority: '0.8' },
]

const productSlugs = [
  'the-aurelia-french-lace-ballgown',
  'seraphina-crystalline-mermaid-gown',
  'elysian-minimalist-mikado-sheath',
  'nocturne-emerald-velvet-evening-gown',
  'celeste-starlight-a-line-gown',
  'genevieve-champagne-draped-satin-dress',
  'adelaide-modern-heritage-kebaya-pengantin',
  'rosalind-pastel-rose-bridesmaid-gown',
]

const articleSlugs = [
  'ultimate-guide-choosing-wedding-gown-silhouette',
  'wedding-gown-rental-vs-custom-made-budget-guide',
  'bridal-fitting-etiquette-5-things-to-prepare',
]

const urls = [
  ...staticRoutes.map(
    (route) => `  <url>
    <loc>${SITE_URL}${route.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
  ),
  ...productSlugs.map(
    (slug) => `  <url>
    <loc>${SITE_URL}/products/${slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`
  ),
  ...articleSlugs.map(
    (slug) => `  <url>
    <loc>${SITE_URL}/articles/${slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`
  ),
]

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>
`

const outputPath = path.resolve(__dirname, '../public/sitemap.xml')
fs.writeFileSync(outputPath, xml, 'utf8')
console.log(`Generated sitemap.xml with ${urls.length} URLs at ${outputPath}`)
