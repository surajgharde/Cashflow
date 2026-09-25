import { useState } from 'react';
import { Text, View } from 'react-native';
import { Icon } from '@/components/Icon';
import { Screen } from '@/components/ui/Screen';
import { Button } from '@/components/ui/Button';
import { Segmented } from '@/components/ui/Form';
import { Card, Pill, IconBadge } from '@/components/ui/Surface';
import { AreaChart } from '@/components/ui/Charts';
import { colors } from '@/theme/tokens';
import { safeToSpendHistory, safeToSpendTrend, safeToSpendTrendLabels, balances } from '@/data/mock';
import { formatCurrency } from '@/lib/format';

type Range = '7d' | '30d' | '90d';

const TONE = {
  neutral: 'text-on-surface-variant',
  positive: 'text-secondary',
  danger: 'text-error',
} as const;

export default function SafeToSpendHistory() {
  const [range, setRange] = useState<Range>('30d');

  return (
    <Screen
      title="Safe-to-Spend History"
      subtitle="Capacity trendline"
      avatar
      actions={[{ icon: 'restart_alt', label: 'Reset' }, { icon: 'more_vert', label: 'More' }]}
      contentClassName="gap-space-lg"
    >
      <Segmented<Range>
        value={range}
        onChange={setRange}
        options={[
          { value: '7d', label: '7 Days' },
          { value: '30d', label: '30 Days' },
          { value: '90d', label: '90 Days' },
        ]}
      />

      {/* Metric summary */}
      <View className="flex-row gap-space-sm">
        {[
          { label: '30D Average', icon: 'trending_up' as const, value: '₹5,420', sub: 'Safe', subIcon: 'shield' as const, fg: 'text-secondary' },
          { label: 'Lowest Dip', icon: 'warning' as const, value: '₹1,200', sub: 'Oct 14', fg: 'text-error' },
          { label: 'Shield Saved', icon: 'auto_awesome' as const, value: '4 times', sub: '0 Breaches', fg: 'text-primary-container' },
        ].map((m) => (
          <Card key={m.label} tone="low" className="flex-1 p-3">
            <View className="flex-row items-center justify-between">
              <Text className="font-label-sm text-label-sm text-on-surface-variant">{m.label}</Text>
              <Icon name={m.icon} size={14} className={m.fg} />
            </View>
            <Text className={`mt-1.5 font-headline-sm text-headline-sm ${m.fg}`}>{m.value}</Text>
            <Text className="font-label-sm text-label-sm text-on-surface-variant">{m.sub}</Text>
          </Card>
        ))}
      </View>

      {/* Historical chart */}
      <Card>
        <View className="flex-row items-start justify-between">
          <View>
            <Text className="font-headline-sm text-headline-sm text-on-surface">Capacity Trendline</Text>
            <View className="mt-1 flex-row items-center gap-3">
              <View className="flex-row items-center gap-1.5">
                <View className="h-1 w-2.5 rounded-full bg-primary-container" />
                <Text className="font-label-sm text-label-sm text-on-surface-variant">Safe-to-Spend</Text>
              </View>
              <View className="flex-row items-center gap-1.5">
                <View className="h-1 w-2.5 rounded-full bg-outline" />
                <Text className="font-label-sm text-label-sm text-on-surface-variant">Threshold</Text>
              </View>
            </View>
          </View>
          <Pill label={formatCurrency(balances.buffer, { decimals: false })} tone="warning" />
        </View>

        {/* Active point highlight */}
        <View className="mt-3 flex-row items-center justify-between rounded-xl bg-surface-container-low p-3">
          <Text className="font-label-md text-label-md text-on-surface">24 Oct (Today)</Text>
          <View className="items-end">
            <Text className="font-label-lg text-label-lg text-primary-container">
              {formatCurrency(balances.safeToSpend, { decimals: false })}
            </Text>
            <Text className="font-label-sm text-label-sm text-on-surface-variant">Current state</Text>
          </View>
        </View>

        <View className="mt-space-md">
          <AreaChart
            height={170}
            labels={safeToSpendTrendLabels}
            series={[
              { data: safeToSpendTrend, color: colors.primaryContainer, fill: true },
              { data: safeToSpendTrend.map(() => balances.buffer), color: colors.outline, dashed: true },
            ]}
          />
        </View>
      </Card>

      {/* Chronological log */}
      <View className="gap-space-sm">
        <View className="flex-row items-center justify-between">
          <Text className="font-headline-sm text-headline-sm text-on-surface">Timeline Velocity</Text>
          <Pill label="Live audit sync" tone="positive" dot />
        </View>

        <Card tone="low" className="gap-3 p-4">
          {safeToSpendHistory.map((h, i) => (
            <View key={h.id}>
              {i > 0 ? <View className="mb-3 h-px bg-surface-container-high" /> : null}
              <View className="flex-row items-center gap-3">
                <IconBadge name={h.icon} bg="bg-surface-container" fg={TONE[h.tone]} />
                <View className="flex-1">
                  <View className="flex-row items-center gap-1.5">
                    <Text className="font-label-lg text-label-lg text-on-surface">{h.date}</Text>
                    {h.tag ? <Pill label={h.tag} tone={h.tone === 'danger' ? 'danger' : 'neutral'} /> : null}
                  </View>
                  <Text className="mt-0.5 font-body-sm text-body-sm text-on-surface-variant">{h.body}</Text>
                </View>
                <View className="items-end">
                  <Text className="font-label-lg text-label-lg text-on-surface">
                    {formatCurrency(h.value, { decimals: false })}
                  </Text>
                  <Text className={`font-label-sm text-label-sm ${TONE[h.tone]}`}>{h.delta}</Text>
                </View>
              </View>
            </View>
          ))}
        </Card>
      </View>

      <View className="gap-3">
        <Button title="Run 30-Day Spending Simulation" icon="insights" />
        <Button title="Download Audit Statement (CSV)" icon="download" variant="secondary" />
      </View>
    </Screen>
  );
}
