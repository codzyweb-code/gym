"use client";

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import { Users, LogIn, LogOut, Award, Shield, RefreshCw, Trash2 } from 'lucide-react'
import ScrollReveal from '../../components/ScrollReveal'

export default function Admin() {
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [planForm, setPlanForm] = useState({ userId: '', plan: 'Starter', months: 1 })
  const [deleteModal, setDeleteModal] = useState({ open: false, userId: '', name: '', password: '', error: '' })
  const navigate = useRouter()

  const token = (typeof window !== "undefined" ? localStorage : {getItem:()=>null, setItem:()=>{}, removeItem:()=>{}}).getItem('s4fitness_token')

  const fetchMembers = async () => {
    try {
      const res = await fetch('/api/admin/members', { headers: { Authorization: `Bearer ${token}` } })
      if (res.status === 403 || res.status === 401) { navigate.push('/login'); return }
      const data = await res.json()
      setMembers(data.members || [])
    } catch (err) {
      setMessage('Cannot connect to server.')
    }
    setLoading(false)
  }

  useEffect(() => {
    if (!token) { navigate.push('/login'); return }
    fetchMembers()
  }, [])

  const showMsg = (msg) => { setMessage(msg); setTimeout(() => setMessage(''), 4000) }

  const handleCheckin = async (userId) => {
    try {
      const res = await fetch('/api/admin/checkin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ userId, method: 'rfid' }),
      })
      const data = await res.json()
      showMsg(data.message || data.error)
      fetchMembers()
    } catch (err) { showMsg('Error') }
  }

  const openDeleteModal = (userId, name) => {
    setDeleteModal({ open: true, userId, name, password: '', error: '' })
  }

  const closeDeleteModal = () => {
    setDeleteModal({ open: false, userId: '', name: '', password: '', error: '' })
  }

  const confirmDelete = async () => {
    if (!deleteModal.password) {
      setDeleteModal(d => ({ ...d, error: 'Please enter your password.' }))
      return
    }
    try {
      const res = await fetch('/api/admin/delete-member', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ userId: deleteModal.userId, adminPassword: deleteModal.password }),
      })
      const data = await res.json()
      if (!res.ok) {
        setDeleteModal(d => ({ ...d, error: data.error || 'Failed to delete.' }))
        return
      }
      showMsg(data.message)
      closeDeleteModal()
      fetchMembers()
    } catch (err) {
      setDeleteModal(d => ({ ...d, error: 'Server error.' }))
    }
  }

  const handleGrantMembership = async (e) => {
    e.preventDefault()
    if (!planForm.userId) return
    try {
      const res = await fetch('/api/admin/membership', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ userId: planForm.userId, plan: planForm.plan, durationMonths: parseInt(planForm.months) }),
      })
      const data = await res.json()
      showMsg(data.message || data.error)
      fetchMembers()
    } catch (err) { showMsg('Error') }
  }

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

  return (
    <div className="page-enter" style={{ paddingTop: 'calc(var(--nav-height) + var(--space-2xl))', minHeight: '100vh', paddingBottom: 'var(--space-4xl)' }}>
      <div className="container">
        {/* HEADER */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-2xl)', flexWrap: 'wrap', gap: 'var(--space-md)' }}>
          <div>
            <h1 style={{ fontSize: 'var(--fs-3xl)' }}><Shield size={32} className="text-accent" /> Admin <span className="text-accent">Panel</span></h1>
            <p className="text-muted">Manage members, grant memberships, log entries</p>
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
            <button className="btn btn--secondary btn--small" onClick={fetchMembers}><RefreshCw size={16} /> Refresh</button>
            <button className="btn btn--secondary btn--small" onClick={handleLogout}><LogOut size={16} /> Logout</button>
          </div>
        </div>

        {/* MESSAGE TOAST */}
        {message && (
          <div style={{
            background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.3)',
            borderRadius: 'var(--radius-md)', padding: 'var(--space-md)', marginBottom: 'var(--space-xl)',
            color: '#C9A84C', fontSize: 'var(--fs-sm)', textAlign: 'center',
          }}>
            {message}
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: 'var(--space-xl)' }}>
          {/* MEMBERS TABLE */}
          <ScrollReveal>
            <div className="card" style={{ padding: 'var(--space-xl)', overflow: 'auto' }}>
              <h3 style={{ fontSize: 'var(--fs-md)', display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', marginBottom: 'var(--space-lg)', paddingBottom: 'var(--space-md)', borderBottom: '1px solid var(--color-border)' }}>
                <Users size={20} className="text-accent" /> Members ({members.length})
              </h3>

              {members.length === 0 ? (
                <p className="text-muted" style={{ textAlign: 'center', padding: 'var(--space-2xl)' }}>No members registered yet.</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                  {members.map(m => (
                    <div key={m._id} style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: 'var(--space-md)', background: 'var(--color-bg-tertiary)',
                      borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)',
                      flexWrap: 'wrap', gap: 'var(--space-sm)',
                    }}>
                      <div style={{ flex: 1, minWidth: 180 }}>
                        <p style={{ fontWeight: 'var(--fw-semibold)', fontSize: 'var(--fs-sm)' }}>
                          {m.name}
                        </p>
                        <p className="text-muted" style={{ fontSize: 'var(--fs-xs)' }}>{m.email}</p>
                        <p style={{ fontSize: 'var(--fs-xs)', marginTop: 2 }}>
                          {m.hasMembership
                            ? <span style={{ color: '#C9A84C' }}>✓ {m.membershipPlan}</span>
                            : <span style={{ color: '#f87171' }}>✗ No membership</span>
                          }
                        </p>
                      </div>
                      <div style={{ display: 'flex', gap: 'var(--space-xs)', alignItems: 'center' }}>
                        {m.hasMembership && (
                          <button className="btn btn--primary btn--small" onClick={() => handleCheckin(m._id)} style={{ fontSize: 'var(--fs-xs)', padding: '0.4rem 0.8rem' }}>
                            <LogIn size={14} /> Log Entry
                          </button>
                        )}
                        <button
                          onClick={() => openDeleteModal(m._id, m.name)}
                          title="Remove member"
                          style={{
                            background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.2)',
                            borderRadius: 'var(--radius-sm)', padding: '0.4rem 0.6rem',
                            color: '#f87171', cursor: 'pointer', display: 'flex', alignItems: 'center',
                            transition: 'all 0.2s',
                          }}
                          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(248,113,113,0.25)' }}
                          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(248,113,113,0.1)' }}
                        >
                          <Trash2 size={14} style={{ pointerEvents: 'none' }} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </ScrollReveal>

          {/* GRANT MEMBERSHIP */}
          <ScrollReveal delay={100}>
            <div className="card" style={{ padding: 'var(--space-xl)' }}>
              <h3 style={{ fontSize: 'var(--fs-md)', display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', marginBottom: 'var(--space-lg)', paddingBottom: 'var(--space-md)', borderBottom: '1px solid var(--color-border)' }}>
                <Award size={20} className="text-accent" /> Grant Membership
              </h3>
              <form onSubmit={handleGrantMembership} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                <div>
                  <label style={{ display: 'block', fontSize: 'var(--fs-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>Select Member</label>
                  <select value={planForm.userId} onChange={(e) => setPlanForm(p => ({ ...p, userId: e.target.value }))} required>
                    <option value="">Choose member...</option>
                    {members.filter(m => !m.hasMembership).map(m => (
                      <option key={m._id} value={m._id}>{m.name} ({m.email})</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 'var(--fs-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>Plan</label>
                  <select value={planForm.plan} onChange={(e) => setPlanForm(p => ({ ...p, plan: e.target.value }))}>
                    <option value="Starter">Starter (₹1,499/mo)</option>
                    <option value="Pro">Pro (₹2,999/mo)</option>
                    <option value="Elite">Elite (₹4,999/mo)</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 'var(--fs-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>Duration (months)</label>
                  <input type="number" min="1" max="12" value={planForm.months} onChange={(e) => setPlanForm(p => ({ ...p, months: e.target.value }))} />
                </div>
                <button type="submit" className="btn btn--primary btn--full">Grant Membership</button>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* DELETE MODAL */}
      {deleteModal.open && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 9999,
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'var(--space-md)',
        }} onClick={closeDeleteModal}>
          <div onClick={e => e.stopPropagation()} style={{
            background: 'var(--color-bg-card)', border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-lg)', padding: 'var(--space-2xl)',
            maxWidth: 420, width: '100%',
          }}>
            <h3 style={{ fontSize: 'var(--fs-lg)', marginBottom: 'var(--space-sm)' }}>
              <Trash2 size={20} style={{ color: '#f87171', marginRight: 8, verticalAlign: 'middle' }} />
              Remove Member
            </h3>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--fs-sm)', marginBottom: 'var(--space-lg)' }}>
              Are you sure you want to remove <strong style={{ color: '#fff' }}>{deleteModal.name}</strong>? This will delete their account and all access logs. This action cannot be undone.
            </p>

            {deleteModal.error && (
              <div style={{
                background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.3)',
                borderRadius: 'var(--radius-md)', padding: 'var(--space-sm) var(--space-md)',
                color: '#f87171', fontSize: 'var(--fs-xs)', marginBottom: 'var(--space-md)', textAlign: 'center',
              }}>
                {deleteModal.error}
              </div>
            )}

            <div style={{ marginBottom: 'var(--space-lg)' }}>
              <label style={{ display: 'block', fontSize: 'var(--fs-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>
                Enter your admin password to confirm
              </label>
              <input
                type="password"
                value={deleteModal.password}
                onChange={e => setDeleteModal(d => ({ ...d, password: e.target.value, error: '' }))}
                placeholder="Admin password"
                autoFocus
                onKeyDown={e => e.key === 'Enter' && confirmDelete()}
              />
            </div>

            <div style={{ display: 'flex', gap: 'var(--space-sm)', justifyContent: 'flex-end' }}>
              <button className="btn btn--secondary btn--small" onClick={closeDeleteModal}>Cancel</button>
              <button
                onClick={confirmDelete}
                style={{
                  background: '#f87171', color: '#fff', border: 'none', borderRadius: 'var(--radius-md)',
                  padding: '0.6rem 1.2rem', cursor: 'pointer', fontWeight: 'var(--fw-semibold)',
                  fontSize: 'var(--fs-sm)', display: 'flex', alignItems: 'center', gap: 'var(--space-xs)',
                }}
              >
                <Trash2 size={14} /> Remove
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 1024px) {
          .container > div:last-of-type {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 640px) {
          .page-enter { padding-left: var(--space-sm) !important; padding-right: var(--space-sm) !important; }
          .page-enter h1 { font-size: var(--fs-2xl) !important; }
          .page-enter .card { padding: var(--space-md) !important; }
        }
      `}</style>
    </div>
  )
}
