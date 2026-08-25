export const PAKISTAN_CITIES = [
  'Karachi',
  'Lahore',
  'Faisalabad',
  'Rawalpindi',
  'Gujranwala',
  'Peshawar',
  'Multan',
  'Hyderabad',
  'Islamabad',
  'Quetta',
  'Bahawalpur',
  'Sargodha',
  'Sialkot',
  'Sukkur',
  'Larkana',
  'Sheikhupura',
  'Rahim Yar Khan',
  'Jhang',
  'Dera Ghazi Khan',
  'Gujrat',
  'Sahiwal',
  'Wah Cantt',
  'Kasur',
  'Okara',
  'Mingora',
  'Nawabshah',
  'Chiniot',
  'Mirpur Khas',
  'Karianwala',
  'Abbottabad',
  'Mardan',
  'Muzaffarabad',
  'Other'
];

export const BUSINESS_CATEGORIES = [
  'Restaurant',
  'Clothing',
  'E-commerce',
  'Real Estate',
  'Solar',
  'Education',
  'Healthcare',
  'Beauty',
  'Technology',
  'Professional Services',
  'Retail',
  'Travel',
  'Construction',
  'Automotive',
  'Other'
];

export const BUSINESS_GOALS = [
  'Get more customers',
  'Generate leads',
  'Increase sales',
  'Improve social media',
  'Improve SEO',
  'Build brand awareness',
  'Increase WhatsApp inquiries',
  'Grow e-commerce',
  'Other'
];

export interface ScoreTier {
  min: number;
  max: number;
  label: string;
  badgeClass: string;
  textClass: string;
  colorHex: string;
  summary: string;
}

export const SCORE_TIERS: Record<string, ScoreTier> = {
  CRITICAL: {
    min: 0,
    max: 39,
    label: 'Critical',
    badgeClass: 'bg-red-500/10 text-red-500 border-red-500/30',
    textClass: 'text-red-500',
    colorHex: '#EF4444',
    summary: 'Your business has major digital visibility gaps that are causing you to lose potential customers daily.'
  },
  NEEDS_IMPROVEMENT: {
    min: 40,
    max: 59,
    label: 'Needs Improvement',
    badgeClass: 'bg-amber-500/10 text-amber-500 border-amber-500/30',
    textClass: 'text-amber-500',
    colorHex: '#F59E0B',
    summary: 'Your business has an active online footprint, but several conversion barriers are limiting your growth.'
  },
  GOOD: {
    min: 60,
    max: 74,
    label: 'Good',
    badgeClass: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    textClass: 'text-emerald-400',
    colorHex: '#10B981',
    summary: 'Your business has a solid digital foundation, but several optimization opportunities are currently being missed.'
  },
  STRONG: {
    min: 75,
    max: 89,
    label: 'Strong',
    badgeClass: 'bg-sky-500/10 text-sky-400 border-sky-500/30',
    textClass: 'text-sky-400',
    colorHex: '#0284C7',
    summary: 'Your business performs very well across digital channels and is trusted by customers in Pakistan.'
  },
  EXCELLENT: {
    min: 90,
    max: 100,
    label: 'Excellent',
    badgeClass: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
    textClass: 'text-purple-400',
    colorHex: '#8B5CF6',
    summary: 'Your business demonstrates top-tier digital presence and industry leadership across Pakistan.'
  }
};

export function getScoreTier(score: number): ScoreTier {
  if (score <= 39) return SCORE_TIERS.CRITICAL;
  if (score <= 59) return SCORE_TIERS.NEEDS_IMPROVEMENT;
  if (score <= 74) return SCORE_TIERS.GOOD;
  if (score <= 89) return SCORE_TIERS.STRONG;
  return SCORE_TIERS.EXCELLENT;
}
