import { router } from 'expo-router';
import { Text, View } from 'react-native';
import { Icon } from '@/components/Icon';
import type { IconName } from '@/components/glyphs';
import { Screen } from '@/components/ui/Screen';
import { Button } from '@/components/ui/Button';
import { Card, Pill, IconBadge, ProgressBar } from '@/components/ui/Surface';
import { RingGauge, Sparkline } from '@/components/ui/Charts';
import { colors } from '@/theme/tokens';
import { riskState } from '@/data/mock';

type Vector = {
  kicker: string;
  icon: IconName;
  title: string;
  tag: string;
  metricLabel: string;
  metric: string;
  body: string;
};

const VECTORS: Vector[] = [
  {
    kicker: 'Vector 01 • Inflow Lag',
    icon: 'timelapse',
    title: 'Income Timing Asymmetry',
    tag: '75% Confidence',
    metricLabel: 'Impact Metric',
    metric: '₹8,000 Freelance Retainer',
    body: 'Clears 24 hours after rent execution, creating an acute 48h shortfall window.',
  },
  {
    kicker: 'Vector 02 • Commitments',
    icon: 'lock',
    title: 'Essential Mandates',
    tag: '100% Locked NACH',
    metricLabel: 'Scheduled Outflow',
    metric: '₹10,000 Total Outflow',
    body: 'BESCOM (₹3,000) on Oct 25 and Rent (₹7,000) on Oct 27 are automated and non-negotiable.',
  },
  {
    kicker: 'Vector 03 • Burn Rate',
    icon: 'trending_up',
    title: 'Spending Volatility',
    tag: '+14% Discretionary Spike',
    metricLabel: 'Accelerated Burn',
    metric: 'Swiggy & Uber Run-rate',
    body: 'Discretionary spend tracked ₹1,200 higher than baseline 30-day pace across dynamic micro-merchants.',
  },
  {
    kicker: 'Vector 04 • Liquidity',
    icon: 'compress',
    title: 'Safety Cushion',
    tag: 'Compressed',
    metricLabel: 'Buffer Depletion',
    metric: '₹1,200 vs ₹5,650 buffer',
    body: 'Leaves only 21% of emergency cushion intact during the peak upcoming deficit valley.',
  },
];

