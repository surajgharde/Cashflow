import { useState } from 'react';
import { router } from 'expo-router';
import { Modal, Pressable, Text, View } from 'react-native';
import { Icon } from '@/components/Icon';
import type { IconName } from '@/components/glyphs';
import { Screen } from '@/components/ui/Screen';
import { Button, IconButton } from '@/components/ui/Button';
import { Card, Pill, IconBadge, ProgressBar } from '@/components/ui/Surface';
import { AreaChart } from '@/components/ui/Charts';
import { colors } from '@/theme/tokens';
import { forecast14d } from '@/data/mock';

const INFLOWS: { icon: IconName; title: string; due: string; amount: string; tag: string; confidence: number; confidenceLabel: string }[] = [
  {
    icon: 'terminal',
    title: 'Studio X Tech Retainer',
    due: 'Due Tue, 28 Oct',
    amount: '+₹8,000.00',
    tag: 'Invoice #1042',
    confidence: 0.75,
    confidenceLabel: '75% on-time confidence',
  },
  {
    icon: 'domain',
    title: 'Monthly Corporate Payroll',
    due: 'Due Fri, 01 Nov',
    amount: '+₹25,000.00',
    tag: 'Guaranteed',
    confidence: 0.99,
    confidenceLabel: '99% statistical lock',
  },
];

const COMMITMENTS: { icon: IconName; title: string; when: string; mandate: string; amount: string }[] = [
  { icon: 'bolt', title: 'BESCOM Electricity', when: '25 Oct', mandate: 'Auto-debit Active', amount: '-₹3,000.00' },
  { icon: 'home', title: 'Shared Flat Rent', when: '27 Oct', mandate: 'UPI Mandate #9831', amount: '-₹7,000.00' },
  { icon: 'movie', title: 'Netflix 4K UHD', when: '31 Oct', mandate: 'Card Mandate (*4021)', amount: '-₹649.00' },
];

