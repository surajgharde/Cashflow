/**
 * Mock domain data for the Cashflow Guardian demo.
 *
 * Every figure here is lifted from the Stitch screens so the ported app shows the same
 * numbers the design does: ₹12,500 liquid, ₹5,650 untouchable buffer, ₹4,850 safe-to-spend,
 * the Oct 27 rent trough at ₹1,200 and the -₹4,450 breach.
 */
import type { IconName } from '@/components/glyphs';
import type { Txn } from '@/components/ui/Rows';

export const user = {
  name: 'Leonard Lopez',
  handle: '@leonardlopez',
  email: 'leonard.lopez@fintechlabs.io',
  phone: '98420 54119',
  countryCode: '+91',
  tier: 'Guardian Pro • Active Tier',
  kyc: 'KYC LVL 3',
  trustIndex: '98.4%',
  city: 'Bengaluru, Karnataka (IST)',
  address: 'Indiranagar, Bengaluru, 560038',
  dob: '14 Aug 2000',
  age: 24,
  pan: '•••• •••• 9102',
  occupation: 'Salaried Pro',
  occupationDetail: 'Tech Consultant',
  tenure: '2 yrs 4 mos',
  appVersion: 'v2.4.0 (Build 9082-ALPHA)',
};

export const balances = {
  liquid: 12500,
  safeToSpend: 4850,
  safeToSpendYesterday: 6050,
  buffer: 5650,
  expectedInflows: 8000,
  essentialCommitments: 10000,
  discretionaryReserved: 0,
  dailyRunway: 692,
  netVelocity: 18731,
  liquidDelta: 4560.5,
  inflows7d: 33000,
  outflows7d: 14269,
  inflowCount: 2,
  outflowCount: 14,
  bufferHealth: 0.82,
};

export const riskState = {
  score: 68,
  previousScore: 94,
  targetScore: 86,
  level: 'MODERATE RISK',
  breachProbability: 0.42,
  projectedFloor: 1200,
  floorDate: 'Oct 27',
  deficit: -4450,
  overdraftFee: 590,
  corridorHours: 29,
  confidence: 0.88,
  cycle: '#82',
};

/** Daily projected closing balances behind the 7-day trajectory chart. */
export const forecast7d = [14000, 11000, 7400, 1200, 2100, 9800, 12000];
export const forecast7dLabels = ['D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7'];

/** The 14-day extension; bands widen from day 8 onward. */
export const forecast14d = [
  14000, 11000, 7400, 1200, 2100, 9800, 12000, 11200, 10400, 7600, 6900, 5200, 22000, 5800,
];

/** Inflow / outflow curves on the dashboard's "Flow Trajectory" card. */
export const flowInflow = [0, 0, 25000, 0, 0, 8000, 0];
export const flowOutflow = [420, 3000, 2100, 7000, 600, 500, 649];
export const flowLabels = ['Day 1', 'Day 2', 'Salary', 'Day 4', 'Rent', 'Day 6', 'Day 7'];

export type DayEvent = {
  day: number;
  date: string;
  month: string;
  weekday: string;
  status?: string;
  detail: string;
  balance: number;
  delta: string;
  tone: 'neutral' | 'positive' | 'warning' | 'danger';
  icon?: IconName;
};

