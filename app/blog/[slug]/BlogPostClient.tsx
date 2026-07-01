"use client";

import { useState } from "react";
import Navbar from "@/app/components/Navbar";
import ContactFooter from "@/app/components/ContactFooter";
import BookDemoModal from "@/app/components/BookDemoModal";
import GoToTop from "@/app/components/GoToTop";
import { motion } from "framer-motion";
import Image from "next/image";
import { Calendar, User, ArrowLeft, Share2 } from "lucide-react";
import Link from "next/link";

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  description: string;
  content: string;
  author: string;
  date: string;
  image: string;
  keywords: string;
}

export default function BlogPostClient({ post }: { post: BlogPost }) {
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <>
      <Navbar onBookDemo={() => setDemoOpen(true)} />
      <main style={{ paddingTop: "clamp(80px, 12vh, 120px)", background: "white" }}>
        <article className="container-main" style={{ maxWidth: "900px", paddingBottom: "100px" }}>
          <Link 
            href="/blog" 
            style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: "8px", 
              color: "var(--text-muted)", 
              textDecoration: "none",
              marginBottom: "30px",
              fontSize: "0.9rem",
              fontWeight: 600
            }}
          >
            <ArrowLeft size={16} /> Back to Blog
          </Link>

          <header style={{ marginBottom: "40px" }}>
            <h1 style={{ fontSize: "clamp(1.8rem, 5vw, 3.5rem)", lineHeight: 1.1, marginBottom: "24px" }}>
              {post.title}
            </h1>
            
            <div className="blog-meta-header" style={{ 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "space-between",
              paddingBottom: "24px",
              borderBottom: "1px solid var(--border-subtle)",
              gap: "16px",
              flexWrap: "wrap"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "var(--bg-surface)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <User size={16} />
                  </div>
                  <span style={{ fontWeight: 600, fontSize: "0.9rem" }}>{post.author}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--text-muted)", fontSize: "0.9rem" }}>
                  <Calendar size={16} />
                  {post.date}
                </div>
              </div>
              <button style={{ 
                background: "none", 
                border: "1px solid var(--border-subtle)", 
                padding: "8px 12px", 
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                cursor: "pointer",
                fontSize: "0.85rem",
                fontWeight: 600,
                width: "fit-content"
              }}>
                <Share2 size={14} /> Share
              </button>
            </div>
          </header>

          <div style={{ 
            position: "relative", 
            height: "clamp(220px, 50vw, 450px)", 
            borderRadius: "var(--radius-xl)", 
            overflow: "hidden", 
            marginBottom: "50px",
            boxShadow: "var(--shadow-lg)"
          }}>
            <Image 
              src={post.image} 
              alt={post.title} 
              fill 
              style={{ objectFit: "cover" }}
              priority
            />
          </div>

          <div 
            className="blog-content"
            style={{ 
              fontSize: "1.1rem", 
              lineHeight: 1.8, 
              color: "var(--text-dim)" 
            }}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div style={{ 
            marginTop: "60px", 
            padding: "40px", 
            background: "var(--bg-surface)", 
            borderRadius: "var(--radius-lg)",
            textAlign: "center"
          }}>
            <h3>Want to see INFIPLUS in action?</h3>
            <p style={{ margin: "16px 0 24px" }}>Join 500+ healthcare facilities across India using our HMS and LIS software.</p>
            <button 
              onClick={() => setDemoOpen(true)}
              className="glow-btn-primary"
              style={{ padding: "14px 30px", borderRadius: "12px", border: "none", color: "white", cursor: "pointer", fontWeight: 700 }}
            >
              Book a Free Demo
            </button>
          </div>
        </article>

        <ContactFooter />
      </main>

      <BookDemoModal isOpen={demoOpen} onClose={() => setDemoOpen(false)} />
      <GoToTop />

      <style jsx global>{`
        .blog-content h2 {
          margin: 40px 0 20px;
          color: var(--text-main);
        }
        .blog-content h3 {
          margin: 30px 0 15px;
          color: var(--text-main);
        }
        .blog-content p {
          margin-bottom: 24px;
        }
        .blog-content ul, .blog-content ol {
          margin-bottom: 24px;
          padding-left: 20px;
        }
        .blog-content li {
          margin-bottom: 12px;
        }
        .blog-content strong {
          color: var(--color-primary);
        }
        @media (max-width: 640px) {
          .blog-meta-header {
            flex-direction: column;
            align-items: flex-start !important;
            gap: 12px !important;
          }
          .blog-meta-header > div {
            gap: 12px !important;
          }
        }
      `}</style>
    </>
  );
}
