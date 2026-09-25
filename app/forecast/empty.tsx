import { router } from 'expo-router';
import { Text, View } from 'react-native';
import { Icon } from '@/components/Icon';
import type { IconName } from '@/components/glyphs';
import { Screen } from '@/components/ui/Screen';
import { Button } from '@/components/ui/Button';
import { Card, Pill, IconBadge } from '@/components/ui/Surface';
import { RingGauge } from '@/components/ui/Charts';
import { colors } from '@/theme/tokens';

const PREREQS: { icon: IconName; title: string; body: string; done: boolean; action?: string }[] = [
  {
    icon: 'check_circle',
    title: '1. Bank Account Linked',
    body: 'Apex Checking ending in 8492',
    done: true,
  },
  {
    icon: 'payments',
    title: '2. Recurring Income Scheduled',
    body: 'Payroll, retainer, or direct deposit',
    done: false,
    action: 'Configure',
  },
  {
    icon: 'receipt',
    title: '3. Fixed Mandates Declared',
    body: 'Rent, insurance, cloud subscriptions',
    done: false,
    action: 'Add Mandates',
  },
];

export default function EmptyForecastState() {
  return (
    <Screen
      title="Forecast"
      subtitle="Guardian Enclave"
      avatar
      tabBarSpacing
      actions={[{ icon: 'notifications', label: 'Notifications', onPress: () => router.push('/notifications') }]}
      contentClassName="gap-space-lg"
    >
      {/* Horizon tabs */}
      <View className="flex-row gap-1 rounded-xl bg-surface-container-low p-1.5">
        <View className="flex-1 rounded-lg bg-surface-container-highest px-3 py-2">
          <Text className="text-center font-label-md text-label-md text-on-surface">7-Day</Text>
        </View>
        {['14-Day', 'Historical'].map((t) => (
          <View key={t} className="flex-1 rounded-lg px-3 py-2">
            <Text className="text-center font-label-md text-label-md text-on-surface-variant">{t}</Text>
          </View>
        ))}
      </View>

      {/* Calibrating gauge */}
      <Card className="items-center">
        <Text className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">
          Projected Balance
        </Text>
        <View className="my-4">
          <RingGauge value={0} size={150} stroke={12} color={colors.outline}>
            <Icon name="sync" size={26} className="text-on-surface-variant" />
            <Text className="mt-2 font-headline-sm text-headline-sm text-on-surface-variant">
              Calibrating...
            </Text>
          </RingGauge>
        </View>
        <Text className="text-center font-label-sm text-label-sm text-on-surface-variant">
          Guardian Core: Synthesizing ledger variance (0/3 cycles detected)
        </Text>
      </Card>

      {/* Empty state copy */}
      <Card tone="low" className="items-center py-8">
        <View className="h-20 w-20 items-center justify-center rounded-full bg-surface-container">
          <Icon name="query_stats" size={36} className="text-primary-container" />
        </View>
        <Text className="mt-5 text-center font-headline-sm text-headline-sm text-on-surface">
          Insufficient Data for Reliable Forecast
        </Text>
        <Text className="mt-2 text-center font-body-md text-body-md text-on-surface-variant">
          Guardian's neural predictive core requires at least 3 historical transaction cycles or 1 verified
          recurring income source to generate high-confidence forward cashflow predictions.
        </Text>
      </Card>

      {/* Prerequisites matrix */}
      <View className="gap-space-sm">
        <View className="flex-row items-center justify-between">
          <Text className="font-headline-sm text-headline-sm text-on-surface">Prerequisites Matrix</Text>
          <Pill label="1 of 3 Verified" tone="warning" />
        </View>

        <Card tone="low" className="gap-3 p-4">
          {PREREQS.map((p, i) => (
            <View key={p.title}>
              {i > 0 ? <View className="mb-3 h-px bg-surface-container-high" /> : null}
              <View className="flex-row items-center gap-3">
                <IconBadge
                  name={p.icon}
                  bg="bg-surface-container"
                  fg={p.done ? 'text-secondary' : 'text-on-surface-variant'}
                />
                <View className="flex-1">
                  <Text className="font-label-lg text-label-lg text-on-surface">{p.title}</Text>
                  <Text className="font-body-sm text-body-sm text-on-surface-variant">{p.body}</Text>
                </View>
                {p.done ? (
                  <Pill label="Ready" tone="positive" />
                ) : (
                  <Button
                    title={p.action!}
                    variant="secondary"
                    full={false}
                    className="h-9 px-4"
                    onPress={() =>
                      router.push(p.action === 'Configure' ? '/settings/income' : '/settings/expense-categories')
                    }
                  />
                )}
              </View>
            </View>
          ))}
        </Card>
      </View>

      {/* Autonomous calibration note */}
      <Card tone="low" className="flex-row gap-3 p-4">
        <IconBadge name="radar" bg="bg-surface-container" fg="text-primary-container" />
        <View className="flex-1">
          <Text className="font-label-lg text-label-lg text-on-surface">Autonomous Calibration</Text>
          <Text className="mt-1 font-body-sm text-body-sm text-on-surface-variant">
            Guardian continuously cross-verifies upcoming obligations even while offline.
          </Text>
        </View>
      </Card>

      <View className="gap-3">
        <Button
          title="Setup Recurring Income & Mandates"
          icon="arrow_forward"
          iconTrailing
          onPress={() => router.push('/settings/income')}
        />
        <Button
          title="Load Demo Sample Data for Testing"
          icon="science"
          variant="secondary"
          onPress={() => router.push('/demo')}
        />
      </View>
    </Screen>
  );
}
