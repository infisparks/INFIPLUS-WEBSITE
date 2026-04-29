"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import ContactFooter from "../components/ContactFooter";
import BookDemoModal from "../components/BookDemoModal";
import GoToTop from "../components/GoToTop";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { blogPosts } from "../constants/blogData";
import { Calendar, User, ArrowRight } from "lucide-react";

export default function BlogPage() {
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <>
      <Navbar onBookDemo={() => setDemoOpen(true)} />
      <main style={{ paddingTop: "100px", background: "var(--bg-surface)", minHeight: "100vh" }}>
        {/* Blog Header */}
        <section className="container-main" style={{ textAlign: "center", padding: "60px 0" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="section-badge">Health-Tech Insights</span>
            <h1 className="gradient-text-vibrant" style={{ marginBottom: "20px" }}>
              Latest from INFIPLUS Blog
            </h1>
            <p style={{ maxWidth: "600px", margin: "0 auto", color: "var(--text-dim)" }}>
              Expert advice on Hospital Management, Lab Automation, and the future of healthcare technology in India.
            </p>
          </motion.div>
        </section>

        {/* Blog List */}
        <section className="container-main" style={{ paddingBottom: "100px" }}>
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", 
            gap: "32px" 
          }}>
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                style={{
                  background: "white",
                  borderRadius: "var(--radius-lg)",
                  overflow: "hidden",
                  border: "1px solid var(--border-subtle)",
                  boxShadow: "var(--shadow-md)",
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 0.3s ease",
                }}
                whileHover={{ y: -8 }}
              >
                <div style={{ position: "relative", height: "200px" }}>
                  <Image 
                    src={post.image} 
                    alt={post.title} 
                    fill 
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div style={{ padding: "24px", flex: 1, display: "flex", flexDirection: "column" }}>
                  <div style={{ display: "flex", gap: "16px", marginBottom: "12px", fontSize: "0.75rem", color: "var(--text-muted)" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                      <Calendar size={14} /> {post.date}
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                      <User size={14} /> {post.author}
                    </span>
                  </div>
                  <h3 style={{ fontSize: "1.25rem", marginBottom: "12px", color: "var(--text-main)", lineHeight: 1.3 }}>
                    {post.title}
                  </h3>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-dim)", marginBottom: "20px", flex: 1 }}>
                    {post.description}
                  </p>
                  <Link 
                    href={`/blog/${post.slug}`}
                    style={{ 
                      display: "flex", 
                      alignItems: "center", 
                      gap: "6px", 
                      color: "var(--color-primary)", 
                      fontWeight: 700, 
                      textDecoration: "none",
                      fontSize: "0.85rem"
                    }}
                  >
                    Read Full Article <ArrowRight size={16} />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <ContactFooter />
      </main>

      <BookDemoModal isOpen={demoOpen} onClose={() => setDemoOpen(false)} />
      <GoToTop />
    </>
  );
}
