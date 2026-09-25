import { useState } from 'react';
import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { Icon } from '@/components/Icon';
import type { IconName } from '@/components/glyphs';
import { Screen } from '@/components/ui/Screen';
import { Button } from '@/components/ui/Button';
import { Card, Pill, IconBadge } from '@/components/ui/Surface';
import { RingGauge } from '@/components/ui/Charts';
import { colors } from '@/theme/tokens';
import { balances } from '@/data/mock';
import { formatCurrency } from '@/lib/format';

const SIMULATIONS: { label: string; icon: IconName; amount: number }[] = [
  { label: '₹2,500 Shopping', icon: 'shopping_bag', amount: 2500 },
  { label: '₹1,200 Dining', icon: 'restaurant', amount: 1200 },
  { label: '₹5,000 Trip', icon: 'flight_takeoff', amount: 5000 },
];

/** Safe-to-Spend hero screen (the export labels this destination "Forecast"). */
export default function SafeToSpend() {
  const [sim, setSim] = useState<number | null>(null);
  const remaining = balances.safeToSpend - (sim ?? 0);

  return (
    <Screen
      title="Forecast"
      subtitle="Real-Time Guardian AI"
      back={false}
      avatar
      tabBarSpacing
      actions={[{ icon: 'notifications', label: 'Notifications', onPress: () => router.push('/notifications') }]}
      contentClassName="gap-space-lg"
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-2">
          <View className="h-2 w-2 rounded-full bg-secondary" />
          <Text className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
            Engine Active & Synced
          </Text>
        </View>
        <Pill label="Shielded" icon="verified_user" tone="positive" />
      </View>

      {/* Hero safe-to-spend gauge */}
      <Card className="items-center">
        <View className="flex-row items-center gap-2 self-start">
          <Icon name="payments" size={18} className="text-primary-container" />
          <Text className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">
            Safe to Spend Today
          </Text>
        </View>

        <View className="my-5">
          <RingGauge value={balances.safeToSpend / balances.liquid} size={190} stroke={14}>
            <Text className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
              Available Now
            </Text>
            <View className="flex-row items-baseline">
              <Text className="font-headline-md text-headline-md text-on-surface">₹</Text>
              <Text className="font-display-hero text-display-hero text-on-surface">
                {balances.safeToSpend.toLocaleString('en-IN')}
              </Text>
            </View>
            <View className="mt-1 flex-row items-center gap-1">
              <Icon name="lock" size={12} className="text-on-surface-variant" />
              <Text className="font-label-sm text-label-sm text-on-surface-variant">Protected</Text>
            </View>
          </RingGauge>
        </View>

        <Text className="text-center font-body-sm text-body-sm text-on-surface-variant">
          Available for guilt-free non-essential spending right now without risking scheduled shortfalls or
          penalty overdrafts.
        </Text>

        <View className="mt-4 flex-row flex-wrap justify-center gap-2">
          <Pill label="100% Guaranteed Non-Negative" icon="check_circle" tone="positive" />
          <Pill label="Calculated 12m ago" icon="history" />
        </View>

        <Button
          title="Why this amount?"
          icon="lightbulb"
          variant="secondary"
          className="mt-5"
          onPress={() => router.push('/safe-to-spend/explanation')}
        />
      </Card>

      {/* Formula ledger */}
      <View className="gap-space-sm">
        <View className="flex-row items-center justify-between">
          <Text className="font-headline-sm text-headline-sm text-on-surface">Real-Time Formula Ledger</Text>
          <Pill label="Dynamic Auto-Adjust" />
        </View>

        <Card tone="low" className="gap-3 p-4">
          {[
            { label: 'Available In Bank', icon: 'account_balance_wallet' as IconName, value: `+${formatCurrency(balances.liquid, { decimals: false })}`, sub: 'Cleared deposits', fg: 'text-secondary' },
            { label: 'Expected Inflows (7d)', icon: 'trending_up' as IconName, value: `+${formatCurrency(balances.expectedInflows, { decimals: false })}`, sub: 'Confirmed client invoice', fg: 'text-secondary' },
            { label: 'Essential Bills', icon: 'event_repeat' as IconName, value: `-${formatCurrency(balances.essentialCommitments, { decimals: false })}`, sub: 'Rent, Utilities, EMI', fg: 'text-error' },
            { label: 'Untouchable Buffer', icon: 'shield' as IconName, value: `-${formatCurrency(balances.buffer, { decimals: false })}`, sub: 'Zero-risk cushion', fg: 'text-on-surface' },
          ].map((r, i) => (
            <View key={r.label}>
              {i > 0 ? <View className="mb-3 h-px bg-surface-container-high" /> : null}
              <View className="flex-row items-center gap-3">
                <IconBadge name={r.icon} size={32} iconSize={16} bg="bg-surface-container" />
                <View className="flex-1">
                  <Text className="font-label-md text-label-md text-on-surface">{r.label}</Text>
                  <Text className="font-body-sm text-body-sm text-on-surface-variant">{r.sub}</Text>
                </View>
                <Text className={`font-label-lg text-label-lg ${r.fg}`}>{r.value}</Text>
              </View>
            </View>
          ))}
        </Card>
      </View>

      {/* Daily runway */}
      <Card tone="low" className="p-4">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            <Icon name="speed" size={18} className="text-primary-container" />
            <Text className="font-label-lg text-label-lg text-on-surface">Daily Safe Runway</Text>
          </View>
          <Text className="font-label-sm text-label-sm text-on-surface-variant">Optimal Spend Pace</Text>
        </View>

        <View className="mt-3 flex-row items-baseline gap-1">
          <Text className="font-numeral-display text-numeral-display text-primary-container">
            {formatCurrency(balances.dailyRunway, { decimals: false })}
          </Text>
          <Text className="font-label-md text-label-md text-on-surface-variant">/ day</Text>
        </View>
        <Text className="font-body-sm text-body-sm text-on-surface-variant">Next 7 days guaranteed</Text>

        <View className="mt-4 flex-row justify-between">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d, i) => (
            <View key={d} className="items-center gap-1.5">
              <View
                className={`w-6 rounded-full ${i < 4 ? 'bg-primary-container' : 'bg-surface-container-highest'}`}
                style={{ height: 34 - i * 2 }}
              />
              <Text className="font-label-sm text-label-sm text-on-surface-variant">{d}</Text>
            </View>
          ))}
        </View>
      </Card>

      {/* Spending simulator */}
      <Card tone="low" className="p-4">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            <Icon name="science" size={18} className="text-primary-container" />
            <Text className="font-label-lg text-label-lg text-on-surface">Simulate Before You Spend</Text>
          </View>
          <Pill label="Sandbox" />
        </View>
        <Text className="mt-2 font-body-sm text-body-sm text-on-surface-variant">
          Curious about a planned expense? Test the immediate impact without affecting live accounts.
        </Text>

        <View className="mt-3 flex-row flex-wrap gap-2">
          {SIMULATIONS.map((s) => {
            const active = sim === s.amount;
            return (
              <Pressable
                key={s.label}
                onPress={() => setSim(active ? null : s.amount)}
                accessibilityRole="button"
                className={`flex-row items-center gap-1.5 rounded-full px-3 py-2 ${
                  active ? 'bg-primary-container' : 'bg-surface-container-high'
                }`}
              >
                <Icon
                  name={s.icon}
                  size={14}
                  className={active ? 'text-on-primary-fixed' : 'text-on-surface-variant'}
                />
                <Text
                  className={`font-label-sm text-label-sm ${
                    active ? 'text-on-primary-fixed' : 'text-on-surface-variant'
                  }`}
                >
                  {s.label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {sim != null ? (
          <View
            className={`mt-3 flex-row items-center gap-2 rounded-xl p-3 ${
              remaining < 0 ? 'bg-error-container/30' : 'bg-surface-container'
            }`}
          >
            <Icon
              name={remaining < 0 ? 'warning' : 'info'}
              size={16}
              className={remaining < 0 ? 'text-error' : 'text-primary-container'}
            />
            <Text className="flex-1 font-body-sm text-body-sm text-on-surface-variant">
              Safe-to-Spend would fall to{' '}
              <Text className={remaining < 0 ? 'text-error' : 'text-on-surface'}>
                {formatCurrency(remaining)}
              </Text>
              {remaining < 0 ? ' — this breaches your buffer.' : ' and stays above your buffer.'}
            </Text>
            <Pressable onPress={() => setSim(null)} hitSlop={8}>
              <Text className="font-label-sm text-label-sm text-primary-container">Reset</Text>
            </Pressable>
          </View>
        ) : null}
      </Card>

      <View className="gap-3">
        <Button
          title="View Detailed Math Breakdown"
          icon="arrow_forward"
          iconTrailing
          onPress={() => router.push('/safe-to-spend/breakdown')}
        />
        <Button title="Recalculate Buffer Real-Time" icon="sync" variant="secondary" />
      </View>
    </Screen>
  );
}
