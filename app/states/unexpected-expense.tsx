import { router } from 'expo-router';
import { Text, View } from 'react-native';
import { Icon } from '@/components/Icon';
import { Screen } from '@/components/ui/Screen';
import { Button } from '@/components/ui/Button';
import { Card, Pill, IconBadge, ProgressBar } from '@/components/ui/Surface';
import { BarChart } from '@/components/ui/Charts';
import { colors } from '@/theme/tokens';

export default function UnexpectedExpenseState() {
  return (
    <Screen title="Unexpected Expense" subtitle="SIM ACTIVE" avatar contentClassName="gap-space-lg">
      <View className="flex-row items-center justify-between">
        <Text className="font-body-sm text-body-sm text-on-surface-variant">
          Discretionary & Outflow Shock Event
        </Text>
        <Pill label="#SHOCK-892" />
      </View>

      {/* Shock hero */}
      <Card>
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            <Icon name="crisis_alert" size={18} className="text-error" />
            <Text className="font-label-lg text-label-lg text-on-surface">
              Unplanned Outflow Detected
            </Text>
          </View>
          <Text className="font-label-sm text-label-sm text-on-surface-variant">Today, 14:26</Text>
        </View>

        <Text className="mt-4 font-display-hero text-display-hero text-error">-₹2,500.00</Text>

        <View className="mt-2 flex-row items-center gap-2">
          <Icon name="car_repair" size={16} className="text-on-surface-variant" />
          <Text className="flex-1 font-body-md text-body-md text-on-surface-variant">
            Express Transmission Hub • Urgent Auto Repair
          </Text>
          <Icon name="fmd_bad" size={16} className="text-error" />
        </View>
      </Card>

      {/* Impact dynamics */}
      <View className="gap-space-sm">
        <View className="flex-row items-center justify-between">
          <Text className="font-headline-sm text-headline-sm text-on-surface">Impact Dynamics</Text>
          <Pill label="Real-time sync" icon="sync_alt" tone="positive" />
        </View>

        <View className="flex-row gap-space-md">
          <Card tone="low" className="flex-1 p-4">
            <View className="flex-row items-center justify-between">
              <Text className="font-label-sm text-label-sm text-on-surface-variant">Liquid Balance</Text>
              <Icon name="account_balance_wallet" size={14} className="text-on-surface-variant" />
            </View>
            <Text className="mt-1.5 font-headline-sm text-headline-sm text-on-surface">₹10,000.00</Text>
            <View className="mt-1 flex-row items-center gap-1">
              <Icon name="arrow_downward" size={11} className="text-error" />
              <Text className="font-label-sm text-label-sm text-error">-20.0% sudden drop</Text>
            </View>
          </Card>

          <Card tone="low" className="flex-1 p-4">
            <Text className="font-label-sm text-label-sm text-on-surface-variant">Safe-to-Spend</Text>
            <Text className="mt-1.5 font-headline-sm text-headline-sm text-error">₹1,950.00</Text>
            <View className="mt-1 flex-row items-center gap-1">
              <Icon name="warning" size={11} className="text-error" />
              <Text className="font-label-sm text-label-sm text-error">SQUEEZE WARNING</Text>
            </View>
          </Card>
        </View>
      </View>

      {/* Buffer exposure */}
      <Card tone="low" className="p-4">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            <Icon name="shield_with_heart" size={18} className="text-error" />
            <Text className="font-label-lg text-label-lg text-on-surface">Safety Buffer Exposure</Text>
          </View>
          <Pill label="34% Capacity" tone="danger" />
        </View>

        <View className="mt-3">
          <ProgressBar value={0.34} tone="bg-error" height={8} />
        </View>

        <Text className="mt-3 font-body-sm text-body-sm text-on-surface-variant">
          Buffer compressed to 34% capacity before impending Oct 27 rent NACH mandate. Margin of absorption
          critically low.
        </Text>
      </Card>

      {/* Stress telemetry */}
      <Card>
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            <Icon name="speed" size={18} className="text-primary-container" />
            <Text className="font-headline-sm text-headline-sm text-on-surface">
              Stress Telemetry & Vectors
            </Text>
          </View>
          <Pill label="High Volatility" tone="danger" />
        </View>

        <View className="mt-3 flex-row items-center justify-between">
          <Text className="font-label-sm text-label-sm text-on-surface-variant">30-Day Mean Pace</Text>
          <Pill label="+38% Surge" icon="trending_up" tone="danger" />
        </View>

        <View className="mt-space-md">
          <BarChart
            height={120}
            highlightIndex={6}
            data={[
              { value: 1800, color: colors.surfaceContainerHighest },
              { value: 1650, color: colors.surfaceContainerHighest },
              { value: 1900, color: colors.surfaceContainerHighest },
              { value: 2100, color: colors.surfaceContainerHighest },
              { value: 1750, color: colors.surfaceContainerHighest },
              { value: 2000, color: colors.surfaceContainerHighest },
              { value: 4300, color: colors.error },
            ]}
          />
        </View>

        <View className="mt-3 flex-row justify-between">
          <Text className="font-label-sm text-label-sm text-on-surface-variant">Baseline: ₹1,800/d</Text>
          <Text className="font-label-sm text-label-sm text-error">Today: ₹4,300/d</Text>
        </View>
      </Card>

      {/* Bill cluster */}
      <View className="gap-space-sm">
        <Text className="font-headline-sm text-headline-sm text-on-surface">Immediate Bill Cluster</Text>

        <Card tone="low" className="gap-3 p-4">
          <View className="flex-row items-center gap-3">
            <IconBadge name="bolt" bg="bg-surface-container" fg="text-primary-container" />
            <View className="flex-1">
              <Text className="font-label-lg text-label-lg text-on-surface">BESCOM Power</Text>
              <Text className="font-body-sm text-body-sm text-on-surface-variant">Due in 24 hours</Text>
            </View>
            <Text className="font-label-lg text-label-lg text-on-surface">₹3,000.00</Text>
          </View>

          <View className="h-px bg-surface-container-high" />

          <View className="flex-row items-center gap-3">
            <IconBadge name="home" bg="bg-surface-container" fg="text-error" />
            <View className="flex-1">
              <Text className="font-label-lg text-label-lg text-on-surface">Apartment Rent NACH</Text>
              <Text className="font-body-sm text-body-sm text-on-surface-variant">
                Due in 72 hours (Oct 27)
              </Text>
            </View>
            <Text className="font-label-lg text-label-lg text-on-surface">₹7,000.00</Text>
          </View>
        </Card>
      </View>

      {/* Net gap */}
      <Card tone="low" className="p-4">
        <View className="flex-row items-center justify-between">
          <Text className="font-label-sm text-label-sm text-on-surface-variant">
            Required Before Oct 28
          </Text>
          <Text className="font-label-lg text-label-lg text-on-surface">₹10,000.00</Text>
        </View>
        <View className="mt-2 flex-row items-center justify-between">
          <Text className="font-label-sm text-label-sm text-on-surface-variant">Current Available</Text>
          <Text className="font-label-lg text-label-lg text-on-surface">₹10,000.00</Text>
        </View>

        <View className="mt-3 flex-row items-center justify-between rounded-xl bg-error-container/30 p-3">
          <View className="flex-row items-center gap-2">
            <Icon name="priority_high" size={16} className="text-error" />
            <Text className="font-label-md text-label-md text-on-surface">Net Reserve Safety Margin</Text>
          </View>
          <Text className="font-label-lg text-label-lg text-error">₹0.00 (0%)</Text>
        </View>
      </Card>

      {/* Guardian nudge */}
      <Card tone="low" className="p-4">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            <Icon name="smart_toy" size={18} className="text-primary-container" />
            <Text className="font-label-lg text-label-lg text-on-surface">Guardian Protocol</Text>
          </View>
          <Pill label="ACTIVE" tone="positive" dot uppercase />
        </View>
        <Text className="mt-2 font-body-sm text-body-sm text-on-surface-variant">
          A <Text className="text-on-surface">zero-margin balance</Text> leaves your account vulnerable to
          accidental overdraft fees if micro-transactions occur. Immediate protective pacing recommended.
        </Text>
      </Card>

      <View className="gap-3">
        <Button
          title="Activate Emergency Buffer Guardrails"
          icon="lock_clock"
          onPress={() => router.push('/recommendations')}
        />
        <Button
          title="Simulate Pacing Adjustment"
          icon="tune"
          variant="secondary"
          onPress={() => router.push('/recommendations/modify')}
        />
      </View>
    </Screen>
  );
}
