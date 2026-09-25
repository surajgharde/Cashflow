import { router } from 'expo-router';
import { Text, View } from 'react-native';
import { Icon } from '@/components/Icon';
import type { IconName } from '@/components/glyphs';
import { Screen } from '@/components/ui/Screen';
import { Button } from '@/components/ui/Button';
import { Card, Pill, IconBadge, ProgressBar } from '@/components/ui/Surface';

type Event = {
  id: string;
  icon: IconName;
  event: string;
  sub: string;
  weight: string;
  quoteIcon: IconName;
  quote: string;
  ruleIcon: IconName;
  rule: string;
};

const EVENTS: Event[] = [
  {
    id: 'e1',
    icon: 'close',
    event: 'Event: Rejected ₹300 Dining Cap',
    sub: 'User feedback captured',
    weight: '94% Locked Rule',
    quoteIcon: 'record_voice_over',
    quote: '"Too restrictive for working lunches"',
    ruleIcon: 'psychology_alt',
    rule: 'Established ₹450/day as the permanent absolute comfort floor. Future interventions will never propose caps below ₹450.',
  },
  {
    id: 'e2',
    icon: 'security',
    event: 'Event: Rejected Gym & Health Mandate Cancellation',
    sub: 'Boundary defense active',
    weight: '100% Untouchable Vault',
    quoteIcon: 'record_voice_over',
    quote: '"Essential for health routine"',
    ruleIcon: 'verified_user',
    rule: 'Health & Fitness categories permanently shielded from algorithmic pause recommendations.',
  },
  {
    id: 'e3',
    icon: 'check',
    event: 'Event: Accepted OTT Streaming Pause',
    sub: 'Affirmative intervention',
    weight: '96% Primary Intervention',
    quoteIcon: 'task_alt',
    quote: 'Smooth pause execution with zero lifestyle disruption',
    ruleIcon: 'bolt',
    rule: 'Prioritize digital entertainment pauses as the primary first-line buffer defense.',
  },
];

