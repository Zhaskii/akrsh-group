import BlogDetails from "@/components/BlogDetails";
import type { BlogPost } from "@/components/BlogDetails";
import type { Metadata } from "next";

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : "https://arkshgroup.com");
const payloadUrl = process.env.NEXT_PUBLIC_PAYLOAD_URL || baseUrl;

function stripExcerpt(excerpt: unknown): string {
  if (!excerpt || typeof excerpt !== "object") return "";
  const root = (excerpt as { root?: { children?: { children?: { text?: string }[] }[] } }).root;
  if (!root?.children) return "";
  return root.children
    .map((node) =>
      (node.children || []).map((c) => (c && "text" in c ? c.text : "")).join(""),
    )
    .join(" ")
    .slice(0, 160);
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const res = await fetch(
      `${payloadUrl}/api/blogs?where[slug][equals]=${encodeURIComponent(slug)}&depth=1`,
      { next: { revalidate: 60 } },
    );
    const data = await res.json();
    const post = data.docs?.[0];
    if (!post) {
      return {
        title: "Blog | Arksh Group",
        description: "Read the latest blogs and updates from Arksh Group.",
      };
    }

    const metaTitle =
      post.seo?.metaTitle?.trim() || `${post.title} | Arksh Group`;
    const metaDescription =
      post.seo?.metaDescription?.trim() || stripExcerpt(post.excerpt) || post.title;
    const ogImage =
      post.seo?.ogImage?.url ?? post.image?.url;
    const imageUrl = ogImage ? `${payloadUrl}${ogImage}` : undefined;
    const canonical = post.seo?.canonicalURL?.trim() || `${baseUrl}/blog/${slug}`;
    const keywords = post.seo?.keywords?.trim()
      ? post.seo.keywords.split(",").map((k: string) => k.trim())
      : undefined;

    return {
      title: metaTitle,
      description: metaDescription,
      keywords: keywords?.length ? keywords : undefined,
      alternates: { canonical },
      openGraph: {
        title: metaTitle,
        description: metaDescription,
        url: canonical,
        siteName: "Arksh Group",
        type: "article",
        publishedTime: post.date,
        authors: post.author ? [post.author] : undefined,
        images: imageUrl ? [{ url: imageUrl, alt: post.title }] : undefined,
      },
      twitter: {
        card: "summary_large_image",
        title: metaTitle,
        description: metaDescription,
        images: imageUrl ? [imageUrl] : undefined,
      },
    };
  } catch {
    return {
      title: "Blog | Arksh Group",
      description: "Read the latest blogs and updates from Arksh Group.",
    };
  }
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params
  const payloadUrlRes = process.env.NEXT_PUBLIC_PAYLOAD_URL || baseUrl
  let post: Record<string, unknown> | null = null
  let recentPosts: Record<string, unknown>[] = []
  try {
    const [postRes, recentRes] = await Promise.all([
      fetch(
        `${payloadUrlRes}/api/blogs?where[slug][equals]=${encodeURIComponent(slug)}&depth=1`,
        { next: { revalidate: 60 } },
      ),
      fetch(
        `${payloadUrlRes}/api/blogs?limit=7&depth=1&sort=-date`,
        { next: { revalidate: 60 } },
      ),
    ])
    const [data, recentData] = await Promise.all([postRes.json(), recentRes.json()])
    post = data.docs?.[0] ?? null
    recentPosts = recentData.docs ?? []
  } catch {
    post = null
  }
  if (!post) {
    const { notFound } = await import('next/navigation')
    notFound()
  }
  return (
    <BlogDetails
      initialPost={post as unknown as BlogPost}
      initialRecentPosts={recentPosts as unknown as BlogPost[]}
    />
  )
}
