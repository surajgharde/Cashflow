import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { Icon } from '@/components/Icon';
import type { IconName } from '@/components/glyphs';
import { Screen } from '@/components/ui/Screen';
import { Button } from '@/components/ui/Button';
import { Card, Pill, IconBadge, ProgressBar } from '@/components/ui/Surface';
import { AreaChart } from '@/components/ui/Charts';
import { colors } from '@/theme/tokens';
import { forecast14d } from '@/data/mock';
import { formatCurrency } from '@/lib/format';

const MILESTONES: { label: string; amount: string; positive: boolean; icon: IconName }[] = [
  { label: 'D3: Rent Due', amount: '-₹18,500.00', positive: false, icon: 'home' },
  { label: 'D6: Freelance Client', amount: '+₹12,000.00', positive: true, icon: 'payments' },
  { label: 'D10: Cloud & Subs', amount: '-₹2,800.00', positive: false, icon: 'subscriptions' },
  { label: 'D12: Salary Credit', amount: '+₹25,000.00', positive: true, icon: 'corporate_fare' },
];

export default function FourteenDayForecast() {
  return (
    <Screen
      title="14-Day Forecast"
      subtitle="Extended Liquidity Runway"
      avatar
      tabBarSpacing
      actions={[{ icon: 'calendar_today', label: 'Pick range' }]}
      contentClassName="gap-space-lg"
    >
      {/* Horizon switcher */}
      <View className="flex-row gap-1 rounded-xl bg-surface-container-low p-1.5">
        <Pressable onPress={() => router.replace('/forecast/7-day')} className="flex-1 rounded-lg px-3 py-2">
          <Text className="text-center font-label-md text-label-md text-on-surface-variant">7-Day</Text>
        </Pressable>
        <View className="flex-1 rounded-lg bg-surface-container-highest px-3 py-2">
          <Text className="text-center font-label-md text-label-md text-on-surface">14-Day</Text>
        </View>
        <Pressable onPress={() => router.push('/demo')} className="flex-1 flex-row items-center justify-center gap-1 rounded-lg px-3 py-2">
          <Text className="font-label-md text-label-md text-on-surface-variant">Sandbox</Text>
          <Icon name="science" size={14} className="text-on-surface-variant" />
        </Pressable>
      </View>

      {/* Hero runway card */}
      <Card>
        <Text className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">
          Projected Day 14 Net Balance
        </Text>
        <View className="mt-2 flex-row items-center justify-between">
          <Text className="font-numeral-display text-numeral-display text-on-surface">
            {formatCurrency(5800)}
          </Text>
          <Pill label="14d Fully Solvent" icon="verified_user" tone="positive" />
        </View>

        <View className="mt-4 gap-2 rounded-xl bg-surface-container-low p-3">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-2">
              <Icon name="query_stats" size={16} className="text-primary-container" />
              <Text className="font-label-md text-label-md text-on-surface">Guardian Model Confidence</Text>
            </View>
            <Text className="font-label-md text-label-md text-primary-container">82% Medium-High</Text>
          </View>
          <ProgressBar value={0.82} />
          <Text className="font-label-sm text-label-sm text-on-surface-variant">Bands widen Day 8+</Text>
        </View>
      </Card>

      {/* Projected cash matrix */}
      <View className="flex-row gap-space-md">
        <Card tone="low" className="flex-1 p-4">
          <IconBadge name="arrow_downward_alt" size={32} iconSize={18} bg="bg-secondary-container/20" fg="text-secondary" />
          <Text className="mt-2 font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
            14d Inflows
          </Text>
          <Text className="font-headline-sm text-headline-sm text-secondary">+₹41,000.00</Text>
          <Text className="mt-1 font-label-sm text-label-sm text-on-surface-variant">
            Salary, Freelance, Div
          </Text>
        </Card>
        <Card tone="low" className="flex-1 p-4">
          <IconBadge name="arrow_upward_alt" size={32} iconSize={18} bg="bg-error-container/30" fg="text-error" />
          <Text className="mt-2 font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
            14d Outflows
          </Text>
          <Text className="font-headline-sm text-headline-sm text-error">-₹35,200.00</Text>
          <Text className="mt-1 font-label-sm text-label-sm text-on-surface-variant">
            Rent, EMI, Discretionary
          </Text>
        </Card>
      </View>

      {/* Trajectory & confidence cone */}
      <Card>
        <View className="flex-row items-start justify-between">
          <View className="flex-1">
            <Text className="font-headline-sm text-headline-sm text-on-surface">
              Trajectory & Confidence Cone
            </Text>
            <Text className="font-body-sm text-body-sm text-on-surface-variant">
              Envelope spread expands from Day 8 forward
            </Text>
          </View>
          <Pill label="D1–D14" />
        </View>

        <View className="mt-space-md">
          <AreaChart
            height={190}
            series={[
              { data: forecast14d, color: colors.primaryContainer, fill: true },
              { data: forecast14d.map((v, i) => v * (1 + (i > 7 ? (i - 7) * 0.05 : 0))), color: colors.outline, dashed: true },
              { data: forecast14d.map((v, i) => v * (1 - (i > 7 ? (i - 7) * 0.05 : 0))), color: colors.outline, dashed: true },
            ]}
            labels={['D1', 'D3', 'D6', 'D10', 'D12', 'D14']}
          />
        </View>

        <View className="mt-3 flex-row items-center justify-between rounded-xl bg-surface-container-low p-3">
          <Text className="font-label-sm text-label-sm text-on-surface-variant">Current: ₹0</Text>
          <Text className="font-label-sm text-label-sm text-on-surface-variant">
            Max: <Text className="text-secondary">₹8,200</Text> | Min:{' '}
            <Text className="text-error">₹3,400</Text>
          </Text>
        </View>
      </Card>

      {/* Milestone legend */}
      <Card tone="low" className="gap-3 p-4">
        {MILESTONES.map((m, i) => (
          <View key={m.label}>
            {i > 0 ? <View className="mb-3 h-px bg-surface-container-high" /> : null}
            <View className="flex-row items-center gap-3">
              <IconBadge
                name={m.icon}
                size={32}
                iconSize={16}
                bg="bg-surface-container"
                fg={m.positive ? 'text-secondary' : 'text-error'}
              />
              <Text className="flex-1 font-label-md text-label-md text-on-surface">{m.label}</Text>
              <Text className={`font-label-lg text-label-lg ${m.positive ? 'text-secondary' : 'text-error'}`}>
                {m.amount}
              </Text>
            </View>
          </View>
        ))}
      </Card>

      {/* Critical risk zone */}
      <Card tone="low" className="p-4">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            <Icon name="warning" size={18} className="text-error" />
            <Text className="font-label-lg text-label-lg text-on-surface">Liquidity Compression Window</Text>
          </View>
          <Pill label="Days 4–5" tone="danger" />
        </View>
        <Text className="mt-2 font-body-sm text-body-sm text-on-surface-variant">
          Carries an estimated <Text className="text-error">₹1,200.00 buffer vulnerability</Text> post-rent
          deduction until freelance invoice clearance on Day 6. Avoid discretionary expenditures.
        </Text>
      </Card>

      {/* Weekly aggregates */}
      <View className="gap-space-sm">
        <View className="flex-row items-center justify-between">
          <Text className="font-headline-sm text-headline-sm text-on-surface">Weekly Net Dynamics</Text>
          <Pill label="Aggregate Pace" />
        </View>
        <View className="flex-row gap-space-md">
          <Card tone="low" className="flex-1 p-4">
            <Text className="font-label-sm text-label-sm text-on-surface-variant">Week 1 (D1-D7)</Text>
            <View className="mt-1 flex-row items-center gap-1.5">
              <Icon name="trending_down" size={16} className="text-error" />
              <Text className="font-headline-sm text-headline-sm text-error">-₹5,300.00</Text>
            </View>
            <Text className="mt-1 font-label-sm text-label-sm text-on-surface-variant">
              Heavy fixed obligations
            </Text>
            <View className="mt-3">
              <ProgressBar value={0.4} tone="bg-error" />
            </View>
          </Card>
          <Card tone="low" className="flex-1 p-4">
            <Text className="font-label-sm text-label-sm text-on-surface-variant">Week 2 (D8-D14)</Text>
            <View className="mt-1 flex-row items-center gap-1.5">
              <Icon name="trending_up" size={16} className="text-secondary" />
              <Text className="font-headline-sm text-headline-sm text-secondary">+₹8,100.00</Text>
            </View>
            <Text className="mt-1 font-label-sm text-label-sm text-on-surface-variant">
              Salary surplus injection
            </Text>
            <View className="mt-3">
              <ProgressBar value={0.75} tone="bg-secondary" />
            </View>
          </Card>
        </View>
      </View>

      <Button
        title="View Granular Event Breakdown"
        icon="arrow_forward"
        iconTrailing
        onPress={() => router.push('/forecast/details')}
      />
    </Screen>
  );
}
