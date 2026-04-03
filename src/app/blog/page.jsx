"use client";

import Link from 'next/link';

import { Clock, ArrowRight, User, Calendar } from 'lucide-react'
import ScrollReveal from '../../components/ScrollReveal'

const blogPosts = [
  {
    slug: '5-best-exercises-for-beginners',
    title: '5 Best Exercises for Beginners to Build Strength',
    excerpt: 'Starting your fitness journey? These five foundational exercises are all you need to build a strong base and see real results fast.',
    category: 'Workout',
    author: 'Vikram Rathore',
    date: 'Mar 28, 2026',
    readTime: '5 min read',
    color: '#C8102E',
  },
  {
    slug: 'hiit-vs-steady-cardio',
    title: 'HIIT vs Steady-State Cardio: Which Burns More Fat?',
    excerpt: 'The age-old debate settled with science. We break down which cardio method is truly superior for fat loss and overall fitness.',
    category: 'Cardio',
    author: 'Karan Malhotra',
    date: 'Mar 22, 2026',
    readTime: '7 min read',
    color: '#333333',
  },
  {
    slug: 'nutrition-guide-muscle-building',
    title: 'The Complete Nutrition Guide for Muscle Building',
    excerpt: 'Everything you need to know about protein, carbs, fats, meal timing, and supplements to maximize your muscle-building potential.',
    category: 'Nutrition',
    author: 'Neha Gupta',
    date: 'Mar 15, 2026',
    readTime: '10 min read',
    color: '#9A0C22',
  },
  {
    slug: 'yoga-benefits-for-athletes',
    title: 'Why Every Athlete Should Practice Yoga',
    excerpt: 'From improved flexibility to injury prevention — discover how yoga can take your athletic performance to the next level.',
    category: 'Yoga',
    author: 'Ananya Patel',
    date: 'Mar 8, 2026',
    readTime: '6 min read',
    color: '#2a2a2a',
  },
  {
    slug: 'pre-workout-meals',
    title: 'What to Eat Before a Workout: Pre-Workout Meal Guide',
    excerpt: 'Fuel your training the right way. Learn what to eat and when for maximum energy and performance during workouts.',
    category: 'Nutrition',
    author: 'Neha Gupta',
    date: 'Mar 1, 2026',
    readTime: '8 min read',
    color: '#DF1638',
  },
  {
    slug: 'recovery-tips-muscle-soreness',
    title: '7 Recovery Tips to Reduce Muscle Soreness Fast',
    excerpt: 'Sore muscles slowing you down? These science-backed recovery strategies will get you back in the gym faster.',
    category: 'Recovery',
    author: 'Divya Reddy',
    date: 'Feb 22, 2026',
    readTime: '6 min read',
    color: '#404040',
  },
]

export default function Blog() {
  return (
    <div className="page-enter">
      <div className="page-header">
        <div className="container">
          <span className="badge">Blog</span>
          <h1>Fitness <span className="text-accent">Insights</span></h1>
          <p>Expert tips, workout routines, and nutrition advice to fuel your fitness journey.</p>
        </div>
      </div>

      <section className="section" id="blog-posts">
        <div className="container">
          {/* FEATURED POST */}
          <ScrollReveal>
            <Link href={`/blog/${blogPosts[0].slug}`} className="blog-featured" id="blog-featured">
              <div className="blog-featured__image" style={{ background: blogPosts[0].color }} />
              <div className="blog-featured__content">
                <span className="badge">{blogPosts[0].category}</span>
                <h2>{blogPosts[0].title}</h2>
                <p>{blogPosts[0].excerpt}</p>
                <div className="blog-featured__meta">
                  <span><User size={14} /> {blogPosts[0].author}</span>
                  <span><Calendar size={14} /> {blogPosts[0].date}</span>
                  <span><Clock size={14} /> {blogPosts[0].readTime}</span>
                </div>
                <span className="blog-featured__link">
                  Read Article <ArrowRight size={16} />
                </span>
              </div>
            </Link>
          </ScrollReveal>

          {/* POST GRID */}
          <div className="blog-grid">
            {blogPosts.slice(1).map((post, i) => (
              <ScrollReveal key={post.slug} delay={i * 80}>
                <Link href={`/blog/${post.slug}`} className="blog-card card" id={`blog-${post.slug}`}>
                  <div className="blog-card__image" style={{ background: post.color }}>
                    <span className="blog-card__category">{post.category}</span>
                  </div>
                  <div className="blog-card__content">
                    <h3 className="blog-card__title">{post.title}</h3>
                    <p className="blog-card__excerpt">{post.excerpt}</p>
                    <div className="blog-card__meta">
                      <span><User size={12} /> {post.author}</span>
                      <span><Clock size={12} /> {post.readTime}</span>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .blog-featured {
          display: grid;
          grid-template-columns: 1fr 1fr;
          border-radius: var(--radius-lg);
          overflow: hidden;
          background: var(--color-bg-card);
          border: 1px solid var(--color-border);
          margin-bottom: var(--space-3xl);
          transition: all var(--transition-base);
        }
        .blog-featured:hover {
          border-color: var(--color-accent);
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
        }
        .blog-featured__image { min-height: 400px; }
        .blog-featured__content {
          padding: var(--space-2xl);
          display: flex;
          flex-direction: column;
          gap: var(--space-md);
          justify-content: center;
        }
        .blog-featured__content h2 { font-size: var(--fs-2xl); }
        .blog-featured__content p {
          color: var(--color-text-secondary);
          line-height: 1.7;
        }
        .blog-featured__meta {
          display: flex;
          gap: var(--space-lg);
          font-size: var(--fs-xs);
          color: var(--color-text-muted);
        }
        .blog-featured__meta span {
          display: flex;
          align-items: center;
          gap: var(--space-xs);
        }
        .blog-featured__link {
          display: inline-flex;
          align-items: center;
          gap: var(--space-xs);
          color: var(--color-accent);
          font-weight: var(--fw-semibold);
          font-size: var(--fs-sm);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .blog-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-xl);
        }
        .blog-card { display: flex; flex-direction: column; }
        .blog-card__image {
          height: 200px;
          position: relative;
        }
        .blog-card__category {
          position: absolute;
          top: var(--space-md);
          left: var(--space-md);
          padding: 0.25rem 0.75rem;
          background: rgba(0,0,0,0.6);
          border-radius: var(--radius-full);
          font-size: var(--fs-xs);
          font-weight: var(--fw-semibold);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .blog-card__content {
          padding: var(--space-lg);
          display: flex;
          flex-direction: column;
          gap: var(--space-sm);
          flex: 1;
        }
        .blog-card__title {
          font-size: var(--fs-md);
          line-height: 1.3;
          transition: color var(--transition-fast);
        }
        .blog-card:hover .blog-card__title { color: var(--color-accent); }
        .blog-card__excerpt {
          font-size: var(--fs-sm);
          color: var(--color-text-secondary);
          line-height: 1.6;
          flex: 1;
        }
        .blog-card__meta {
          display: flex;
          gap: var(--space-md);
          font-size: var(--fs-xs);
          color: var(--color-text-muted);
          padding-top: var(--space-md);
          border-top: 1px solid var(--color-border);
        }
        .blog-card__meta span {
          display: flex;
          align-items: center;
          gap: var(--space-xs);
        }
        @media (max-width: 1024px) {
          .blog-featured { grid-template-columns: 1fr; }
          .blog-featured__image { min-height: 250px; }
          .blog-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .blog-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  )
}
