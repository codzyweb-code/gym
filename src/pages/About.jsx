import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle, Users, Award, Clock, Dumbbell, Shield, Zap, Target, Heart } from 'lucide-react'
import SectionHeader from '../components/SectionHeader'
import ScrollReveal from '../components/ScrollReveal'
import TrainerCard from '../components/TrainerCard'

const values = [
  { icon: <Shield size={28} />, title: 'Safety First', desc: 'Certified equipment, sanitized spaces, and trained staff ensuring your safety at all times.' },
  { icon: <Zap size={28} />, title: 'Results Driven', desc: 'Science-backed programs designed to deliver measurable, sustainable results.' },
  { icon: <Users size={28} />, title: 'Community', desc: 'A supportive community of passionate fitness enthusiasts pushing each other to greatness.' },
  { icon: <Heart size={28} />, title: 'Passion', desc: 'Every trainer, every program, every session — powered by genuine passion for fitness.' },
]

const milestones = [
  { year: '2014', title: 'The Beginning', desc: 'Started as a small 2,000 sq ft studio in South Delhi with just 3 trainers and a dream.' },
  { year: '2016', title: 'First Expansion', desc: 'Grew to 8,000 sq ft with new strength and cardio zones. Membership crossed 200.' },
  { year: '2018', title: 'Group Classes Launch', desc: 'Introduced HIIT, Yoga, and CrossFit classes. Hired 10+ certified trainers.' },
  { year: '2020', title: 'Digital Transformation', desc: 'Launched online training and virtual classes during the pandemic. Kept the community strong.' },
  { year: '2022', title: 'Premium Upgrade', desc: 'Relocated to our flagship 15,000 sq ft facility in Connaught Place with world-class equipment.' },
  { year: '2024', title: 'Community of 500+', desc: 'Crossed 500 active members, 15+ trainers, and earned "Best Gym in New Delhi" recognition.' },
]

const allTrainers = [
  { name: 'Vikram Rathore', role: 'Head Trainer', specialization: 'Strength & Conditioning, Powerlifting', experience: 12, instagram: '#' },
  { name: 'Ananya Patel', role: 'Yoga Instructor', specialization: 'Hatha Yoga, Meditation, Flexibility', experience: 8, instagram: '#' },
  { name: 'Karan Malhotra', role: 'HIIT Specialist', specialization: 'Fat Loss, HIIT, Functional Training', experience: 10, instagram: '#' },
  { name: 'Neha Gupta', role: 'Nutritionist', specialization: 'Sports Nutrition, Meal Planning', experience: 7, instagram: '#' },
  { name: 'Rohit Verma', role: 'CrossFit Coach', specialization: 'CrossFit, Olympic Lifting', experience: 9, instagram: '#' },
  { name: 'Simran Kaur', role: 'Group Fitness', specialization: 'Zumba, Aerobics, Dance Fitness', experience: 6, instagram: '#' },
  { name: 'Amit Saxena', role: 'Boxing Trainer', specialization: 'Boxing, MMA, Self-Defense', experience: 11, instagram: '#' },
  { name: 'Divya Reddy', role: 'Physiotherapist', specialization: 'Injury Rehab, Mobility Work', experience: 8, instagram: '#' },
]