export default function RiskDetails() {
  return (
    <Screen
      title="Forecast Drilldown"
      subtitle="Guardian Diagnostic Suite"
      avatar
      actions={[{ icon: 'restart_alt', label: 'Reset' }, { icon: 'more_vert', label: 'More' }]}
      contentClassName="gap-space-lg"
    >
      <View className="flex-row justify-end">
        <Pill label="Live Telemetry" tone="positive" dot />
      </View>

      {/* Composite index */}
      <Card>
        <View className="flex-row items-center gap-3">
          <IconBadge
            name="shield_with_heart"
            size={44}
            iconSize={22}
            bg="bg-surface-container-high"
            fg="text-primary-container"
            filled
          />
          <View className="flex-1">
            <Text className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
              Composite Index
            </Text>
            <Text className="font-headline-sm text-headline-sm text-on-surface">
              Moderate Shortfall Risk
            </Text>
          </View>
          <RingGauge value={riskState.score / 100} size={64} stroke={6}>
            <Text className="font-label-md text-label-md text-on-surface">{riskState.score}%</Text>
          </RingGauge>
        </View>

        <View className="mt-4 flex-row items-baseline gap-1">
          <Text className="font-display-hero text-display-hero text-on-surface">{riskState.score}</Text>
          <Text className="font-headline-sm text-headline-sm text-on-surface-variant">/ 100</Text>
        </View>

        <View className="mt-2">
          <ProgressBar value={riskState.score / 100} height={6} />
        </View>

        <View className="mt-3 flex-row items-center gap-1.5">
          <Icon name="warning" size={14} className="text-error" />
          <Text className="font-label-md text-label-md text-error">
            42% chance of buffer breach in next 96h
          </Text>
        </View>
      </Card>

      {/* Explainability note */}
      <View className="flex-row gap-2.5 rounded-2xl bg-surface-container-low p-4">
        <Icon name="info" size={16} className="text-on-surface-variant" />
        <Text className="flex-1 font-body-sm text-body-sm text-on-surface-variant">
          Estimated based on historical cash flow volatility and scheduled mandates. Recalibrated every 15
          minutes.
        </Text>
      </View>

      {/* Diagnostic vectors */}
      <View className="gap-space-sm">
        <View className="flex-row items-center justify-between">
          <Text className="font-headline-sm text-headline-sm text-on-surface">Diagnostic Vectors</Text>
          <View className="flex-row items-center gap-2">
            <Pill label="4" tone="accent" />
            <Pill label="Strict Real-time" />
          </View>
        </View>

        {VECTORS.map((v, i) => (
          <Card key={v.title} tone="low" className="p-4">
            <View className="flex-row items-start gap-3">
              <IconBadge name={v.icon} size={40} iconSize={20} bg="bg-surface-container" />
              <View className="flex-1">
                <Text className="font-label-sm text-label-sm uppercase tracking-wider text-primary-container">
                  {v.kicker}
                </Text>
                <View className="mt-0.5 flex-row items-center justify-between">
                  <Text className="flex-1 font-headline-sm text-headline-sm text-on-surface">{v.title}</Text>
                </View>
                <Pill label={v.tag} tone={i === 3 ? 'danger' : 'neutral'} className="mt-1.5" />
              </View>
            </View>

            <View className="mt-3 flex-row items-center justify-between rounded-xl bg-surface-container p-3">
              <Text className="font-label-sm text-label-sm text-on-surface-variant">{v.metricLabel}</Text>
              <Text className="font-label-md text-label-md text-on-surface">{v.metric}</Text>
            </View>

            <Text className="mt-2 font-body-sm text-body-sm text-on-surface-variant">{v.body}</Text>

            {/* Timing visual for vector 1 */}
            {i === 0 ? (
              <View className="mt-3 flex-row items-center gap-2">
                <View className="flex-1 rounded-lg bg-error-container/30 px-3 py-2">
                  <Text className="font-label-sm text-label-sm text-error">Rent Out: T-0</Text>
                </View>
                <Icon name="chevron_right" size={16} className="text-on-surface-variant" />
                <View className="flex-1 rounded-lg bg-secondary-container/20 px-3 py-2">
                  <Text className="font-label-sm text-label-sm text-secondary">Inflow: T+24h</Text>
                </View>
              </View>
            ) : null}

            {/* Mandate chips for vector 2 */}
            {i === 1 ? (
              <View className="mt-3 flex-row gap-2">
                <View className="flex-1 flex-row items-center gap-2 rounded-lg bg-surface-container p-2.5">
                  <Icon name="bolt" size={14} className="text-primary-container" />
                  <View>
                    <Text className="font-label-sm text-label-sm text-on-surface">Oct 25 • ₹3,000</Text>
                    <Text className="font-label-sm text-label-sm text-on-surface-variant">BESCOM Utility</Text>
                  </View>
                </View>
                <View className="flex-1 flex-row items-center gap-2 rounded-lg bg-surface-container p-2.5">
                  <Icon name="apartment" size={14} className="text-primary-container" />
                  <View>
                    <Text className="font-label-sm text-label-sm text-on-surface">Oct 27 • ₹7,000</Text>
                    <Text className="font-label-sm text-label-sm text-on-surface-variant">Rental Mandate</Text>
                  </View>
                </View>
              </View>
            ) : null}

            {/* Sparkline for vector 3 */}
            {i === 2 ? (
              <View className="mt-3 items-end">
                <Sparkline data={[400, 450, 520, 480, 610, 700, 820]} color={colors.error} width={110} height={30} />
              </View>
            ) : null}
          </Card>
        ))}
      </View>

      <View className="gap-3">
        <Button
          title="See Protective Actions"
          icon="health_and_safety"
          onPress={() => router.push('/recommendations')}
        />
        <Button
          title="View Individual Risk Factors"
          icon="arrow_forward"
          iconTrailing
          variant="secondary"
          onPress={() => router.push('/risk/factors')}
        />
      </View>
    </Screen>
  );
}