/** Day-by-day breakdown on the 7-day forecast screen. */
export const dailyBreakdown: DayEvent[] = [
  {
    day: 1,
    date: '24',
    month: 'OCT',
    weekday: 'Today',
    status: 'Present',
    detail: 'Outflow: -₹420 (Dining) • Inflow: ₹0',
    balance: 12500,
    delta: 'Balance',
    tone: 'neutral',
  },
  {
    day: 2,
    date: '25',
    month: 'OCT',
    weekday: 'Tomorrow',
    status: 'Scheduled',
    detail: 'Electricity Bill auto-debit: -₹3,000',
    balance: 9500,
    delta: '-₹3,000',
    tone: 'neutral',
  },
  {
    day: 3,
    date: '26',
    month: 'OCT',
    weekday: 'Saturday',
    detail: 'Discretionary est: -₹2,100 (Weekend pattern)',
    balance: 7400,
    delta: 'Est. burn',
    tone: 'warning',
    icon: 'auto_awesome',
  },
  {
    day: 4,
    date: '27',
    month: 'OCT',
    weekday: 'Sunday (Buffer Dip)',
    detail: 'Scheduled Rent Share: -₹6,200',
    balance: 1200,
    delta: 'Breach',
    tone: 'danger',
    icon: 'warning',
  },
  {
    day: 5,
    date: '28',
    month: 'OCT',
    weekday: 'Monday',
    detail: 'Inflow: +₹1,500 (Claim) • Outflow: -₹600',
    balance: 2100,
    delta: '+₹900 net',
    tone: 'neutral',
  },
  {
    day: 6,
    date: '29',
    month: 'OCT',
    weekday: 'Tuesday',
    status: 'Restored',
    detail: '+₹8,000 (Studio X Tech Retainer)',
    balance: 9800,
    delta: '+₹8,000',
    tone: 'positive',
  },
  {
    day: 7,
    date: '30',
    month: 'OCT',
    weekday: 'Wednesday',
    detail: 'Routine Outflow: -₹500 (Groceries)',
    balance: 12000,
    delta: 'Horizon End',
    tone: 'neutral',
  },
];

export const transactions: Txn[] = [
  {
    id: 'TXN-894021482',
    title: 'Swiggy Gourmet',
    category: 'Food & Dining',
    icon: 'restaurant',
    amount: -420,
    date: 'Today, 02:12 PM',
  },
  {
    id: 'TXN-894021481',
    title: 'Studio X Tech',
    category: 'Freelance Inflow',
    icon: 'terminal',
    amount: 8000,
    date: '23 Oct',
  },
  {
    id: 'TXN-894021480',
    title: 'Netflix 4K UHD',
    category: 'OTT & Subscriptions',
    icon: 'movie',
    amount: -649,
    date: '21 Oct',
    recurring: true,
  },
  {
    id: 'TXN-894021479',
    title: 'BESCOM Electricity',
    category: 'Utilities',
    icon: 'bolt',
    amount: -3000,
    date: '20 Oct',
    recurring: true,
  },
  {
    id: 'TXN-894021478',
    title: 'Uber Premier',
    category: 'Cabs & Rideshare',
    icon: 'local_taxi',
    amount: -380,
    date: '20 Oct',
  },
  {
    id: 'TXN-894021477',
    title: 'Transfer XX9102',
    category: 'Uncategorised',
    icon: 'sync_alt',
    amount: -1200,
    date: '19 Oct',
    pending: true,
  },
  {
    id: 'TXN-894021476',
    title: 'Blinkit Pantry',
    category: 'Groceries & Staples',
    icon: 'local_grocery_store',
    amount: -1450,
    date: '18 Oct',
  },
  {
    id: 'TXN-894021475',
    title: 'Corporate Payroll',
    category: 'Salary',
    icon: 'corporate_fare',
    amount: 25000,
    date: '01 Oct',
    recurring: true,
  },
];

export type Recommendation = {
  id: string;
  rank: string;
  kind: string;
  urgency: string;
  urgencyIcon: IconName;
  icon: IconName;
  title: string;
  body: string;
  impactLabel: string;
  impact: string;
  amount: number;
  match?: string;
};

export const recommendations: Recommendation[] = [
  {
    id: 'rec-01',
    rank: 'Rec #01',
    kind: 'Recurring Fixed Debit',
    urgency: 'High Urgency',
    urgencyIcon: 'schedule_send',
    icon: 'pause_circle',
    title: 'Pause Hotstar & OTT Subscriptions',
    body: 'Renews Oct 26 (T-24h before Rent). Halting temporarily preserves vital liquid cushion.',
    impactLabel: 'Estimated Impact',
    impact: 'Preserve ₹799 in buffer',
    amount: 799,
    match: '98% Match',
  },
  {
    id: 'rec-02',
    rank: 'Rec #02',
    kind: 'Discretionary Burn',
    urgency: 'Active Trend',
    urgencyIcon: 'local_fire_department',
    icon: 'restaurant',
    title: 'Cap Dining & Delivery to ₹300/day',
    body: 'Weekend food delivery rate tracked 35% above safe velocity. 4-day ceiling keeps buffer positive.',
    impactLabel: 'Estimated Impact',
    impact: 'Preserve ~₹1,500 over 4 days',
    amount: 1500,
    match: '92% Match',
  },
  {
    id: 'rec-03',
    rank: 'Rec #03',
    kind: 'Inflow Acceleration',
    urgency: 'High Impact',
    urgencyIcon: 'flash_on',
    icon: 'bolt',
    title: 'Request Early Freelance Invoice Clearance',
    body: 'Razorpay payout scheduled Oct 28 can be expedited by 48h to arrive prior to Rent deduction.',
    impactLabel: 'Estimated Impact',
    impact: 'Advance ₹8,000 inflow',
    amount: 8000,
    match: '86% Impact',
  },
];

