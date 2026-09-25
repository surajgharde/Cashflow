import { useState } from 'react';
import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { Icon } from '@/components/Icon';
import { Screen } from '@/components/ui/Screen';
import { Button, IconButton } from '@/components/ui/Button';
import { Field, Toggle } from '@/components/ui/Form';
import { Card, Pill, IconBadge, ProgressBar } from '@/components/ui/Surface';
import { Sparkline } from '@/components/ui/Charts';
import { colors } from '@/theme/tokens';
import { incomeSources } from '@/data/mock';
import { formatCurrency } from '@/lib/format';

const CADENCES = ['Monthly', 'Weekly', 'Irregular'] as const;

export default function IncomeSettings() {
  const [showForm, setShowForm] = useState(false);
  const [cadence, setCadence] = useState<(typeof CADENCES)[number]>('Monthly');
  const [shield, setShield] = useState(true);

  const total = incomeSources.reduce((s, x) => s + x.amount, 0);

  return (
    <Screen title="Income Settings" subtitle="Predictive Engine Live" avatar contentClassName="gap-space-lg">
      <View className="flex-row items-center justify-between rounded-2xl bg-surface-container-low p-3">
        <View className="flex-row items-center gap-2">
          <Icon name="verified_user" size={16} className="text-secondary" />
          <Text className="font-label-sm text-label-sm text-on-surface-variant">
            Predictive Engine Live · Syncing with ledger
          </Text>
        </View>
        <Pill label="Optimal" tone="positive" />
      </View>

      {/* Overview */}
      <Card>
        <View className="flex-row items-start justify-between">
          <View>
            <Text className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">
              Monthly Expected Income
            </Text>
            <Text className="mt-2 font-display-hero-mobile text-display-hero-mobile text-on-surface">
              {formatCurrency(total)}
            </Text>
          </View>
          <IconBadge
            name="account_balance_wallet"
            size={44}
            iconSize={22}
            bg="bg-surface-container-high"
            fg="text-primary-container"
          />
        </View>

        <View className="mt-4 flex-row items-center justify-between rounded-xl bg-surface-container-low p-3">
          <View className="flex-row items-center gap-2">
            <Icon name="insights" size={16} className="text-primary-container" />
            <View>
              <Text className="font-label-sm text-label-sm text-on-surface-variant">Regularity Index</Text>
              <Text className="font-label-lg text-label-lg text-on-surface">
                84% <Text className="font-body-sm text-body-sm text-secondary">· Stable</Text>
              </Text>
            </View>
          </View>
          <Sparkline data={[22, 26, 24, 30, 28, 33, 33]} color={colors.secondary} width={80} height={30} />
        </View>
      </Card>

      {/* Active streams */}
      <View className="gap-space-sm">
        <View className="flex-row items-center justify-between">
          <Text className="font-headline-sm text-headline-sm text-on-surface">Active Streams</Text>
          <Pill label={`${incomeSources.length} configured`} />
        </View>

        {incomeSources.map((s) => (
          <Card key={s.id} tone="low" className="p-4">
            <View className="flex-row items-start gap-3">
              <IconBadge name={s.icon} size={40} iconSize={20} bg="bg-surface-container" fg="text-primary-container" />
              <View className="flex-1">
                <Text className="font-label-lg text-label-lg text-on-surface">{s.title}</Text>
                <Text className="mt-0.5 font-body-sm text-body-sm text-on-surface-variant">{s.cadence}</Text>
              </View>
              <View className="flex-row">
                <IconButton name="edit" size={18} accessibilityLabel={`Edit ${s.title}`} />
                <IconButton name="delete" size={18} accessibilityLabel={`Delete ${s.title}`} />
              </View>
            </View>

            <View className="mt-3 flex-row items-center justify-between rounded-xl bg-surface-container p-3">
              <Text className="font-headline-sm text-headline-sm text-secondary">
                {formatCurrency(s.amount)}
              </Text>
              <Pill label={s.confidence} tone={s.confidence.startsWith('Guaranteed') ? 'positive' : 'warning'} />
            </View>
          </Card>
        ))}
      </View>

      <Button
        title="Add Another Income Source"
        icon="add_circle"
        variant="secondary"
        onPress={() => setShowForm((v) => !v)}
      />

      {/* Quick form */}
      {showForm ? (
        <Card tone="low" className="gap-4 p-4">
          <View className="flex-row items-center justify-between">
            <Text className="font-label-lg text-label-lg text-on-surface">Quick Setup</Text>
            <Pill label="Adaptive Schedule" tone="positive" dot />
          </View>

          <Field
            label="Source Title"
            icon="edit_note"
            placeholder="e.g. Consulting, Dividends"
            defaultValue="Freelance Product Strategy"
          />
          <Field label="Amount (₹)" icon="currency_rupee" defaultValue="12,500" keyboardType="numeric" />

          <View className="gap-1.5">
            <Text className="px-1 font-label-md text-label-md text-on-surface-variant">Expected Day</Text>
            <Pressable className="flex-row items-center gap-3 rounded-xl bg-surface-container p-3.5">
              <Icon name="calendar_today" size={18} className="text-on-surface-variant" />
              <Text className="flex-1 font-label-lg text-label-lg text-on-surface">15th</Text>
              <Icon name="expand_more" size={18} className="text-on-surface-variant" />
            </Pressable>
          </View>

          <View className="gap-1.5">
            <Text className="px-1 font-label-md text-label-md text-on-surface-variant">Cadence</Text>
            <View className="flex-row gap-1 rounded-xl bg-surface-container p-1.5">
              {CADENCES.map((c) => {
                const active = cadence === c;
                return (
                  <Pressable
                    key={c}
                    onPress={() => setCadence(c)}
                    accessibilityRole="tab"
                    accessibilityState={{ selected: active }}
                    className={`flex-1 rounded-lg py-2 ${active ? 'bg-surface-container-highest' : ''}`}
                  >
                    <Text
                      className={`text-center font-label-md text-label-md ${
                        active ? 'text-on-surface' : 'text-on-surface-variant'
                      }`}
                    >
                      {c}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
        </Card>
      ) : null}

      {/* Variance shield */}
      <Card tone="low" className="p-4">
        <View className="flex-row items-start gap-3">
          <IconBadge name="shield" bg="bg-surface-container" fg="text-primary-container" />
          <View className="flex-1">
            <View className="flex-row items-center gap-2">
              <Text className="font-label-lg text-label-lg text-on-surface">AI Timing Variance Shield</Text>
              <Pill label="Active" tone="positive" />
            </View>
            <Text className="mt-1 font-body-sm text-body-sm text-on-surface-variant">
              Buffer against delayed client invoices (+48h safety window). Shifts critical bill outflows
              dynamically.
            </Text>
          </View>
          <Toggle value={shield} onChange={setShield} />
        </View>

        <View className="mt-3">
          <ProgressBar value={0.84} />
        </View>
      </Card>

      <View className="gap-2">
        <Button title="Save Income Configuration" icon="check_circle" onPress={() => router.back()} />
        <Text className="text-center font-body-sm text-body-sm text-on-surface-variant">
          Modifications immediately calibrate baseline forecast
        </Text>
      </View>
    </Screen>
  );
}