export default function ForecastDetails() {
  const [sim, setSim] = useState(false);

  return (
    <>
      <Screen
        title="Forecast Details"
        subtitle="Oct 24 — Nov 07 Projection"
        avatar
        actions={[{ icon: 'tune', label: 'Filter' }]}
        contentClassName="gap-space-lg"
      >
        <Text className="font-body-md text-body-md text-on-surface-variant">
          Granular breakdown of inflows, fixed debits & statistical projections.
        </Text>

        {/* Summary metric strip */}
        <View className="flex-row gap-space-sm">
          {[
            { icon: 'arrow_downward_alt' as IconName, count: '3 Inflows', value: '+₹33k', sub: 'Scheduled', fg: 'text-secondary' },
            { icon: 'arrow_upward_alt' as IconName, count: '5 Fixed', value: '-₹18.5k', sub: 'Mandated', fg: 'text-error' },
            { icon: 'shield_with_heart' as IconName, count: '7D Buffer', value: '-₹7.3k', sub: 'Discretionary', fg: 'text-primary-container' },
          ].map((s) => (
            <Card key={s.count} tone="low" className="flex-1 p-3">
              <Icon name={s.icon} size={16} className={s.fg} />
              <Text className="mt-1.5 font-label-sm text-label-sm text-on-surface-variant">{s.count}</Text>
              <Text className={`font-headline-sm text-headline-sm ${s.fg}`}>{s.value}</Text>
              <Text className="font-label-sm text-label-sm text-on-surface-variant">{s.sub}</Text>
            </Card>
          ))}
        </View>

        {/* Micro trajectory */}
        <Card>
          <View className="flex-row items-center justify-between">
            <Text className="font-headline-sm text-headline-sm text-on-surface">14-Day Trajectory Curve</Text>
            <Pill label="Safe Zone (+₹14,200)" icon="verified" tone="positive" />
          </View>
          <View className="mt-space-md">
            <AreaChart
              height={140}
              showGrid={false}
              series={[{ data: forecast14d, color: colors.secondary, fill: true }]}
              labels={['Today (24 Oct)', '28 Oct', '01 Nov', '07 Nov']}
            />
          </View>
        </Card>

        {/* Verified scheduled inflows */}
        <View className="gap-space-sm">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-2">
              <Icon name="savings" size={18} className="text-secondary" />
              <Text className="font-headline-sm text-headline-sm text-on-surface">
                Verified Scheduled Inflows
              </Text>
            </View>
            <Pill label="2 Expected" />
          </View>

          <Card tone="low" className="gap-4 p-4">
            {INFLOWS.map((f, i) => (
              <View key={f.title}>
                {i > 0 ? <View className="mb-4 h-px bg-surface-container-high" /> : null}
                <View className="flex-row items-center gap-3">
                  <IconBadge name={f.icon} bg="bg-surface-container" fg="text-secondary" />
                  <View className="flex-1">
                    <Text className="font-label-lg text-label-lg text-on-surface">{f.title}</Text>
                    <Text className="font-body-sm text-body-sm text-on-surface-variant">{f.due}</Text>
                  </View>
                  <View className="items-end">
                    <Text className="font-label-lg text-label-lg text-secondary">{f.amount}</Text>
                    <Text className="font-label-sm text-label-sm text-on-surface-variant">{f.tag}</Text>
                  </View>
                </View>
                <View className="mt-2.5 gap-1">
                  <ProgressBar value={f.confidence} tone="bg-secondary" />
                  <Text className="font-label-sm text-label-sm text-on-surface-variant">
                    {f.confidenceLabel}
                  </Text>
                </View>
              </View>
            ))}
          </Card>
        </View>

        {/* Locked commitments */}
        <View className="gap-space-sm">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-2">
              <Icon name="lock_clock" size={18} className="text-error" />
              <Text className="font-headline-sm text-headline-sm text-on-surface">Locked Commitments</Text>
            </View>
            <Text className="font-label-md text-label-md text-error">-₹10,649.00</Text>
          </View>

          <Card tone="low" className="gap-3 p-4">
            {COMMITMENTS.map((c, i) => (
              <View key={c.title}>
                {i > 0 ? <View className="mb-3 h-px bg-surface-container-high" /> : null}
                <View className="flex-row items-center gap-3">
                  <IconBadge name={c.icon} bg="bg-surface-container" />
                  <View className="flex-1">
                    <Text className="font-label-lg text-label-lg text-on-surface">{c.title}</Text>
                    <Text className="font-body-sm text-body-sm text-on-surface-variant">
                      {c.when} • {c.mandate}
                    </Text>
                  </View>
                  <Text className="font-label-lg text-label-lg text-on-surface">{c.amount}</Text>
                </View>
              </View>
            ))}
          </Card>
        </View>

        {/* ML predictions */}
        <View className="gap-space-sm">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-2">
              <Icon name="auto_graph" size={18} className="text-primary-container" />
              <Text className="font-headline-sm text-headline-sm text-on-surface">Dynamic Predictions</Text>
            </View>
            <Pill label="Gaussian Stochastics" />
          </View>

          <Card tone="low" className="gap-4 p-4">
            <View className="flex-row items-center gap-3">
              <IconBadge name="local_cafe" bg="bg-surface-container" />
              <View className="flex-1">
                <Text className="font-label-lg text-label-lg text-on-surface">Weekend Outflow Forecast</Text>
                <Text className="font-body-sm text-body-sm text-on-surface-variant">
                  Past 4 Fri–Sun spending cycles
                </Text>
              </View>
              <View className="items-end">
                <Text className="font-label-lg text-label-lg text-on-surface">-₹2,400.00</Text>
                <Text className="font-label-sm text-label-sm text-on-surface-variant">Variance: ±₹320</Text>
              </View>
            </View>
            <Pill label="High probability (88%)" tone="positive" />

            <View className="h-px bg-surface-container-high" />

            <View className="flex-row items-center gap-3">
              <IconBadge name="commute" bg="bg-surface-container" />
              <View className="flex-1">
                <Text className="font-label-lg text-label-lg text-on-surface">
                  Daily Food & Transit Baseline
                </Text>
                <Text className="font-body-sm text-body-sm text-on-surface-variant">
                  Normalized rolling 30d median
                </Text>
              </View>
              <View className="items-end">
                <Text className="font-label-lg text-label-lg text-on-surface">-₹450/day</Text>
                <Text className="font-label-sm text-label-sm text-on-surface-variant">-₹3,150.00 total</Text>
              </View>
            </View>
          </Card>
        </View>

        {/* Stress simulation */}
        <Card tone="low" className="p-4">
          <View className="flex-row items-center gap-2">
            <Icon name="warning" size={18} className="text-primary-container" />
            <Text className="font-label-lg text-label-lg text-on-surface">Stress Simulation</Text>
          </View>
          <Text className="mt-2 font-label-md text-label-md text-on-surface">
            What if Studio X Tech delays payment by 3 days?
          </Text>
          <Text className="mt-1 font-body-sm text-body-sm text-on-surface-variant">
            Discretionary buffer compresses to 1.8 days ahead of rent debit on Oct 27.
          </Text>
          <Button
            title="View Simulated Risk"
            icon="play_arrow"
            variant="secondary"
            className="mt-3"
            onPress={() => setSim(true)}
          />
        </Card>

        <Button
          title="Explain This Forecast"
          icon="psychology"
          onPress={() => router.push('/forecast/explanation')}
        />

        <View className="flex-row items-center justify-center gap-1.5">
          <Icon name="security" size={13} className="text-on-surface-variant" />
          <Text className="font-label-sm text-label-sm text-on-surface-variant">
            Calculated via Guardian Core v2.4 • Updated 3m ago
          </Text>
        </View>
      </Screen>

      {/* Simulation drawer */}
      <Modal visible={sim} transparent animationType="slide" onRequestClose={() => setSim(false)}>
        <Pressable className="flex-1 bg-surface-container-lowest/80" onPress={() => setSim(false)} />
        <View className="rounded-t-2xl bg-surface-container p-5 pb-10">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-2">
              <Icon name="crisis_alert" size={20} className="text-error" />
              <Text className="font-headline-sm text-headline-sm text-on-surface">
                Simulated Delta Result
              </Text>
            </View>
            <IconButton name="close" accessibilityLabel="Close" onPress={() => setSim(false)} />
          </View>

          <View className="mt-4 gap-3">
            <View className="flex-row items-center justify-between">
              <Text className="font-body-md text-body-md text-on-surface-variant">
                Oct 28 Inflow Delayed To:
              </Text>
              <Text className="font-label-lg text-label-lg text-on-surface">31 Oct (Post-Rent)</Text>
            </View>
            <View className="flex-row items-center justify-between">
              <Text className="font-body-md text-body-md text-on-surface-variant">
                Min Projected Cash Balance:
              </Text>
              <Text className="font-label-lg text-label-lg text-error">+₹842.00</Text>
            </View>
          </View>

          <View className="mt-4 flex-row gap-2.5 rounded-xl bg-surface-container-low p-3">
            <Icon name="lightbulb" size={16} className="text-primary-container" />
            <Text className="flex-1 font-body-sm text-body-sm text-on-surface-variant">
              Recommended: Shift Flat Rent transfer date or draw ₹3,000 contingency line.
            </Text>
          </View>
        </View>
      </Modal>
    </>
  );
}