export type RiskFactor = {
  id: string;
  icon: IconName;
  title: string;
  weight: string;
  tag: string;
  body: string;
  severity: 'high' | 'medium' | 'controlled';
  action?: { icon: IconName; label: string };
};

export const riskFactors: RiskFactor[] = [
  {
    id: 'rf-1',
    icon: 'schedule',
    title: 'Income Timing Lag',
    weight: 'High Impact (-35 pts)',
    tag: 'Vulnerable Timing',
    body: 'Freelance client invoice scheduled for Oct 28 historically arrives with a 2-day disbursement variance. 25% chance of landing on Oct 30.',
    severity: 'high',
    action: { icon: 'bolt', label: 'Fastest resolution: Request early clearance' },
  },
  {
    id: 'rf-2',
    icon: 'lock',
    title: 'Fixed Mandate Density',
    weight: 'High Impact (-30 pts)',
    tag: 'Non-negotiable',
    body: "80% of entire month's essential commitments (Rent + Utility) execute within the same 48-hour window.",
    severity: 'high',
  },
  {
    id: 'rf-3',
    icon: 'local_cafe',
    title: 'Discretionary Burn',
    weight: 'Medium Impact (-15 pts)',
    tag: 'Actionable',
    body: 'Recent weekend food delivery frequency exceeded personal safety ceiling by ₹300/day.',
    severity: 'medium',
    action: { icon: 'tune', label: 'Cap dining spend to ₹300/day' },
  },
  {
    id: 'rf-4',
    icon: 'verified_user',
    title: 'Liquid Reserve Base',
    weight: 'Controlled (+20 pts)',
    tag: 'Solvent',
    body: 'Current available balance of ₹12,500 successfully covers immediate 48h requirements.',
    severity: 'controlled',
  },
];

export const incomeSources = [
  {
    id: 'inc-1',
    icon: 'corporate_fare' as IconName,
    title: 'Corporate Monthly Payroll',
    cadence: 'Monthly · 1st of every month',
    amount: 25000,
    confidence: 'Guaranteed (99%)',
  },
  {
    id: 'inc-2',
    icon: 'design_services' as IconName,
    title: 'Studio X Tech Retainer',
    cadence: 'Variable / Milestone · 28th of month',
    amount: 8000,
    confidence: '75% On-time (±2d)',
  },
];

export const expenseCategories = [
  { id: 'c1', emoji: '🏠', name: 'Home & Rent', cap: '₹7,000/mo', kind: 'Essential (Locked)', tag: 'Shielded', locked: true },
  { id: 'c2', emoji: '⚡', name: 'Utilities & Power', cap: '₹3,000/mo', kind: 'Essential (Locked)', tag: 'Auto-debit', locked: true },
  { id: 'c3', emoji: '🥗', name: 'Groceries & Staples', cap: '₹4,500/mo', kind: 'Essential', locked: false },
  { id: 'c4', emoji: '🍽️', name: 'Dining Out & Takeaway', cap: '₹450/day cap', kind: 'Discretionary (Adaptive)', tag: 'Dynamic', locked: false },
  { id: 'c5', emoji: '🎬', name: 'OTT & Subscriptions', cap: '₹1,448/mo', kind: 'Discretionary (Pausable)', locked: false },
  { id: 'c6', emoji: '🚗', name: 'Cabs & Rideshare', cap: '₹1,200/mo', kind: 'Discretionary', tag: 'Surge guarded', locked: false },
  { id: 'c7', emoji: '🛍️', name: 'Shopping & Apparel', cap: 'Dynamic', kind: 'Discretionary', tag: '72h hold', locked: false },
  { id: 'c8', emoji: '💊', name: 'Health & Pharmacy', cap: 'As incurred', kind: 'Essential', tag: 'Untouchable', locked: true },
];

