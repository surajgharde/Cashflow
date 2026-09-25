import { useMemo, useState } from 'react';
import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { Icon } from '@/components/Icon';
import type { IconName } from '@/components/glyphs';
import { Screen } from '@/components/ui/Screen';
import { Button } from '@/components/ui/Button';
import { Card, Pill, IconBadge } from '@/components/ui/Surface';

type Entry = {
  id: string;
  date: string;
  icon: IconName;
  status: string;
  kind: 'rejected' | 'modified' | 'accepted';
  title: string;
  reasonIcon: IconName;
  reasonLabel: string;
  reason: string;
  quote?: string;
  change?: { label: string; tag: string };
  actionIcon: IconName;
  action: string;
};

const ENTRIES: Entry[] = [
  {
    id: 'f1',
    date: 'Today, 24 Oct',
    icon: 'thumb_down',
    status: 'Rejected • Not Helpful',
    kind: 'rejected',
    title: 'Cancel Gym Mandate',
    reasonIcon: 'error_outline',
    reasonLabel: 'User Stated Reason',
    reason: 'Essential expense that cannot be delayed',
    quote: '"Gym membership is non-negotiable for my health routine."',
    actionIcon: 'auto_fix_high',
    action: "Rule created: Flag Gym category as 'Essential Protected'. Do not suggest cancellations.",
  },
  {
    id: 'f2',
    date: '18 Oct',
    icon: 'tune',
    status: 'Modified • Helpful',
    kind: 'modified',
    title: 'Cap Dining to ₹300/day',
    reasonIcon: 'psychology',
    reasonLabel: 'Feedback Reason',
    reason: 'Too restrictive for weekdays',
    change: { label: 'Increased daily cap to ₹450/day', tag: '+50% threshold' },
    actionIcon: 'auto_fix_high',
    action: 'Rule updated: Set weekday dining minimum threshold to ₹450 before trigger.',
  },
  {
    id: 'f3',
    date: '12 Oct',
    icon: 'thumb_down',
    status: 'Rejected • Not Helpful',
    kind: 'rejected',
    title: 'Pause Cult.fit Subscription',
    reasonIcon: 'receipt_long',
    reasonLabel: 'User Stated Reason',
    reason: 'Already handled via cash rebate',
    actionIcon: 'tune',
    action: 'Reduced wellness mandate sensitivity by 30% across recurring audits.',
  },
  {
    id: 'f4',
    date: '04 Oct',
    icon: 'favorite',
    status: 'Accepted • Very Helpful',
    kind: 'accepted',
    title: 'Advance Studio X Freelance Invoice',
    reasonIcon: 'schedule',
    reasonLabel: 'Outcome Feedback',
    reason: 'Timing was perfect ahead of credit card bill',
    actionIcon: 'trending_up',
    action: 'Reinforced early invoice nudge rule (+25% algorithmic weight).',
  },
];

const FILTERS = [
  { key: 'all', label: 'All', count: 16 },
  { key: 'accepted', label: 'Helpful', count: 11 },
  { key: 'rejected', label: 'Not Helpful', count: 5 },
  { key: 'modified', label: 'Rejected Notes', count: 2 },
] as const;

const TONE = {
  rejected: { fg: 'text-error', pill: 'danger' as const },
  modified: { fg: 'text-primary-container', pill: 'warning' as const },
  accepted: { fg: 'text-secondary', pill: 'positive' as const },
};

