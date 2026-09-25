import { router } from 'expo-router';
import { Text, View } from 'react-native';
import { Icon } from '@/components/Icon';
import type { IconName } from '@/components/glyphs';
import { Screen } from '@/components/ui/Screen';
import { Button } from '@/components/ui/Button';
import { Card, Pill, IconBadge, ProgressBar } from '@/components/ui/Surface';
import { StackedBar } from '@/components/ui/Charts';
import { colors } from '@/theme/tokens';
import { learnedRules } from '@/data/mock';

const CYCLE: { n: string; icon: IconName; title: string; body: string }[] = [
  { n: '01', icon: 'sensors', title: 'Detect Stress', body: 'Cashflow compression monitoring' },
  { n: '02', icon: 'recommend', title: 'Intervene', body: 'Propose tailored liquidity fix' },
  { n: '03', icon: 'how_to_reg', title: 'Record Choice', body: 'Log accept, alter, or reject' },
  { n: '04', icon: 'model_training', title: 'Calibrate', body: 'Update dynamic model weights' },
];

export default function LearningInsights() {
  return (
    <Screen
      title="Learning Insights"
      subtitle="Continuous Learning Active"
      avatar
      tabBarSpacing
      actions={[{ icon: 'notifications', label: 'Notifications', onPress: () => router.push('/notifications') }]}
      contentClassName="gap-space-lg"
    >
      <View className="flex-row justify-end">
        <Pill label="Model v4.8 • Real-time" tone="positive" dot />
      </View>

      {/* Hero intelligence card */}
      <Card>
        <View className="flex-row items-center gap-3">
          <IconBadge
            name="psychology"
            size={44}
            iconSize={22}
            bg="bg-surface-container-high"
            fg="text-primary-container"
          />
          <View className="flex-1">
            <Text className="font-headline-md text-headline-md text-on-surface">
              How Your Guardian Learns
            </Text>
          </View>
        </View>

        <Text className="mt-3 font-body-md text-body-md text-on-surface-variant">
          Every accept, modify, or reject action continuously refines your autonomous financial protection
          model.
        </Text>

        <View className="mt-4 flex-row items-center justify-between rounded-xl bg-surface-container-low p-4">
          <View className="flex-row items-center gap-2">
            <Icon name="verified" size={16} className="text-secondary" />
            <View>
              <Text className="font-label-sm text-label-sm text-on-surface-variant">
                Model Confidence Score
              </Text>
              <Text className="font-label-lg text-label-lg text-on-surface">
                88% Personalized Accuracy
              </Text>
            </View>
          </View>
          <Pill label="+4.2%" tone="positive" />
        </View>
      </Card>

      {/* Decision distribution */}
      <Card tone="low" className="p-4">
        <View className="flex-row items-start justify-between">
          <View className="flex-1">
            <Text className="font-headline-sm text-headline-sm text-on-surface">Intervention Feedback</Text>
            <Text className="font-body-sm text-body-sm text-on-surface-variant">
              Calibration based on historical suggestions
            </Text>
          </View>
          <Pill label="18 Total" />
        </View>

        <View className="mt-4">
          <StackedBar
            segments={[
              { value: 11, color: colors.secondary },
              { value: 4, color: colors.primaryContainer },
              { value: 3, color: colors.error },
            ]}
          />
        </View>

        <View className="mt-4 flex-row">
          {[
            { label: 'Accepted', n: '11', ratio: '61% ratio', fg: 'text-secondary' },
            { label: 'Modified', n: '4', ratio: '22% ratio', fg: 'text-primary-container' },
            { label: 'Rejected', n: '3', ratio: '17% ratio', fg: 'text-error' },
          ].map((s) => (
            <View key={s.label} className="flex-1 items-center">
              <Text className="font-label-sm text-label-sm text-on-surface-variant">{s.label}</Text>
              <Text className={`mt-0.5 font-headline-sm text-headline-sm ${s.fg}`}>{s.n}</Text>
              <Text className="font-label-sm text-label-sm text-on-surface-variant">{s.ratio}</Text>
            </View>
          ))}
        </View>
      </Card>

      {/* Inferred behavioral rules */}
      <View className="gap-space-sm">
        <View className="flex-row items-start justify-between">
          <View className="flex-1">
            <Text className="font-headline-sm text-headline-sm text-on-surface">What Guardian Learned</Text>
            <Text className="font-body-sm text-body-sm text-on-surface-variant">
              Synthesized patterns governing auto-actions
            </Text>
          </View>
          <Icon name="tune" size={18} className="text-on-surface-variant" />
        </View>

        {learnedRules.map((r) => (
          <Card key={r.id} tone="low" className="p-4">
            <View className="flex-row items-center justify-between">
              <Pill
                label={r.confidence}
                icon={r.locked ? 'lock' : undefined}
                tone={r.locked ? 'accent' : 'positive'}
              />
              <Icon name={r.icon} size={18} className="text-primary-container" />
            </View>

            <Text className="mt-3 font-body-lg text-body-lg text-on-surface">{r.rule}</Text>

            <View className="mt-3 flex-row items-center gap-1.5">
              <Icon name={r.locked ? 'fingerprint' : 'history'} size={13} className="text-on-surface-variant" />
              <Text className="flex-1 font-label-sm text-label-sm text-on-surface-variant">
                {r.learnedFrom}
              </Text>
            </View>

            {!r.locked ? (
              <View className="mt-2">
                <ProgressBar value={parseInt(r.confidence, 10) / 100} />
              </View>
            ) : null}
          </Card>
        ))}
      </View>

      {/* Feedback loop */}
      <View className="gap-space-sm">
        <View>
          <Text className="font-headline-sm text-headline-sm text-on-surface">Feedback Loop</Text>
          <Text className="font-body-sm text-body-sm text-on-surface-variant">
            Continuous four-stage neural calibration
          </Text>
        </View>

        <View className="flex-row flex-wrap gap-space-sm">
          {CYCLE.map((c) => (
            <Card key={c.n} tone="low" className="w-[48%] p-4">
              <View className="flex-row items-center justify-between">
                <Text className="font-label-sm text-label-sm text-on-surface-variant">{c.n}</Text>
                <Icon name={c.icon} size={18} className="text-primary-container" />
              </View>
              <Text className="mt-2 font-label-lg text-label-lg text-on-surface">{c.title}</Text>
              <Text className="mt-0.5 font-label-sm text-label-sm text-on-surface-variant">{c.body}</Text>
            </Card>
          ))}
        </View>
      </View>

      <View className="gap-3">
        <Button
          title="Customize Spending Preferences"
          icon="arrow_forward"
          iconTrailing
          onPress={() => router.push('/settings/spending-preferences')}
        />
        <Button
          title="View Feedback History"
          icon="history"
          variant="secondary"
          onPress={() => router.push('/learning/feedback-history')}
        />
      </View>
    </Screen>
  );
}
