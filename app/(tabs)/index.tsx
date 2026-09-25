import { useState } from 'react';
import { router } from 'expo-router';
import { Text, View } from 'react-native';
import { Icon } from '@/components/Icon';
import { Screen } from '@/components/ui/Screen';
import { Button } from '@/components/ui/Button';
import { Segmented } from '@/components/ui/Form';
import { Card, Pill, IconBadge, ProgressBar } from '@/components/ui/Surface';
import { StatTile } from '@/components/ui/Rows';
import { AreaChart } from '@/components/ui/Charts';
import { colors } from '@/theme/tokens';
import { balances, flowInflow, flowOutflow, flowLabels } from '@/data/mock';
import { formatCurrency, formatSigned } from '@/lib/format';

type Period = '7d' | '14d' | '30d' | 'month';

export default function CashFlowOverview() {
  const [period, setPeriod] = useState<Period>('7d');

  return (
    <Screen
      title="Dashboard"
      subtitle="Guardian Active"
      back={false}
      avatar
      tabBarSpacing
      actions={[{ icon: 'notifications', label: 'Notifications', onPress: () => router.push('/notifications') }]}
      contentClassName="gap-space-lg"
    >
      {/* Greeting & realtime engine context */}
      <View className="gap-space-xs">
        <View className="flex-row items-center justify-between">
          <Text className="flex-1 font-headline-lg text-headline-lg text-on-surface">Cash Flow Dynamics</Text>
          <Pill label="Realtime Engine" tone="positive" dot uppercase />
        </View>
        <Text className="font-body-md text-body-md text-on-surface-variant">
          Live inflow vs outflow velocity & liquidity runway
        </Text>
      </View>

      <Segmented<Period>
        value={period}
        onChange={setPeriod}
        options={[
          { value: '7d', label: '7 Days' },
          { value: '14d', label: '14 Days' },
          { value: '30d', label: '30 Days' },
          { value: 'month', label: 'This Month' },
        ]}
      />

      {/* Hero balance card */}
      <Card>
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            <Icon name="account_balance_wallet" size={18} className="text-on-surface-variant" />
            <Text className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">
              Current Liquid Balance
            </Text>
          </View>
          <Pill label={formatSigned(balances.liquidDelta)} icon="trending_up" tone="positive" />
        </View>

        <View className="flex-row items-baseline gap-2 pt-3">
          <Text className="font-numeral-display text-numeral-display text-on-surface">
            {formatCurrency(balances.liquid)}
          </Text>
          <Text className="font-label-sm text-label-sm text-on-surface-variant">INR Available</Text>
        </View>

        <View className="mt-4 flex-row items-center justify-between border-t border-surface-container-high pt-3">
          <View className="flex-row items-center gap-2">
            <View className="h-2 w-2 rounded-full bg-primary-container" />
            <Text className="font-body-sm text-body-sm text-on-surface-variant">Net Cash Velocity</Text>
          </View>
          <Text className="font-label-md text-label-md text-primary-fixed-dim">
            {formatSigned(balances.netVelocity)}{' '}
            <Text className="font-body-sm text-body-sm text-on-surface-variant">(Surplus flow)</Text>
          </Text>
        </View>
      </Card>

      {/* Velocity stat duo */}
      <View className="flex-row gap-space-md">
        <StatTile
          icon="south_west"
          iconBg="bg-secondary-container/20"
          iconFg="text-secondary"
          caption={`${balances.inflowCount} credits`}
          label="Inflows"
          value={formatSigned(balances.inflows7d)}
          valueClass="text-secondary"
          progress={0.78}
          progressTone="bg-secondary"
        />
        <StatTile
          icon="north_east"
          iconBg="bg-error-container/30"
          iconFg="text-error"
          caption={`${balances.outflowCount} debits`}
          label="Outflows"
          value={`-${formatCurrency(balances.outflows7d)}`}
          valueClass="text-error"
          progress={0.43}
          progressTone="bg-error"
        />
      </View>

      {/* Dual-curve flow trajectory */}
      <Card>
        <View className="flex-row items-start justify-between">
          <View className="flex-1">
            <Text className="font-headline-sm text-headline-sm text-on-surface">Flow Trajectory</Text>
            <Text className="font-body-sm text-body-sm text-on-surface-variant">
              Salary credit vs daily burn rate
            </Text>
          </View>
          <View className="flex-row items-center gap-3">
            <View className="flex-row items-center gap-1.5">
              <View className="h-1 w-2.5 rounded-full bg-secondary" />
              <Text className="font-label-sm text-label-sm text-on-surface-variant">Inflow</Text>
            </View>
            <View className="flex-row items-center gap-1.5">
              <View className="h-1 w-2.5 rounded-full bg-error" />
              <Text className="font-label-sm text-label-sm text-on-surface-variant">Outflow</Text>
            </View>
          </View>
        </View>

        <View className="mt-space-md">
          <AreaChart
            height={180}
            labels={flowLabels}
            series={[
              { data: flowInflow, color: colors.secondary, fill: true },
              { data: flowOutflow, color: colors.error, fill: true },
            ]}
          />
        </View>

        <View className="mt-space-md flex-row items-center gap-2.5 rounded-xl bg-surface-container-low p-3">
          <Icon name="verified_user" size={16} className="text-secondary" />
          <Text className="flex-1 font-body-sm text-body-sm text-on-surface-variant">
            Buffer retained at <Text className="text-on-surface">+₹6,850</Text> above safety threshold during
            high-burn window.
          </Text>
        </View>
      </Card>

      {/* Category allocations */}
      <View className="gap-space-sm">
        <View className="flex-row items-center justify-between">
          <Text className="font-headline-sm text-headline-sm text-on-surface">Category Allocations</Text>
          <Pill label="Live Ledger" tone="positive" dot />
        </View>

        <Card tone="low" className="gap-4 p-4">
          <View className="flex-row items-center gap-3">
            <IconBadge name="apartment" bg="bg-surface-container-high" />
            <View className="flex-1">
              <Text className="font-label-lg text-label-lg text-on-surface">Essential Fixed Debits</Text>
              <Text className="font-body-sm text-body-sm text-on-surface-variant">Rent, Utilities, EMI</Text>
            </View>
            <View className="items-end">
              <Text className="font-label-lg text-label-lg text-on-surface">{formatCurrency(10000)}</Text>
              <Text className="font-label-sm text-label-sm text-on-surface-variant">70.1% total</Text>
            </View>
          </View>

          <View className="h-px bg-surface-container-high" />

          <View className="flex-row items-center gap-3">
            <IconBadge name="local_cafe" bg="bg-surface-container-high" />
            <View className="flex-1">
              <Text className="font-label-lg text-label-lg text-on-surface">Discretionary Outflows</Text>
              <Text className="font-body-sm text-body-sm text-on-surface-variant">
                Food, Rideshare, Cinema
              </Text>
            </View>
            <View className="items-end">
              <Text className="font-label-lg text-label-lg text-on-surface">{formatCurrency(4269)}</Text>
              <Text className="font-label-sm text-label-sm text-secondary">Within safe pace</Text>
            </View>
          </View>
        </Card>
      </View>

      {/* Buffer health */}
      <Card tone="low" className="flex-row items-center gap-3 p-4">
        <IconBadge name="shield" size={40} iconSize={20} bg="bg-surface-container" fg="text-primary-container" />
        <View className="flex-1">
          <Text className="font-label-lg text-label-lg text-on-surface">Buffer Health Rating</Text>
          <Text className="font-body-sm text-body-sm text-on-surface-variant">Emergency safety margin</Text>
          <View className="mt-2">
            <ProgressBar value={balances.bufferHealth} />
          </View>
        </View>
        <View className="items-end">
          <Text className="font-headline-sm text-headline-sm text-primary-container">82%</Text>
          <Text className="font-label-sm text-label-sm text-on-surface-variant">Untouched</Text>
        </View>
      </Card>

      {/* Guardian tip */}
      <Card tone="low" className="flex-row gap-3 p-4">
        <IconBadge name="smart_toy" bg="bg-surface-container" fg="text-primary-container" />
        <View className="flex-1">
          <Text className="font-label-lg text-label-lg text-on-surface">Guardian Recommendation</Text>
          <Text className="mt-1 font-body-sm text-body-sm text-on-surface-variant">
            Current pace unlocks an extra <Text className="text-primary-container">₹3,200.00</Text> to allocate
            toward high-yield savings by Sunday midnight.
          </Text>
        </View>
      </Card>

      <Button
        title="View Granular 7-Day Forecast"
        icon="arrow_forward"
        iconTrailing
        onPress={() => router.push('/forecast/7-day')}
      />
    </Screen>
  );
}
