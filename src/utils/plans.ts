export interface PlanData {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  ctaText: string;
  ctaLink: string;
  color: string;
  popular: boolean;
  active: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export function getPlans(): PlanData[] {
  return JSON.parse(localStorage.getItem('clap_plans') || '[]');
}

export function savePlans(plans: PlanData[]) {
  localStorage.setItem('clap_plans', JSON.stringify(plans));
}

export function addPlan(plan: Omit<PlanData, 'id' | 'createdAt' | 'updatedAt'>): PlanData {
  const plans = getPlans();
  const now = new Date().toISOString();
  const newPlan: PlanData = {
    ...plan,
    id: `PLN-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
    createdAt: now,
    updatedAt: now,
  };
  plans.push(newPlan);
  savePlans(plans);
  return newPlan;
}

export function updatePlan(id: string, updates: Partial<PlanData>): PlanData | null {
  const plans = getPlans();
  const index = plans.findIndex(p => p.id === id);
  if (index === -1) return null;
  plans[index] = { ...plans[index], ...updates, updatedAt: new Date().toISOString() };
  savePlans(plans);
  return plans[index];
}

export function deletePlan(id: string): boolean {
  const plans = getPlans();
  const filtered = plans.filter(p => p.id !== id);
  if (filtered.length === plans.length) return false;
  savePlans(filtered);
  return true;
}

export function getEmptyPlan(): Omit<PlanData, 'id' | 'createdAt' | 'updatedAt'> {
  return {
    name: '',
    price: '',
    description: '',
    features: ['', '', '', ''],
    ctaText: 'Register Now',
    ctaLink: '#register',
    color: 'from-violet-600 to-blue-500',
    popular: false,
    active: true,
    sortOrder: 0,
  };
}

export const PLAN_COLORS = [
  { value: 'from-amber-400 to-orange-500', label: 'Amber → Orange', preview: 'bg-gradient-to-r from-amber-400 to-orange-500' },
  { value: 'from-violet-500 to-blue-500', label: 'Violet → Blue', preview: 'bg-gradient-to-r from-violet-500 to-blue-500' },
  { value: 'from-emerald-400 to-green-500', label: 'Emerald → Green', preview: 'bg-gradient-to-r from-emerald-400 to-green-500' },
  { value: 'from-pink-400 to-rose-500', label: 'Pink → Rose', preview: 'bg-gradient-to-r from-pink-400 to-rose-500' },
  { value: 'from-blue-500 to-indigo-500', label: 'Blue → Indigo', preview: 'bg-gradient-to-r from-blue-500 to-indigo-500' },
  { value: 'from-cyan-400 to-blue-500', label: 'Cyan → Blue', preview: 'bg-gradient-to-r from-cyan-400 to-blue-500' },
  { value: 'from-red-400 to-rose-500', label: 'Red → Rose', preview: 'bg-gradient-to-r from-red-400 to-rose-500' },
  { value: 'from-fuchsia-500 to-pink-500', label: 'Fuchsia → Pink', preview: 'bg-gradient-to-r from-fuchsia-500 to-pink-500' },
];

function createDefaultPlans(): PlanData[] {
  const now = new Date().toISOString();
  return [
    {
      id: 'PLN-DEF-001', name: 'Early Bird', price: '£60', description: 'Limited places',
      features: ['Full 3-day camp access', 'All 8 bonuses included', 'Certificate & badge', 'Parent showcase invite'],
      ctaText: 'Secure Early Bird Place', ctaLink: '#register',
      color: 'from-amber-400 to-orange-500', popular: false, active: true, sortOrder: 0, createdAt: now, updatedAt: now,
    },
    {
      id: 'PLN-DEF-002', name: 'Standard Child Ticket', price: '£75', description: 'Full 3-day online camp access',
      features: ['Full 3-day camp access', 'All 8 bonuses included', 'Certificate & badge', 'Parent showcase invite', 'Priority support'],
      ctaText: 'Register Your Child', ctaLink: '#register',
      color: 'from-violet-500 to-blue-500', popular: true, active: true, sortOrder: 1, createdAt: now, updatedAt: now,
    },
    {
      id: 'PLN-DEF-003', name: 'Sibling Ticket', price: '£60', description: 'For additional children from the same household',
      features: ['Full 3-day camp access', 'All 8 bonuses included', 'Certificate & badge', 'Parent showcase invite'],
      ctaText: 'Book Sibling Place', ctaLink: '#register',
      color: 'from-emerald-400 to-green-500', popular: false, active: true, sortOrder: 2, createdAt: now, updatedAt: now,
    },
    {
      id: 'PLN-DEF-004', name: 'Family Bundle', price: '£150', description: 'Up to 3 children from the same household',
      features: ['Full 3-day camp for 3 kids', 'All 8 bonuses per child', 'Certificates & badges', 'Parent showcase invite', 'Best value for families'],
      ctaText: 'Choose Family Bundle', ctaLink: '#register',
      color: 'from-pink-400 to-rose-500', popular: false, active: true, sortOrder: 3, createdAt: now, updatedAt: now,
    },
  ];
}

export function seedDefaultPlans(): PlanData[] {
  const existing = getPlans();
  if (existing.length === 0) {
    const defaults = createDefaultPlans();
    savePlans(defaults);
    return defaults;
  }
  return existing;
}