export default function FeedbackHistory() {
  const [filter, setFilter] = useState<string>('all');

  const rows = useMemo(
    () => (filter === 'all' ? ENTRIES : ENTRIES.filter((e) => e.kind === filter)),
    [filter],
  );

  return (
    <Screen
      title="Feedback History"
      subtitle="Neural Adaptation Engine"
      avatar
      actions={[{ icon: 'more_vert', label: 'More' }]}
      contentClassName="gap-space-lg"
    >
      {/* Header card */}
      <Card>
        <View className="flex-row items-center gap-2">
          <Icon name="neurology" size={18} className="text-primary-container" />
          <Text className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
            Neural Adaptation Engine
          </Text>
        </View>
        <Text className="mt-2 font-headline-md text-headline-md text-on-surface">
          Adaptive Training Log
        </Text>
        <Text className="mt-1 font-body-md text-body-md text-on-surface-variant">
          How your past decisions shaped the Guardian AI model and sharpened autonomous guardrails.
        </Text>

        <View className="mt-5 flex-row">
          {[
            { v: '16', l: 'Feedbacks Logged' },
            { v: '81%', l: 'Model Alignment', icon: 'trending_up' as IconName },
            { v: '6', l: 'Active Rules' },
          ].map((s) => (
            <View key={s.l} className="flex-1 items-center">
              <View className="flex-row items-center gap-1">
                <Text className="font-headline-md text-headline-md text-on-surface">{s.v}</Text>
                {s.icon ? <Icon name={s.icon} size={13} className="text-secondary" /> : null}
              </View>
              <Text className="mt-0.5 text-center font-label-sm text-label-sm text-on-surface-variant">
                {s.l}
              </Text>
            </View>
          ))}
        </View>
      </Card>

      {/* Filter tabs */}
      <View className="flex-row flex-wrap gap-2">
        {FILTERS.map((f) => {
          const active = filter === f.key;
          return (
            <Pressable
              key={f.key}
              onPress={() => setFilter(f.key)}
              accessibilityRole="tab"
              accessibilityState={{ selected: active }}
              className={`flex-row items-center gap-1.5 rounded-full px-3.5 py-2 ${
                active ? 'bg-primary-container' : 'bg-surface-container-high'
              }`}
            >
              <Text
                className={`font-label-md text-label-md ${
                  active ? 'text-on-primary-fixed' : 'text-on-surface-variant'
                }`}
              >
                {f.label}
              </Text>
              <Text
                className={`font-label-sm text-label-sm ${
                  active ? 'text-on-primary-fixed' : 'text-on-surface-variant'
                }`}
              >
                {f.count}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {/* Chronological feed */}
      <View className="gap-space-sm">
        {rows.map((e) => {
          const tone = TONE[e.kind];
          return (
            <Card key={e.id} tone="low" className="p-4">
              <View className="flex-row items-center justify-between">
                <Text className="font-label-sm text-label-sm text-on-surface-variant">{e.date}</Text>
                <Pill label={e.status} icon={e.icon} tone={tone.pill} />
              </View>

              <Text className="mt-3 font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                Original Recommendation
              </Text>
              <Text className="mt-0.5 font-headline-sm text-headline-sm text-on-surface">{e.title}</Text>

              {/* Detail box */}
              <View className="mt-3 gap-2 rounded-xl bg-surface-container p-3">
                <View className="flex-row items-center gap-2">
                  <Icon name={e.reasonIcon} size={14} className="text-on-surface-variant" />
                  <Text className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                    {e.reasonLabel}
                  </Text>
                </View>
                <Text className="font-body-sm text-body-sm text-on-surface">{e.reason}</Text>

                {e.quote ? (
                  <View className="flex-row gap-2">
                    <Icon name="chat_bubble" size={13} className="text-on-surface-variant" />
                    <Text className="flex-1 font-body-sm text-body-sm text-on-surface-variant">
                      {e.quote}
                    </Text>
                  </View>
                ) : null}

                {e.change ? (
                  <View className="flex-row items-center justify-between">
                    <View className="flex-1 flex-row items-center gap-2">
                      <Icon name="edit_note" size={13} className="text-primary-container" />
                      <Text className="flex-1 font-body-sm text-body-sm text-on-surface">
                        {e.change.label}
                      </Text>
                    </View>
                    <Pill label={e.change.tag} tone="warning" />
                  </View>
                ) : null}
              </View>

              {/* Model action */}
              <View className="mt-2 rounded-xl bg-surface-container p-3">
                <View className="flex-row items-center gap-2">
                  <Icon name={e.actionIcon} size={14} className="text-primary-container" />
                  <Text className="font-label-sm text-label-sm uppercase tracking-wider text-primary-container">
                    Model Action Applied
                  </Text>
                </View>
                <Text className="mt-1.5 font-body-sm text-body-sm text-on-surface-variant">{e.action}</Text>
              </View>
            </Card>
          );
        })}
      </View>

      <Button
        title="View Inferred Learning Insights"
        icon="arrow_forward"
        iconTrailing
        onPress={() => router.push('/learning/insights')}
      />
    </Screen>
  );
}
