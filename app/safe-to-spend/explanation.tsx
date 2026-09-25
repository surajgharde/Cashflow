import { router } from 'expo-router';
import { Text, View } from 'react-native';
import { Icon } from '@/components/Icon';
import type { IconName } from '@/components/glyphs';
import { Screen } from '@/components/ui/Screen';
import { Button } from '@/components/ui/Button';
import { Card, Pill, IconBadge } from '@/components/ui/Surface';
import { balances } from '@/data/mock';
import { formatCurrency } from '@/lib/format';

const DRIVERS: { icon: IconName; title: string; tag: string; tone: 'danger' | 'warning' | 'neutral'; body: string }[] = [
  {
    icon: 'fastfood',
    title: 'Unplanned Dining Out',
    tag: 'Primary Driver (-₹1,200)',
    tone: 'danger',
    body: 'Swiggy Gourmet & weekend dining velocity tracked ₹1,200 higher than baseline 30-day velocity.',
  },
  {
    icon: 'bolt',
    title: 'Scheduled Utility Debit',
    tag: 'Pre-lock Enforced',
    tone: 'warning',
    body: '₹3,000 electricity mandate due Oct 25. Guardian isolated liquidity 24h early to avert overdraft charges.',
  },
  {
    icon: 'schedule',
    title: 'Upcoming Inflow Gap',
    tag: 'Timing Mismatch',
    tone: 'neutral',
    body: 'Freelance settlement arrives Oct 28, forming a temporary 48h narrow liquidity corridor.',
  },
];

export default function SafeToSpendExplanation() {
  return (
    <Screen
      title="Why This Amount?"
      subtitle="Guardian Diagnostic Node"
      avatar
      actions={[{ icon: 'restart_alt', label: 'Reset' }, { icon: 'more_vert', label: 'More' }]}
      contentClassName="gap-space-lg"
    >
      <View className="flex-row justify-end">
        <Pill label="Realtime Analysis" tone="positive" dot />
      </View>

      {/* Delta comparison hero */}
      <Card>
        <View className="flex-row items-center justify-between">
          <Text className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">
            Compared With Yesterday
          </Text>
          <Icon name="insights" size={18} className="text-primary-container" />
        </View>

        <View className="mt-4 flex-row gap-3">
          <View className="flex-1 rounded-xl bg-surface-container-low p-4">
            <Text className="font-label-sm text-label-sm text-on-surface-variant">Yesterday</Text>
            <Text className="mt-1 font-headline-md text-headline-md text-on-surface-variant">
              {formatCurrency(balances.safeToSpendYesterday, { decimals: false })}
            </Text>
            <Text className="mt-0.5 font-label-sm text-label-sm text-on-surface-variant">Previous Limit</Text>
          </View>

          <View className="flex-1 rounded-xl bg-surface-container-high p-4">
            <View className="flex-row items-center justify-between">
              <Text className="font-label-sm text-label-sm text-on-surface-variant">Today</Text>
              <View className="flex-row items-center gap-0.5">
                <Icon name="arrow_downward" size={11} className="text-error" />
                <Text className="font-label-sm text-label-sm text-error">19.8%</Text>
              </View>
            </View>
            <Text className="mt-1 font-headline-md text-headline-md text-on-surface">
              {formatCurrency(balances.safeToSpend, { decimals: false })}
            </Text>
            <Text className="mt-0.5 font-label-sm text-label-sm text-primary-container">
              Calibrated Ceiling
            </Text>
          </View>
        </View>

        <View className="mt-3 items-center">
          <Pill label="-₹1,200 Shift Detected" icon="trending_down" tone="danger" />
        </View>

        <View className="mt-4 flex-row gap-2.5 rounded-xl bg-surface-container-low p-3">
          <Icon name="shield" size={16} className="text-primary-container" />
          <Text className="flex-1 font-body-sm text-body-sm text-on-surface-variant">
            Safe-to-Spend dropped by <Text className="text-on-surface">₹1,200</Text> to shield your ₹5,650
            emergency reserve ahead of tomorrow's BESCOM debit.
          </Text>
        </View>
      </Card>

      {/* Diagnostic breakdown */}
      <View className="gap-space-sm">
        <View className="flex-row items-center justify-between">
          <Text className="font-headline-sm text-headline-sm text-on-surface">Diagnostic Breakdown</Text>
          <Pill label="3 Root Factors" />
        </View>

        {DRIVERS.map((d) => (
          <Card key={d.title} tone="low" className="p-4">
            <View className="flex-row items-start gap-3">
              <IconBadge name={d.icon} bg="bg-surface-container" />
              <View className="flex-1">
                <View className="flex-row items-center justify-between">
                  <Text className="flex-1 font-label-lg text-label-lg text-on-surface">{d.title}</Text>
                </View>
                <Pill label={d.tag} tone={d.tone} className="mt-1" />
                <Text className="mt-2 font-body-sm text-body-sm text-on-surface-variant">{d.body}</Text>
              </View>
            </View>
          </Card>
        ))}
      </View>

      {/* Micro-goal */}
      <Card tone="low" className="flex-row gap-3 p-4">
        <IconBadge name="smart_toy" bg="bg-surface-container" fg="text-primary-container" />
        <View className="flex-1">
          <Text className="font-label-lg text-label-lg text-on-surface">Today's Micro-Goal</Text>
          <Text className="mt-1 font-body-sm text-body-sm text-on-surface-variant">
            Cap discretionary spend below{' '}
            <Text className="text-primary-container">
              {formatCurrency(balances.dailyRunway, { decimals: false })}
            </Text>{' '}
            today to stay stable until Oct 28.
          </Text>
        </View>
      </Card>

      <View className="gap-3">
        <Button
          title="Explore Protective Recommendations"
          icon="arrow_forward"
          iconTrailing
          onPress={() => router.push('/recommendations')}
        />
        <Button title="Acknowledge & Return" variant="secondary" onPress={() => router.back()} />
      </View>
    </Screen>
  );
}
