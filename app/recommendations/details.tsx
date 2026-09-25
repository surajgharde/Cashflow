import { router } from 'expo-router';
import { Text, View } from 'react-native';
import { Icon } from '@/components/Icon';
import { Screen } from '@/components/ui/Screen';
import { Button } from '@/components/ui/Button';
import { Card, Pill, IconBadge } from '@/components/ui/Surface';

export default function RecommendationDetails() {
  return (
    <Screen
      title="Recommendation Details"
      subtitle="Guardian Diagnostic Node"
      avatar
      actions={[{ icon: 'more_vert', label: 'More' }]}
      contentClassName="gap-space-lg"
    >
      <View className="flex-row justify-end">
        <Pill label="AUTONOMY ID #8492" />
      </View>

      {/* Hero */}
      <Card>
        <View className="flex-row items-center justify-between">
          <IconBadge
            name="pause_circle"
            size={44}
            iconSize={22}
            bg="bg-surface-container-high"
            fg="text-primary-container"
          />
          <Pill label="Urgent • Rec #01" icon="warning" tone="danger" />
        </View>

        <Text className="mt-4 font-headline-lg text-headline-lg text-on-surface">
          Pause Hotstar & OTT Subscriptions
        </Text>
        <Text className="mt-1 font-body-md text-body-md text-on-surface-variant">
          Auto-mandate safety intercept before rental debit cycle.
        </Text>

        <View className="mt-4 flex-row gap-3">
          <View className="flex-1 rounded-xl bg-surface-container-low p-4">
            <Text className="font-label-sm text-label-sm text-on-surface-variant">Net Buffer Impact</Text>
            <Text className="mt-1 font-headline-md text-headline-md text-secondary">+₹799.00</Text>
            <Text className="font-label-sm text-label-sm text-on-surface-variant">Protected</Text>
          </View>
          <View className="flex-1 rounded-xl bg-surface-container-low p-4">
            <Text className="font-label-sm text-label-sm text-on-surface-variant">Solvency Score</Text>
            <Text className="mt-1 font-headline-md text-headline-md text-primary-container">+12 pts</Text>
            <Text className="font-label-sm text-label-sm text-on-surface-variant">Resilience Index</Text>
          </View>
        </View>
      </Card>

      {/* Why recommended */}
      <Card tone="low" className="p-4">
        <View className="flex-row items-center gap-2">
          <Icon name="psychology" size={18} className="text-primary-container" />
          <Text className="font-label-lg text-label-lg text-on-surface">Why this was recommended</Text>
        </View>
        <Text className="mt-2 font-body-md text-body-md text-on-surface-variant">
          Your ₹799 Disney+ Hotstar annual auto-debit triggers on Oct 26 at 04:00 AM, exactly 29 hours before
          your scheduled ₹7,000 apartment rent NACH mandate.
        </Text>

        <View className="mt-4 gap-2">
          <View className="flex-row items-center justify-between rounded-xl bg-surface-container p-3">
            <Text className="font-label-md text-label-md text-on-surface-variant">
              Current Liquid Balance
            </Text>
            <Text className="font-label-lg text-label-lg text-on-surface">₹12,500</Text>
          </View>
          <View className="flex-row items-center justify-between rounded-xl bg-surface-container p-3">
            <Text className="flex-1 font-label-md text-label-md text-on-surface-variant">
              Rent (₹7,000) + BESCOM (₹3,000)
            </Text>
            <Text className="font-label-lg text-label-lg text-error">-₹10,000</Text>
          </View>
        </View>

        <View className="mt-3 flex-row gap-2.5 rounded-xl bg-error-container/30 p-3">
          <Icon name="report_problem" size={16} className="text-error" />
          <Text className="flex-1 font-body-sm text-body-sm text-on-surface-variant">
            Clearing this subscription narrows your emergency safety buffer to ₹1,200, critically violating
            your ₹5,650 safety threshold.
          </Text>
        </View>
      </Card>

      {/* Risk addressed */}
      <Card tone="low" className="p-4">
        <View className="flex-row items-center gap-2">
          <Icon name="security" size={18} className="text-primary-container" />
          <Text className="font-label-lg text-label-lg text-on-surface">Risk Being Addressed</Text>
        </View>
        <View className="mt-3 flex-row items-start gap-3">
          <IconBadge name="trending_down" bg="bg-surface-container" fg="text-error" />
          <View className="flex-1">
            <Text className="font-label-lg text-label-lg text-error">Overdraft Liquidity Hazard</Text>
            <Text className="mt-1 font-body-sm text-body-sm text-on-surface-variant">
              Avoids 42% probability of bank overdraft penalty (₹590 fee) on rent mandate failure.
            </Text>
          </View>
        </View>
      </Card>

      {/* Simulated scenarios */}
      <View className="gap-space-sm">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            <Icon name="query_stats" size={18} className="text-primary-container" />
            <Text className="font-headline-sm text-headline-sm text-on-surface">Simulated Scenarios</Text>
          </View>
          <Pill label="Monte Carlo 10k Runs" />
        </View>

        <View className="flex-row gap-3">
          <Card tone="low" className="flex-1 p-4">
            <Text className="font-label-sm text-label-sm text-on-surface-variant">Without Action</Text>
            <Icon name="cancel" size={20} className="mt-2 text-error" />
            <Text className="mt-2 font-headline-md text-headline-md text-error">₹1,200</Text>
            <Text className="font-label-sm text-label-sm text-error">Breached</Text>
            <View className="mt-3 flex-row items-center justify-between">
              <Text className="font-label-sm text-label-sm text-on-surface-variant">Risk Level</Text>
              <Text className="font-label-sm text-label-sm text-error">High</Text>
            </View>
          </Card>

          <Card tone="low" className="flex-1 p-4">
            <Text className="font-label-sm text-label-sm text-on-surface-variant">With Pause</Text>
            <Icon name="verified" size={20} className="mt-2 text-secondary" />
            <Text className="mt-2 font-headline-md text-headline-md text-secondary">₹3,499</Text>
            <Text className="font-label-sm text-label-sm text-secondary">Intact</Text>
            <View className="mt-3 flex-row items-center justify-between">
              <Text className="font-label-sm text-label-sm text-on-surface-variant">Risk Level</Text>
              <Text className="font-label-sm text-label-sm text-secondary">Low</Text>
            </View>
          </Card>
        </View>

        <Text className="text-center font-label-sm text-label-sm text-on-surface-variant">
          Held at ₹1,999 + Dining Cap = ₹3,499 protected headroom
        </Text>
      </View>

      {/* Execution protocol */}
      <Card tone="low" className="p-4">
        <View className="flex-row items-center gap-2">
          <Icon name="tune" size={18} className="text-primary-container" />
          <Text className="font-label-lg text-label-lg text-on-surface">Execution Protocol</Text>
        </View>
        <View className="mt-3 flex-row items-start gap-3">
          <IconBadge name="handshake" bg="bg-surface-container" />
          <View className="flex-1">
            <Text className="font-label-lg text-label-lg text-on-surface">
              User-Governed Autonomous Assist
            </Text>
            <Text className="mt-1 font-body-sm text-body-sm text-on-surface-variant">
              Simulated guidance: Guardian will direct you to pause recurring billing within the Hotstar app
              or temporarily toggle the UPI mandate lock via netbanking. No funds are transferred directly.
            </Text>
          </View>
        </View>
      </Card>

      {/* Action dock */}
      <View className="gap-3">
        <Button
          title="Accept Recommendation"
          icon="shield_with_heart"
          onPress={() => router.push('/recommendations/confirmation')}
        />
        <View className="flex-row gap-3">
          <Button
            title="Modify Parameters"
            icon="tune"
            variant="secondary"
            full={false}
            className="flex-1"
            onPress={() => router.push('/recommendations/modify')}
          />
          <Button
            title="Reject"
            variant="ghost"
            full={false}
            className="flex-1"
            onPress={() => router.push('/recommendations/feedback')}
          />
        </View>
      </View>
    </Screen>
  );
}
