import { router } from 'expo-router';
import { Text, View } from 'react-native';
import { Icon } from '@/components/Icon';
import type { IconName } from '@/components/glyphs';
import { Screen } from '@/components/ui/Screen';
import { Button } from '@/components/ui/Button';
import { Card, Pill, IconBadge } from '@/components/ui/Surface';
import { RingGauge } from '@/components/ui/Charts';
import { colors } from '@/theme/tokens';
import { riskState, forecast7d, balances } from '@/data/mock';
import { formatCurrency, formatCompact } from '@/lib/format';

const VECTORS: { icon: IconName; title: string; metric: string; body: string; level: string; tone: 'positive' | 'warning' | 'danger' }[] = [
  { icon: 'payments', title: 'Income Risk', metric: '25% Variance', body: 'Freelance milestone variance', level: 'Low', tone: 'positive' },
  { icon: 'receipt', title: 'Expense Risk', metric: 'Fixed Locks', body: 'BESCOM + Rent ₹10k fixed lock', level: 'High', tone: 'danger' },
  { icon: 'shield_with_heart', title: 'Buffer Risk', metric: 'Breach Imminent', body: 'Projected dip to ₹1.2k', level: 'High', tone: 'danger' },
  { icon: 'trending_up', title: 'Spending Volatility', metric: '+14% Spike', body: 'Weekend dining surge', level: 'Elevated', tone: 'warning' },
];

export default function RiskDashboard() {
  const max = Math.max(...forecast7d);

  return (
    <Screen
      title="Insights"
      subtitle="Real-time Liquidity Scan"
      avatar
      tabBarSpacing
      actions={[{ icon: 'notifications', label: 'Notifications', onPress: () => router.push('/notifications') }]}
      contentClassName="gap-space-lg"
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-2">
          <View className="h-2 w-2 rounded-full bg-secondary" />
          <Text className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
            Guardian Active
          </Text>
        </View>
        <Pill label="Synchronized" icon="security_update_good" tone="positive" />
      </View>

      {/* Resilience score */}
      <Card className="items-center">
        <View className="flex-row items-center justify-between self-stretch">
          <Text className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">
            Resilience Index
          </Text>
          <Icon name="info" size={16} className="text-on-surface-variant" />
        </View>

        <View className="my-4">
          <RingGauge value={riskState.score / 100} size={170} stroke={13} color={colors.primaryContainer}>
            <View className="flex-row items-baseline">
              <Text className="font-display-hero text-display-hero text-on-surface">{riskState.score}</Text>
              <Text className="font-label-md text-label-md text-on-surface-variant">/100</Text>
            </View>
            <Text className="font-label-sm text-label-sm text-on-surface-variant">Liquidity Score</Text>
          </RingGauge>
        </View>

        <Pill label={riskState.level} icon="warning" tone="warning" uppercase />
        <Text className="mt-2 text-center font-body-sm text-body-sm text-on-surface-variant">
          Compressed by upcoming utility debits and weekend dining velocity.
        </Text>
      </Card>

      {/* Critical trough alert */}
      <Card tone="low" className="p-4">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            <Icon name="crisis_alert" size={18} className="text-error" />
            <Text className="font-label-lg text-label-lg text-on-surface">Critical Trough Alert</Text>
          </View>
          <Pill label="Day 4 • Oct 28" tone="danger" />
        </View>

        <View className="mt-3 flex-row items-end justify-between">
          <View>
            <Text className="font-label-sm text-label-sm text-on-surface-variant">
              Lowest Projected Floor
            </Text>
            <Text className="font-numeral-display text-numeral-display text-error">
              {formatCurrency(riskState.projectedFloor)}
            </Text>
          </View>
          <Pill label="-78% drop" icon="trending_down" tone="danger" />
        </View>

        <View className="mt-3 flex-row gap-2.5 rounded-xl bg-error-container/30 p-3">
          <Icon name="report_problem" size={16} className="text-error" />
          <Text className="flex-1 font-body-sm text-body-sm text-on-surface-variant">
            Buffer breach warning: -₹4,450 below your ₹5,650 safety threshold.
          </Text>
        </View>
      </Card>

      {/* 7-day trajectory bars */}
      <Card>
        <View className="flex-row items-start justify-between">
          <View>
            <Text className="font-headline-sm text-headline-sm text-on-surface">7-Day Trajectory</Text>
            <Text className="font-body-sm text-body-sm text-on-surface-variant">
              Projected daily ending cash balances
            </Text>
          </View>
          <Pill label="Threshold: ₹5.6k" />
        </View>

        <View className="mt-space-md flex-row items-end justify-between" style={{ height: 150 }}>
          {forecast7d.map((v, i) => {
            const critical = v < balances.buffer;
            return (
              <View key={i} className="flex-1 items-center gap-1.5">
                <Text
                  className={`font-label-sm text-label-sm ${
                    critical ? 'text-error' : 'text-on-surface-variant'
                  }`}
                >
                  {formatCompact(v)}
                </Text>
                <View
                  className={`w-7 rounded-lg ${critical ? 'bg-error' : 'bg-primary-container'}`}
                  style={{ height: Math.max(6, (v / max) * 100) }}
                />
                <Text
                  className={`font-label-sm text-label-sm ${
                    critical ? 'text-error' : 'text-on-surface-variant'
                  }`}
                >
                  D{i + 1}
                </Text>
              </View>
            );
          })}
        </View>
      </Card>

      {/* Risk vector breakdown */}
      <View className="gap-space-sm">
        <View className="flex-row items-center justify-between">
          <Text className="font-headline-sm text-headline-sm text-on-surface">Risk Vector Breakdown</Text>
          <Pill label="4 Factors Evaluated" />
        </View>

        <Card tone="low" className="gap-3 p-4">
          {VECTORS.map((v, i) => (
            <View key={v.title}>
              {i > 0 ? <View className="mb-3 h-px bg-surface-container-high" /> : null}
              <View className="flex-row items-center gap-3">
                <IconBadge name={v.icon} bg="bg-surface-container" />
                <View className="flex-1">
                  <View className="flex-row items-center gap-2">
                    <Text className="font-label-lg text-label-lg text-on-surface">{v.title}</Text>
                    <Text className="font-label-sm text-label-sm text-on-surface-variant">{v.metric}</Text>
                  </View>
                  <Text className="mt-0.5 font-body-sm text-body-sm text-on-surface-variant">{v.body}</Text>
                </View>
                <Pill label={v.level} tone={v.tone} />
              </View>
            </View>
          ))}
        </Card>
      </View>

      <View className="gap-3">
        <Button
          title="View Full Risk Details"
          icon="arrow_forward"
          iconTrailing
          onPress={() => router.push('/risk/details')}
        />
        <Button
          title="Why Did Risk Change?"
          icon="help_outline"
          variant="secondary"
          onPress={() => router.push('/risk/explanation')}
        />
      </View>
    </Screen>
  );
}