export default function LearningCycleResult() {
  return (
    <Screen
      title="Learning Cycle Result"
      subtitle="Training Cycle 048-A"
      avatar
      contentClassName="gap-space-lg"
    >
      <View className="flex-row items-center justify-between">
        <Text className="flex-1 font-body-sm text-body-sm text-on-surface-variant">
          Neural Training Loop Completed • Model v4.8
        </Text>
        <Pill label="SYNAPSE ACTIVE" icon="neurology" tone="positive" />
      </View>

      {/* Hero milestone */}
      <Card className="items-center py-7">
        <View className="h-20 w-20 items-center justify-center rounded-full bg-surface-container-high">
          <Icon name="psychology" size={38} className="text-primary-container" />
        </View>
        <Pill label="Reinforcement State" icon="verified" tone="positive" className="mt-4" />
        <Text className="mt-3 text-center font-headline-lg text-headline-lg text-on-surface">
          Guardian Model Calibrated!
        </Text>
        <Text className="mt-2 text-center font-body-md text-body-md text-on-surface-variant">
          Your last 3 feedback interactions actively reshaped autonomous spending rules and prediction
          weights.
        </Text>

        <View className="mt-5 flex-row flex-wrap justify-center gap-2">
          <Pill label="3 Vector Weights Rewritten" icon="memory" />
          <Pill label="Zero Disruption Bias" icon="tune" />
        </View>
      </Card>

      {/* Feedback-to-model mapping */}
      <View className="gap-space-sm">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            <Icon name="hub" size={18} className="text-primary-container" />
            <Text className="font-headline-sm text-headline-sm text-on-surface">
              Feedback-to-Model Mapping
            </Text>
          </View>
          <Pill label="3 Events Ingested" />
        </View>

        {EVENTS.map((e) => (
          <Card key={e.id} tone="low" className="p-4">
            <View className="flex-row items-start gap-3">
              <IconBadge name={e.icon} size={32} iconSize={16} bg="bg-surface-container" />
              <View className="flex-1">
                <Text className="font-label-lg text-label-lg text-on-surface">{e.event}</Text>
                <Text className="mt-0.5 font-label-sm text-label-sm text-on-surface-variant">{e.sub}</Text>
              </View>
            </View>

            <Pill label={e.weight} tone="accent" className="mt-3" />

            {/* Ingestion quote */}
            <View className="mt-3 flex-row gap-2.5 rounded-xl bg-surface-container p-3">
              <Icon name={e.quoteIcon} size={14} className="text-on-surface-variant" />
              <Text className="flex-1 font-body-sm text-body-sm text-on-surface-variant">{e.quote}</Text>
            </View>

            {/* Learned rule */}
            <View className="mt-2 rounded-xl bg-surface-container p-3">
              <View className="flex-row items-center gap-2">
                <Icon name={e.ruleIcon} size={14} className="text-primary-container" />
                <Text className="font-label-sm text-label-sm uppercase tracking-wider text-primary-container">
                  Learned Autonomous Rule
                </Text>
              </View>
              <Text className="mt-1.5 font-body-sm text-body-sm text-on-surface-variant">{e.rule}</Text>
            </View>
          </Card>
        ))}
      </View>

      {/* Accuracy evolution */}
      <View className="gap-space-sm">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            <Icon name="insights" size={18} className="text-primary-container" />
            <Text className="font-headline-sm text-headline-sm text-on-surface">
              Model Accuracy Evolution
            </Text>
          </View>
          <Pill label="Auto-Tuned" tone="positive" dot />
        </View>

        <Card tone="low" className="p-4">
          <View className="flex-row items-center justify-between">
            <Text className="font-label-md text-label-md text-on-surface-variant">Alignment Score</Text>
            <Pill label="+7.2% / 30d" tone="positive" />
          </View>
          <Text className="mt-2 font-display-hero-mobile text-display-hero-mobile text-primary-container">
            88%
          </Text>
          <Text className="font-label-sm text-label-sm text-on-surface-variant">
            Personalized Accuracy
          </Text>

          <View className="mt-3">
            <ProgressBar value={0.88} height={6} />
          </View>
          <View className="mt-1.5 flex-row items-center justify-between">
            <Text className="font-label-sm text-label-sm text-on-surface-variant">
              Previous baseline: 80.8%
            </Text>
            <Text className="font-label-sm text-label-sm text-on-surface-variant">Target: 95.0%</Text>
          </View>
        </Card>

        <Card tone="low" className="flex-row items-center gap-3 p-4">
          <IconBadge name="shield" bg="bg-surface-container" fg="text-secondary" />
          <View className="flex-1">
            <Text className="font-label-lg text-label-lg text-on-surface">
              Buffer Breach Prevention Rate
            </Text>
            <Text className="mt-0.5 font-body-sm text-body-sm text-on-surface-variant">
              0 overdrafts incurred across cycles
            </Text>
          </View>
          <View className="items-end">
            <Text className="font-label-lg text-label-lg text-secondary">100%</Text>
            <Icon name="check_circle" size={14} className="text-secondary" />
          </View>
        </Card>
      </View>

      {/* Neural matrix */}
      <Card tone="low" className="p-4">
        <View className="flex-row items-center justify-between">
          <View className="flex-row gap-2">
            {['D', 'H', 'S'].map((k) => (
              <View
                key={k}
                className="h-9 w-9 items-center justify-center rounded-full bg-surface-container"
              >
                <Text className="font-label-md text-label-md text-primary-container">{k}</Text>
              </View>
            ))}
          </View>
          <Pill label="PERSISTED" icon="sync" tone="positive" />
        </View>
        <Text className="mt-3 font-label-lg text-label-lg text-on-surface">Weights Synchronized</Text>
        <Text className="mt-0.5 font-body-sm text-body-sm text-on-surface-variant">
          Dining • Health • Streaming modules
        </Text>
      </Card>

      <View className="gap-3">
        <Button
          title="Return to Demo Control Center"
          icon="arrow_forward"
          iconTrailing
          onPress={() => router.push('/demo')}
        />
        <Button
          title="Inspect Personal Spending Preferences"
          icon="tune"
          variant="secondary"
          onPress={() => router.push('/settings/spending-preferences')}
        />
      </View>
    </Screen>
  );
}
