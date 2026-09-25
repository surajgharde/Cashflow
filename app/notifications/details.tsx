import { router } from 'expo-router';
import { Text, View } from 'react-native';
import { Icon } from '@/components/Icon';
import type { IconName } from '@/components/glyphs';
import { Screen } from '@/components/ui/Screen';
import { Button } from '@/components/ui/Button';
import { Card, Pill, IconBadge } from '@/components/ui/Surface';
import { RingGauge } from '@/components/ui/Charts';
import { colors } from '@/theme/tokens';

const INTERVENTIONS: { icon: IconName; title: string; body: string; amount: string; speed: string }[] = [
  {
    icon: 'motion_photos_paused',
    title: 'Pause OTT Subscription',
    body: 'Hotstar renewal due tomorrow',
    amount: '+₹799',
    speed: 'Instant',
  },
  {
    icon: 'restaurant',
    title: 'Cap Daily Dining',
    body: 'Limit to ₹450/day through Sunday',
    amount: '+₹1,050',
    speed: '3 Days',
  },
  {
    icon: 'bolt',
    title: 'Early Invoice Settlement',
    body: 'Studio X Tech milestone release',
    amount: '+₹8,000',
    speed: 'Accelerated',
  },
];

export default function NotificationDetails() {
  return (
    <Screen
      title="Notification Details"
      subtitle="Automated Guardian Dispatch"
      avatar
      actions={[{ icon: 'more_vert', label: 'More' }]}
      contentClassName="gap-space-lg"
    >
      <View className="flex-row items-center justify-between">
        <Pill label="Critical Alert" icon="warning" tone="danger" />
        <Text className="font-label-sm text-label-sm text-on-surface-variant">Oct 24, 02:45 PM</Text>
      </View>

      {/* Hero risk metric */}
      <Card className="items-center">
        <Text className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">
          Guardian Risk Metric
        </Text>

        <View className="my-4">
          <RingGauge value={0.68} size={150} stroke={12} color={colors.error}>
            <View className="flex-row items-baseline">
              <Text className="font-display-hero text-display-hero text-on-surface">68</Text>
              <Text className="font-label-md text-label-md text-on-surface-variant">/100</Text>
            </View>
          </RingGauge>
        </View>

        <Text className="text-center font-headline-md text-headline-md text-on-surface">
          Liquidity Compression Hazard Detected
        </Text>
        <Pill label="High Squeeze Threat" icon="shield" tone="danger" className="mt-3" />
      </Card>

      {/* Algorithmic forecast */}
      <Card tone="low" className="p-4">
        <View className="flex-row items-center gap-2">
          <Icon name="psychology" size={18} className="text-primary-container" />
          <Text className="font-label-lg text-label-lg text-on-surface">
            Algorithmic Forecast (96h Pipeline)
          </Text>
        </View>
        <Text className="mt-2 font-body-md text-body-md text-on-surface-variant">
          Guardian's predictive engine evaluated your upcoming 96-hour transaction pipeline and detected that
          your scheduled ₹3,000 BESCOM electricity mandate on Oct 25 and ₹7,000 apartment rent on Oct 27 will
          compress your account to ₹1,200. This will breach your untouchable ₹5,650 safety floor by -₹4,450.
        </Text>
      </Card>

      {/* Runway stats */}
      <View className="gap-space-sm">
        <View className="flex-row items-center justify-between">
          <Text className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
            Current Projected Runway
          </Text>
          <Pill label="Severe Deficit Threshold" tone="danger" />
        </View>

        <View className="flex-row gap-space-sm">
          {[
            { label: 'Projected Floor', value: '₹1,200', sub: 'Oct 27 Minimum', fg: 'text-error' },
            { label: 'Safety Deficit', value: '-₹4,450', sub: 'Buffer Breach', fg: 'text-error' },
            { label: 'Overdraft Risk', value: '42%', sub: 'If Unaddressed', fg: 'text-primary-container' },
          ].map((s) => (
            <Card key={s.label} tone="low" className="flex-1 p-3">
              <Text className="font-label-sm text-label-sm text-on-surface-variant">{s.label}</Text>
              <Text className={`mt-1 font-headline-sm text-headline-sm ${s.fg}`}>{s.value}</Text>
              <Text className="mt-0.5 font-label-sm text-label-sm text-on-surface-variant">{s.sub}</Text>
            </Card>
          ))}
        </View>
      </View>

      {/* Recommended interventions */}
      <View className="gap-space-sm">
        <View className="flex-row items-center justify-between">
          <Text className="font-headline-sm text-headline-sm text-on-surface">
            Recommended Interventions
          </Text>
          <Pill label="+₹9,849 Total Relief" tone="positive" />
        </View>

        <Card tone="low" className="gap-3 p-4">
          {INTERVENTIONS.map((x, i) => (
            <View key={x.title}>
              {i > 0 ? <View className="mb-3 h-px bg-surface-container-high" /> : null}
              <View className="flex-row items-center gap-3">
                <IconBadge name={x.icon} bg="bg-surface-container" fg="text-primary-container" />
                <View className="flex-1">
                  <Text className="font-label-lg text-label-lg text-on-surface">{x.title}</Text>
                  <Text className="font-body-sm text-body-sm text-on-surface-variant">{x.body}</Text>
                </View>
                <View className="items-end">
                  <Text className="font-label-lg text-label-lg text-secondary">{x.amount}</Text>
                  <Text className="font-label-sm text-label-sm text-on-surface-variant">{x.speed}</Text>
                </View>
              </View>
            </View>
          ))}
        </Card>
      </View>

      <View className="gap-3">
        <Button
          title="View Interventions & Take Action"
          icon="arrow_forward"
          iconTrailing
          onPress={() => router.push('/recommendations')}
        />
        <Button
          title="View Shortfall Prediction Timeline"
          icon="timeline"
          variant="secondary"
          onPress={() => router.push('/risk/shortfall')}
        />
        <Button title="Mark as Resolved" icon="check_circle" variant="ghost" onPress={() => router.back()} />
      </View>
    </Screen>
  );
}
