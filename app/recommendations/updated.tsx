import { useState } from 'react';
import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { Icon } from '@/components/Icon';
import type { IconName } from '@/components/glyphs';
import { Screen } from '@/components/ui/Screen';
import { Button } from '@/components/ui/Button';
import { Card, Pill, IconBadge, ProgressBar } from '@/components/ui/Surface';

type Action = {
  id: string;
  n: string;
  icon: IconName;
  title: string;
  match: string;
  matchIcon: IconName;
  meta: { icon: IconName; label: string; value: string }[];
  history: { icon: IconName; text: string };
};

const ACTIONS: Action[] = [
  {
    id: 'a1',
    n: 'Action 01',
    icon: 'pause_circle',
    title: 'Soft-Pause Disney+ Hotstar Auto-Debit',
    match: '98% Match',
    matchIcon: 'verified',
    meta: [
      { icon: 'savings', label: 'Net Buffer Preserved', value: '+₹799 Instant' },
      { icon: 'schedule', label: 'Scheduled Cycle', value: 'Halts Oct 26 cleanly (No penalty)' },
    ],
    history: { icon: 'history', text: 'Accepted 8x historically in low-buffer weeks' },
  },
  {
    id: 'a2',
    n: 'Action 02',
    icon: 'restaurant',
    title: 'Adaptive Dining Ceilings (₹450/day)',
    match: '92% Match',
    matchIcon: 'thumb_up',
    meta: [
      { icon: 'shield', label: '3-Day Protection', value: '+₹1,050 Shielded' },
      { icon: 'tune', label: 'Neural Bound', value: 'Respects preferred ₹450 floor (not ₹300)' },
    ],
    history: { icon: 'insights', text: 'Compromise reached: allows lunch socials without grocery friction' },
  },
  {
    id: 'a3',
    n: 'Action 03',
    icon: 'bolt',
    title: 'Fast-Track Freelance Invoice via Razorpay',
    match: '86% Impact',
    matchIcon: 'speed',
    meta: [
      { icon: 'trending_up', label: 'Advanced Inflow', value: '+₹8,000 Early Release' },
      { icon: 'alarm_on', label: 'Timing Window', value: 'Inflow moved forward 48h (Clears rent)' },
    ],
    history: { icon: 'verified_user', text: 'Completely neutralizes the Oct 28 rent clash with zero borrowing' },
  },
];

const INFERENCE = [
  {
    n: '1. Friction Memory Weighting',
    body: 'User discarded 2 prior grocery limiters with sentiment score -0.82. Guardian lowered food elasticity parameters from 1.0 to 0.15.',
  },
  {
    n: '2. Auto-Debit Shield Priority',
    body: 'Disney+ identified as high-yield, zero-disruption postponement. Provider supports one-click reactivation with no queue penalty.',
  },
  {
    n: '3. Liquidity Bridge',
    body: 'Advanced Razorpay settlement bridges the exact 36-hour gap until client batch settlement arrives without incurring overdraft fee.',
  },
];

