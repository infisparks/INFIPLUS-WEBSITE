import { blogPosts } from "@/app/constants/blogData";
import { Metadata } from "next";
import BlogPostClient from "./BlogPostClient"

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;
  const post = blogPosts.find((p: any) => p.slug === slug);

  if (!post) {
    return {
      title: "Post Not Found | INFIPLUS",
    };
  }

  return {
    title: `${post.title} | INFIPLUS Blog`,
    description: post.description,
    keywords: post.keywords,
    alternates: {
      canonical: `/blog/${slug}`,
    }
  };
}

export default async function BlogPostPage({ params }: Props) {
  const slug = (await params).slug;
  const post = blogPosts.find((p: any) => p.slug === slug);

  if (!post) {
     return (
      <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
        <h1>Post Not Found</h1>
      </div>
    );
  }

  return <BlogPostClient post={post} />;
}
