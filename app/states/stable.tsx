import { useState } from 'react';
import { router } from 'expo-router';
import { Text, View } from 'react-native';
import { Icon } from '@/components/Icon';
import type { IconName } from '@/components/glyphs';
import { Screen } from '@/components/ui/Screen';
import { Button } from '@/components/ui/Button';
import { Card, Pill, IconBadge } from '@/components/ui/Surface';
import { AreaChart, RingGauge } from '@/components/ui/Charts';
import { colors } from '@/theme/tokens';
import { formatCurrency } from '@/lib/format';

const QUEUE: { icon: IconName; title: string; when: string; amount: string; positive: boolean }[] = [
  { icon: 'home', title: 'Apartment Lease', when: 'D3 • Auto-debit scheduled', amount: '-₹7,000.00', positive: false },
  { icon: 'payments', title: 'Contract Retainer Inflow', when: 'D5 • Wire transfer', amount: '+₹8,000.00', positive: true },
  { icon: 'wifi', title: 'Broadband & Utilities', when: 'D8 • Standing mandate', amount: '-₹1,850.00', positive: false },
];

export default function StableFinancialState() {
  const [expanded, setExpanded] = useState(false);

  return (
    <Screen
      title="Stable State"
      subtitle="Autonomous Guard Active"
      avatar
      tabBarSpacing
      actions={[{ icon: 'notifications', label: 'Notifications', onPress: () => router.push('/notifications') }]}
      contentClassName="gap-space-lg"
    >
      <View className="flex-row items-center justify-between">
        <Text className="font-body-sm text-body-sm text-on-surface-variant">
          Normal Baseline Horizon • D1 to D14
        </Text>
        <Pill label="Sync: 2m ago" icon="history_toggle_off" tone="positive" />
      </View>

      {/* Hero solvency */}
      <Card className="items-center">
        <View className="flex-row items-center justify-between self-stretch">
          <Pill label="HEALTHY & OPTIMAL" icon="verified_user" tone="positive" uppercase />
          <Text className="font-label-sm text-label-sm text-on-surface-variant">Autonomous Guard</Text>
        </View>

        <View className="my-5">
          <RingGauge value={0.94} size={170} stroke={13} color={colors.secondary}>
            <View className="flex-row items-baseline">
              <Text className="font-display-hero text-display-hero text-on-surface">94</Text>
              <Text className="font-label-md text-label-md text-on-surface-variant">/100</Text>
            </View>
            <Text className="font-label-sm text-label-sm text-on-surface-variant">Resilience</Text>
          </RingGauge>
        </View>

        <Text className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">
          Safe-to-Spend Today
        </Text>
        <View className="mt-1 flex-row items-center gap-2">
          <Text className="font-numeral-display text-numeral-display text-secondary">
            {formatCurrency(6050)}
          </Text>
          <Icon name="check_circle" size={20} className="text-secondary" />
        </View>
        <View className="mt-1 flex-row items-center gap-1.5">
          <Icon name="sentiment_satisfied" size={14} className="text-on-surface-variant" />
          <Text className="font-body-sm text-body-sm text-on-surface-variant">
            Comfortable spending cushion
          </Text>
        </View>

        <View className="mt-4 flex-row gap-2.5 self-stretch rounded-xl bg-surface-container-low p-3">
          <Icon name="shield" size={16} className="text-secondary" />
          <Text className="flex-1 font-body-sm text-body-sm text-on-surface-variant">
            All upcoming <Text className="text-on-surface">5 obligations</Text> covered with{' '}
            <Text className="text-on-surface">₹5,650</Text> untouchable buffer fully intact.
          </Text>
        </View>
      </Card>

      {/* Health metrics 2x2 */}
      <View className="flex-row flex-wrap gap-space-md">
        {[
          { label: 'Liquid Balance', icon: 'account_balance_wallet' as IconName, value: '₹15,500', sub: 'Ready & unencumbered', fg: 'text-on-surface' },
          { label: 'Inflows (7d)', icon: 'arrow_downward_alt' as IconName, value: '+₹8,000', sub: 'On-time 98% prob.', fg: 'text-secondary' },
          { label: 'Commitments', icon: 'event_repeat' as IconName, value: '-₹10,000', sub: '5 obligations tracked', fg: 'text-on-surface' },
          { label: 'Buffer Surplus', icon: 'lock' as IconName, value: '+₹3,450', sub: 'Protected headroom', fg: 'text-secondary' },
        ].map((m) => (
          <Card key={m.label} tone="low" className="w-[47%] flex-1 p-4">
            <View className="flex-row items-center justify-between">
              <Text className="font-label-sm text-label-sm text-on-surface-variant">{m.label}</Text>
              <Icon name={m.icon} size={14} className="text-on-surface-variant" />
            </View>
            <Text className={`mt-1.5 font-headline-sm text-headline-sm ${m.fg}`}>{m.value}</Text>
            <Text className="mt-0.5 font-label-sm text-label-sm text-on-surface-variant">{m.sub}</Text>
          </Card>
        ))}
      </View>

      {/* Trajectory */}
      <Card>
        <View className="flex-row items-start justify-between">
          <View className="flex-row items-center gap-2">
            <Icon name="show_chart" size={18} className="text-secondary" />
            <View>
              <Text className="font-headline-sm text-headline-sm text-on-surface">Liquidity Trajectory</Text>
              <Text className="font-body-sm text-body-sm text-on-surface-variant">
                7-day continuous simulation
              </Text>
            </View>
          </View>
          <Pill label="Safe" icon="security" tone="positive" />
        </View>

        <View className="mt-space-md">
          <AreaChart
            height={170}
            series={[{ data: [15500, 12000, 8500, 9000, 16500, 15800, 15200], color: colors.secondary, fill: true }]}
          />
        </View>

        <View className="mt-3 flex-row justify-between">
          {[
            { d: 'D1', v: '₹15.5k' },
            { d: 'D3 Rent', v: '₹8.5k' },
            { d: 'D5 Inflow', v: '+₹16.5k' },
            { d: 'D7', v: '₹15.2k' },
          ].map((x) => (
            <View key={x.d} className="items-center">
              <Text className="font-label-sm text-label-sm text-on-surface-variant">{x.d}</Text>
              <Text className="font-label-md text-label-md text-on-surface">{x.v}</Text>
            </View>
          ))}
        </View>
      </Card>

      {/* Watchdog */}
      <Card tone="low" className="p-4">
        <View className="flex-row items-center gap-3">
          <IconBadge name="smart_toy" bg="bg-surface-container" fg="text-secondary" />
          <View className="flex-1">
            <Text className="font-label-lg text-label-lg text-on-surface">
              Autonomous Monitoring Active
            </Text>
          </View>
          <Icon name="check" size={18} className="text-secondary" />
        </View>
        <Text className="mt-2 font-body-sm text-body-sm text-on-surface-variant">
          No liquidity compression detected in the 14-day pipeline. Zero proactive interventions required.
        </Text>

        <View className="mt-3 flex-row items-center justify-between rounded-xl bg-surface-container p-3">
          <View className="flex-1 flex-row items-center gap-2">
            <Icon name="verified" size={14} className="text-secondary" />
            <View className="flex-1">
              <Text className="font-label-md text-label-md text-on-surface">
                Auto-Defense Engine Calibrated
              </Text>
              <Text className="font-label-sm text-label-sm text-on-surface-variant">
                Locks auto-fire if balance dips under ₹5.6k
              </Text>
            </View>
          </View>
          <Icon name="info" size={14} className="text-on-surface-variant" />
        </View>
      </Card>

      <View className="gap-3">
        <Button
          title="Inject Test Stress Scenario"
          icon="arrow_forward"
          iconTrailing
          onPress={() => router.push('/demo')}
        />
        <Button
          title="View Granular Cashflow Breakdown"
          icon={expanded ? 'unfold_more' : 'expand_more'}
          iconTrailing
          variant="secondary"
          onPress={() => setExpanded((v) => !v)}
        />
      </View>

      {/* Expandable queue */}
      {expanded ? (
        <Card tone="low" className="gap-3 p-4">
          <Text className="font-label-lg text-label-lg text-on-surface">Scheduled 14-Day Queue</Text>
          {QUEUE.map((q, i) => (
            <View key={q.title}>
              {i > 0 ? <View className="mb-3 h-px bg-surface-container-high" /> : null}
              <View className="flex-row items-center gap-3">
                <IconBadge
                  name={q.icon}
                  bg="bg-surface-container"
                  fg={q.positive ? 'text-secondary' : 'text-on-surface-variant'}
                />
                <View className="flex-1">
                  <Text className="font-label-lg text-label-lg text-on-surface">{q.title}</Text>
                  <Text className="font-body-sm text-body-sm text-on-surface-variant">{q.when}</Text>
                </View>
                <Text
                  className={`font-label-lg text-label-lg ${q.positive ? 'text-secondary' : 'text-on-surface'}`}
                >
                  {q.amount}
                </Text>
              </View>
            </View>
          ))}
        </Card>
      ) : null}
    </Screen>
  );
}
