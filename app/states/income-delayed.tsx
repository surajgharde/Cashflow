import { router } from 'expo-router';
import { Text, View } from 'react-native';
import { Icon } from '@/components/Icon';
import { Screen } from '@/components/ui/Screen';
import { Button } from '@/components/ui/Button';
import { Card, Pill, IconBadge, ProgressBar } from '@/components/ui/Surface';
import { AreaChart } from '@/components/ui/Charts';
import { colors } from '@/theme/tokens';

export default function IncomeDelayedState() {
  return (
    <Screen
      title="Income Delayed"
      subtitle="SIM ACTIVE"
      avatar
      contentClassName="gap-space-lg"
    >
      <View>
        <Text className="font-headline-sm text-headline-sm text-on-surface">
          Simulated Anomaly: Freelance Retainer Lag
        </Text>
        <Text className="mt-1 font-body-sm text-body-sm text-on-surface-variant">
          Real-time dynamic recalculation triggered by automated treasury ledger hook.
        </Text>
      </View>

      {/* Anomaly hero */}
      <Card>
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            <Icon name="warning" size={18} className="text-error" />
            <Text className="font-label-lg text-label-lg text-on-surface">
              Inflow Asymmetry Detected
            </Text>
          </View>
          <Pill label="+48H SHIFT" tone="danger" uppercase />
        </View>

        <Text className="mt-2 font-body-md text-body-md text-on-surface-variant">
          Studio X Tech Freelance Retainer (₹8,000) shifted from Oct 28 to Oct 30 (+48h disbursement
          variance).
        </Text>
      </Card>

      {/* Recalibration */}
      <Card tone="low" className="p-4">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            <Icon name="speed" size={18} className="text-primary-container" />
            <Text className="font-label-lg text-label-lg text-on-surface">
              Safe-to-Spend Recalibration
            </Text>
          </View>
          <Pill label="-52.9%" tone="danger" />
        </View>

        <View className="mt-3 flex-row items-baseline gap-3">
          <Text className="font-numeral-display text-numeral-display text-error">₹2,850</Text>
          <Text className="font-headline-sm text-headline-sm text-on-surface-variant line-through">
            ₹6,050
          </Text>
        </View>

        <View className="mt-2">
          <ProgressBar value={0.47} tone="bg-error" height={6} />
        </View>
        <Text className="mt-1.5 font-label-sm text-label-sm text-error">
          -₹3,200 Immediate Compression
        </Text>
      </Card>

      {/* Floor + corridor */}
      <View className="flex-row gap-space-md">
        <Card tone="low" className="flex-1 p-4">
          <View className="flex-row items-center justify-between">
            <Text className="font-label-sm text-label-sm text-on-surface-variant">Floor Oct 27</Text>
            <Icon name="trending_down" size={14} className="text-error" />
          </View>
          <Text className="mt-1 font-headline-md text-headline-md text-error">₹1,200</Text>
          <Text className="mt-1 font-label-sm text-label-sm text-on-surface-variant">
            Breaches ₹5,650 by -₹4,450
          </Text>
        </Card>

        <Card tone="low" className="flex-1 p-4">
          <View className="flex-row items-center justify-between">
            <Text className="font-label-sm text-label-sm text-on-surface-variant">Shortfall Corridor</Text>
            <Icon name="timer" size={14} className="text-primary-container" />
          </View>
          <Text className="mt-1 font-headline-md text-headline-md text-on-surface">48 Hours</Text>
          <Text className="mt-1 font-label-sm text-label-sm text-on-surface-variant">
            Between rent & invoice inflow
          </Text>
        </Card>
      </View>

      {/* Trajectory */}
      <Card>
        <View className="flex-row items-start justify-between">
          <View>
            <Text className="font-headline-sm text-headline-sm text-on-surface">
              Dynamic Liquidity Trajectory
            </Text>
            <Text className="font-body-sm text-body-sm text-on-surface-variant">
              7-Day Forward Simulation
            </Text>
          </View>
          <View className="items-end gap-1">
            <View className="flex-row items-center gap-1.5">
              <View className="h-1 w-2.5 rounded-full bg-outline" />
              <Text className="font-label-sm text-label-sm text-on-surface-variant">Baseline</Text>
            </View>
            <View className="flex-row items-center gap-1.5">
              <View className="h-1 w-2.5 rounded-full bg-error" />
              <Text className="font-label-sm text-label-sm text-on-surface-variant">Shifted</Text>
            </View>
          </View>
        </View>

        <View className="mt-space-md">
          <AreaChart
            height={170}
            markerIndex={3}
            series={[
              { data: [12500, 11800, 9500, 2500, 2100, 10100, 9800], color: colors.outline, dashed: true },
              { data: [12500, 11800, 9500, 1200, 900, 800, 8800], color: colors.error, fill: true },
              { data: [5650, 5650, 5650, 5650, 5650, 5650, 5650], color: colors.primaryContainer, dashed: true },
            ]}
            labels={['D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7']}
          />
        </View>

        <View className="mt-3 gap-2">
          <View className="flex-row items-center gap-2 rounded-xl bg-surface-container-low p-3">
            <Icon name="home" size={14} className="text-error" />
            <Text className="flex-1 font-label-sm text-label-sm text-on-surface-variant">
              Day 4 Rent: -₹7,000 deduction
            </Text>
          </View>
          <View className="flex-row items-center gap-2 rounded-xl bg-surface-container-low p-3">
            <Icon name="payments" size={14} className="text-secondary" />
            <Text className="flex-1 font-label-sm text-label-sm text-on-surface-variant">
              Day 6 Inflow: +₹8,000 clears
            </Text>
          </View>
        </View>
      </Card>

      {/* Risk engine narrative */}
      <Card tone="low" className="p-4">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            <Icon name="psychology" size={18} className="text-primary-container" />
            <Text className="font-label-lg text-label-lg text-on-surface">Algorithmic Risk Engine</Text>
          </View>
          <Pill label="AUTONOMOUS" tone="accent" uppercase />
        </View>
        <Text className="mt-2 font-body-sm text-body-sm text-on-surface-variant">
          Why did Safe-to-Spend drop? The system pre-emptively reduced discretionary allowances to prevent an
          impending bank overdraft during the 48-hour lag window.
        </Text>
      </Card>

      <View className="gap-3">
        <Button
          title="View AI Protective Interventions (2)"
          icon="auto_fix_high"
          onPress={() => router.push('/recommendations')}
        />
        <Button
          title="Proceed to Increased Risk State"
          icon="arrow_forward"
          iconTrailing
          variant="secondary"
          onPress={() => router.push('/states/increased-risk')}
        />
      </View>
    </Screen>
  );
}
