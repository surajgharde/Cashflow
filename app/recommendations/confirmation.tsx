import { router } from 'expo-router';
import { Text, View } from 'react-native';
import { Icon } from '@/components/Icon';
import type { IconName } from '@/components/glyphs';
import { Screen } from '@/components/ui/Screen';
import { Button } from '@/components/ui/Button';
import { Card, Pill, IconBadge } from '@/components/ui/Surface';

const POLICIES: { icon: IconName; title: string; body: string; badge: IconName }[] = [
  {
    icon: 'restaurant',
    title: 'Dining & Delivery Capped',
    body: 'Restricted to ₹450/day',
    badge: 'lock_clock',
  },
  {
    icon: 'pause_circle',
    title: 'Hotstar Auto-Debit Paused',
    body: 'Recurring payment deferred',
    badge: 'check_circle',
  },
];

const TIMELINE = [
  { date: 'Oct 24', tag: 'Cap Active', tone: 'warning' as const, body: 'Dining & delivery limited to ₹450 daily ceiling' },
  { date: 'Oct 25', tag: '-₹3,000', tone: 'neutral' as const, body: 'BESCOM utility debited • Balance remains safely at ₹9,050' },
  { date: 'Oct 26', tag: '+₹799 Saved', tone: 'positive' as const, body: 'Hotstar auto-debit skipped cleanly in simulation' },
  { date: 'Oct 27', tag: '-₹7,000', tone: 'danger' as const, body: 'Rent debited • Lowest floor hits ₹3,049 (Zero Breach)' },
  { date: 'Oct 28', tag: '+₹8,000', tone: 'positive' as const, body: 'Client retainer clears • Full recovery to ₹11,049' },
];

export default function ProtectiveActionConfirmation() {
  return (
    <Screen
      title="Protective Action"
      subtitle="Simulated adjustment applied"
      avatar
      actions={[{ icon: 'more_vert', label: 'More' }]}
      contentClassName="gap-space-lg"
    >
      {/* Success hero */}
      <Card className="items-center py-8">
        <View className="h-20 w-20 items-center justify-center rounded-full bg-secondary-container/20">
          <Icon name="shield_with_heart" size={40} filled className="text-secondary" />
        </View>
        <Pill label="AI Guardian Active" icon="verified" tone="positive" className="mt-4" />
        <Text className="mt-3 text-center font-headline-lg text-headline-lg text-on-surface">
          Protective Action Recorded
        </Text>
        <Text className="mt-1 font-body-md text-body-md text-on-surface-variant">
          Simulated Cashflow Adjustment Applied
        </Text>
      </Card>

      {/* Sandbox safeguard */}
      <View className="flex-row gap-2.5 rounded-2xl bg-surface-container-low p-4">
        <Icon name="info" size={16} className="text-primary-container" />
        <View className="flex-1">
          <Text className="font-label-md text-label-md text-on-surface">
            Simulation Sandbox Safeguard
          </Text>
          <Text className="mt-1 font-body-sm text-body-sm text-on-surface-variant">
            Note: This is an intelligent simulated adjustment. AI Cashflow Guardian calculates projections
            without moving real bank funds.
          </Text>
        </View>
      </View>

      {/* Simulated policies */}
      <View className="gap-space-sm">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            <Icon name="tune" size={18} className="text-primary-container" />
            <Text className="font-headline-sm text-headline-sm text-on-surface">Simulated Policies</Text>
          </View>
          <Pill label="Oct 24 — Oct 28" />
        </View>

        <Card tone="low" className="gap-3 p-4">
          {POLICIES.map((p, i) => (
            <View key={p.title}>
              {i > 0 ? <View className="mb-3 h-px bg-surface-container-high" /> : null}
              <View className="flex-row items-center gap-3">
                <IconBadge name={p.icon} bg="bg-surface-container" fg="text-primary-container" />
                <View className="flex-1">
                  <Text className="font-label-lg text-label-lg text-on-surface">{p.title}</Text>
                  <Text className="font-body-sm text-body-sm text-on-surface-variant">{p.body}</Text>
                </View>
                <Icon name={p.badge} size={18} className="text-secondary" />
              </View>
            </View>
          ))}
        </Card>
      </View>

      {/* Recalibration metrics */}
      <View className="gap-space-sm">
        <Text className="font-headline-sm text-headline-sm text-on-surface">Recalibration Metrics</Text>

        <View className="flex-row gap-space-md">
          <Card tone="low" className="flex-1 p-4">
            <Text className="font-label-sm text-label-sm text-on-surface-variant">Prior Deficit</Text>
            <Text className="mt-1 font-headline-sm text-headline-sm text-error">-₹4,450</Text>
            <Text className="mt-0.5 font-label-sm text-label-sm text-on-surface-variant">
              Safety breach risk
            </Text>
          </Card>
          <Card tone="low" className="flex-1 p-4">
            <Text className="font-label-sm text-label-sm text-on-surface-variant">Buffer Restored</Text>
            <Text className="mt-1 font-headline-sm text-headline-sm text-secondary">+₹1,849</Text>
            <Text className="mt-0.5 font-label-sm text-label-sm text-on-surface-variant">
              Protected surplus
            </Text>
          </Card>
        </View>

        <Card tone="low" className="flex-row items-center justify-between p-4">
          <View className="flex-1">
            <Text className="font-label-sm text-label-sm text-on-surface-variant">
              New Projected Lowest Floor
            </Text>
            <Text className="mt-1 font-headline-md text-headline-md text-on-surface">₹3,049</Text>
          </View>
          <Pill label="Solvency Intact" tone="positive" />
        </Card>

        <Card tone="low" className="flex-row items-center justify-between p-4">
          <View>
            <Text className="font-label-sm text-label-sm text-on-surface-variant">Risk Recalibration</Text>
            <View className="mt-1.5 flex-row items-center gap-2">
              <Text className="font-label-lg text-label-lg text-error">MODERATE (68)</Text>
              <Icon name="trending_down" size={16} className="text-secondary" />
              <Text className="font-label-lg text-label-lg text-secondary">LOW (82/100)</Text>
            </View>
          </View>
          <Icon name="health_and_safety" size={24} className="text-secondary" />
        </Card>
      </View>

      {/* Timeline of protection */}
      <View className="gap-space-sm">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            <Icon name="timeline" size={18} className="text-primary-container" />
            <Text className="font-headline-sm text-headline-sm text-on-surface">Timeline of Protection</Text>
          </View>
          <Pill label="5-Day Trajectory" />
        </View>

        <Card tone="low" className="gap-3 p-4">
          {TIMELINE.map((t, i) => (
            <View key={t.date}>
              {i > 0 ? <View className="mb-3 h-px bg-surface-container-high" /> : null}
              <View className="flex-row items-start gap-3">
                <Text className="w-14 font-label-md text-label-md text-on-surface-variant">{t.date}</Text>
                <View className="flex-1">
                  <Pill label={t.tag} tone={t.tone} />
                  <Text className="mt-1.5 font-body-sm text-body-sm text-on-surface-variant">{t.body}</Text>
                </View>
              </View>
            </View>
          ))}
        </Card>
      </View>

      <View className="gap-3">
        <Button
          title="View Updated Forecast"
          icon="insights"
          onPress={() => router.push('/forecast/7-day')}
        />
        <Button
          title="Provide Feedback to Guardian"
          icon="rate_review"
          variant="secondary"
          onPress={() => router.push('/recommendations/feedback')}
        />
        <Button title="Done / Return to Dashboard" variant="ghost" onPress={() => router.replace('/(tabs)')} />
      </View>
    </Screen>
  );
}
