export interface PostFrontmatter {
  title: string;
  description?: string;
  publishDate: string;
  draft: boolean;
  tags?: string[];
  heroImage?: string;
}

export interface Post {
  slug: string;
  frontmatter: PostFrontmatter;
  body: string;
}

export interface SiteSettings {
  siteName: string;
  siteDescription: string;
  socialGithub: string;
  socialTwitter: string;
  socialLinkedin: string;
}
