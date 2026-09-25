import { useState } from 'react';
import { router } from 'expo-router';
import { Text, View } from 'react-native';
import { Icon } from '@/components/Icon';
import type { IconName } from '@/components/glyphs';
import { Screen } from '@/components/ui/Screen';
import { Button } from '@/components/ui/Button';
import { RadioRow } from '@/components/ui/Form';
import { Card, Pill, IconBadge } from '@/components/ui/Surface';

const DIAGNOSTICS = [
  { label: 'Error Reference', value: 'ERR_AA_GATEWAY_TIMEOUT_504' },
  { label: 'Recorded Timestamp', value: 'Today at 02:45 PM IST' },
  { label: 'Institution Target', value: 'HDFC Bank Ltd. (Core Banking API)' },
];

const STRATEGIES: { key: string; icon: IconName; title: string; body: string; recommended?: boolean }[] = [
  {
    key: 'retry',
    icon: 'sync',
    title: 'Retry Encrypted Handshake',
    body: 'Re-establishes OAuth session with refreshed cryptographic token',
    recommended: true,
  },
  {
    key: 'offline',
    icon: 'offline_bolt',
    title: 'Switch to Offline Enclave Mode',
    body: 'Keeps Cashflow Guardian active using last verified balance',
  },
  {
    key: 'import',
    icon: 'upload_file',
    title: 'Import Recent Statement',
    body: 'Manually feed encrypted .CSV or .JSON bank export',
  },
];

export default function ErrorState() {
  const [strategy, setStrategy] = useState('retry');

  return (
    <Screen
      title="Connection Status"
      subtitle="Gateway Interruption"
      actions={[{ icon: 'help_outline', label: 'Help' }]}
      contentClassName="gap-space-lg"
    >
      {/* Error hero */}
      <Card className="items-center py-7">
        <View className="h-20 w-20 items-center justify-center rounded-full bg-error-container/40">
          <Icon name="shield_with_heart" size={38} filled className="text-error" />
        </View>
        <Pill label="Gateway Interruption" icon="sync_problem" tone="danger" className="mt-4" />

        <Text className="mt-3 text-center font-headline-md text-headline-md text-on-surface">
          Account Aggregator Sync Timeout
        </Text>
        <Text className="mt-2 text-center font-body-md text-body-md text-on-surface-variant">
          Unable to establish an encrypted handshake with your primary banking institution (HDFC Bank API
          timed out).
        </Text>
      </Card>

      {/* Diagnostics */}
      <Card tone="low" className="p-4">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            <Icon name="terminal" size={18} className="text-on-surface-variant" />
            <Text className="font-label-lg text-label-lg text-on-surface">Diagnostics</Text>
          </View>
          <Pill label="504 GATEWAY TIMEOUT" tone="danger" />
        </View>

        <View className="mt-3 gap-2">
          {DIAGNOSTICS.map((d) => (
            <View key={d.label} className="flex-row items-center justify-between rounded-xl bg-surface-container p-3">
              <Text className="font-label-sm text-label-sm text-on-surface-variant">{d.label}</Text>
              <Text className="font-label-md text-label-md text-on-surface">{d.value}</Text>
            </View>
          ))}
        </View>
      </Card>

      {/* Vault secure */}
      <Card tone="low" className="flex-row gap-3 p-4">
        <IconBadge name="verified_user" bg="bg-surface-container" fg="text-secondary" />
        <Text className="flex-1 font-body-sm text-body-sm text-on-surface-variant">
          <Text className="text-on-surface">Vault Secure:</Text> Your local financial vault is completely
          uncompromised. Cached balances remain active and protected.
        </Text>
      </Card>

      {/* Recovery strategies */}
      <View className="gap-space-sm">
        <Text className="font-headline-sm text-headline-sm text-on-surface">Resolution Strategies</Text>

        {STRATEGIES.map((s) => (
          <RadioRow
            key={s.key}
            selected={strategy === s.key}
            onPress={() => setStrategy(s.key)}
            title={s.title}
            subtitle={s.body}
            trailing={
              s.recommended ? <Pill label="Recommended" tone="positive" /> : (
                <Icon name={s.icon} size={18} className="text-on-surface-variant" />
              )
            }
          />
        ))}
      </View>

      <View className="gap-3">
        <Button title="Retry Bank Connection Now" icon="autorenew" onPress={() => router.replace('/(tabs)')} />
        <Button
          title="Continue in Offline Mode"
          icon="cloud_off"
          variant="secondary"
          onPress={() => router.replace('/states/offline')}
        />
      </View>

      {/* Regulatory footnote */}
      <View className="items-center gap-2 py-2">
        <View className="flex-row items-center gap-1.5">
          <Icon name="check_circle" size={13} className="text-secondary" />
          <Text className="font-label-sm text-label-sm text-on-surface-variant">
            RBI Account Aggregator Status: Normal
          </Text>
        </View>
        <Text className="text-center font-body-sm text-body-sm text-on-surface-variant">
          If issues persist, check bank server status or contact your institution's support desk.
        </Text>
      </View>
    </Screen>
  );
}
