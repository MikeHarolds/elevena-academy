import { useState, useEffect } from 'react';
import {
  Sparkles, Users, DollarSign, Clock, Ticket, Search,
  Eye, Trash2, LogOut, LayoutDashboard,
  UserPlus, BarChart3, Download, X, CheckCircle,
  AlertCircle, Filter, TrendingUp, Calendar,
  Menu as MenuIcon, Phone, Mail,
  User, Shield, Baby as ChildIcon, BookOpen, Settings
} from 'lucide-react';
import type { Registration } from './LandingPage';
import CourseManager from './CourseManager';
import PlanManager from './PlanManager';
import SettingsManager from './SettingsManager';
import { seedDefaultCourses } from '../utils/courses';

type Tab = 'overview' | 'registrations' | 'courses' | 'plans' | 'settings' | 'analytics';

// ==================== HELPER FUNCTIONS ====================
function getRegistrations(): Registration[] {
  return JSON.parse(localStorage.getItem('clap_registrations') || '[]');
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
  });
}

function getTicketLabel(type: string) {
  const map: Record<string, string> = {
    early: 'Early Bird – £60',
    standard: 'Standard – £75',
    sibling: 'Sibling – £60',
    family: 'Family Bundle – £150',
  };
  return map[type] || type;
}

function getCourseLabel(type: string) {
  const map: Record<string, string> = {
    webdev: 'Web Development for Kids',
    canva: 'Canva Design for Kids',
    french: 'French Language for Kids',
    ai: 'AI & Machine Learning',
    scratch: 'Scratch Coding & Games',
    python: 'Python Programming',
    digitalart: 'Digital Art & Illustration',
    maths: 'Maths & Problem Solving',
  };
  return map[type] || type || 'Not selected';
}

function getCourseColor(type: string) {
  const map: Record<string, string> = {
    webdev: 'bg-violet-500/20 text-violet-300',
    canva: 'bg-pink-500/20 text-pink-300',
    french: 'bg-blue-500/20 text-blue-300',
    ai: 'bg-emerald-500/20 text-emerald-300',
    scratch: 'bg-amber-500/20 text-amber-300',
    python: 'bg-green-500/20 text-green-300',
    digitalart: 'bg-fuchsia-500/20 text-fuchsia-300',
    maths: 'bg-cyan-500/20 text-cyan-300',
  };
  return map[type] || 'bg-gray-500/20 text-gray-400';
}

function getTicketPrice(type: string) {
  const map: Record<string, number> = { early: 60, standard: 75, sibling: 60, family: 150 };
  return map[type] || 0;
}

function getTicketColor(type: string) {
  const map: Record<string, string> = {
    early: 'bg-amber-100 text-amber-700',
    standard: 'bg-violet-100 text-violet-700',
    sibling: 'bg-emerald-100 text-emerald-700',
    family: 'bg-pink-100 text-pink-700',
  };
  return map[type] || 'bg-gray-100 text-gray-700';
}

function getStatusColor(status: string) {
  const map: Record<string, string> = {
    pending: 'bg-amber-100 text-amber-700',
    paid: 'bg-green-100 text-green-700',
    confirmed: 'bg-blue-100 text-blue-700',
  };
  return map[status] || 'bg-gray-100 text-gray-700';
}

// ==================== STAT CARD ====================
function StatCard({ icon, label, value, sub, color }: {
  icon: React.ReactNode; label: string; value: string | number; sub?: string; color: string;
}) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 card-hover">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-semibold text-gray-400 mb-1">{label}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
        </div>
        <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

