import type { Post, SiteSettings } from './types';

interface ApiPost {
  id: number;
  slug: string;
  title: string;
  description: string;
  tags: string; // comma-separated
  draft: boolean;
  publish_date: string;
  created_at: string;
  updated_at: string;
  body?: string;
}

interface ApiSettings {
  site_name: string;
  site_description: string;
  social_github: string;
  social_linkedin: string;
  social_twitter: string;
}

function getApiBase(): string {
  // import.meta.env is build-time only; process.env is read at runtime in SSR standalone mode
  const base = (import.meta.env.BACKEND_URL as string | undefined) ?? process.env.BACKEND_URL ?? 'http://localhost:8090';
  return base.replace(/\/$/, '');
}

function toPost(api: ApiPost): Post {
  return {
    slug: api.slug,
    frontmatter: {
      title: api.title,
      description: api.description || undefined,
      publishDate: api.publish_date,
      draft: api.draft,
      tags: api.tags ? api.tags.split(',').filter(Boolean) : [],
    },
    body: api.body ?? '',
  };
}

export async function listPosts(): Promise<Post[]> {
  const res = await fetch(`${getApiBase()}/api/posts`);
  if (!res.ok) throw new Error(`Failed to fetch posts: ${res.status}`);
  const data: ApiPost[] = await res.json();
  return data.map(toPost);
}

export async function getPost(slug: string): Promise<Post | null> {
  const res = await fetch(`${getApiBase()}/api/posts/${encodeURIComponent(slug)}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Failed to fetch post: ${res.status}`);
  const data: ApiPost = await res.json();
  return toPost(data);
}

export async function getSettings(): Promise<SiteSettings> {
  const res = await fetch(`${getApiBase()}/api/settings`);
  if (!res.ok) throw new Error(`Failed to fetch settings: ${res.status}`);
  const data: ApiSettings = await res.json();
  return {
    siteName: data.site_name || 'My Blog',
    siteDescription: data.site_description || '',
  };
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