export default function About() {
  return (
    <div className="page-enter">
      {/* PAGE HEADER */}
      <div className="page-header">
        <div className="container">
          <span className="badge">Who We Are</span>
          <h1>About <span className="text-accent">S4 FITNESS</span></h1>
          <p>More than a gym — we're a movement dedicated to transforming lives through fitness excellence.</p>
        </div>
      </div>

      {/* STORY SECTION */}
      <section className="section" id="our-story">
        <div className="container">
          <div className="about-split">
            <ScrollReveal direction="left" className="about-split__content">
              <span className="badge">Our Story</span>
              <h2>Forged From <span className="text-accent">Passion</span></h2>
              <div className="divider" />
              <p>S4 FITNESS was born from a simple belief: everyone deserves access to world-class fitness. What started as a humble 2,000 sq ft studio in South Delhi with just three trainers and a handful of dumbbells has grown into New Delhi's most prestigious fitness destination.</p>
              <p>Our founder, a former national-level athlete, saw the gap between mediocre gyms and truly transformative fitness experiences. S4 FITNESS was created to bridge that gap — combining elite training methodologies with a welcoming, community-driven atmosphere.</p>
              <p>Today, our flagship 15,000 sq ft facility in Connaught Place houses over 200 pieces of equipment from brands like Hammer Strength, Rogue, and Technogym. But our greatest asset isn't our equipment — it's the passionate community of 500+ members who walk through our doors every day, committed to becoming their best selves.</p>
            </ScrollReveal>
            <ScrollReveal direction="right" className="about-split__visual">
              <div className="about-split__image" />
              <div className="about-split__stats-card glass-card">
                <div className="about-split__stat">
                  <span className="text-accent" style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--fs-2xl)', fontWeight: 'var(--fw-bold)' }}>15K+</span>
                  <span className="text-muted" style={{ fontSize: 'var(--fs-xs)', textTransform: 'uppercase' }}>Sq. Ft. Facility</span>
                </div>
                <div className="about-split__stat">
                  <span className="text-accent" style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--fs-2xl)', fontWeight: 'var(--fw-bold)' }}>200+</span>
                  <span className="text-muted" style={{ fontSize: 'var(--fs-xs)', textTransform: 'uppercase' }}>Equipment Units</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* MISSION & VALUES */}
      <section className="section section--dark" id="values">
        <div className="container">
          <SectionHeader
            badge="Our Values"
            title={<>What Drives <span className="text-accent">Us</span></>}
            subtitle="The core principles that define who we are and how we operate."
          />
          <div className="grid grid--4">
            {values.map((v, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="value-card card" id={`value-${i}`}>
                  <div className="value-card__icon">{v.icon}</div>
                  <h3 className="value-card__title">{v.title}</h3>
                  <p className="value-card__desc">{v.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="section" id="timeline">
        <div className="container container--narrow">
          <SectionHeader
            badge="Our Journey"
            title={<>The S4 FITNESS <span className="text-accent">Timeline</span></>}
            subtitle="A decade of dedication, growth, and transformation."
          />
          <div className="timeline">
            {milestones.map((m, i) => (
              <ScrollReveal key={i} delay={i * 80} direction={i % 2 === 0 ? 'left' : 'right'}>
                <div className="timeline__item">
                  <div className="timeline__marker">
                    <div className="timeline__dot" />
                  </div>
                  <div className="timeline__content card">
                    <span className="timeline__year">{m.year}</span>
                    <h3 className="timeline__title">{m.title}</h3>
                    <p className="timeline__desc">{m.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* TRAINERS */}
      <section className="section section--dark" id="all-trainers">
        <div className="container">
          <SectionHeader
            badge="Our Team"
            title={<>Expert <span className="text-accent">Trainers</span></>}
            subtitle="Meet the certified professionals who make S4 FITNESS the best gym in New Delhi."
          />
          <div className="grid grid--4">
            {allTrainers.map((trainer, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <TrainerCard {...trainer} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="section" id="why-choose-us">
        <div className="container">
          <SectionHeader
            badge="Why S4 FITNESS"
            title={<>Why Choose <span className="text-accent">Us</span></>}
            subtitle="Here's what sets S4 FITNESS apart from every other gym in New Delhi."
          />
          <div className="why-grid">
            {[
              'Premium equipment from Hammer Strength, Rogue & Technogym',
              '15+ certified, experienced trainers',
              'Open 18 hours daily, 7 days a week',
              'Air-conditioned 15,000 sq ft facility',
              'Personalized training & nutrition plans',
              'Vibrant, supportive community of 500+ members',
              'Group classes: HIIT, Yoga, CrossFit, Boxing & more',
              'Free parking & locker facilities',
              'Monthly progress tracking & body composition analysis',
              'Competitive pricing with flexible plans',
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 50}>
                <div className="why-item">
                  <CheckCircle size={20} className="text-accent" />
                  <span>{item}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 'var(--space-3xl)' }}>
            <Link to="/membership" className="btn btn--primary btn--large" id="about-join-btn">
              Join S4 FITNESS Today <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        .about-split {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-4xl);
          align-items: center;
        }
        .about-split__content {
          display: flex;
          flex-direction: column;
          gap: var(--space-md);
        }
        .about-split__content p {
          color: var(--color-text-secondary);
          line-height: 1.8;
          font-size: var(--fs-md);
        }
        .about-split__visual {
          position: relative;
        }
        .about-split__image {
          width: 100%;
          height: 450px;
          border-radius: var(--radius-lg);
          background: linear-gradient(135deg, var(--color-bg-tertiary) 0%, var(--color-bg-card) 100%);
          border: 1px solid var(--color-border);
        }
        .about-split__stats-card {
          position: absolute;
          bottom: -30px;
          left: -30px;
          padding: var(--space-xl);
          display: flex;
          gap: var(--space-2xl);
        }
        .about-split__stat {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-xs);
        }

        /* VALUES */
        .value-card {
          padding: var(--space-2xl);
          text-align: center;
        }
        .value-card__icon {
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius-full);
          background: rgba(201, 168, 76, 0.1);
          color: var(--color-accent);
          margin: 0 auto var(--space-lg);
          border: 1px solid rgba(201, 168, 76, 0.2);
        }
        .value-card__title {
          font-size: var(--fs-lg);
          margin-bottom: var(--space-sm);
        }
        .value-card__desc {
          font-size: var(--fs-sm);
          color: var(--color-text-secondary);
          line-height: 1.7;
        }

        /* TIMELINE */
        .timeline {
          position: relative;
          padding-left: 40px;
        }
        .timeline::before {
          content: '';
          position: absolute;
          left: 15px;
          top: 0;
          bottom: 0;
          width: 2px;
          background: linear-gradient(180deg, var(--color-accent) 0%, var(--color-secondary) 100%);
        }
        .timeline__item {
          display: flex;
          gap: var(--space-xl);
          margin-bottom: var(--space-xl);
          position: relative;
        }
        .timeline__marker {
          position: absolute;
          left: -40px;
          top: var(--space-xl);
        }
        .timeline__dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: var(--color-accent);
          border: 3px solid var(--color-bg-primary);
          box-shadow: 0 0 10px var(--color-accent-glow);
        }
        .timeline__content {
          padding: var(--space-xl);
          flex: 1;
        }
        .timeline__year {
          font-family: var(--font-heading);
          font-size: var(--fs-sm);
          color: var(--color-accent);
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }
        .timeline__title {
          font-size: var(--fs-lg);
          margin: var(--space-sm) 0;
        }
        .timeline__desc {
          font-size: var(--fs-sm);
          color: var(--color-text-secondary);
          line-height: 1.7;
        }

        /* WHY CHOOSE */
        .why-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--space-lg);
        }
        .why-item {
          display: flex;
          align-items: center;
          gap: var(--space-md);
          padding: var(--space-md) var(--space-lg);
          background: var(--color-bg-card);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          font-size: var(--fs-sm);
          transition: all var(--transition-base);
        }
        .why-item:hover {
          border-color: var(--color-accent);
          background: rgba(201, 168, 76, 0.05);
        }

        @media (max-width: 1024px) {
          .about-split {
            grid-template-columns: 1fr;
          }
          .about-split__stats-card {
            position: relative;
            bottom: auto;
            left: auto;
            margin-top: var(--space-lg);
            justify-content: center;
          }
        }
        @media (max-width: 768px) {
          .why-grid {
            grid-template-columns: 1fr;
          }
          .about-split__image {
            height: 280px;
          }
          .about-split__content p {
            font-size: var(--fs-sm);
          }
          .timeline {
            padding-left: 30px;
          }
          .timeline__marker {
            left: -30px;
          }
          .timeline__content {
            padding: var(--space-md);
          }
          .value-card {
            padding: var(--space-lg);
          }
        }
        @media (max-width: 480px) {
          .about-split__stats-card {
            flex-direction: column;
            gap: var(--space-md);
          }
          .why-item {
            padding: var(--space-sm) var(--space-md);
          }
        }
      `}</style>
    </div>
  )
}
