import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
  Inbox,
  Clock,
  CheckCircle2,
  Search,
  Trash2,
  Eye,
  LogOut,
  Mail,
  Phone,
  MessageCircle,
  X,
  ExternalLink,
  RefreshCw
} from 'lucide-react';

export default function AdminDashboard({ token, onLogout }) {
  const { t } = useLanguage();
  const [inquiries, setInquiries] = useState([]);
  const [stats, setStats] = useState({ total: 0, new: 0, read: 0 });
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // 1. Fetch stats
      const statsRes = await fetch('http://localhost:5000/api/stats', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData);
      }

      // 2. Fetch inquiries
      const res = await fetch(`http://localhost:5000/api/inquiries?status=${filter}&q=${encodeURIComponent(search)}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setInquiries(data);
      } else {
        throw new Error('Server returned ' + res.status);
      }
    } catch (err) {
      console.warn('Backend unavailable, reading offline queue:', err);
      // Fallback: Read offline queue from localStorage
      const offlineQueue = JSON.parse(localStorage.getItem('auralicht_offline_inquiries') || '[]');
      let filtered = offlineQueue;
      if (filter !== 'all') {
        filtered = filtered.filter((i) => i.status === filter);
      }
      if (search.trim()) {
        const s = search.toLowerCase();
        filtered = filtered.filter((i) =>
          (i.vorname && i.vorname.toLowerCase().includes(s)) ||
          (i.nachname && i.nachname.toLowerCase().includes(s)) ||
          (i.email && i.email.toLowerCase().includes(s)) ||
          (i.thema && i.thema.toLowerCase().includes(s))
        );
      }
      setInquiries(filtered);
      setStats({
        total: offlineQueue.length,
        new: offlineQueue.filter((i) => i.status === 'new').length,
        read: offlineQueue.filter((i) => i.status === 'read').length
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [filter, search]);

  const handleToggleStatus = async (id, currentStatus) => {
    const nextStatus = currentStatus === 'new' ? 'read' : 'new';
    try {
      const res = await fetch(`http://localhost:5000/api/inquiries/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status: nextStatus })
      });

      if (res.ok) {
        fetchDashboardData();
      }
    } catch (err) {
      // Local fallback
      const queue = JSON.parse(localStorage.getItem('auralicht_offline_inquiries') || '[]');
      const updated = queue.map((i) => i.id === id ? { ...i, status: nextStatus } : i);
      localStorage.setItem('auralicht_offline_inquiries', JSON.stringify(updated));
      fetchDashboardData();
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Möchten Sie diese Anfrage wirklich löschen?')) return;

    try {
      const res = await fetch(`http://localhost:5000/api/inquiries/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        if (selectedInquiry?.id === id) setSelectedInquiry(null);
        fetchDashboardData();
      }
    } catch (err) {
      // Local fallback
      const queue = JSON.parse(localStorage.getItem('auralicht_offline_inquiries') || '[]');
      const updated = queue.filter((i) => i.id !== id);
      localStorage.setItem('auralicht_offline_inquiries', JSON.stringify(updated));
      if (selectedInquiry?.id === id) setSelectedInquiry(null);
      fetchDashboardData();
    }
  };

  return (
    <div className="admin-body">
      {/* Topbar */}
      <header className="admin-topbar">
        <div className="admin-brand">
          <img src="/logo2.webp" alt="Auralicht" className="admin-logo" />
          <div className="admin-title-box">
            <span className="admin-title">Auralicht Admin</span>
            <span className="admin-badge">Anfragen-Verwaltung</span>
          </div>
        </div>

        <div className="admin-topbar-actions">
          <button
            onClick={fetchDashboardData}
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              color: '#FFFFFF',
              padding: '7px 12px',
              borderRadius: '6px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.84rem'
            }}
            title="Aktualisieren"
          >
            <RefreshCw size={15} />
            <span>Aktualisieren</span>
          </button>

          <button
            onClick={onLogout}
            style={{
              background: '#C0392B',
              border: 'none',
              color: '#FFFFFF',
              padding: '7px 14px',
              borderRadius: '6px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.84rem',
              fontWeight: 600
            }}
          >
            <LogOut size={15} />
            <span>{t('admin_logout')}</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="admin-container">
        {/* KPI Metrics */}
        <div className="admin-kpi-grid">
          <div className="kpi-card">
            <div className="kpi-icon-box kpi-all"><Inbox size={26} /></div>
            <div>
              <div className="kpi-val">{stats.total}</div>
              <div className="kpi-label">{t('admin_all')}</div>
            </div>
          </div>

          <div className="kpi-card">
            <div className="kpi-icon-box kpi-new"><Clock size={26} /></div>
            <div>
              <div className="kpi-val">{stats.new}</div>
              <div className="kpi-label">{t('admin_new')}</div>
            </div>
          </div>

          <div className="kpi-card">
            <div className="kpi-icon-box kpi-read"><CheckCircle2 size={26} /></div>
            <div>
              <div className="kpi-val">{stats.read}</div>
              <div className="kpi-label">{t('admin_read')}</div>
            </div>
          </div>
        </div>

        {/* Toolbar: Filters & Search */}
        <div className="admin-toolbar">
          <div className="admin-filter-pills">
            <button
              className={`filter-pill ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              {t('admin_all')} ({stats.total})
            </button>
            <button
              className={`filter-pill ${filter === 'new' ? 'active' : ''}`}
              onClick={() => setFilter('new')}
            >
              {t('admin_new')} ({stats.new})
            </button>
            <button
              className={`filter-pill ${filter === 'read' ? 'active' : ''}`}
              onClick={() => setFilter('read')}
            >
              {t('admin_read')} ({stats.read})
            </button>
          </div>

          <div className="admin-search-box">
            <Search size={18} />
            <input
              type="text"
              className="admin-search-input"
              placeholder={t('admin_search')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Inquiries Table */}
        <div className="admin-table-card">
          <div style={{ overflowX: 'auto' }}>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>{t('admin_table_date')}</th>
                  <th>{t('admin_table_name')}</th>
                  <th>{t('admin_table_contact')}</th>
                  <th>{t('admin_table_topic')}</th>
                  <th>{t('admin_table_status')}</th>
                  <th style={{ textAlign: 'right' }}>{t('admin_table_actions')}</th>
                </tr>
              </thead>
              <tbody>
                {inquiries.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ textAlign: 'center', padding: '40px', color: '#888' }}>
                      {loading ? 'Wird geladen...' : t('admin_empty')}
                    </td>
                  </tr>
                ) : (
                  inquiries.map((row) => (
                    <tr key={row.id}>
                      <td style={{ fontSize: '0.82rem', color: '#777', whiteSpace: 'nowrap' }}>
                        {row.created_at ? new Date(row.created_at).toLocaleDateString('de-AT', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        }) : '-'}
                      </td>
                      <td style={{ fontWeight: 600, color: 'var(--primary-deep)' }}>
                        {row.vorname} {row.nachname}
                      </td>
                      <td>
                        <div style={{ fontSize: '0.88rem' }}>
                          <a href={`mailto:${row.email}`} style={{ color: 'var(--primary)', textDecoration: 'none' }}>
                            {row.email}
                          </a>
                        </div>
                        {row.telefon && (
                          <div style={{ fontSize: '0.8rem', color: '#777', marginTop: '2px' }}>
                            {row.telefon}
                          </div>
                        )}
                      </td>
                      <td>
                        <span style={{ fontSize: '0.82rem', background: '#F0ECE4', padding: '3px 8px', borderRadius: '4px' }}>
                          {row.thema || 'Allgemein'}
                        </span>
                      </td>
                      <td>
                        <span className={`status-tag ${row.status === 'new' ? 'new' : 'read'}`}>
                          {row.status === 'new' ? t('admin_new') : t('admin_read')}
                        </span>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <div className="action-btn-group" style={{ justifyContent: 'flex-end' }}>
                          <button
                            className="action-btn btn-view-action"
                            onClick={() => setSelectedInquiry(row)}
                            title={t('admin_view')}
                          >
                            <Eye size={14} />
                          </button>
                          <button
                            className="action-btn btn-status-action"
                            onClick={() => handleToggleStatus(row.id, row.status)}
                            title={row.status === 'new' ? t('admin_mark_read') : t('admin_mark_new')}
                          >
                            <CheckCircle2 size={14} />
                          </button>
                          <button
                            className="action-btn btn-delete-action"
                            onClick={() => handleDelete(row.id)}
                            title={t('admin_delete')}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Inquiry Detail Modal */}
      {selectedInquiry && (
        <div className="modal-overlay" onClick={() => setSelectedInquiry(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSelectedInquiry(null)}>
              <X size={22} />
            </button>

            <div style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: '16px', marginBottom: '20px' }}>
              <span className={`status-tag ${selectedInquiry.status === 'new' ? 'new' : 'read'}`}>
                {selectedInquiry.status === 'new' ? t('admin_new') : t('admin_read')}
              </span>
              <h2 style={{ fontSize: '1.45rem', color: 'var(--primary-deep)', marginTop: '8px' }}>
                {selectedInquiry.vorname} {selectedInquiry.nachname}
              </h2>
              <div style={{ fontSize: '0.84rem', color: '#888', marginTop: '4px' }}>
                Eingegangen am: {new Date(selectedInquiry.created_at).toLocaleString('de-AT')}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
              <div>
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#777', textTransform: 'uppercase' }}>Thema</span>
                <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--primary-deep)', marginTop: '2px' }}>
                  {selectedInquiry.thema || 'Kein Thema angegeben'}
                </div>
              </div>

              <div>
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#777', textTransform: 'uppercase' }}>Kontakt</span>
                <div style={{ display: 'flex', gap: '16px', marginTop: '4px', flexWrap: 'wrap' }}>
                  <a
                    href={`mailto:${selectedInquiry.email}?subject=Ihre%20Anfrage%20bei%20Auralicht`}
                    className="btn btn-secondary"
                    style={{ padding: '6px 12px', fontSize: '0.85rem' }}
                  >
                    <Mail size={15} />
                    <span>{selectedInquiry.email}</span>
                  </a>
                  {selectedInquiry.telefon && (
                    <a
                      href={`tel:${selectedInquiry.telefon}`}
                      className="btn btn-secondary"
                      style={{ padding: '6px 12px', fontSize: '0.85rem' }}
                    >
                      <Phone size={15} />
                      <span>{selectedInquiry.telefon}</span>
                    </a>
                  )}
                  {selectedInquiry.telefon && (
                    <a
                      href={`https://wa.me/${selectedInquiry.telefon.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary"
                      style={{ padding: '6px 12px', fontSize: '0.85rem' }}
                    >
                      <MessageCircle size={15} />
                      <span>WhatsApp</span>
                    </a>
                  )}
                </div>
              </div>

              <div>
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#777', textTransform: 'uppercase' }}>Nachricht</span>
                <div
                  style={{
                    marginTop: '6px',
                    padding: '16px',
                    borderRadius: 'var(--radius-sm)',
                    background: '#FDFBF7',
                    border: '1px solid var(--border-light)',
                    fontSize: '0.96rem',
                    lineHeight: 1.7,
                    whiteSpace: 'pre-wrap'
                  }}
                >
                  {selectedInquiry.nachricht}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-light)', paddingTop: '18px' }}>
              <button
                className="action-btn btn-delete-action"
                onClick={() => handleDelete(selectedInquiry.id)}
                style={{ padding: '8px 16px' }}
              >
                <Trash2 size={16} />
                <span>{t('admin_delete')}</span>
              </button>

              <button
                className="btn btn-primary"
                onClick={() => {
                  handleToggleStatus(selectedInquiry.id, selectedInquiry.status);
                  setSelectedInquiry(null);
                }}
              >
                <span>{selectedInquiry.status === 'new' ? t('admin_mark_read') : t('admin_mark_new')}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
