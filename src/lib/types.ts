export interface PostFrontmatter {
  title: string;
  description?: string;
  publishDate: string;
  draft: boolean;
  tags?: string[];
}

export interface Post {
  slug: string;
  frontmatter: PostFrontmatter;
  body: string;
}
