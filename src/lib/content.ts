import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import type { Post, PostFrontmatter } from './types';

function getContentDir(): string {
  return process.env.CONTENT_DIR ?? path.join(process.cwd(), '..', 'content', 'blog');
}

function isPublished(fm: PostFrontmatter): boolean {
  if (fm.draft) return false;
  const pub = new Date(fm.publishDate);
  return !isNaN(pub.getTime()) && pub <= new Date();
}

function readPost(slug: string): Post | null {
  const contentDir = getContentDir();
  const filePath = path.join(contentDir, slug, 'index.md');

  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);

  const frontmatter: PostFrontmatter = {
    title: data.title ?? slug,
    description: data.description,
    publishDate: data.publishDate ?? '',
    draft: data.draft ?? false,
    tags: Array.isArray(data.tags) ? data.tags : [],
  };

  return { slug, frontmatter, body: content };
}

export function getPost(slug: string): Post | null {
  const post = readPost(slug);
  if (!post || !isPublished(post.frontmatter)) return null;
  return post;
}

export function listPosts(): Post[] {
  const contentDir = getContentDir();

  if (!fs.existsSync(contentDir)) return [];

  const slugs = fs.readdirSync(contentDir).filter((entry) => {
    const stat = fs.statSync(path.join(contentDir, entry));
    return stat.isDirectory();
  });

  return slugs
    .map((slug) => readPost(slug))
    .filter((post): post is Post => post !== null && isPublished(post.frontmatter))
    .sort((a, b) => {
      const dateA = new Date(a.frontmatter.publishDate).getTime();
      const dateB = new Date(b.frontmatter.publishDate).getTime();
      return dateB - dateA;
    });
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