export const notifications = [
  {
    id: 'n1',
    icon: 'warning' as IconName,
    kind: 'Risk Elevation',
    time: '10m ago',
    title: 'Liquidity shortfall detected around Oct 27',
    body: 'Upcoming BESCOM and Rent mandates will breach your safety buffer by -₹4,450. 3 protective actions ready.',
    cta: 'Resolve shortfall',
    tag: 'High Priority',
    tone: 'danger' as const,
    unread: true,
  },
  {
    id: 'n2',
    icon: 'bolt' as IconName,
    kind: 'New Recommendation',
    time: '1h ago',
    title: 'Pause Hotstar OTT to protect ₹799 buffer',
    body: 'Auto-debit due in 48h before apartment rent. Tap to accept or modify intervention.',
    cta: 'Review intervention',
    tag: 'Auto-protect',
    tone: 'warning' as const,
    unread: true,
  },
  {
    id: 'n3',
    icon: 'trending_down' as IconName,
    kind: 'Safe-To-Spend Shift',
    time: '2h ago',
    title: 'Safe-to-Spend updated: ₹4,850 available today',
    body: 'Recalculated down from ₹6,050 after ₹1,200 dining out velocity detected.',
    tone: 'neutral' as const,
    unread: false,
  },
  {
    id: 'n4',
    icon: 'schedule' as IconName,
    kind: 'Inflow Delay Warning',
    time: 'Yesterday',
    title: 'Studio X Freelance payment timing variance',
    body: 'Historically 25% chance of 48h disbursement delay. Buffer sensitivity alert.',
    tone: 'neutral' as const,
    unread: false,
  },
  {
    id: 'n5',
    icon: 'verified_user' as IconName,
    kind: 'Protection Complete',
    time: '2d ago',
    title: 'Swiggy order delay saved ₹1,200',
    body: 'Your buffer remained solvent throughout mid-month bills.',
    tone: 'positive' as const,
    unread: false,
  },
];

export const learnedRules = [
  {
    id: 'lr1',
    confidence: '96% Confidence',
    icon: 'trending_up' as IconName,
    rule: '"You prefer pausing entertainment subscriptions over capping daily groceries or food."',
    learnedFrom: 'Learned from: 8 accepted OTT pauses vs 2 rejected grocery caps',
    locked: false,
  },
  {
    id: 'lr2',
    confidence: '89% Confidence',
    icon: 'edit_note' as IconName,
    rule: '"Your comfortable dining limit is ₹450/day, not ₹300/day."',
    learnedFrom: 'Learned from: 3 consecutive cap modifications',
    locked: false,
  },
  {
    id: 'lr3',
    confidence: '100% Locked Rule',
    icon: 'shield' as IconName,
    rule: '"Health, Gym, and Medical mandates are strictly untouchable."',
    learnedFrom: 'Learned from: Direct explicit feedback on Oct 12',
    locked: true,
  },
  {
    id: 'lr4',
    confidence: '84% Confidence',
    icon: 'bolt' as IconName,
    rule: '"You are receptive to early invoice acceleration when liquidity compression exceeds 48 hours."',
    learnedFrom: 'Learned from: Liquidity event optimization feedback',
    locked: false,
  },
];

