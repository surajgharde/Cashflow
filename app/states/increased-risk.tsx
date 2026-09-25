import { router } from 'expo-router';
import { Text, View } from 'react-native';
import { Icon } from '@/components/Icon';
import type { IconName } from '@/components/glyphs';
import { Screen } from '@/components/ui/Screen';
import { Button } from '@/components/ui/Button';
import { Card, Pill, IconBadge } from '@/components/ui/Surface';
import { RingGauge } from '@/components/ui/Charts';
import { colors } from '@/theme/tokens';

const VECTORS: { icon: IconName; title: string; pts: string; body: string }[] = [
  {
    icon: 'schedule',
    title: 'Timing Offset Factor',
    pts: '-35 pts',
    body: 'Inflow salary deposit scheduled 4 days behind pending primary rent mandate.',
  },
  {
    icon: 'layers',
    title: 'Mandate Density',
    pts: '-30 pts',
    body: '₹10,000 clustered non-negotiable auto-debits queued within a narrow 48h window.',
  },
  {
    icon: 'local_fire_department',
    title: 'Discretionary Burn',
    pts: '-18 pts',
    body: 'Outflow velocity running 24% hot relative to 30-day baseline spending envelope.',
  },
  {
    icon: 'compress',
    title: 'Buffer Liquidity',
    pts: '-25 pts',
    body: 'Core safety floor penetrated; system holding single-tier fallback reserves.',
  },
];

export default function IncreasedRiskState() {
  return (
    <Screen title="Increased Risk" subtitle="SIM ACTIVE" avatar contentClassName="gap-space-lg">
      <View className="flex-row items-center justify-between">
        <Text className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
          Liquidity Threat Escalation
        </Text>
        <Pill label="Cycle #83" />
      </View>

      {/* Threat hero */}
      <Card className="items-center">
        <Pill label="Hazard Alert Level 2" icon="warning" tone="danger" className="self-start" />

        <View className="my-5">
          <RingGauge value={0.62} size={170} stroke={13} color={colors.error}>
            <Text className="font-label-sm text-label-sm text-on-surface-variant">Resilience Index</Text>
            <View className="flex-row items-baseline">
              <Text className="font-display-hero text-display-hero text-error">62</Text>
              <Text className="font-label-md text-label-md text-on-surface-variant">/100</Text>
            </View>
            <Text className="font-label-sm text-label-sm text-error">MODERATE-HIGH</Text>
          </RingGauge>
        </View>

        <View className="flex-row items-center gap-2 self-stretch rounded-xl bg-error-container/30 p-3">
          <Icon name="emergency_home" size={18} className="text-error" />
          <Text className="flex-1 font-label-md text-label-md text-error">
            Critical buffer breach imminent in 72h
          </Text>
        </View>

        <View className="mt-4 items-center">
          <Text className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
            Targeted Deficit Gap Exposure
          </Text>
          <Text className="mt-1 font-numeral-display text-numeral-display text-error">-₹4,450.00</Text>
          <Text className="font-label-sm text-label-sm text-on-surface-variant">
            below algorithmic protected floor
          </Text>
        </View>
      </Card>

      {/* Escalation vectors */}
      <View className="gap-space-sm">
        <View className="flex-row items-center justify-between">
          <Text className="font-headline-sm text-headline-sm text-on-surface">Escalation Vectors</Text>
          <Pill label="-108 PTS" tone="danger" uppercase />
        </View>

        <Card tone="low" className="gap-4 p-4">
          {VECTORS.map((v, i) => (
            <View key={v.title}>
              {i > 0 ? <View className="mb-4 h-px bg-surface-container-high" /> : null}
              <View className="flex-row items-start gap-3">
                <IconBadge name={v.icon} bg="bg-surface-container" fg="text-error" />
                <View className="flex-1">
                  <View className="flex-row items-center justify-between">
                    <Text className="flex-1 font-label-lg text-label-lg text-on-surface">{v.title}</Text>
                    <Text className="font-label-md text-label-md text-error">{v.pts}</Text>
                  </View>
                  <Text className="mt-1 font-body-sm text-body-sm text-on-surface-variant">{v.body}</Text>
                </View>
              </View>
            </View>
          ))}
        </Card>
      </View>

      {/* Shock differential */}
      <View className="gap-space-sm">
        <View className="flex-row items-center justify-between">
          <Text className="font-headline-sm text-headline-sm text-on-surface">Shock Differential</Text>
          <Pill label="Pre vs. Post Shift" />
        </View>

        <View className="flex-row gap-3">
          <Card tone="low" className="flex-1 p-4">
            <Text className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
              Before Shock
            </Text>
            <Text className="mt-1 font-headline-md text-headline-md text-secondary">94/100</Text>
            <Text className="font-label-sm text-label-sm text-secondary">Resilience: Safe</Text>
            <View className="mt-3 gap-1">
              <View className="flex-row justify-between">
                <Text className="font-label-sm text-label-sm text-on-surface-variant">Safe:</Text>
                <Text className="font-label-sm text-label-sm text-on-surface">₹6,050</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="font-label-sm text-label-sm text-on-surface-variant">Buffer:</Text>
                <Text className="font-label-sm text-label-sm text-on-surface">100%</Text>
              </View>
            </View>
          </Card>

          <Card tone="low" className="flex-1 p-4">
            <Text className="font-label-sm text-label-sm uppercase tracking-wider text-error">
              Elevated Risk
            </Text>
            <Text className="mt-1 font-headline-md text-headline-md text-error">62/100</Text>
            <Text className="font-label-sm text-label-sm text-error">Resilience: Hazard</Text>
            <View className="mt-3 gap-1">
              <View className="flex-row justify-between">
                <Text className="font-label-sm text-label-sm text-on-surface-variant">Safe:</Text>
                <Text className="font-label-sm text-label-sm text-on-surface">₹1,850</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="font-label-sm text-label-sm text-on-surface-variant">Buffer:</Text>
                <Text className="font-label-sm text-label-sm text-error">21%</Text>
              </View>
            </View>
          </Card>
        </View>
      </View>

      {/* Overdraft risk */}
      <Card tone="low" className="flex-row gap-3 p-4">
        <IconBadge name="trending_down" bg="bg-surface-container" fg="text-error" />
        <View className="flex-1">
          <Text className="font-label-lg text-label-lg text-error">42% Overdraft Likelihood</Text>
          <Text className="mt-1 font-body-sm text-body-sm text-on-surface-variant">
            Without protective intervention: ₹590 estimated bank charge + mandate bounce penalties active.
          </Text>
        </View>
      </Card>

      <View className="gap-3">
        <Button
          title="View 3 Protective Recommendations"
          icon="arrow_forward"
          iconTrailing
          onPress={() => router.push('/recommendations')}
        />
        <Button
          title="Simulate Auto-Recovery Timeline"
          icon="update"
          variant="secondary"
          onPress={() => router.push('/recommendations/confirmation')}
        />
      </View>
    </Screen>
  );
}
