import { useMemo, useState } from 'react';
import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { Icon } from '@/components/Icon';
import { Screen } from '@/components/ui/Screen';
import { Button } from '@/components/ui/Button';
import { Card, Pill, IconBadge, ProgressBar } from '@/components/ui/Surface';
import { riskFactors } from '@/data/mock';

const FILTERS = [
  { key: 'all', label: 'All Factors' },
  { key: 'high', label: 'High Impact' },
  { key: 'medium', label: 'Medium' },
  { key: 'controlled', label: 'Controlled' },
] as const;

type FilterKey = (typeof FILTERS)[number]['key'];

const SEVERITY = {
  high: { tone: 'danger' as const, fg: 'text-error' },
  medium: { tone: 'warning' as const, fg: 'text-primary-container' },
  controlled: { tone: 'positive' as const, fg: 'text-secondary' },
};

export default function RiskFactors() {
  const [filter, setFilter] = useState<FilterKey>('all');

  const shown = useMemo(
    () => (filter === 'all' ? riskFactors : riskFactors.filter((f) => f.severity === filter)),
    [filter],
  );

  const counts = useMemo(
    () => ({
      all: riskFactors.length,
      high: riskFactors.filter((f) => f.severity === 'high').length,
      medium: riskFactors.filter((f) => f.severity === 'medium').length,
      controlled: riskFactors.filter((f) => f.severity === 'controlled').length,
    }),
    [],
  );

  return (
    <Screen
      title="Risk Factors"
      subtitle="Diagnostic Engine v4.2"
      avatar
      actions={[{ icon: 'restart_alt', label: 'Reset' }, { icon: 'more_vert', label: 'More' }]}
      contentClassName="gap-space-lg"
    >
      <View className="flex-row items-center justify-between">
        <Text className="flex-1 font-body-md text-body-md text-on-surface-variant">
          Vulnerability weightings & breakdown across active accounts
        </Text>
        <Pill label="Active Watch" tone="positive" dot />
      </View>

      {/* Exposure index banner */}
      <Card tone="low" className="p-4">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            <Icon name="analytics" size={18} className="text-primary-container" />
            <Text className="font-label-lg text-label-lg text-on-surface">Exposure Index</Text>
          </View>
          <Icon name="warning" size={18} className="text-error" />
        </View>
        <Text className="mt-1.5 font-headline-sm text-headline-sm text-on-surface">
          4 Key Vulnerability Factors
        </Text>
        <Text className="mt-1 font-body-sm text-body-sm text-on-surface-variant">
          Algorithmic risk pressure standing at -60 cumulative pts
        </Text>

        <View className="mt-4 gap-1.5">
          <View className="flex-row items-center justify-between">
            <Text className="font-label-sm text-label-sm text-on-surface-variant">Vulnerability Density</Text>
            <Text className="font-label-sm text-label-sm text-error">High Threat Phase</Text>
          </View>
          <ProgressBar value={0.72} tone="bg-error" height={6} />
        </View>
      </Card>

      {/* Filter track */}
      <View className="flex-row flex-wrap gap-2">
        {FILTERS.map((f) => {
          const active = filter === f.key;
          return (
            <Pressable
              key={f.key}
              onPress={() => setFilter(f.key)}
              accessibilityRole="tab"
              accessibilityState={{ selected: active }}
              className={`rounded-full px-3.5 py-2 ${
                active ? 'bg-primary-container' : 'bg-surface-container-high'
              }`}
            >
              <Text
                className={`font-label-md text-label-md ${
                  active ? 'text-on-primary-fixed' : 'text-on-surface-variant'
                }`}
              >
                {f.label} ({counts[f.key]})
              </Text>
            </Pressable>
          );
        })}
      </View>

      {/* Factor cards */}
      <View className="gap-space-sm">
        {shown.map((f) => {
          const sev = SEVERITY[f.severity];
          return (
            <Card key={f.id} tone="low" className="p-4">
              <View className="flex-row items-start gap-3">
                <IconBadge name={f.icon} size={40} iconSize={20} bg="bg-surface-container" fg={sev.fg} />
                <View className="flex-1">
                  <Text className="font-label-lg text-label-lg text-on-surface">{f.title}</Text>
                  <View className="mt-1 flex-row flex-wrap items-center gap-2">
                    <Pill label={f.weight} tone={sev.tone} />
                    <Pill label={f.tag} />
                  </View>
                </View>
              </View>

              <Text className="mt-3 font-body-sm text-body-sm text-on-surface-variant">{f.body}</Text>

              {f.action ? (
                <Pressable
                  accessibilityRole="button"
                  onPress={() => router.push('/recommendations')}
                  className="mt-3 flex-row items-center gap-2 rounded-xl bg-surface-container p-3"
                >
                  <Icon name={f.action.icon} size={16} className="text-primary-container" />
                  <Text className="flex-1 font-label-md text-label-md text-on-surface">{f.action.label}</Text>
                  <Icon name="arrow_forward" size={16} className="text-on-surface-variant" />
                </Pressable>
              ) : (
                <View className="mt-3 flex-row items-center gap-2">
                  <Icon
                    name={f.severity === 'controlled' ? 'check_circle' : 'domain'}
                    size={14}
                    className={sev.fg}
                  />
                  <Text className="font-label-sm text-label-sm text-on-surface-variant">
                    {f.severity === 'controlled'
                      ? 'Zero overdraft risk before Oct 27'
                      : 'Auto-debit lock active on 2 accounts'}
                  </Text>
                </View>
              )}
            </Card>
          );
        })}
      </View>

      <View className="gap-2">
        <Button
          title="Shortfall Prediction Timeline"
          icon="trending_up"
          iconTrailing
          onPress={() => router.push('/risk/shortfall')}
        />
        <Text className="text-center font-body-sm text-body-sm text-on-surface-variant">
          AI simulation updates dynamically on balance drift
        </Text>
      </View>
    </Screen>
  );
}
