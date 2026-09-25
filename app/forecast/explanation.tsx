import { router } from 'expo-router';
import { Text, View } from 'react-native';
import { Icon } from '@/components/Icon';
import type { IconName } from '@/components/glyphs';
import { Screen } from '@/components/ui/Screen';
import { Button } from '@/components/ui/Button';
import { Card, Pill, IconBadge } from '@/components/ui/Surface';

const FACTORS: { title: string; tag: string; tone: 'danger' | 'warning' | 'positive'; body: string; foot: string; footIcon: IconName }[] = [
  {
    title: 'Timing Asymmetry Factor',
    tag: 'High Impact',
    tone: 'danger',
    body: 'Inflow arrives exactly 24 hours after major fixed commitments clear, causing an avoidable temporary dip below your ₹2,500 safety threshold.',
    foot: 'Gap Window: 48h active offset',
    footIcon: 'schedule',
  },
  {
    title: 'Discretionary Acceleration',
    tag: 'Medium Impact',
    tone: 'warning',
    body: 'Recent Swiggy and Uber spend velocity tracked 14% higher than the 30-day baseline, eroding your starting cushion from ₹6,050 down to ₹4,850.',
    foot: 'Run-rate burn: +₹1,200 discretionary drag',
    footIcon: 'trending_up',
  },
  {
    title: 'Verified Fixed Mandates',
    tag: '100% Certainty',
    tone: 'positive',
    body: 'BESCOM auto-debit and apartment rent are hard-scheduled via NACH mandates and will trigger without extension options.',
    foot: 'Auto-debit lock: ₹10,000 non-negotiable',
    footIcon: 'verified_user',
  },
];

export default function ForecastExplanation() {
  return (
    <Screen
      title="Why This Forecast?"
      subtitle="Guardian Algorithmic Transparency"
      avatar
      actions={[{ icon: 'more_vert', label: 'More' }]}
      contentClassName="gap-space-lg"
    >
      <View className="flex-row items-center justify-end">
        <Pill label="Engine v4.2" tone="positive" dot />
      </View>

      {/* Hero analysis */}
      <Card>
        <View className="flex-row items-center gap-3">
          <IconBadge name="shield_with_heart" size={44} iconSize={22} bg="bg-surface-container-high" fg="text-primary-container" filled />
          <View className="flex-1">
            <Pill label="Liquidity Stress Point" icon="bolt" tone="danger" />
          </View>
        </View>
        <Text className="mt-4 font-headline-md text-headline-md text-on-surface">
          Projected Day 4 cash drops to ₹1,200 via timing offsets
        </Text>
      </Card>

      {/* Plain-English narrative */}
      <Card tone="low" className="p-4">
        <View className="flex-row items-center gap-2">
          <Icon name="psychology" size={18} className="text-primary-container" />
          <Text className="font-label-lg text-label-lg text-on-surface">Plain-English Synthesis</Text>
        </View>
        <Text className="mt-2 font-body-md text-body-md text-on-surface-variant">
          Our model analyzed 42 historical cash cycles. Your BESCOM bill (-₹3,000) and rent deduction
          (-₹7,000) execute on Oct 25 & 27, while your freelance inflow (+₹8,000) lands on Oct 28. This
          creates an acute 48-hour liquidity compression.
        </Text>

        {/* Mini timeline */}
        <View className="mt-4 flex-row gap-2">
          {[
            { when: 'Oct 25-27', amount: '-₹10,000', label: 'Debits Fire', fg: 'text-error' },
            { when: 'Day 4 Dip', amount: '₹1,200', label: 'Critical Gap', fg: 'text-error' },
            { when: 'Oct 28', amount: '+₹8,000', label: 'Inflow Clears', fg: 'text-secondary' },
          ].map((t) => (
            <View key={t.when} className="flex-1 items-center rounded-xl bg-surface-container p-3">
              <Text className="font-label-sm text-label-sm text-on-surface-variant">{t.when}</Text>
              <Text className={`mt-1 font-label-lg text-label-lg ${t.fg}`}>{t.amount}</Text>
              <Text className="mt-0.5 text-center font-label-sm text-label-sm text-on-surface-variant">
                {t.label}
              </Text>
            </View>
          ))}
        </View>
      </Card>

      {/* Key diagnostic drivers */}
      <View className="gap-space-sm">
        <View className="flex-row items-center justify-between">
          <Text className="font-headline-sm text-headline-sm text-on-surface">Key Diagnostic Drivers</Text>
          <Pill label="3 vectors isolated" />
        </View>

        {FACTORS.map((f) => (
          <Card key={f.title} tone="low" className="p-4">
            <View className="flex-row items-center justify-between">
              <Text className="flex-1 font-label-lg text-label-lg text-on-surface">{f.title}</Text>
              <Pill label={f.tag} tone={f.tone} />
            </View>
            <Text className="mt-2 font-body-sm text-body-sm text-on-surface-variant">{f.body}</Text>
            <View className="mt-3 flex-row items-center gap-1.5">
              <Icon name={f.footIcon} size={13} className="text-on-surface-variant" />
              <Text className="font-label-sm text-label-sm text-on-surface-variant">{f.foot}</Text>
            </View>
          </Card>
        ))}
      </View>

      {/* How to fix this */}
      <View className="gap-space-sm">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            <Icon name="auto_fix_high" size={18} className="text-primary-container" />
            <Text className="font-headline-sm text-headline-sm text-on-surface">How to Fix This?</Text>
          </View>
          <Pill label="Pre-computed Paths" />
        </View>

        {[
          {
            icon: 'forward_media' as IconName,
            kicker: 'Fastest Resolution',
            title: 'Request Early Freelance Invoice Clearance',
            body: 'Advances ₹8,000 by 48 hours to arrive ahead of rent execution.',
            resultLabel: 'Projected Balance Recovery',
            result: '+₹8,000 on Oct 26',
          },
          {
            icon: 'pause_circle' as IconName,
            kicker: 'Passive Leeway',
            title: 'Pause Hotstar & OTT Subscriptions',
            body: 'Temporarily halts next recurring batch to preserve liquid margin.',
            resultLabel: 'Buffer Preserved',
            result: '₹799 retained',
          },
        ].map((o) => (
          <Card key={o.title} tone="low" className="p-4">
            <View className="flex-row items-center gap-2">
              <Icon name={o.icon} size={16} className="text-primary-container" />
              <Text className="font-label-sm text-label-sm uppercase tracking-wider text-primary-container">
                {o.kicker}
              </Text>
            </View>
            <Text className="mt-1.5 font-label-lg text-label-lg text-on-surface">{o.title}</Text>
            <Text className="mt-1 font-body-sm text-body-sm text-on-surface-variant">{o.body}</Text>
            <View className="mt-3 flex-row items-center justify-between rounded-xl bg-surface-container p-3">
              <Text className="font-label-sm text-label-sm text-on-surface-variant">{o.resultLabel}</Text>
              <Text className="font-label-md text-label-md text-secondary">{o.result}</Text>
            </View>
          </Card>
        ))}
      </View>

      <View className="gap-2">
        <Button
          title="Open Protective Recommendations"
          icon="smart_toy"
          onPress={() => router.push('/recommendations')}
        />
        <Text className="text-center font-body-sm text-body-sm text-on-surface-variant">
          Zero impact on credit score · Automated via UPI auto-switch
        </Text>
      </View>
    </Screen>
  );
}
