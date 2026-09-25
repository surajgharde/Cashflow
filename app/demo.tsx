import { useState } from 'react';
import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { Icon } from '@/components/Icon';
import type { IconName } from '@/components/glyphs';
import { Screen } from '@/components/ui/Screen';
import { Button } from '@/components/ui/Button';
import { Card, Pill, IconBadge, ProgressBar } from '@/components/ui/Surface';

type Scenario = {
  key: string;
  title: string;
  status: string;
  tone: 'positive' | 'warning' | 'danger';
  tag: string;
  metrics: [string, string];
  body: string;
  cta: { label: string; icon: IconName };
  href: string;
};

const SCENARIOS: Scenario[] = [
  {
    key: 'a',
    title: 'Scenario A: Baseline Stability',
    status: 'Active Baseline System',
    tone: 'positive',
    tag: 'Nominal',
    metrics: ['Safe-to-Spend: ₹6,050', 'Risk: Low (94/100)'],
    body: 'Monthly freelance inflows verified. Recurring SIPs and bills synchronized safely.',
    cta: { label: 'Simulate Baseline', icon: 'check_circle' },
    href: '/states/stable',
  },
  {
    key: 'b',
    title: 'Scenario B: Inflow Delay Shock',
    status: 'Ready to Trigger',
    tone: 'warning',
    tag: 'Liquidity Drift',
    metrics: ['Inflow Disruption: +48 hrs', 'Stressed Buffer: ₹1,200'],
    body: 'Freelance ₹8,000 delayed +48h past rent scheduled auto-debit. Tests auto-alert buffer reserve.',
    cta: { label: 'Trigger Inflow Delay', icon: 'schedule' },
    href: '/states/income-delayed',
  },
  {
    key: 'c',
    title: 'Scenario C: Discretionary Surge',
    status: 'Ready to Trigger',
    tone: 'warning',
    tag: 'Outflow Drift',
    metrics: ['Unplanned Spike: -₹2,500', 'Buffer Posture: Mild Warning'],
    body: 'Emergency bike repair & weekend spend. Evaluates micro-budget dynamic recalibration.',
    cta: { label: 'Inject Outflow Spike', icon: 'trending_down' },
    href: '/states/unexpected-expense',
  },
  {
    key: 'd',
    title: 'Scenario D: Compound Shock',
    status: 'High Stress Crucible',
    tone: 'danger',
    tag: 'Critical',
    metrics: ['Negative Breach: -₹4,450', 'Guardian Protocol: Full Defense'],
    body: 'Inflow delay + utility auto-debit clash. Triggers autonomous micro-pause and safe credit reallocation.',
    cta: { label: 'Trigger Compound Squeeze', icon: 'warning' },
    href: '/states/increased-risk',
  },
];

const PACING = [
  { key: '1x', label: 'Real-time (1x)' },
  { key: '1.5x', label: '1.5x Speed' },
  { key: '3x', label: 'Fast (3x)' },
] as const;