export default function UpdatedRecommendationState() {
  const [showLogic, setShowLogic] = useState(false);

  return (
    <Screen
      title="Updated Recommendations"
      subtitle="Guardian Neural Adaptation"
      avatar
      tabBarSpacing
      actions={[{ icon: 'notifications', label: 'Notifications', onPress: () => router.push('/notifications') }]}
      contentClassName="gap-space-lg"
    >
      <View className="flex-row items-center justify-between">
        <Pill label="Dynamic Recalibration" tone="positive" dot />
        <Text className="font-label-sm text-label-sm text-on-surface-variant">Live Cycle v4.2</Text>
      </View>

      {/* Adaptive memo */}
      <Card>
        <View className="flex-row items-center gap-2">
          <Icon name="auto_awesome" size={18} className="text-primary-container" />
          <Text className="font-headline-sm text-headline-sm text-on-surface">
            Recommendations Recalibrated
          </Text>
        </View>
        <Pill label="Tuned to Recent User Feedback & Inflow Delay" icon="tune" className="mt-2" />

        <Text className="mt-3 font-body-md text-body-md text-on-surface-variant">
          Because you previously marked "Gym Mandates as Untouchable" and rejected grocery cuts, Guardian
          synthesized 2 alternative, non-disruptive protective actions.
        </Text>

        <View className="mt-4 flex-row flex-wrap gap-2">
          <Pill label="Fitness Intact" icon="block" />
          <Pill label="Groceries Untouched" icon="block" />
          <Pill label="Preference Memory Honored" icon="psychology" tone="positive" />
        </View>
      </Card>

      {/* Solvency delta */}
      <Card tone="low" className="p-4">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            <Icon name="health_and_safety" size={18} className="text-secondary" />
            <Text className="font-label-lg text-label-lg text-on-surface">
              Projected Solvency Restoration
            </Text>
          </View>
        </View>
        <Text className="mt-2 font-headline-md text-headline-md text-secondary">+₹9,849 Total Relief</Text>

        <View className="mt-4 gap-1.5">
          <View className="flex-row items-center justify-between">
            <Text className="font-label-sm text-label-sm text-on-surface-variant">Shield Health Index</Text>
            <Text className="font-label-sm text-label-sm text-secondary">62 → 88 (Low Risk)</Text>
          </View>
          <ProgressBar value={0.88} tone="bg-secondary" height={6} />
        </View>
      </Card>

      {/* Tailored interventions */}
      <View className="gap-space-sm">
        <View className="flex-row items-center justify-between">
          <Text className="font-headline-sm text-headline-sm text-on-surface">Tailored Interventions</Text>
          <Pill label="3 Actionable" />
        </View>

        {ACTIONS.map((a) => (
          <Card key={a.id} tone="low" className="p-4">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-2">
                <IconBadge name={a.icon} size={32} iconSize={16} bg="bg-surface-container" fg="text-primary-container" />
                <Text className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                  {a.n}
                </Text>
              </View>
              <Pill label={a.match} icon={a.matchIcon} tone="positive" />
            </View>

            <Text className="mt-3 font-headline-sm text-headline-sm text-on-surface">{a.title}</Text>

            <View className="mt-3 gap-2 rounded-xl bg-surface-container p-3">
              {a.meta.map((m) => (
                <View key={m.label} className="flex-row items-center justify-between">
                  <View className="flex-row items-center gap-1.5">
                    <Icon name={m.icon} size={13} className="text-on-surface-variant" />
                    <Text className="font-label-sm text-label-sm text-on-surface-variant">{m.label}</Text>
                  </View>
                  <Text className="font-label-md text-label-md text-on-surface">{m.value}</Text>
                </View>
              ))}
            </View>

            <View className="mt-2 flex-row items-center gap-1.5">
              <Icon name={a.history.icon} size={13} className="text-primary-container" />
              <Text className="flex-1 font-label-sm text-label-sm text-on-surface-variant">
                {a.history.text}
              </Text>
            </View>

            <View className="mt-3 flex-row gap-2">
              <Pressable
                accessibilityRole="button"
                onPress={() => router.push('/recommendations/confirmation')}
                className="flex-1 flex-row items-center justify-center gap-1.5 rounded-full bg-primary-container py-2.5"
              >
                <Icon name="check" size={16} className="text-on-primary-fixed" />
                <Text className="font-label-md text-label-md text-on-primary-fixed">Accept</Text>
              </Pressable>
              <Pressable
                accessibilityRole="button"
                onPress={() => router.push('/recommendations/modify')}
                className="flex-1 items-center justify-center rounded-full bg-surface-container-high py-2.5"
              >
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
          </Card>
        ))}
      </View>

      <View className="gap-3">
        <Button
          title="Apply All 3 Protective Recommendations"
          icon="bolt"
          onPress={() => router.push('/recommendations/confirmation')}
        />
        <Button
          title="View Learning Adaptation Logic"
          icon="arrow_forward"
          iconTrailing
          variant="secondary"
          onPress={() => setShowLogic((v) => !v)}
        />
      </View>

      {/* Inference matrix accordion */}
      {showLogic ? (
        <Card tone="low" className="p-4">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-2">
              <Icon name="neurology" size={18} className="text-primary-container" />
              <Text className="font-label-lg text-label-lg text-on-surface">Neural Inference Matrix</Text>
            </View>
            <Pressable onPress={() => setShowLogic(false)} hitSlop={8} accessibilityLabel="Close">
              <Icon name="close" size={18} className="text-on-surface-variant" />
            </Pressable>
          </View>

          <View className="mt-3 gap-3">
            {INFERENCE.map((x) => (
              <View key={x.n} className="rounded-xl bg-surface-container p-3">
                <Text className="font-label-md text-label-md text-on-surface">{x.n}</Text>
                <Text className="mt-1 font-body-sm text-body-sm text-on-surface-variant">{x.body}</Text>
              </View>
            ))}
          </View>
        </Card>
      ) : null}
    </Screen>
  );
}
