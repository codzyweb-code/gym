"use client";

import { useState, useEffect } from 'react'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LogOut, Dumbbell, TrendingUp, Award, Activity, Calendar, Hash, Zap, ArrowRight } from 'lucide-react'
import ScrollReveal from '../../components/ScrollReveal'

const motivationalQuotes = [
  { text: "The only bad workout is the one that didn't happen.", author: "Unknown" },
  { text: "Your body can stand almost anything. It's your mind that you have to convince.", author: "Unknown" },
  { text: "Strength does not come from the body. It comes from the will.", author: "Gandhi" },
  { text: "The pain you feel today will be the strength you feel tomorrow.", author: "Arnold Schwarzenegger" },
  { text: "Don't limit your challenges. Challenge your limits.", author: "Unknown" },
  { text: "Fitness is not about being better than someone else. It's about being better than you used to be.", author: "Khloe Kardashian" },
]

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [stats, setStats] = useState({ visitsThisMonth: 0, totalVisits: 0, streak: 0 })
  const [sessions, setSessions] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useRouter()

  const token = (typeof window !== "undefined" ? localStorage : {getItem:()=>null, setItem:()=>{}, removeItem:()=>{}}).getItem('s4fitness_token')
  const quote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]

  useEffect(() => {
    if (!token) { navigate.push('/login'); return }

    const fetchUser = async () => {
      try {
        const res = await fetch('/api/auth/me', { headers: { Authorization: `Bearer ${token}` } })
        if (!res.ok) { ;(typeof window !== "undefined" ? localStorage : {getItem:()=>null, setItem:()=>{}, removeItem:()=>{}}).removeItem('s4fitness_token'); ;(typeof window !== "undefined" ? localStorage : {getItem:()=>null, setItem:()=>{}, removeItem:()=>{}}).removeItem('s4fitness_user'); navigate.push('/login'); return }
        const data = await res.json()
        setUser(data.user)

        // Only fetch stats if user has membership
        if (data.user.hasMembership) {
          const statsRes = await fetch('/api/access/stats', { headers: { Authorization: `Bearer ${token}` } })
          if (statsRes.ok) setStats(await statsRes.json())

          const histRes = await fetch('/api/access/history', { headers: { Authorization: `Bearer ${token}` } })
          if (histRes.ok) { const h = await histRes.json(); setSessions(h.sessions) }
        }
      } catch (err) {
        console.error('Dashboard error:', err)
      }
      setLoading(false)
    }
    fetchUser()
  }, [navigate, token])

  const handleLogout = () => {
    ;(typeof window !== "undefined" ? localStorage : {getItem:()=>null, setItem:()=>{}, removeItem:()=>{}}).removeItem('s4fitness_token')
    ;(typeof window !== "undefined" ? localStorage : {getItem:()=>null, setItem:()=>{}, removeItem:()=>{}}).removeItem('s4fitness_user')
    navigate.push('/')
  }

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="loader" />
    </div>
  )

  if (!user) return null

  // ---------- NO MEMBERSHIP VIEW ----------
  if (!user.hasMembership) {
    return (
      <div className="dashboard-page page-enter">
        <div className="container">
          {/* HEADER */}
          <div className="dashboard-header">
            <div>
              <h1 style={{ fontSize: 'var(--fs-3xl)' }}>Welcome, <span className="text-accent">{user.name?.split(' ')[0] || 'Member'}</span></h1>
              <p className="text-muted">{user.email}</p>
            </div>
            <button className="btn btn--secondary" onClick={handleLogout} id="dash-logout">
              <LogOut size={18} /> Sign Out
            </button>
          </div>

          {/* NO MEMBERSHIP HERO */}
          <ScrollReveal>
            <div className="no-membership-card">
              <div className="no-membership-icon">
                <Zap size={48} />
              </div>
              <h2 className="no-membership-title">
                You Don't Have a <span className="text-accent">Membership</span> Yet
              </h2>
              <p className="no-membership-desc">
                Unlock your full potential. Join S4 Fitness and get access to world-class equipment,
                expert trainers, and a community that pushes you beyond limits.
              </p>

              <div className="no-membership-quote">
                <p className="no-membership-quote__text">"{quote.text}"</p>
                <p className="no-membership-quote__author">— {quote.author}</p>
              </div>

              <div className="no-membership-features">
                <div className="no-membership-feature">
                  <Dumbbell size={20} className="text-accent" />
                  <span>Premium Equipment</span>
                </div>
                <div className="no-membership-feature">
                  <Activity size={20} className="text-accent" />
                  <span>Personal Training</span>
                </div>
                <div className="no-membership-feature">
                  <TrendingUp size={20} className="text-accent" />
                  <span>Progress Tracking</span>
                </div>
                <div className="no-membership-feature">
                  <Calendar size={20} className="text-accent" />
                  <span>Flexible Timings</span>
                </div>
              </div>

              <Link href="/membership" className="btn btn--primary btn--large no-membership-cta" id="dash-get-membership">
                <Award size={20} /> View Membership Plans <ArrowRight size={18} />
              </Link>

              <p className="text-muted" style={{ fontSize: 'var(--fs-xs)', marginTop: 'var(--space-md)', textAlign: 'center' }}>
                Contact our team or visit the gym for a tour today!
              </p>
            </div>
          </ScrollReveal>
        </div>

        <style>{`
          .no-membership-card {
            max-width: 640px;
            margin: 0 auto;
            padding: var(--space-3xl) var(--space-2xl);
            background: var(--color-bg-card);
            border: 1px solid var(--color-border);
            border-radius: var(--radius-lg);
            text-align: center;
          }
          .no-membership-icon {
            width: 80px;
            height: 80px;
            margin: 0 auto var(--space-xl);
            border-radius: 50%;
            background: linear-gradient(135deg, rgba(200, 16, 46,0.15), rgba(200, 16, 46,0.05));
            border: 2px solid rgba(200, 16, 46,0.2);
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--color-accent);
            animation: pulse-glow 3s ease-in-out infinite;
          }
          @keyframes pulse-glow {
            0%, 100% { box-shadow: 0 0 0 0 rgba(200, 16, 46,0.2); }
            50% { box-shadow: 0 0 30px 5px rgba(200, 16, 46,0.15); }
          }
          .no-membership-title {
            font-size: var(--fs-2xl);
            margin-bottom: var(--space-md);
          }
          .no-membership-desc {
            color: var(--color-text-secondary);
            font-size: var(--fs-sm);
            line-height: 1.7;
            margin-bottom: var(--space-xl);
            max-width: 480px;
            margin-left: auto;
            margin-right: auto;
          }
          .no-membership-quote {
            background: rgba(200, 16, 46,0.06);
            border: 1px solid rgba(200, 16, 46,0.15);
            border-radius: var(--radius-md);
            padding: var(--space-lg) var(--space-xl);
            margin-bottom: var(--space-xl);
          }
          .no-membership-quote__text {
            font-style: italic;
            font-size: var(--fs-md);
            color: var(--color-text);
            line-height: 1.6;
          }
          .no-membership-quote__author {
            color: var(--color-accent);
            font-size: var(--fs-xs);
            margin-top: var(--space-sm);
            font-weight: var(--fw-semibold);
          }
          .no-membership-features {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: var(--space-md);
            margin-bottom: var(--space-xl);
          }
          .no-membership-feature {
            display: flex;
            align-items: center;
            gap: var(--space-sm);
            padding: var(--space-md);
            background: var(--color-bg-tertiary);
            border-radius: var(--radius-md);
            border: 1px solid var(--color-border);
            font-size: var(--fs-sm);
            color: var(--color-text-secondary);
          }
          .no-membership-cta {
            display: inline-flex;
            gap: var(--space-sm);
            padding: 1rem 2.5rem;
            font-size: var(--fs-md);
          }
          @media (max-width: 640px) {
            .no-membership-card {
              padding: var(--space-xl) var(--space-md);
            }
            .no-membership-title {
              font-size: var(--fs-xl);
            }
            .no-membership-features {
              grid-template-columns: 1fr;
            }
            .no-membership-cta {
              width: 100%;
              justify-content: center;
            }
          }
        `}</style>

        <style>{dashboardStyles}</style>
      </div>
    )
  }

  // ---------- MEMBER VIEW (HAS MEMBERSHIP) ----------
  const statCards = [
    { icon: <Dumbbell size={24} />, label: 'Visits This Month', value: stats.visitsThisMonth, color: '#C8102E' },
    { icon: <Hash size={24} />, label: 'Total Visits', value: stats.totalVisits, color: '#DF1638' },
    { icon: <TrendingUp size={24} />, label: 'Current Streak', value: `${stats.streak} day${stats.streak !== 1 ? 's' : ''}`, color: '#E32943' },
  ]

  return (
    <div className="dashboard-page page-enter">
      <div className="container">
        {/* HEADER */}
        <div className="dashboard-header">
          <div>
            <h1 style={{ fontSize: 'var(--fs-3xl)' }}>Welcome, <span className="text-accent">{user.name?.split(' ')[0] || 'Member'}</span></h1>
            <p className="text-muted">Track your progress and manage your fitness journey</p>
          </div>
          <button className="btn btn--secondary" onClick={handleLogout} id="dash-logout">
            <LogOut size={18} /> Sign Out
          </button>
        </div>

        {/* STATS */}
        <ScrollReveal>
          <div className="dashboard-stats">
            {statCards.map((stat, i) => (
              <div key={i} className="dashboard-stat card">
                <div className="dashboard-stat__icon" style={{ background: `${stat.color}15`, color: stat.color }}>
                  {stat.icon}
                </div>
                <div>
                  <p className="dashboard-stat__value">{stat.value}</p>
                  <p className="dashboard-stat__label">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* MEMBERSHIP STATUS */}
        <ScrollReveal delay={100}>
          <div className="dashboard-membership card">
            <div className="dashboard-membership__info">
              <Award size={24} className="text-accent" />
              <div>
                <h3 style={{ fontSize: 'var(--fs-md)' }}>{user.membershipPlan} Membership</h3>
                <p className="text-muted" style={{ fontSize: 'var(--fs-sm)' }}>
                  Active until {user.membershipExpiry ? new Date(user.membershipExpiry).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : 'N/A'}
                </p>
              </div>
            </div>
            <Link href="/membership" className="btn btn--primary btn--small" id="dash-upgrade">Upgrade Plan</Link>
          </div>
        </ScrollReveal>

        <div className="dashboard-grid">
          {/* VISIT HISTORY */}
          <ScrollReveal delay={200}>
            <div className="dashboard-section card">
              <h3 className="dashboard-section__title">
                <Activity size={20} className="text-accent" /> Recent Visits
              </h3>
              {sessions.length === 0 ? (
                <p className="text-muted" style={{ textAlign: 'center', padding: 'var(--space-2xl)', fontSize: 'var(--fs-sm)' }}>
                  No visits yet. Scan your RFID at the gym entrance to start tracking!
                </p>
              ) : (
                <div className="dashboard-table">
                  <div className="dashboard-table__head">
                    <span>Date</span><span>Time</span><span>Method</span>
                  </div>
                  {sessions.map((s, i) => (
                    <div key={i} className="dashboard-table__row">
                      <span>{s.date}</span>
                      <span>{s.time}</span>
                      <span className="text-accent" style={{ textTransform: 'capitalize' }}>{s.method}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </ScrollReveal>

          {/* RIGHT SIDE */}
          <div className="dashboard-right">
            <ScrollReveal delay={300}>
              <div className="dashboard-section card">
                <h3 className="dashboard-section__title">
                  <Calendar size={20} className="text-accent" /> Quick Info
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                  <div style={{ padding: 'var(--space-md)', background: 'var(--color-bg-tertiary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                    <p style={{ fontWeight: 'var(--fw-semibold)', fontSize: 'var(--fs-sm)' }}>Member since</p>
                    <p className="text-muted" style={{ fontSize: 'var(--fs-xs)' }}>
                      {new Date(user.membershipStart || user.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                  </div>
                  <div style={{ padding: 'var(--space-md)', background: 'var(--color-bg-tertiary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                    <p style={{ fontWeight: 'var(--fw-semibold)', fontSize: 'var(--fs-sm)' }}>Plan</p>
                    <p className="text-accent" style={{ fontSize: 'var(--fs-xs)', fontWeight: 'var(--fw-bold)' }}>{user.membershipPlan}</p>
                  </div>
                  <div style={{ padding: 'var(--space-md)', background: 'var(--color-bg-tertiary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                    <p style={{ fontWeight: 'var(--fw-semibold)', fontSize: 'var(--fs-sm)' }}>Email</p>
                    <p className="text-muted" style={{ fontSize: 'var(--fs-xs)' }}>{user.email}</p>
                  </div>
                </div>
                <Link href="/services" className="btn btn--secondary btn--small btn--full" style={{ marginTop: 'var(--space-md)' }} id="dash-services">
                  View All Programs
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>

      <style>{dashboardStyles}</style>
    </div>
  )
}

const dashboardStyles = `
  .dashboard-page {
    padding: calc(var(--nav-height) + var(--space-2xl)) 0 var(--space-4xl);
    min-height: 100vh;
  }
  .dashboard-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: var(--space-2xl);
    flex-wrap: wrap;
    gap: var(--space-md);
  }
  .dashboard-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-md);
    margin-bottom: var(--space-xl);
  }
  .dashboard-stat {
    padding: var(--space-lg);
    display: flex;
    align-items: center;
    gap: var(--space-md);
  }
  .dashboard-stat__icon {
    width: 48px;
    height: 48px;
    border-radius: var(--radius-md);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .dashboard-stat__value {
    font-family: var(--font-heading);
    font-size: var(--fs-xl);
    font-weight: var(--fw-bold);
  }
  .dashboard-stat__label {
    font-size: var(--fs-xs);
    color: var(--color-text-muted);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  .dashboard-membership {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--space-lg) var(--space-xl);
    margin-bottom: var(--space-xl);
    background: linear-gradient(135deg, rgba(200, 16, 46,0.08) 0%, var(--color-bg-card) 100%);
    border-color: rgba(200, 16, 46,0.2);
    flex-wrap: wrap;
    gap: var(--space-md);
  }
  .dashboard-membership__info {
    display: flex;
    align-items: center;
    gap: var(--space-md);
  }
  .dashboard-grid {
    display: grid;
    grid-template-columns: 1.5fr 1fr;
    gap: var(--space-xl);
  }
  .dashboard-right {
    display: flex;
    flex-direction: column;
    gap: var(--space-xl);
  }
  .dashboard-section {
    padding: var(--space-xl);
  }
  .dashboard-section__title {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    font-size: var(--fs-md);
    margin-bottom: var(--space-lg);
    padding-bottom: var(--space-md);
    border-bottom: 1px solid var(--color-border);
  }
  .dashboard-table__head,
  .dashboard-table__row {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    padding: var(--space-md) 0;
    font-size: var(--fs-sm);
  }
  .dashboard-table__head {
    color: var(--color-text-muted);
    font-weight: var(--fw-semibold);
    text-transform: uppercase;
    font-size: var(--fs-xs);
    letter-spacing: 0.05em;
    border-bottom: 1px solid var(--color-border);
  }
  .dashboard-table__row {
    border-bottom: 1px solid var(--color-border);
    color: var(--color-text-secondary);
  }
  .dashboard-table__row:last-child { border-bottom: none; }

  @media (max-width: 1024px) {
    .dashboard-stats { grid-template-columns: repeat(2, 1fr); }
    .dashboard-grid { grid-template-columns: 1fr; }
  }
  @media (max-width: 640px) {
    .dashboard-page { padding-left: var(--space-sm); padding-right: var(--space-sm); }
    .dashboard-stats { grid-template-columns: 1fr; }
    .dashboard-header h1 { font-size: var(--fs-2xl) !important; }
    .dashboard-stat { padding: var(--space-md); }
    .dashboard-stat__icon { width: 40px; height: 40px; }
    .dashboard-stat__value { font-size: var(--fs-lg); }
    .dashboard-membership { padding: var(--space-md); }
    .dashboard-section { padding: var(--space-md); }
  }
`