export default function DemoControlCenter() {
  const [pace, setPace] = useState<(typeof PACING)[number]['key']>('1.5x');
  const [step, setStep] = useState(1);

  return (
    <Screen
      title="Demo Control Center"
      subtitle="Guardian Enclave"
      avatar
      tabBarSpacing
      actions={[{ icon: 'notifications', label: 'Notifications', onPress: () => router.push('/notifications') }]}
      contentClassName="gap-space-lg"
    >
      <View className="flex-row items-center justify-between">
        <Pill label="Live Sandbox Engine" tone="positive" dot />
        <Pill label="Neural Core v4.2" icon="memory" />
      </View>

      {/* Hero banner */}
      <Card>
        <Text className="font-headline-md text-headline-md text-on-surface">
          Hackathon Scenario Controller
        </Text>
        <Text className="mt-2 font-body-md text-body-md text-on-surface-variant">
          Trigger real-time financial stress events to test Guardian AI autonomous reactions, buffer
          protection, and neural re-calibration live on stage.
        </Text>
      </Card>

      {/* Telemetry ticker */}
      <View className="flex-row gap-space-md">
        <Card tone="low" className="flex-1 p-4">
          <Text className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
            Current Posture
          </Text>
          <View className="mt-2 flex-row items-center gap-1.5">
            <Icon name="verified_user" size={14} className="text-secondary" />
            <Text className="font-label-lg text-label-lg text-on-surface">Stable Baseline</Text>
          </View>
          <View className="mt-1 flex-row items-center gap-1.5">
            <Icon name="bolt" size={12} className="text-primary-container" />
            <Text className="font-label-sm text-label-sm text-on-surface-variant">94 / 100 Safe Index</Text>
          </View>
        </Card>

        <Card tone="low" className="flex-1 p-4">
          <Text className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
            Projected Buffer
          </Text>
          <View className="mt-2 flex-row items-center gap-1.5">
            <Icon name="account_balance_wallet" size={14} className="text-primary-container" />
            <Text className="font-label-lg text-label-lg text-on-surface">₹6,050</Text>
          </View>
          <View className="mt-1 flex-row items-center gap-1.5">
            <Icon name="trending_up" size={12} className="text-secondary" />
            <Text className="font-label-sm text-label-sm text-on-surface-variant">Zero Deficit</Text>
          </View>
        </Card>
      </View>

      {/* Scenario grid */}
      <View className="gap-space-sm">
        <View className="flex-row items-center justify-between">
          <Text className="font-headline-sm text-headline-sm text-on-surface">
            Select Demonstration Node
          </Text>
          <Pill label="Instant Injection" tone="positive" dot />
        </View>

        {SCENARIOS.map((s) => (
          <Card key={s.key} tone="low" className="p-4">
            <View className="flex-row items-start justify-between">
              <Text className="flex-1 font-headline-sm text-headline-sm text-on-surface">{s.title}</Text>
              <Pill label={s.tag} tone={s.tone} />
            </View>

            <Text className="mt-1 font-label-sm text-label-sm text-on-surface-variant">{s.status}</Text>

            <View className="mt-3 gap-1.5 rounded-xl bg-surface-container p-3">
              {s.metrics.map((m) => (
                <Text key={m} className="font-label-md text-label-md text-on-surface">
                  {m}
                </Text>
              ))}
            </View>

            <Text className="mt-2 font-body-sm text-body-sm text-on-surface-variant">{s.body}</Text>

            <Button
              title={s.cta.label}
              icon={s.cta.icon}
              variant={s.tone === 'danger' ? 'danger' : 'secondary'}
              className="mt-3"
              onPress={() => router.push(s.href as never)}
            />
          </Card>
        ))}
      </View>

      {/* Auto-play orchestration */}
      <Card tone="low" className="p-4">
        <View className="flex-row items-center gap-2">
          <Icon name="smart_toy" size={18} className="text-primary-container" />
          <Text className="font-label-lg text-label-lg text-on-surface">
            Autonomous Demo Orchestration
          </Text>
        </View>
        <Text className="mt-2 font-body-sm text-body-sm text-on-surface-variant">
          Execute the full narrative cycle autonomously for hackathon presentation judges.
        </Text>

        <Button
          title="Auto-Play Complete Narrative Flow"
          icon="play_arrow"
          className="mt-4"
          onPress={() => setStep((s) => (s >= 5 ? 1 : s + 1))}
        />

        {/* Narrative step */}
        <View className="mt-4 rounded-xl bg-surface-container p-3">
          <View className="flex-row items-center justify-between">
            <Text className="font-label-sm text-label-sm text-on-surface-variant">Current Stage</Text>
            <Text className="font-label-md text-label-md text-primary-container">Step {step} of 5</Text>
          </View>
          <View className="mt-2">
            <ProgressBar value={step / 5} />
          </View>
          <Text className="mt-2 font-body-sm text-body-sm text-on-surface-variant">
            {step === 1
              ? 'Initializing stable financial baseline...'
              : step === 2
                ? 'Injecting inflow delay shock...'
                : step === 3
                  ? 'Escalating to elevated risk posture...'
                  : step === 4
                    ? 'Dispatching protective interventions...'
                    : 'Recording feedback & recalibrating model...'}
          </Text>
        </View>

        {/* Pacing */}
        <View className="mt-4 gap-2">
          <View className="flex-row items-center justify-between">
            <Text className="font-label-md text-label-md text-on-surface-variant">Simulation Pacing</Text>
            <Text className="font-label-sm text-label-sm text-primary-container">{pace} Presentation</Text>
          </View>
          <View className="flex-row gap-1 rounded-xl bg-surface-container p-1.5">
            {PACING.map((p) => {
              const active = pace === p.key;
              return (
                <Pressable
                  key={p.key}
                  onPress={() => setPace(p.key)}
                  accessibilityRole="tab"
                  accessibilityState={{ selected: active }}
                  className={`flex-1 rounded-lg py-2 ${active ? 'bg-surface-container-highest' : ''}`}
                >
                  <Text
                    className={`text-center font-label-sm text-label-sm ${
                      active ? 'text-on-surface' : 'text-on-surface-variant'
                    }`}
                  >
                    {p.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <Button
          title="Reset All Telemetry to Default State"
          icon="restart_alt"
          variant="ghost"
          className="mt-4"
          onPress={() => setStep(1)}
        />
      </Card>

      {/* Neural feedback loop */}
      <Card tone="low" className="p-4">
        <View className="flex-row items-center justify-between">
          <Text className="font-label-lg text-label-lg text-on-surface">
            Guardian Neural Feedback Loop
          </Text>
          <Pill label="Active Learning" tone="positive" dot />
        </View>

        <View className="mt-3 flex-row items-center gap-3">
          <IconBadge name="psychology" bg="bg-surface-container" fg="text-primary-container" />
          <View className="flex-1">
            <Text className="font-label-md text-label-md text-on-surface">Buffer Guard Calibrated</Text>
            <Text className="mt-0.5 font-body-sm text-body-sm text-on-surface-variant">
              Zero anomalies detected in inflow timeline.
            </Text>
          </View>
        </View>

        <Button
          title="View Learning Cycle Result"
          icon="arrow_forward"
          iconTrailing
          variant="secondary"
          className="mt-4"
          onPress={() => router.push('/learning/cycle-result')}
        />
      </Card>

      {/* Sandbox safeguard */}
      <View className="flex-row gap-2.5 rounded-2xl bg-surface-container-low p-4">
        <Icon name="lock" size={16} className="text-on-surface-variant" />
        <Text className="flex-1 font-body-sm text-body-sm text-on-surface-variant">
          Zero real bank funds are altered. All calculations execute client-side via Guardian Neural Core
          v4.2 sandbox enclave.
        </Text>
      </View>
    </Screen>
  );
}
