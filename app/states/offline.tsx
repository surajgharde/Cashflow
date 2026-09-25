import { router } from 'expo-router';
import { Text, View } from 'react-native';
import { Icon } from '@/components/Icon';
import type { IconName } from '@/components/glyphs';
import { Screen } from '@/components/ui/Screen';
import { Button } from '@/components/ui/Button';
import { Card, Pill, IconBadge, ProgressBar } from '@/components/ui/Surface';
import { balances } from '@/data/mock';
import { formatCurrency } from '@/lib/format';

const CAPABILITIES: { icon: IconName; label: string; tag: string; active: boolean }[] = [
  { icon: 'check', label: 'Local Safe-to-Spend calculation', tag: 'Functional', active: true },
  { icon: 'check', label: 'Manual transaction recording', tag: 'Auto-sync', active: true },
  { icon: 'check', label: 'Emergency buffer breach alerts', tag: 'Active', active: true },
  { icon: 'bolt', label: 'Live Bank Account Aggregator', tag: 'Paused', active: false },
];

export default function OfflineState() {
  return (
    <Screen
      title="Offline Enclave Mode"
      subtitle="Autonomous Protocol v4.2"
      actions={[{ icon: 'wifi_off', label: 'Offline' }]}
      contentClassName="gap-space-lg"
    >
      {/* Hero status */}
      <Card className="items-center py-7">
        <View className="h-20 w-20 items-center justify-center rounded-full bg-surface-container-high">
          <Icon name="shield_lock" size={38} filled className="text-primary-container" />
        </View>
        <Pill label="Core Guard Active" icon="security" tone="positive" className="mt-4" />

        <Text className="mt-3 text-center font-headline-md text-headline-md text-on-surface">
          Autonomous Protection Active (Offline)
        </Text>
        <Text className="mt-2 text-center font-body-md text-body-md text-on-surface-variant">
          Guardian runs fully on-device. Even without an active internet connection, your Safe-to-Spend
          limits and local spending guardrails remain operational.
        </Text>

        <View className="mt-5 flex-row flex-wrap justify-center gap-2">
          <Pill label="Neural Engine: Edge Inference" tone="positive" dot />
          <Pill label="Latency: 0ms Local" />
        </View>
      </Card>

      {/* Cached ledger */}
      <View className="gap-space-sm">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            <Icon name="cloud_sync" size={18} className="text-primary-container" />
            <Text className="font-headline-sm text-headline-sm text-on-surface">
              Cached Ledger Snapshot
            </Text>
          </View>
          <Pill label="Read-Only Cache" />
        </View>

        <Card tone="low" className="p-4">
          <Text className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">
            Cached Liquid Balance
          </Text>
          <Text className="mt-2 font-numeral-display text-numeral-display text-on-surface">
            {formatCurrency(balances.liquid)}
          </Text>
          <View className="mt-1 flex-row items-center gap-1.5">
            <Icon name="schedule" size={13} className="text-on-surface-variant" />
            <Text className="font-label-sm text-label-sm text-on-surface-variant">Synced 2h ago</Text>
          </View>
        </Card>

        <View className="flex-row gap-space-md">
          <Card tone="low" className="flex-1 p-4">
            <View className="flex-row items-center justify-between">
              <Text className="font-label-sm text-label-sm text-on-surface-variant">Safe-to-Spend</Text>
              <Icon name="check_circle" size={14} className="text-secondary" />
            </View>
            <Text className="mt-1.5 font-headline-sm text-headline-sm text-secondary">
              {formatCurrency(balances.safeToSpend)}
            </Text>
            <View className="mt-3">
              <ProgressBar value={0.46} tone="bg-secondary" />
            </View>
          </Card>

          <Card tone="low" className="flex-1 p-4">
            <View className="flex-row items-center justify-between">
              <Text className="font-label-sm text-label-sm text-on-surface-variant">Safety Buffer</Text>
              <Icon name="lock" size={14} className="text-on-surface-variant" />
            </View>
            <Text className="mt-1.5 font-headline-sm text-headline-sm text-on-surface">
              {formatCurrency(balances.buffer)}
            </Text>
            <View className="mt-3">
              <ProgressBar value={1} tone="bg-primary-container" />
            </View>
          </Card>
        </View>
      </View>

      {/* Capabilities */}
      <View className="gap-space-sm">
        <View className="flex-row items-center justify-between">
          <Text className="font-headline-sm text-headline-sm text-on-surface">Enclave Functionality</Text>
          <Pill label="3 Active Modes" tone="positive" />
        </View>

        <Card tone="low" className="gap-3 p-4">
          {CAPABILITIES.map((c, i) => (
            <View key={c.label}>
              {i > 0 ? <View className="mb-3 h-px bg-surface-container-high" /> : null}
              <View className="flex-row items-center gap-3">
                <Icon
                  name={c.icon}
                  size={16}
                  className={c.active ? 'text-secondary' : 'text-on-surface-variant'}
                />
                <Text className="flex-1 font-label-md text-label-md text-on-surface">{c.label}</Text>
                <Pill label={c.tag} tone={c.active ? 'positive' : 'warning'} />
              </View>
            </View>
          ))}
        </Card>
      </View>

      <View className="gap-3">
        <Button
          title="Log Offline Transaction"
          icon="add_circle"
          onPress={() => router.push('/transactions/edit')}
        />
        <Button title="Check Network Connection" icon="refresh" variant="secondary" />
      </View>

      {/* Enclave footer */}
      <Card tone="low" className="flex-row gap-3 p-4">
        <IconBadge name="verified_user" bg="bg-surface-container" fg="text-secondary" />
        <View className="flex-1">
          <Text className="font-label-lg text-label-lg text-on-surface">Zero-Knowledge Enclave</Text>
          <Text className="mt-1 font-body-sm text-body-sm text-on-surface-variant">
            All mathematical weights and spending models are stored locally on your device.
          </Text>
        </View>
      </Card>
    </Screen>
  );
}
