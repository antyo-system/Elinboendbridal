import { useQuery } from '@tanstack/react-query'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { ARTICLES_DATA } from '../data/mockData'
import type { Article } from '../types'

function formatDate(isoString?: string | null): string {
  if (!isoString) return 'Oct 28, 2026'
  try {
    const d = new Date(isoString)
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  } catch {
    return 'Oct 28, 2026'
  }
}

function mapRowToArticle(row: any): Article {
  const readTime = row.reading_time_minutes
    ? `${row.reading_time_minutes} min read`
    : row.read_time || '5 min read'

  return {
    id: String(row.id),
    title: row.title || 'Untitled Article',
    slug: row.slug || String(row.id),
    category: row.category || 'Silhouette Guide',
    excerpt: row.excerpt || '',
    content: row.content || '',
    cover_image: row.cover_image || '',
    author: row.author_name || row.author || 'Elin Boend, Lead Designer',
    date: formatDate(row.published_at || row.created_at),
    read_time: readTime,
  }
}

export function useArticles() {
  return useQuery<Article[]>({
    queryKey: ['storefront-articles'],
    queryFn: async () => {
      if (!isSupabaseConfigured || !supabase) {
        return ARTICLES_DATA
      }

      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('status', 'published')
        .order('published_at', { ascending: false })

      if (error) {
        console.warn('Failed to fetch articles from Supabase, falling back to mock data:', error.message)
        return ARTICLES_DATA
      }

      if (!data || data.length === 0) {
        return ARTICLES_DATA
      }

      return data.map(mapRowToArticle)
    },
    initialData: ARTICLES_DATA,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}

export function useArticle(slug: string | undefined) {
  const { data: articles = ARTICLES_DATA, isLoading, error } = useArticles()
  const article = articles.find((a) => a.slug === slug || a.id === slug)
  return { article, isLoading, error }
}
