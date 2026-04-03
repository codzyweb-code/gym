"use client";

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, Clock, User, Calendar, Share2 } from 'lucide-react'
import ScrollReveal from '../../../components/ScrollReveal'

const posts = {
  '5-best-exercises-for-beginners': {
    title: '5 Best Exercises for Beginners to Build Strength',
    category: 'Workout',
    author: 'Vikram Rathore',
    date: 'Mar 28, 2026',
    readTime: '5 min read',
    color: '#C8102E',
    content: `
      <p>Starting your fitness journey can feel overwhelming with so many exercises to choose from. But the truth is, you only need a handful of compound movements to build a rock-solid foundation.</p>
      <h3>1. Squats</h3>
      <p>The king of all exercises. Squats target your quads, hamstrings, glutes, and core. Start with bodyweight squats and progress to barbell back squats as you build confidence.</p>
      <h3>2. Deadlifts</h3>
      <p>Nothing builds total-body strength like the deadlift. It works your posterior chain — hamstrings, glutes, lower back, and traps. Perfect form is essential, so start light.</p>
      <h3>3. Bench Press</h3>
      <p>The ultimate upper-body builder. The bench press targets your chest, shoulders, and triceps. Start with dumbbells if a barbell feels intimidating.</p>
      <h3>4. Overhead Press</h3>
      <p>Build strong, well-rounded shoulders with the overhead press. It also strengthens your core and improves overall pressing power.</p>
      <h3>5. Bent-Over Rows</h3>
      <p>Balance out all that pressing with rows. They strengthen your back, biceps, and rear delts — crucial for posture and injury prevention.</p>
      <h3>The Bottom Line</h3>
      <p>Master these five exercises and you'll build a foundation of strength that carries over to every other activity. At S4 FITNESS, our trainers specialize in teaching proper form to beginners. Book a free session today!</p>
    `,
  },
  'hiit-vs-steady-cardio': {
    title: 'HIIT vs Steady-State Cardio: Which Burns More Fat?',
    category: 'Cardio',
    author: 'Karan Malhotra',
    date: 'Mar 22, 2026',
    readTime: '7 min read',
    color: '#333333',
    content: `<p>Both HIIT and steady-state cardio burn calories, but they do it differently. HIIT creates an "afterburn" effect (EPOC) that keeps your metabolism elevated for hours. Steady-state cardio burns more calories during the session itself but has minimal afterburn.</p><h3>The Verdict</h3><p>For fat loss efficiency, HIIT wins. But the best cardio is the one you'll actually do consistently. Mix both methods for optimal results.</p>`,
  },
  'nutrition-guide-muscle-building': {
    title: 'The Complete Nutrition Guide for Muscle Building',
    category: 'Nutrition',
    author: 'Neha Gupta',
    date: 'Mar 15, 2026',
    readTime: '10 min read',
    color: '#9A0C22',
    content: `<p>Building muscle requires more than just lifting weights — your nutrition is equally important. Aim for 1.6-2.2g of protein per kg of bodyweight, eat in a slight caloric surplus, and time your meals around your workouts for optimal results.</p><h3>Key Takeaways</h3><p>Protein is king, but don't neglect carbs and fats. They fuel your workouts and support hormone production. Stay consistent and track your intake.</p>`,
  },
}

export default function BlogPost() {
  const { slug } = useParams()
  const post = posts[slug]

  if (!post) {
    return (
      <div className="page-enter" style={{ paddingTop: 'calc(var(--nav-height) + var(--space-4xl))', textAlign: 'center', minHeight: '60vh' }}>
        <div className="container">
          <h2>Post Not Found</h2>
          <p className="text-muted" style={{ margin: 'var(--space-lg) 0' }}>The article you're looking for doesn't exist.</p>
          <Link href="/blog" className="btn btn--primary">Back to Blog</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="page-enter">
      <div className="blog-post-header" style={{ background: post.color }}>
        <div className="container">
          <Link href="/blog" className="blog-post-back"><ArrowLeft size={16} /> Back to Blog</Link>
          <span className="badge" style={{ background: 'rgba(0,0,0,0.3)', border: 'none' }}>{post.category}</span>
          <h1 style={{ fontSize: 'var(--fs-4xl)', maxWidth: '700px', marginTop: 'var(--space-md)' }}>{post.title}</h1>
          <div className="blog-post-meta">
            <span><User size={14} /> {post.author}</span>
            <span><Calendar size={14} /> {post.date}</span>
            <span><Clock size={14} /> {post.readTime}</span>
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container container--narrow">
          <ScrollReveal>
            <article className="blog-post-content" dangerouslySetInnerHTML={{ __html: post.content }} />
          </ScrollReveal>
          <div className="blog-post-footer">
            <Link href="/blog" className="btn btn--secondary">← More Articles</Link>
            <Link href="/contact" className="btn btn--primary">Start Training Today</Link>
          </div>
        </div>
      </section>

      <style>{`
        .blog-post-header {
          padding: calc(var(--nav-height) + var(--space-3xl)) 0 var(--space-3xl);
        }
        .blog-post-back {
          display: inline-flex;
          align-items: center;
          gap: var(--space-xs);
          color: rgba(255,255,255,0.8);
          font-size: var(--fs-sm);
          margin-bottom: var(--space-xl);
          transition: color var(--transition-fast);
        }
        .blog-post-back:hover { color: white; }
        .blog-post-meta {
          display: flex;
          gap: var(--space-lg);
          margin-top: var(--space-lg);
          font-size: var(--fs-sm);
          color: rgba(255,255,255,0.7);
        }
        .blog-post-meta span {
          display: flex;
          align-items: center;
          gap: var(--space-xs);
        }
        .blog-post-content {
          font-size: var(--fs-md);
          line-height: 1.9;
          color: var(--color-text-secondary);
        }
        .blog-post-content h3 {
          color: var(--color-text-primary);
          margin: var(--space-2xl) 0 var(--space-md);
          font-size: var(--fs-xl);
        }
        .blog-post-content p {
          margin-bottom: var(--space-lg);
        }
        .blog-post-footer {
          display: flex;
          justify-content: space-between;
          margin-top: var(--space-3xl);
          padding-top: var(--space-2xl);
          border-top: 1px solid var(--color-border);
          flex-wrap: wrap;
          gap: var(--space-md);
        }
      `}</style>
    </div>
  )
}
