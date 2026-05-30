import { useState, useEffect } from 'react';
import {
  Plus, Edit3, Trash2, X, AlertCircle,
  DollarSign, Search, CheckCircle, ExternalLink,
  ChevronUp, ChevronDown, Copy
} from 'lucide-react';
import {
  getPlans, addPlan, updatePlan, deletePlan,
  savePlans, seedDefaultPlans, PLAN_COLORS, getEmptyPlan,
} from '../utils/plans';
import type { PlanData } from '../utils/plans';

// ==================== PLAN FORM MODAL ====================
function PlanFormModal({ plan, onClose, onSave }: {
  plan: PlanData | null; onClose: () => void; onSave: () => void;
}) {
  const isEdit = !!plan;
  const [form, setForm] = useState<Omit<PlanData, 'id' | 'createdAt' | 'updatedAt'>>(() => {
    if (plan) {
      const { id: _id, createdAt: _c, updatedAt: _u, ...rest } = plan;
      return rest;
    }
    return getEmptyPlan();
  });

  const set = (key: string, value: string | boolean | number) => setForm(p => ({ ...p, [key]: value }));
  const setFeature = (i: number, v: string) => {
    const f = [...form.features]; f[i] = v; setForm(p => ({ ...p, features: f }));
  };
  const addFeature = () => setForm(p => ({ ...p, features: [...p.features, ''] }));
  const removeFeature = (i: number) => setForm(p => ({ ...p, features: p.features.filter((_: string, j: number) => j !== i) }));

  const handleSave = () => {
    if (!form.name || !form.price) return;
    if (isEdit && plan) updatePlan(plan.id, form); else addPlan(form);
    onSave(); onClose();
  };

  const ic = "w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all text-sm";

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center p-4 pt-6 overflow-y-auto">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full border border-gray-200 mb-8">
        <div className="sticky top-0 bg-white rounded-t-2xl border-b border-gray-100 p-5 z-10">
          <div className="flex items-center justify-between">
            <div><h2 className="text-xl font-bold text-gray-900">{isEdit ? 'Edit Plan' : 'Add New Plan'}</h2><p className="text-sm text-gray-400">Configure the pricing plan and CTA button</p></div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-xl"><X className="w-5 h-5 text-gray-400" /></button>
          </div>
        </div>

        <div className="p-6 space-y-5">
          {/* Basic Info */}
          <div className="grid md:grid-cols-2 gap-5">
            <div><label className="block text-sm font-bold text-gray-700 mb-1.5">Plan Name *</label><input type="text" value={form.name} onChange={e => set('name', e.target.value)} placeholder="e.g. Early Bird" className={ic} /></div>
            <div><label className="block text-sm font-bold text-gray-700 mb-1.5">Price *</label><input type="text" value={form.price} onChange={e => set('price', e.target.value)} placeholder="e.g. £60" className={ic} /></div>
            <div className="md:col-span-2"><label className="block text-sm font-bold text-gray-700 mb-1.5">Description</label><input type="text" value={form.description} onChange={e => set('description', e.target.value)} placeholder="e.g. Limited places" className={ic} /></div>
          </div>

          {/* CTA Button */}
          <div className="bg-violet-50 rounded-xl p-4 border border-violet-200">
            <h4 className="font-bold text-violet-800 text-sm mb-3 flex items-center gap-2">
              <ExternalLink className="w-4 h-4" /> CTA Button Configuration
            </h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Button Text</label>
                <input type="text" value={form.ctaText} onChange={e => set('ctaText', e.target.value)} placeholder="e.g. Register Your Child" className={ic} />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Button Link (URL)</label>
                <input type="text" value={form.ctaLink} onChange={e => set('ctaLink', e.target.value)} placeholder="e.g. #register or https://..." className={ic} />
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <span className="text-xs text-gray-500">Preview:</span>
              <a href={form.ctaLink || '#'} className={`inline-block bg-gradient-to-r ${form.color} text-white px-4 py-1.5 rounded-full text-xs font-bold`}>
                {form.ctaText || 'Button'}
              </a>
            </div>
          </div>

          {/* Colour & Options */}
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">Button Colour</label>
              <div className="grid grid-cols-4 gap-2">
                {PLAN_COLORS.map(c => (
                  <button key={c.value} type="button" onClick={() => set('color', c.value)} className={`h-9 rounded-lg ${c.preview} transition-all ${form.color === c.value ? 'ring-2 ring-violet-500 ring-offset-2 scale-110' : 'opacity-60 hover:opacity-100'}`} title={c.label} />
                ))}
              </div>
            </div>
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
                <input type="checkbox" checked={form.popular} onChange={e => set('popular', e.target.checked)} className="w-4 h-4 rounded border-gray-300 text-violet-600 focus:ring-violet-500" />
                Mark as "MOST POPULAR"
              </label>
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
                <input type="checkbox" checked={form.active} onChange={e => set('active', e.target.checked)} className="w-4 h-4 rounded border-gray-300 text-violet-600 focus:ring-violet-500" />
                Active (visible on website)
              </label>
            </div>
          </div>

          {/* Features */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-bold text-gray-700">Plan Features</label>
              <button type="button" onClick={addFeature} className="text-xs text-violet-600 font-bold hover:text-violet-700">+ Add Feature</button>
            </div>
            <div className="space-y-2">
              {form.features.map((f, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                  <input type="text" value={f} onChange={e => setFeature(i, e.target.value)} placeholder={`Feature ${i + 1}...`} className={ic} />
                  {form.features.length > 1 && (
                    <button type="button" onClick={() => removeFeature(i)} className="p-1.5 hover:bg-red-50 rounded-lg text-gray-300 hover:text-red-500"><X className="w-4 h-4" /></button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 bg-white border-t border-gray-100 p-5 rounded-b-2xl flex items-center justify-between">
          <p className="text-xs text-gray-400">{isEdit ? 'Editing existing plan' : 'Creating new plan'}</p>
          <div className="flex gap-3">
            <button onClick={onClose} className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50">Cancel</button>
            <button onClick={handleSave} disabled={!form.name || !form.price} className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-blue-500 text-white font-bold text-sm hover:shadow-lg hover:shadow-violet-300 disabled:opacity-50 disabled:cursor-not-allowed">
              {isEdit ? 'Save Changes' : 'Create Plan'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== DELETE CONFIRM ====================
function DeleteConfirm({ name, onConfirm, onCancel }: { name: string; onConfirm: () => void; onCancel: () => void }) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"><AlertCircle className="w-8 h-8 text-red-500" /></div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Delete Plan?</h3>
          <p className="text-gray-500 text-sm mb-6">Delete <strong>{name}</strong>? This cannot be undone.</p>
          <div className="flex gap-3">
            <button onClick={onCancel} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-semibold hover:bg-gray-50">Cancel</button>
            <button onClick={onConfirm} className="flex-1 py-2.5 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600">Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== MAIN PLAN MANAGER ====================
export default function PlanManager() {
  const [plans, setPlans] = useState<PlanData[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editPlan, setEditPlan] = useState<PlanData | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<PlanData | null>(null);
  const [search, setSearch] = useState('');

  const reload = () => { seedDefaultPlans(); setPlans(getPlans()); };
  useEffect(() => { reload(); }, []);

  const filtered = plans.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.price.toLowerCase().includes(search.toLowerCase())
  );

  const handleMove = (index: number, dir: 'up' | 'down') => {
    const ni = dir === 'up' ? index - 1 : index + 1;
    if (ni < 0 || ni >= plans.length) return;
    const updated = [...plans];
    [updated[index], updated[ni]] = [updated[ni], updated[index]];
    updated.forEach((p, i) => p.sortOrder = i);
    savePlans(updated);
    reload();
  };

  const handleDuplicate = (plan: PlanData) => {
    const { id: _id, createdAt: _c, updatedAt: _u, ...data } = plan;
    addPlan({ ...data, name: plan.name + ' (Copy)', popular: false, active: false });
    reload();
  };

  const handleToggleActive = (plan: PlanData) => {
    updatePlan(plan.id, { active: !plan.active });
    reload();
  };

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2"><DollarSign className="w-5 h-5 text-violet-500" /> Plan Management</h3>
            <p className="text-sm text-gray-400">{plans.length} plans · {plans.filter(p => p.active).length} active</p>
          </div>
          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            <div className="relative flex-1 lg:flex-none min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" placeholder="Search plans..." value={search} onChange={e => setSearch(e.target.value)} className="w-full lg:w-48 pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-violet-500 outline-none" />
            </div>
            <button onClick={() => { setEditPlan(null); setShowForm(true); }} className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-blue-500 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:shadow-lg hover:shadow-violet-300 transition-all whitespace-nowrap">
              <Plus className="w-4 h-4" /> Add Plan
            </button>
          </div>
        </div>
      </div>

      {/* Data Grid */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {filtered.length === 0 ? (
          <div className="text-center py-16 px-6">
            <DollarSign className="w-16 h-16 text-gray-200 mx-auto mb-4" />
            <p className="text-gray-400 font-semibold text-lg">{search ? 'No plans match your search' : 'No plans yet'}</p>
            <button onClick={() => { setEditPlan(null); setShowForm(true); }} className="mt-4 inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-blue-500 text-white px-5 py-2.5 rounded-xl font-bold text-sm"><Plus className="w-4 h-4" /> Create First Plan</button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-100">
                  <th className="text-left py-3 px-3 text-xs font-bold text-gray-400 uppercase w-14">#</th>
                  <th className="text-left py-3 px-3 text-xs font-bold text-gray-400 uppercase">Plan</th>
                  <th className="text-left py-3 px-3 text-xs font-bold text-gray-400 uppercase">Price</th>
                  <th className="text-left py-3 px-3 text-xs font-bold text-gray-400 uppercase">CTA Button</th>
                  <th className="text-left py-3 px-3 text-xs font-bold text-gray-400 uppercase">Link</th>
                  <th className="text-left py-3 px-3 text-xs font-bold text-gray-400 uppercase">Features</th>
                  <th className="text-left py-3 px-3 text-xs font-bold text-gray-400 uppercase">Status</th>
                  <th className="text-right py-3 px-3 text-xs font-bold text-gray-400 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((plan, index) => (
                  <tr key={plan.id} className={`border-b border-gray-50 hover:bg-violet-50/30 transition-colors ${!plan.active ? 'opacity-50' : ''}`}>
                    <td className="py-3 px-3">
                      <div className="flex flex-col gap-0.5">
                        <button onClick={() => handleMove(plans.indexOf(plan), 'up')} disabled={plans.indexOf(plan) === 0} className="p-0.5 hover:bg-gray-200 rounded text-gray-300 hover:text-gray-600 disabled:opacity-20"><ChevronUp className="w-3.5 h-3.5" /></button>
                        <span className="text-xs text-gray-400 font-bold text-center">{index + 1}</span>
                        <button onClick={() => handleMove(plans.indexOf(plan), 'down')} disabled={plans.indexOf(plan) === plans.length - 1} className="p-0.5 hover:bg-gray-200 rounded text-gray-300 hover:text-gray-600 disabled:opacity-20"><ChevronDown className="w-3.5 h-3.5" /></button>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-8 rounded-full bg-gradient-to-b ${plan.color}`} />
                        <div>
                          <p className="font-bold text-gray-800 text-sm">{plan.name}</p>
                          {plan.popular && <span className="text-[10px] font-bold bg-violet-100 text-violet-600 px-1.5 py-0.5 rounded">⭐ POPULAR</span>}
                          <p className="text-xs text-gray-400">{plan.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-lg font-bold text-gray-800">{plan.price}</td>
                    <td className="py-3 px-3">
                      <span className={`inline-block bg-gradient-to-r ${plan.color} text-white px-3 py-1 rounded-full text-xs font-bold`}>
                        {plan.ctaText}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <div className="max-w-[140px]">
                        {plan.ctaLink.startsWith('http') ? (
                          <a href={plan.ctaLink} target="_blank" rel="noopener" className="text-xs text-blue-500 hover:text-blue-700 truncate block font-mono">{plan.ctaLink}</a>
                        ) : (
                          <span className="text-xs text-gray-400 font-mono">{plan.ctaLink}</span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <span className="text-xs text-gray-500">{plan.features.filter(f => f.trim()).length} items</span>
                    </td>
                    <td className="py-3 px-3">
                      <button onClick={() => handleToggleActive(plan)} className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${plan.active ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${plan.active ? 'bg-emerald-500' : 'bg-gray-400'}`} />
                        {plan.active ? 'Active' : 'Draft'}
                      </button>
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center justify-end gap-0.5">
                        <button onClick={() => handleDuplicate(plan)} className="p-2 hover:bg-violet-50 rounded-lg text-gray-400 hover:text-violet-600 transition-colors" title="Duplicate"><Copy className="w-4 h-4" /></button>
                        <button onClick={() => { setEditPlan(plan); setShowForm(true); }} className="p-2 hover:bg-violet-50 rounded-lg text-gray-400 hover:text-violet-600 transition-colors" title="Edit"><Edit3 className="w-4 h-4" /></button>
                        <button onClick={() => setDeleteTarget(plan)} className="p-2 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-600 transition-colors" title="Delete"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showForm && (<PlanFormModal plan={editPlan} onClose={() => { setShowForm(false); setEditPlan(null); }} onSave={reload} />)}
      {deleteTarget && (<DeleteConfirm name={deleteTarget.name} onConfirm={() => { deletePlan(deleteTarget.id); setDeleteTarget(null); reload(); }} onCancel={() => setDeleteTarget(null)} />)}
    </div>
  );
}
