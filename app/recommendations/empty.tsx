import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { Icon } from '@/components/Icon';
import { Screen } from '@/components/ui/Screen';
import { Button } from '@/components/ui/Button';
import { Card, Pill, IconBadge } from '@/components/ui/Surface';
import { AreaChart, RingGauge } from '@/components/ui/Charts';
import { colors } from '@/theme/tokens';

export default function EmptyRecommendationsState() {
  return (
    <Screen
      title="Recommendations"
      subtitle="Guardian Enclave"
      avatar
      tabBarSpacing
      actions={[{ icon: 'notifications', label: 'Notifications', onPress: () => router.push('/notifications') }]}
      contentClassName="gap-space-lg"
    >
      {/* Status chip bar */}
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-2">
          <View className="h-2 w-2 rounded-full bg-secondary" />
          <Text className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
            Guardian Active Scan
          </Text>
          <Text className="font-label-sm text-label-sm text-on-surface-variant opacity-60">
            Updated 2m ago
          </Text>
        </View>
        <Pill label="Shield v4.2" icon="verified_user" tone="positive" />
      </View>

      {/* Celebration hero */}
      <Card className="items-center py-8">
        <View className="h-20 w-20 items-center justify-center rounded-full bg-secondary-container/20">
          <Icon name="done_all" size={40} className="text-secondary" />
        </View>

        <Text className="mt-5 text-center font-headline-lg text-headline-lg text-on-surface">
          All Clear — Zero Interventions Needed
        </Text>
        <Text className="mt-2 text-center font-body-md text-body-md text-on-surface-variant">
          Your upcoming 14-day cashflow trajectory is fully fortified. Safe-to-Spend remains well above your
          untouchable ₹5,650 safety floor.
        </Text>

        {/* Mini safety horizon sparkline */}
        <View className="mt-6 w-full">
          <AreaChart
            height={110}
            showGrid={false}
            series={[
              { data: [6100, 6400, 6800, 7100, 7600, 8200, 9400], color: colors.secondary, fill: true },
              { data: [5650, 5650, 5650, 5650, 5650, 5650, 5650], color: colors.outline, dashed: true },
            ]}
            labels={['D1', 'D3', 'D5', 'D7', 'D10', 'D12', 'D14']}
          />
          <View className="mt-2 flex-row items-center justify-between">
            <Text className="font-label-sm text-label-sm text-on-surface-variant">
              Safety Floor: ₹5,650
            </Text>
            <Text className="font-label-sm text-label-sm text-secondary">Peak Headroom: Day 14</Text>
          </View>
        </View>
      </Card>

      {/* Solvency snapshot */}
      <View className="gap-space-sm">
        <View className="flex-row items-center justify-between">
          <Text className="font-headline-sm text-headline-sm text-on-surface">Solvency Telemetry</Text>
          <Pill label="Strict Guard Mode" icon="lock" />
        </View>

        <Card tone="low" className="items-center p-5">
          <RingGauge value={0.98} size={140} stroke={11} color={colors.secondary}>
            <Text className="font-display-hero-mobile text-display-hero-mobile text-secondary">98%</Text>
            <Text className="font-label-sm text-label-sm text-on-surface-variant">Resilience</Text>
          </RingGauge>
          <View className="mt-3 flex-row gap-2">
            <Pill label="98 / 100" tone="positive" />
            <Pill label="Superior" />
          </View>
        </Card>

        <View className="flex-row gap-space-md">
          <Card tone="low" className="flex-1 p-4">
            <IconBadge name="trending_up" size={32} iconSize={16} bg="bg-surface-container" fg="text-secondary" />
            <Text className="mt-2 font-label-sm text-label-sm text-on-surface-variant">Buffer Headroom</Text>
            <Text className="font-headline-sm text-headline-sm text-secondary">+₹4,200</Text>
            <Text className="mt-0.5 font-label-sm text-label-sm text-on-surface-variant">
              Surplus cushion
            </Text>
          </Card>
          <Card tone="low" className="flex-1 p-4">
            <IconBadge name="event_available" size={32} iconSize={16} bg="bg-surface-container" fg="text-primary-container" />
            <Text className="mt-2 font-label-sm text-label-sm text-on-surface-variant">Mandates (14d)</Text>
            <Text className="font-headline-sm text-headline-sm text-on-surface">4 Scheduled</Text>
            <View className="mt-0.5 flex-row items-center gap-1">
              <Icon name="check_circle" size={11} className="text-secondary" />
              <Text className="font-label-sm text-label-sm text-secondary">100% Covered</Text>
            </View>
          </Card>
        </View>
      </View>

      {/* Continuous surveillance */}
      <Card tone="low" className="p-4">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            <Icon name="radar" size={18} className="text-primary-container" />
            <Text className="font-label-lg text-label-lg text-on-surface">Continuous Surveillance</Text>
          </View>
          <Pill label="Active" tone="positive" dot />
        </View>
        <Text className="mt-2 font-body-sm text-body-sm text-on-surface-variant">
          Guardian Neural Core scans transaction logs every 15 minutes. We will immediately alert you if an
          unexpected bill or inflow delay threatens your reserve.
        </Text>

        <View className="mt-3 flex-row gap-2">
          <Pill label="HDFC Recurrent Sync" tone="positive" dot />
          <Pill label="UPI Pulse Healthy" tone="positive" dot />
        </View>
      </Card>

      <View className="gap-3">
        <Button
          title="View 7-Day Forecast Trajectory"
          icon="arrow_forward"
          iconTrailing
          onPress={() => router.push('/forecast/7-day')}
        />
        <Button
          title="Adjust Spending Preferences & Guardrails"
          icon="tune"
          variant="secondary"
          onPress={() => router.push('/settings/spending-preferences')}
        />
      </View>

      <Pressable
        accessibilityRole="button"
        onPress={() => router.push('/recommendations/history')}
        className="flex-row items-center gap-3 rounded-2xl bg-surface-container p-4"
      >
        <Icon name="history" size={18} className="text-on-surface-variant" />
        <Text className="flex-1 font-label-md text-label-md text-on-surface">
          View Past Recommendation History (14 Resolved)
        </Text>
        <Icon name="chevron_right" size={18} className="text-on-surface-variant" />
      </Pressable>
    </Screen>
  );
}
