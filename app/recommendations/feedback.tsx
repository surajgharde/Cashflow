import { useState } from 'react';
import { router } from 'expo-router';
import { Pressable, Text, TextInput, View } from 'react-native';
import { Icon } from '@/components/Icon';
import { Screen } from '@/components/ui/Screen';
import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Form';
import { Card, Pill, IconBadge, ProgressBar } from '@/components/ui/Surface';
import { colors } from '@/theme/tokens';

const REASONS = [
  'Not relevant to my current financial situation',
  'Too restrictive for my lifestyle',
  'Already handled via another account',
  'Wrong timing (bill is already scheduled)',
  'Essential expense that cannot be delayed',
];

const DECISIONS = ['Accepted', 'Rejected', 'Modified'] as const;

export default function RecommendationFeedback() {
  const [sentiment, setSentiment] = useState<'helpful' | 'not' | null>('not');
  const [decision, setDecision] = useState<(typeof DECISIONS)[number]>('Rejected');
  const [selected, setSelected] = useState<string[]>([REASONS[0]]);
  const [note, setNote] = useState('');

  const toggle = (r: string) =>
    setSelected((s) => (s.includes(r) ? s.filter((x) => x !== r) : [...s, r]));

  return (
    <Screen
      title="Recommendation Feedback"
      subtitle="Neural Model Tuning"
      avatar
      actions={[{ icon: 'more_vert', label: 'More' }]}
      contentClassName="gap-space-lg"
    >
      <View>
        <View className="flex-row items-center gap-2">
          <Icon name="psychology" size={18} className="text-primary-container" />
          <Text className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
            Neural Model Tuning
          </Text>
        </View>
        <Text className="mt-2 font-headline-lg text-headline-lg text-on-surface">
          Help Your Guardian Learn
        </Text>
        <Text className="mt-1 font-body-md text-body-md text-on-surface-variant">
          Your feedback trains the neural cashflow model to respect your personal lifestyle and spending
          priorities.
        </Text>
      </View>

      {/* Evaluated directive */}
      <Card tone="low" className="p-4">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            <Icon name="cancel" size={16} className="text-error" />
            <Text className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
              Evaluated Directive
            </Text>
          </View>
          <Pill label="Rejected by User" tone="danger" />
        </View>
        <Text className="mt-2 font-headline-sm text-headline-sm text-on-surface">
          Pause Hotstar & OTT Subs
        </Text>
        <View className="mt-3 flex-row items-center justify-between rounded-xl bg-surface-container p-3">
          <View className="flex-row items-center gap-1.5">
            <Icon name="tune" size={14} className="text-on-surface-variant" />
            <Text className="font-label-sm text-label-sm text-on-surface-variant">Projected Impact</Text>
          </View>
          <Text className="font-label-md text-label-md text-secondary">+₹799 / mo buffer</Text>
        </View>
      </Card>

      {/* Sentiment */}
      <View className="gap-2">
        <View className="flex-row items-center justify-between px-1">
          <Text className="font-label-md text-label-md text-on-surface">
            Was this recommendation useful?
          </Text>
          <Text className="font-label-sm text-label-sm text-on-surface-variant">Select sentiment</Text>
        </View>

        <View className="flex-row gap-3">
          {(
            [
              { key: 'helpful', icon: 'thumb_up', title: 'Helpful', sub: 'Relevant, but not applicable right now' },
              { key: 'not', icon: 'thumb_down', title: 'Not Helpful', sub: "Doesn't fit my priorities or lifestyle" },
            ] as const
          ).map((o) => {
            const active = sentiment === o.key;
            return (
              <Pressable
                key={o.key}
                onPress={() => setSentiment(o.key)}
                accessibilityRole="radio"
                accessibilityState={{ selected: active }}
                className={`flex-1 rounded-2xl p-4 ${
                  active ? 'bg-surface-container-high' : 'bg-surface-container-low'
                }`}
              >
                <View className="flex-row items-center justify-between">
                  <Icon
                    name={o.icon}
                    size={20}
                    className={active ? 'text-primary-container' : 'text-on-surface-variant'}
                  />
                  {active ? <Icon name="check_circle" size={16} className="text-primary-container" /> : null}
                </View>
                <Text className="mt-2 font-label-lg text-label-lg text-on-surface">{o.title}</Text>
                <Text className="mt-0.5 font-body-sm text-body-sm text-on-surface-variant">{o.sub}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      {/* Decision record */}
      <View className="gap-2">
        <Text className="px-1 font-label-md text-label-md text-on-surface">User Decision Record</Text>
        <View className="flex-row gap-1 rounded-xl bg-surface-container-low p-1.5">
          {DECISIONS.map((d) => {
            const active = decision === d;
            return (
              <Pressable
                key={d}
                onPress={() => setDecision(d)}
                accessibilityRole="tab"
                accessibilityState={{ selected: active }}
                className={`flex-1 rounded-lg py-2 ${active ? 'bg-surface-container-highest' : ''}`}
              >
                <Text
                  className={`text-center font-label-md text-label-md ${
                    active ? 'text-on-surface' : 'text-on-surface-variant'
                  }`}
                >
                  {d}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      {/* Reasons */}
      <View className="gap-2">
        <View className="px-1">
          <Text className="font-label-md text-label-md text-on-surface">
            Why did you reject or modify this?
          </Text>
          <Text className="font-body-sm text-body-sm text-on-surface-variant">
            Select all primary factors that applied
          </Text>
        </View>

        <Card tone="low" className="gap-3 p-4">
          {REASONS.map((r, i) => (
            <View key={r}>
              {i > 0 ? <View className="mb-3 h-px bg-surface-container-high" /> : null}
              <Checkbox checked={selected.includes(r)} onChange={() => toggle(r)} label={r} />
            </View>
          ))}
        </Card>
      </View>

      {/* Context note */}
      <View className="gap-2">
        <View className="flex-row items-center justify-between px-1">
          <Text className="font-label-md text-label-md text-on-surface">Add Context Note</Text>
          <Text className="font-label-sm text-label-sm text-on-surface-variant">Optional</Text>
        </View>
        <View className="rounded-xl bg-surface-container p-3">
          <TextInput
            multiline
            numberOfLines={3}
            maxLength={240}
            value={note}
            onChangeText={setNote}
            placeholder="e.g., I share this Disney+ Hotstar family plan with roommates who already reimbursed me..."
            placeholderTextColor={`${colors.onSurfaceVariant}80`}
            className="min-h-[72px] font-body-md text-body-md text-on-surface"
            style={{ textAlignVertical: 'top' }}
          />
          <View className="mt-2 flex-row items-center justify-between">
            <View className="flex-row items-center gap-1">
              <Icon name="lock" size={11} className="text-on-surface-variant" />
              <Text className="font-label-sm text-label-sm text-on-surface-variant">
                Encrypted model memory
              </Text>
            </View>
            <Text className="font-label-sm text-label-sm text-on-surface-variant">{note.length}/240</Text>
          </View>
        </View>
      </View>

      {/* Immediate system adjustment */}
      <Card tone="low" className="p-4">
        <View className="flex-row items-center gap-2">
          <Icon name="bolt" size={18} className="text-primary-container" />
          <Text className="font-label-lg text-label-lg text-on-surface">Immediate System Adjustment</Text>
        </View>
        <Text className="mt-2 font-body-sm text-body-sm text-on-surface-variant">
          Guardian will lower priority of OTT pause suggestions by 45% and analyze discretionary
          dining/delivery patterns first in upcoming liquidity predictions.
        </Text>
        <View className="mt-3 gap-1.5">
          <ProgressBar value={0.78} />
          <Text className="font-label-sm text-label-sm text-on-surface-variant">Model Confidence 78%</Text>
        </View>
      </Card>

      <View className="gap-3">
        <Button
          title="Submit Feedback & Train Guardian"
          icon="arrow_forward"
          iconTrailing
          onPress={() => router.push('/learning/cycle-result')}
        />
        <Button title="Skip" variant="ghost" onPress={() => router.back()} />
      </View>
    </Screen>
  );
}