// ==================== OVERVIEW TAB ====================
function OverviewTab({ registrations, onDelete, onView }: {
  registrations: Registration[]; onDelete: (id: string) => void; onView: (reg: Registration) => void;
}) {
  const totalRevenue = registrations.reduce((sum, r) => sum + getTicketPrice(r.ticketType) * (parseInt(r.numChildren) || 1), 0);
  const paidCount = registrations.filter(r => r.status === 'paid').length;
  const recentRegs = [...registrations].sort((a, b) => new Date(b.registeredAt).getTime() - new Date(a.registeredAt).getTime()).slice(0, 5);

  // Age distribution
  const ageGroups: Record<string, number> = {};
  registrations.forEach(r => {
    if (r.childAge) {
      const age = parseInt(r.childAge);
      let group = '5-7';
      if (age >= 8 && age <= 11) group = '8-11';
      else if (age >= 12) group = '12-16';
      ageGroups[group] = (ageGroups[group] || 0) + 1;
    }
  });

  // Ticket distribution
  const ticketCounts: Record<string, number> = {};
  registrations.forEach(r => {
    ticketCounts[r.ticketType] = (ticketCounts[r.ticketType] || 0) + 1;
  });

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={<Users className="w-6 h-6 text-violet-600" />} label="Total Registrations" value={registrations.length} sub="All time" color="bg-violet-100" />
        <StatCard icon={<DollarSign className="w-6 h-6 text-green-600" />} label="Total Revenue" value={`£${totalRevenue.toLocaleString()}`} sub={`${paidCount} paid`} color="bg-green-100" />
        <StatCard icon={<Clock className="w-6 h-6 text-amber-600" />} label="Pending" value={registrations.filter(r => r.status === 'pending').length} sub="Awaiting payment" color="bg-amber-100" />
        <StatCard icon={<CheckCircle className="w-6 h-6 text-blue-600" />} label="Confirmed" value={registrations.filter(r => r.status === 'confirmed').length} sub="Ready for camp" color="bg-blue-100" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Ticket Breakdown */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Ticket className="w-5 h-5 text-violet-500" /> Ticket Breakdown
          </h3>
          <div className="space-y-3">
            {['early', 'standard', 'sibling', 'family'].map(type => {
              const count = ticketCounts[type] || 0;
              const total = registrations.length || 1;
              const pct = Math.round((count / total) * 100);
              const colors: Record<string, string> = {
                early: 'bg-amber-500', standard: 'bg-violet-500', sibling: 'bg-emerald-500', family: 'bg-pink-500'
              };
              return (
                <div key={type}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-600 capitalize">{type === 'early' ? 'Early Bird' : type === 'standard' ? 'Standard' : type === 'sibling' ? 'Sibling' : 'Family'}</span>
                    <span className="font-bold text-gray-800">{count} ({pct}%)</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5">
                    <div className={`${colors[type]} h-2.5 rounded-full transition-all`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Age Distribution */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <ChildIcon className="w-5 h-5 text-blue-500" /> Age Groups
          </h3>
          <div className="space-y-4">
            {[
              { label: 'Ages 5-7', emoji: '🧒', key: '5-7', color: 'from-pink-400 to-rose-400' },
              { label: 'Ages 8-11', emoji: '👦', key: '8-11', color: 'from-blue-400 to-cyan-400' },
              { label: 'Ages 12-16', emoji: '🧑‍💻', key: '12-16', color: 'from-violet-400 to-purple-400' },
            ].map(group => {
              const count = ageGroups[group.key] || 0;
              return (
                <div key={group.key} className="flex items-center gap-4">
                  <span className="text-2xl">{group.emoji}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-600">{group.label}</span>
                      <span className="font-bold text-gray-800">{count}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div className={`bg-gradient-to-r ${group.color} h-2 rounded-full`} style={{ width: `${Math.max(registrations.length ? (count / registrations.length) * 100 : 0, 2)}%` }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-500" /> Quick Stats
          </h3>
          <div className="space-y-4">
            <div className="bg-violet-50 rounded-xl p-4">
              <p className="text-sm text-gray-500">Average Age</p>
              <p className="text-2xl font-bold text-gray-800">
                {registrations.length ? (registrations.reduce((s, r) => s + (parseInt(r.childAge) || 0), 0) / registrations.length).toFixed(1) : '0'} years
              </p>
            </div>
            <div className="bg-green-50 rounded-xl p-4">
              <p className="text-sm text-gray-500">Conversion Rate</p>
              <p className="text-2xl font-bold text-gray-800">
                {registrations.length ? Math.round((paidCount / registrations.length) * 100) : 0}%
              </p>
            </div>
            <div className="bg-amber-50 rounded-xl p-4">
              <p className="text-sm text-gray-500">Multi-Child Families</p>
              <p className="text-2xl font-bold text-gray-800">
                {registrations.filter(r => parseInt(r.numChildren) > 1).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Registrations */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-violet-500" /> Recent Registrations
        </h3>
        {recentRegs.length === 0 ? (
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-400 font-semibold">No registrations yet</p>
            <p className="text-gray-300 text-sm">Registrations from the website will appear here</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-3 px-3 text-xs font-bold text-gray-400 uppercase">ID</th>
                  <th className="text-left py-3 px-3 text-xs font-bold text-gray-400 uppercase">Child</th>
                  <th className="text-left py-3 px-3 text-xs font-bold text-gray-400 uppercase">Parent</th>
                  <th className="text-left py-3 px-3 text-xs font-bold text-gray-400 uppercase">Course</th>
                  <th className="text-left py-3 px-3 text-xs font-bold text-gray-400 uppercase">Ticket</th>
                  <th className="text-left py-3 px-3 text-xs font-bold text-gray-400 uppercase">Status</th>
                  <th className="text-left py-3 px-3 text-xs font-bold text-gray-400 uppercase">Date</th>
                  <th className="text-right py-3 px-3 text-xs font-bold text-gray-400 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentRegs.map(reg => (
                  <tr key={reg.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="py-3 px-3 text-xs font-mono text-gray-400">{reg.id.split('-').slice(0, 2).join('-')}</td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-violet-100 rounded-full flex items-center justify-center text-sm">🧒</div>
                        <div>
                          <p className="font-semibold text-gray-800 text-sm">{reg.childName}</p>
                          <p className="text-xs text-gray-400">Age {reg.childAge}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <p className="text-sm text-gray-700">{reg.parentName}</p>
                      <p className="text-xs text-gray-400">{reg.parentEmail}</p>
                    </td>
                    <td className="py-3 px-3">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold ${getCourseColor(reg.course)}`}>
                        {getCourseLabel(reg.course)}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold ${getTicketColor(reg.ticketType)}`}>
                        {getTicketLabel(reg.ticketType).split('–')[0].trim()}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold capitalize ${getStatusColor(reg.status)}`}>
                        {reg.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-xs text-gray-400">{formatDate(reg.registeredAt)}</td>
                    <td className="py-3 px-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => onView(reg)} className="p-1.5 hover:bg-violet-50 rounded-lg transition-colors text-gray-400 hover:text-violet-600" title="View">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button onClick={() => onDelete(reg.id)} className="p-1.5 hover:bg-red-50 rounded-lg transition-colors text-gray-400 hover:text-red-600" title="Delete">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

// ==================== REGISTRATIONS TAB ====================
function RegistrationsTab({ registrations, onDelete, onView, onUpdateStatus }: {
  registrations: Registration[]; onDelete: (id: string) => void; onView: (reg: Registration) => void;
  onUpdateStatus: (id: string, status: 'pending' | 'paid' | 'confirmed') => void;
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTicket, setFilterTicket] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = registrations.filter(r => {
    const matchSearch = !searchTerm ||
      r.childName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.parentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.parentEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchTicket = filterTicket === 'all' || r.ticketType === filterTicket;
    const matchStatus = filterStatus === 'all' || r.status === filterStatus;
    return matchSearch && matchTicket && matchStatus;
  });

  const exportCSV = () => {
    const headers = ['ID', 'Child Name', 'Child Age', 'Parent Name', 'Parent Email', 'Parent Phone', 'Ticket Type', 'Num Children', 'Status', 'Registered At'];
    const rows = filtered.map(r => [r.id, r.childName, r.childAge, r.parentName, r.parentEmail, r.parentPhone, getTicketLabel(r.ticketType), r.numChildren, r.status, r.registeredAt]);
    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `clap-academy-registrations-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all text-sm"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all ${showFilters ? 'bg-violet-50 border-violet-200 text-violet-600' : 'border-gray-200 text-gray-500 hover:bg-gray-50'}`}
          >
            <Filter className="w-4 h-4" /> Filters
            {(filterTicket !== 'all' || filterStatus !== 'all') && (
              <span className="w-5 h-5 bg-violet-500 text-white rounded-full text-xs flex items-center justify-center">
                {(filterTicket !== 'all' ? 1 : 0) + (filterStatus !== 'all' ? 1 : 0)}
              </span>
            )}
          </button>
          <button
            onClick={exportCSV}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 text-sm font-semibold transition-all"
          >
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>
        {showFilters && (
          <div className="flex flex-col sm:flex-row gap-3 mt-3 pt-3 border-t border-gray-100">
            <select
              value={filterTicket}
              onChange={(e) => setFilterTicket(e.target.value)}
              className="px-3 py-2 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-violet-500 outline-none"
            >
              <option value="all">All Tickets</option>
              <option value="early">Early Bird</option>
              <option value="standard">Standard</option>
              <option value="sibling">Sibling</option>
              <option value="family">Family Bundle</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-violet-500 outline-none"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
              <option value="confirmed">Confirmed</option>
            </select>
            <button
              onClick={() => { setFilterTicket('all'); setFilterStatus('all'); }}
              className="text-sm text-violet-600 font-semibold hover:text-violet-700"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-400">
          Showing <span className="font-bold text-gray-600">{filtered.length}</span> of {registrations.length} registrations
        </p>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <Users className="w-16 h-16 text-gray-200 mx-auto mb-4" />
            <p className="text-gray-400 font-semibold text-lg">No registrations found</p>
            <p className="text-gray-300 text-sm mt-1">
              {searchTerm || filterTicket !== 'all' || filterStatus !== 'all'
                ? 'Try adjusting your search or filters'
                : 'Registrations from the website will appear here'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50/80">
                  <th className="text-left py-3 px-4 text-xs font-bold text-gray-400 uppercase">ID</th>
                  <th className="text-left py-3 px-4 text-xs font-bold text-gray-400 uppercase">Child</th>
                  <th className="text-left py-3 px-4 text-xs font-bold text-gray-400 uppercase">Parent</th>
                  <th className="text-left py-3 px-4 text-xs font-bold text-gray-400 uppercase">Course</th>
                  <th className="text-left py-3 px-4 text-xs font-bold text-gray-400 uppercase">Ticket</th>
                  <th className="text-left py-3 px-4 text-xs font-bold text-gray-400 uppercase">Children</th>
                  <th className="text-left py-3 px-4 text-xs font-bold text-gray-400 uppercase">Status</th>
                  <th className="text-left py-3 px-4 text-xs font-bold text-gray-400 uppercase">Registered</th>
                  <th className="text-right py-3 px-4 text-xs font-bold text-gray-400 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(reg => (
                  <tr key={reg.id} className="border-b border-gray-50 hover:bg-violet-50/30 transition-colors">
                    <td className="py-3 px-4 text-xs font-mono text-gray-400">{reg.id.split('-').slice(0, 2).join('-')}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-9 h-9 bg-gradient-to-br from-violet-100 to-blue-100 rounded-full flex items-center justify-center text-sm font-bold text-violet-600">
                          {reg.childName.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800 text-sm">{reg.childName}</p>
                          <p className="text-xs text-gray-400">Age {reg.childAge}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <p className="text-sm text-gray-700 font-medium">{reg.parentName}</p>
                      <p className="text-xs text-gray-400">{reg.parentEmail}</p>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold ${getCourseColor(reg.course)}`}>
                        {getCourseLabel(reg.course)}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold ${getTicketColor(reg.ticketType)}`}>
                        {getTicketLabel(reg.ticketType).split('–')[0].trim()}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600 text-center">{reg.numChildren}</td>
                    <td className="py-3 px-4">
                      <select
                        value={reg.status}
                        onChange={(e) => onUpdateStatus(reg.id, e.target.value as 'pending' | 'paid' | 'confirmed')}
                        className={`text-xs font-bold rounded-full px-2.5 py-1 border-0 cursor-pointer ${getStatusColor(reg.status)}`}
                      >
                        <option value="pending">Pending</option>
                        <option value="paid">Paid</option>
                        <option value="confirmed">Confirmed</option>
                      </select>
                    </td>
                    <td className="py-3 px-4 text-xs text-gray-400 whitespace-nowrap">{formatDate(reg.registeredAt)}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => onView(reg)} className="p-1.5 hover:bg-violet-100 rounded-lg transition-colors text-gray-400 hover:text-violet-600" title="View Details">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button onClick={() => onDelete(reg.id)} className="p-1.5 hover:bg-red-50 rounded-lg transition-colors text-gray-400 hover:text-red-600" title="Delete">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

// ==================== ANALYTICS TAB ====================
function AnalyticsTab({ registrations }: { registrations: Registration[] }) {
  const totalRevenue = registrations.reduce((sum, r) => sum + getTicketPrice(r.ticketType) * (parseInt(r.numChildren) || 1), 0);
  const ticketCounts: Record<string, number> = {};
  const ticketRevenue: Record<string, number> = {};
  registrations.forEach(r => {
    ticketCounts[r.ticketType] = (ticketCounts[r.ticketType] || 0) + 1;
    ticketRevenue[r.ticketType] = (ticketRevenue[r.ticketType] || 0) + getTicketPrice(r.ticketType) * (parseInt(r.numChildren) || 1);
  });

  const maxRevenue = Math.max(...Object.values(ticketRevenue), 1);

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Revenue by Ticket Type */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-green-500" /> Revenue by Ticket Type
          </h3>
          <div className="space-y-4">
            {['early', 'standard', 'sibling', 'family'].map(type => {
              const rev = ticketRevenue[type] || 0;
              const count = ticketCounts[type] || 0;
              const pct = Math.round((rev / maxRevenue) * 100);
              const colors: Record<string, string> = {
                early: 'from-amber-400 to-amber-500',
                standard: 'from-violet-400 to-violet-500',
                sibling: 'from-emerald-400 to-emerald-500',
                family: 'from-pink-400 to-pink-500'
              };
              const labels: Record<string, string> = {
                early: 'Early Bird',
                standard: 'Standard',
                sibling: 'Sibling',
                family: 'Family Bundle'
              };
              return (
                <div key={type}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-700">{labels[type]}</span>
                    <div className="text-right">
                      <span className="text-sm font-bold text-gray-800">£{rev.toLocaleString()}</span>
                      <span className="text-xs text-gray-400 ml-2">({count} tickets)</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-4">
                    <div className={`bg-gradient-to-r ${colors[type]} h-4 rounded-full flex items-center justify-end pr-2 transition-all`} style={{ width: `${Math.max(pct, 5)}%` }}>
                      {pct > 15 && <span className="text-[10px] font-bold text-white">{pct}%</span>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-6 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <span className="font-bold text-gray-700">Total Revenue</span>
              <span className="text-2xl font-bold text-gray-900">£{totalRevenue.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Registration Status Breakdown */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-violet-500" /> Registration Status
          </h3>
          <div className="space-y-6">
            {(['pending', 'paid', 'confirmed'] as const).map(status => {
              const count = registrations.filter(r => r.status === status).length;
              const pct = registrations.length ? Math.round((count / registrations.length) * 100) : 0;
              const colors: Record<string, string> = { pending: 'text-amber-500', paid: 'text-green-500', confirmed: 'text-blue-500' };
              const bgColors: Record<string, string> = { pending: 'bg-amber-500', paid: 'bg-green-500', confirmed: 'bg-blue-500' };
              const icons: Record<string, React.ReactNode> = {
                pending: <Clock className="w-8 h-8" />,
                paid: <DollarSign className="w-8 h-8" />,
                confirmed: <CheckCircle className="w-8 h-8" />
              };
              return (
                <div key={status} className="flex items-center gap-4">
                  <div className={`${colors[status]} opacity-20`}>{icons[status]}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-gray-700 capitalize">{status}</span>
                      <span className="font-bold text-gray-800">{count} ({pct}%)</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-3">
                      <div className={`${bgColors[status]} h-3 rounded-full transition-all`} style={{ width: `${Math.max(pct, 2)}%` }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Registrations', value: registrations.length, icon: <Users className="w-6 h-6 text-violet-500" />, bg: 'bg-violet-50' },
          { label: 'Total Revenue', value: `£${totalRevenue.toLocaleString()}`, icon: <DollarSign className="w-6 h-6 text-green-500" />, bg: 'bg-green-50' },
          { label: 'Avg Ticket Value', value: `£${registrations.length ? Math.round(totalRevenue / registrations.length) : 0}`, icon: <TrendingUp className="w-6 h-6 text-blue-500" />, bg: 'bg-blue-50' },
          { label: 'Total Children', value: registrations.reduce((s, r) => s + (parseInt(r.numChildren) || 1), 0), icon: <ChildIcon className="w-6 h-6 text-amber-500" />, bg: 'bg-amber-50' },
        ].map((stat, i) => (
          <div key={i} className={`${stat.bg} rounded-2xl p-5`}>
            <div className="flex items-center justify-between mb-2">
              {stat.icon}
            </div>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-xs text-gray-500 font-semibold">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==================== VIEW MODAL ====================
function ViewModal({ registration, onClose }: { registration: Registration; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white rounded-t-3xl border-b border-gray-100 p-6 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-900">Registration Details</h3>
            <p className="text-xs text-gray-400 font-mono">{registration.id}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>
        <div className="p-6 space-y-6">
          {/* Status */}
          <div className="flex items-center gap-3">
            <span className={`inline-block px-3 py-1.5 rounded-full text-sm font-bold capitalize ${getStatusColor(registration.status)}`}>
              {registration.status}
            </span>
            <span className={`inline-block px-3 py-1.5 rounded-full text-sm font-bold ${getTicketColor(registration.ticketType)}`}>
              {getTicketLabel(registration.ticketType)}
            </span>
          </div>

          {/* Child Info */}
          <div className="bg-violet-50 rounded-2xl p-5">
            <h4 className="text-sm font-bold text-violet-700 mb-3 flex items-center gap-2">
              <ChildIcon className="w-4 h-4" /> Child Information
            </h4>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-violet-200 to-blue-200 rounded-full flex items-center justify-center text-2xl font-bold text-violet-600">
                {registration.childName.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-lg font-bold text-gray-800">{registration.childName}</p>
                <p className="text-sm text-gray-500">Age {registration.childAge}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white rounded-xl p-3">
                <p className="text-xs text-gray-400">Number of Children</p>
                <p className="font-bold text-gray-800">{registration.numChildren}</p>
              </div>
              <div className="bg-white rounded-xl p-3">
                <p className="text-xs text-gray-400">Course</p>
                <p className="font-bold text-gray-800 text-sm">{getCourseLabel(registration.course)}</p>
              </div>
              <div className="bg-white rounded-xl p-3">
                <p className="text-xs text-gray-400">Ticket Price</p>
                <p className="font-bold text-gray-800">£{getTicketPrice(registration.ticketType)}</p>
              </div>
            </div>
          </div>

          {/* Parent Info */}
          <div className="bg-blue-50 rounded-2xl p-5">
            <h4 className="text-sm font-bold text-blue-700 mb-3 flex items-center gap-2">
              <User className="w-4 h-4" /> Parent / Guardian Information
            </h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <User className="w-4 h-4 text-blue-400" />
                <div>
                  <p className="text-xs text-gray-400">Full Name</p>
                  <p className="font-semibold text-gray-800">{registration.parentName}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-blue-400" />
                <div>
                  <p className="text-xs text-gray-400">Email</p>
                  <a href={`mailto:${registration.parentEmail}`} className="font-semibold text-violet-600 hover:text-violet-700">{registration.parentEmail}</a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-blue-400" />
                <div>
                  <p className="text-xs text-gray-400">Phone</p>
                  <a href={`tel:${registration.parentPhone}`} className="font-semibold text-violet-600 hover:text-violet-700">{registration.parentPhone}</a>
                </div>
              </div>
            </div>
          </div>

          {/* Consent & Dates */}
          <div className="bg-gray-50 rounded-2xl p-5">
            <h4 className="text-sm font-bold text-gray-600 mb-3 flex items-center gap-2">
              <Shield className="w-4 h-4" /> Consent & Registration
            </h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                {registration.consent ? <CheckCircle className="w-4 h-4 text-green-500" /> : <AlertCircle className="w-4 h-4 text-red-500" />}
                <span className="text-sm text-gray-600">Parental consent {registration.consent ? 'given' : 'not given'}</span>
              </div>
              <div className="flex items-center gap-2">
                {registration.updates ? <CheckCircle className="w-4 h-4 text-green-500" /> : <AlertCircle className="w-4 h-4 text-gray-400" />}
                <span className="text-sm text-gray-600">{registration.updates ? 'Opted in to updates' : 'No marketing updates'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">Registered: {formatDate(registration.registeredAt)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== DELETE CONFIRM MODAL ====================
function DeleteModal({ name, onConfirm, onCancel }: { name: string; onConfirm: () => void; onCancel: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Delete Registration?</h3>
          <p className="text-gray-500 text-sm mb-6">
            Are you sure you want to delete the registration for <strong>{name}</strong>? This action cannot be undone.
          </p>
          <div className="flex gap-3">
            <button onClick={onCancel} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button onClick={onConfirm} className="flex-1 py-2.5 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== MAIN DASHBOARD ====================
export default function DashboardPage({ onLogout, onDocs }: { onLogout: () => void; onDocs?: () => void }) {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [viewReg, setViewReg] = useState<Registration | null>(null);
  const [deleteId, setDeleteId] = useState<{ id: string; name: string } | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    seedDefaultCourses();
    setRegistrations(getRegistrations());
    const interval = setInterval(() => setRegistrations(getRegistrations()), 3000);
    return () => clearInterval(interval);
  }, []);

  const handleDelete = (id: string) => {
    const regs = getRegistrations().filter(r => r.id !== id);
    localStorage.setItem('clap_registrations', JSON.stringify(regs));
    setRegistrations(regs);
    setDeleteId(null);
  };

  const handleUpdateStatus = (id: string, status: 'pending' | 'paid' | 'confirmed') => {
    const regs = getRegistrations().map(r => r.id === id ? { ...r, status } : r);
    localStorage.setItem('clap_registrations', JSON.stringify(regs));
    setRegistrations(regs);
  };

  const tabs = [
    { id: 'overview' as Tab, label: 'Overview', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'registrations' as Tab, label: 'Registrations', icon: <UserPlus className="w-5 h-5" />, badge: registrations.length },
    { id: 'courses' as Tab, label: 'Courses', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'plans' as Tab, label: 'Plans', icon: <DollarSign className="w-5 h-5" /> },
    { id: 'analytics' as Tab, label: 'Analytics', icon: <BarChart3 className="w-5 h-5" /> },
    { id: 'settings' as Tab, label: 'Settings', icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50/80 flex">
      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-100 transform transition-transform lg:transform-none ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-5 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-gradient-to-br from-violet-600 to-blue-500 rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-lg font-[Fredoka_One] text-gray-800">
                  Clap<span className="text-violet-600">Academy</span>
                </span>
                <p className="text-[10px] text-gray-400 font-semibold -mt-0.5">Admin Dashboard</p>
              </div>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="flex-1 p-4 space-y-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'bg-violet-50 text-violet-700'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                }`}
              >
                {tab.icon}
                {tab.label}
                {tab.badge !== undefined && (
                  <span className={`ml-auto px-2 py-0.5 rounded-full text-xs font-bold ${
                    activeTab === tab.id ? 'bg-violet-200 text-violet-700' : 'bg-gray-200 text-gray-500'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>

          {/* Admin Profile & Logout */}
          <div className="p-4 border-t border-gray-100">
            <div className="flex items-center gap-3 mb-3 px-2">
              <div className="w-9 h-9 bg-gradient-to-br from-violet-400 to-blue-400 rounded-full flex items-center justify-center text-white text-sm font-bold">
                A
              </div>
              <div>
                <p className="text-sm font-bold text-gray-800">Admin</p>
                <p className="text-[11px] text-gray-400">admin@clapacademy.co.uk</p>
              </div>
            </div>
            {onDocs && (
              <button
                onClick={onDocs}
                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-400 hover:bg-gray-50 hover:text-gray-700 transition-colors mb-1"
              >
                <BookOpen className="w-4 h-4" /> Documentation
              </button>
            )}
            <button
              onClick={onLogout}
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-black/30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main Content */}
      <main className="flex-1 min-w-0">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-100 px-4 md:px-6 py-4 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <MenuIcon className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-lg md:text-xl font-bold text-gray-900">
                {activeTab === 'overview' && '📊 Dashboard Overview'}
                {activeTab === 'registrations' && '👥 All Registrations'}
                {activeTab === 'courses' && '📚 Course Management'}
                {activeTab === 'plans' && '💰 Plan Management'}
                {activeTab === 'analytics' && '📈 Analytics & Reports'}
                {activeTab === 'settings' && '⚙️ System Settings'}
              </h1>
              <p className="text-xs text-gray-400">
                {new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-xs font-bold">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Live
            </div>
            <button
              onClick={onLogout}
              className="lg:hidden p-2 hover:bg-red-50 rounded-xl transition-colors text-red-500"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-4 md:p-6">
          {activeTab === 'overview' && (
            <OverviewTab registrations={registrations} onDelete={(id) => {
              const reg = registrations.find(r => r.id === id);
              if (reg) setDeleteId({ id, name: reg.childName });
            }} onView={setViewReg} />
          )}
          {activeTab === 'registrations' && (
            <RegistrationsTab
              registrations={registrations}
              onDelete={(id) => {
                const reg = registrations.find(r => r.id === id);
                if (reg) setDeleteId({ id, name: reg.childName });
              }}
              onView={setViewReg}
              onUpdateStatus={handleUpdateStatus}
            />
          )}
          {activeTab === 'courses' && (
            <CourseManager />
          )}
          {activeTab === 'plans' && (
            <PlanManager />
          )}
          {activeTab === 'settings' && (
            <SettingsManager />
          )}
          {activeTab === 'analytics' && (
            <AnalyticsTab registrations={registrations} />
          )}
        </div>
      </main>

      {/* Modals */}
      {viewReg && <ViewModal registration={viewReg} onClose={() => setViewReg(null)} />}
      {deleteId && (
        <DeleteModal
          name={deleteId.name}
          onConfirm={() => handleDelete(deleteId.id)}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </div>
  );
}