export const recommendationHistory = [
  {
    id: 'rh1',
    group: 'Today • 24 Oct',
    icon: 'restaurant' as IconName,
    title: 'Cap Dining to ₹450/day',
    status: 'MODIFIED • Active',
    tone: 'warning' as const,
    amount: '+₹1,050',
    amountLabel: 'Retained',
    body: 'Original AI proposal was ₹300/day. Adjusted to ₹450 by user to accommodate working lunches.',
  },
  {
    id: 'rh2',
    group: 'Today • 24 Oct',
    icon: 'pause_circle' as IconName,
    title: 'Pause Hotstar OTT Subscription',
    status: 'ACCEPTED • Active',
    tone: 'positive' as const,
    amount: '+₹799',
    amountLabel: 'Preserved',
    body: 'Auto-paused mandate renewal. Avoided Oct 26 debit clash before scheduled house rent clearance.',
  },
  {
    id: 'rh3',
    group: 'Earlier in October',
    icon: 'shopping_cart_checkout' as IconName,
    title: 'Delay Swiggy Instamart Order',
    status: 'ACCEPTED • Completed',
    tone: 'positive' as const,
    amount: '+₹1,200',
    amountLabel: 'Protected',
    date: '18 Oct',
    body: 'Pushed basket checkout by 4 days. Shortfall avoided during high-volume mid-month utility auto-debit cycle.',
  },
  {
    id: 'rh4',
    group: 'Earlier in October',
    icon: 'block' as IconName,
    title: 'Cancel Gym Mandate',
    status: 'REJECTED',
    tone: 'danger' as const,
    amount: '₹0',
    amountLabel: 'Dismissed',
    date: '12 Oct',
    body: 'User note: "Essential for health routines."',
    footnote: 'Guardian learned not to flag wellness & gym recurrings',
  },
  {
    id: 'rh5',
    group: 'Earlier in October',
    icon: 'bolt' as IconName,
    title: 'Advance Freelance Milestone',
    status: 'ACCEPTED • Completed',
    tone: 'positive' as const,
    amount: '+₹6,000',
    amountLabel: 'Inflow Speedup',
    date: '05 Oct',
    body: 'Automated client invoice nudge dispatched 6 days prior to normal schedule, smoothing liquidity trough.',
  },
];

/** Hour-by-hour impulses behind the shortfall prediction timeline. */
export const shortfallTimeline = [
  {
    id: 's1',
    icon: 'bolt' as IconName,
    when: 'Oct 25 • 10:00 AM',
    status: 'Safe',
    title: 'BESCOM Electricity Auto-debit',
    amount: '-₹3,000',
    balance: '₹9,500',
    balanceLabel: 'Balance',
    tone: 'positive' as const,
  },
  {
    id: 's2',
    icon: 'shopping_bag' as IconName,
    when: 'Oct 26 • 08:00 PM',
    status: 'Buffer Intact',
    title: 'Weekend Discretionary Burn',
    amount: '-₹2,100',
    balance: '₹7,400',
    balanceLabel: 'Balance',
    tone: 'warning' as const,
  },
  {
    id: 's3',
    icon: 'home' as IconName,
    when: 'Oct 27 • 09:00 AM',
    status: 'Critical Dip',
    title: 'Apartment Rent Auto-debit',
    amount: '-₹7,000',
    balance: '₹1,200',
    balanceLabel: 'Floor',
    tone: 'danger' as const,
    note: 'Buffer Breached',
  },
  {
    id: 's4',
    icon: 'payments' as IconName,
    when: 'Oct 28 • 02:00 PM',
    status: 'Full Recovery',
    title: 'Studio X Tech Freelance Credit',
    amount: '+₹8,000',
    balance: '₹9,200',
    balanceLabel: 'Balance',
    tone: 'positive' as const,
  },
];

export const safeToSpendHistory = [
  { id: 'h1', icon: 'restaurant' as IconName, date: 'Today, 24 Oct', tag: 'Anomaly', body: 'Dining velocity anomaly flagged', value: 4850, delta: '-₹1,200', tone: 'danger' as const },
  { id: 'h2', icon: 'payments' as IconName, date: 'Yesterday, 23 Oct', tag: 'Inflow', body: 'Client invoice confirmed', value: 6050, delta: '+₹1,500', tone: 'positive' as const },
  { id: 'h3', icon: 'local_cafe' as IconName, date: '22 Oct', body: 'Routine weekday burn', value: 4550, delta: '-₹450', tone: 'neutral' as const },
  { id: 'h4', icon: 'power' as IconName, date: '21 Oct', body: 'Utility auto-debit reserved', value: 5000, delta: '-₹2,500', tone: 'neutral' as const },
  { id: 'h5', icon: 'autorenew' as IconName, date: '20 Oct', tag: 'Cycle Reset', body: 'Initial cycle reset', value: 7500, delta: 'Stable Peak', tone: 'positive' as const },
];

export const safeToSpendTrend = [7500, 5000, 4550, 6050, 4850];
export const safeToSpendTrendLabels = ['Oct 10', 'Oct 14', 'Oct 18', 'Oct 22', 'Today'];
