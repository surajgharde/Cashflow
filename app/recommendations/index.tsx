import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { Icon } from '@/components/Icon';
import { Screen } from '@/components/ui/Screen';
import { Button } from '@/components/ui/Button';
import { Card, Pill, IconBadge, ProgressBar } from '@/components/ui/Surface';
import { recommendations, riskState } from '@/data/mock';

export default function Recommendations() {
  return (
    <Screen
      title="Recommendations"
      subtitle="AI Cashflow Guardian Active"
      avatar
      tabBarSpacing
      actions={[{ icon: 'notifications', label: 'Notifications', onPress: () => router.push('/notifications') }]}
      contentClassName="gap-space-lg"
    >
      <View className="flex-row justify-end">
        <Pill label="Autonomous Mode" tone="positive" dot />
      </View>

      {/* Predictive alert banner */}
      <View>
        <Text className="font-headline-lg text-headline-lg text-on-surface">
          Autonomous Protective Interventions
        </Text>
        <Text className="mt-1 font-body-md text-body-md text-on-surface-variant">
          3 simulated actions available to avert ₹4,450 shortfall on Oct 27
        </Text>
      </View>

      {/* Impact hero */}
      <Card>
        <View className="flex-row items-center justify-between">
          <Text className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">
            Projected Defense Impact
          </Text>
          <Pill label="Live Model" icon="trending_up" tone="positive" />
        </View>

        <View className="mt-4 flex-row gap-3">
          <View className="flex-1 rounded-xl bg-surface-container-low p-4">
            <Text className="font-label-sm text-label-sm text-on-surface-variant">
              Total Liquidity Protected
            </Text>
            <Text className="mt-1 font-headline-md text-headline-md text-secondary">+₹2,299.00</Text>
            <View className="mt-1 flex-row items-center gap-1">
              <Icon name="lock_clock" size={11} className="text-on-surface-variant" />
              <Text className="font-label-sm text-label-sm text-on-surface-variant">Averts overdraft</Text>
            </View>
          </View>
          <View className="flex-1 rounded-xl bg-surface-container-low p-4">
            <Text className="font-label-sm text-label-sm text-on-surface-variant">Safe-to-Spend Boost</Text>
            <Text className="mt-1 font-headline-md text-headline-md text-primary-container">+₹1,500</Text>
            <Text className="mt-1 font-label-sm text-label-sm text-on-surface-variant">
              Free balance cushion
            </Text>
          </View>
        </View>

        {/* Resilience progression */}
        <View className="mt-4 gap-2 rounded-xl bg-surface-container-low p-4">
          <Text className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
            Cashflow Resilience Score
          </Text>
          <View className="flex-row items-center gap-2">
            <Text className="font-headline-md text-headline-md text-error">{riskState.score}</Text>
            <Icon name="arrow_forward" size={16} className="text-on-surface-variant" />
            <Text className="font-headline-md text-headline-md text-secondary">{riskState.targetScore}</Text>
            <Text className="font-label-md text-label-md text-on-surface-variant">/100</Text>
          </View>
          <ProgressBar value={riskState.targetScore / 100} tone="bg-secondary" height={6} />
          <View className="flex-row items-center justify-between">
            <Text className="font-label-sm text-label-sm text-on-surface-variant">Current: At Risk</Text>
            <Text className="font-label-sm text-label-sm text-secondary">Target: Fortified (+18 pts)</Text>
          </View>
        </View>
      </Card>

      {/* Prioritized interventions */}
      <View className="gap-space-sm">
        <View className="flex-row items-center justify-between">
          <Text className="font-headline-sm text-headline-sm text-on-surface">Prioritized Interventions</Text>
          <Pill label="Ranked by risk clearance" />
        </View>

        {recommendations.map((r) => (
          <Card key={r.id} tone="low" className="p-4">
            <View className="flex-row items-center justify-between">
              <Text className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                {r.kind}
              </Text>
              <Pill label={r.urgency} icon={r.urgencyIcon} tone="warning" />
            </View>

            <View className="mt-3 flex-row items-start gap-3">
              <IconBadge name={r.icon} size={40} iconSize={20} bg="bg-surface-container" fg="text-primary-container" />
              <View className="flex-1">
                <Text className="font-headline-sm text-headline-sm text-on-surface">{r.title}</Text>
                <Text className="mt-1 font-body-sm text-body-sm text-on-surface-variant">{r.body}</Text>
              </View>
            </View>

            <View className="mt-3 flex-row items-center justify-between rounded-xl bg-surface-container p-3">
              <Text className="font-label-sm text-label-sm text-on-surface-variant">{r.impactLabel}</Text>
              <Text className="font-label-md text-label-md text-secondary">{r.impact}</Text>
            </View>

            {/* Action cluster */}
            <View className="mt-3 flex-row gap-2">
              <Pressable
                accessibilityRole="button"
                onPress={() => router.push('/recommendations/confirmation')}
                className="flex-1 flex-row items-center justify-center gap-1.5 rounded-full bg-primary-container py-2.5"
              >
                <Icon name="check_circle" size={16} className="text-on-primary-fixed" />
                <Text className="font-label-md text-label-md text-on-primary-fixed">Accept</Text>
              </Pressable>
              <Pressable
                accessibilityRole="button"
                onPress={() => router.push('/recommendations/modify')}
                className="flex-1 flex-row items-center justify-center gap-1.5 rounded-full bg-surface-container-high py-2.5"
              >
                <Icon name="tune" size={16} className="text-on-surface" />
                <Text className="font-label-md text-label-md text-on-surface">Modify</Text>
              </Pressable>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Reject"
                onPress={() => router.push('/recommendations/feedback')}
                className="h-10 w-10 items-center justify-center rounded-full bg-surface-container-high"
              >
                <Icon name="close" size={18} className="text-on-surface-variant" />
              </Pressable>
            </View>

            <Pressable
              onPress={() => router.push('/recommendations/details')}
              className="mt-2 items-center py-1"
            >
              <Text className="font-label-sm text-label-sm text-primary-container">View full detail</Text>
            </Pressable>
          </Card>
        ))}
      </View>

      {/* Adaptive learning node */}
      <Card tone="low" className="flex-row gap-3 p-4">
        <IconBadge name="psychology" bg="bg-surface-container" fg="text-primary-container" />
        <View className="flex-1">
          <Text className="font-label-lg text-label-lg text-on-surface">
            Guardian Adaptive Learning Active
          </Text>
          <Text className="mt-1 font-body-sm text-body-sm text-on-surface-variant">
            You previously accepted 8 subscription pauses and modified 2 food caps. System adapts to your
            style.
          </Text>
        </View>
      </Card>

      <View className="gap-3">
        <Button
          title="Apply All Protections (+₹2,299)"
          icon="security"
          onPress={() => router.push('/recommendations/confirmation')}
        />
        <Button
          title="View Recommendation History"
          icon="arrow_forward"
          iconTrailing
          variant="secondary"
          onPress={() => router.push('/recommendations/history')}
        />
      </View>
    </Screen>
  );
}
