import { useState } from 'react';
import { router } from 'expo-router';
import { Text, View } from 'react-native';
import { Icon } from '@/components/Icon';
import { Screen } from '@/components/ui/Screen';
import { Button } from '@/components/ui/Button';
import { Toggle } from '@/components/ui/Form';
import { Card, Pill, IconBadge } from '@/components/ui/Surface';
import { ListRow, RowGroup } from '@/components/ui/Rows';

const PERMISSIONS = [
  {
    id: 'p1',
    icon: 'memory' as const,
    title: 'Client-Side ML',
    body: 'Compute Safe-to-Spend models entirely on device',
    detail: 'Raw financial logs & SMS bank parsers run inside isolated sandboxes. Telemetry never leaves your chip.',
  },
  {
    id: 'p2',
    icon: 'query_stats' as const,
    title: 'Differential Analytics',
    body: 'Share anonymous intervention acceptance rates to train Guardian Core',
    detail: 'Aggregated metrics using randomized noise injection (ε-differential privacy).',
  },
  {
    id: 'p3',
    icon: 'fingerprint' as const,
    title: 'Biometric Shield',
    body: 'Require Fingerprint / FaceID every time app opens',
    detail: 'Zero fallback password persistence; instantly seals vault upon backgrounding.',
  },
];

export default function PrivacySettings() {
  const [on, setOn] = useState<Record<string, boolean>>({ p1: true, p2: false, p3: true });

  return (
    <Screen title="Privacy Settings" subtitle="Data Vault" avatar contentClassName="gap-space-lg">
      {/* Vault banner */}
      <Card>
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            <Icon name="encrypted" size={18} className="text-primary-container" />
            <Text className="font-label-lg text-label-lg text-on-surface">Data Vault</Text>
          </View>
          <Pill label="Active" tone="positive" dot />
        </View>

        <Text className="mt-2 font-body-sm text-body-sm text-on-surface-variant">
          Tier-4 Zero Knowledge Cryptographic Architecture. Decryption keys reside exclusively on this
          silicon enclave.
        </Text>

        <View className="mt-4 flex-row items-center justify-between rounded-xl bg-surface-container-low p-3">
          <Text className="font-label-sm text-label-sm text-secondary">Local Enclave Synced</Text>
          <Text className="font-label-sm text-label-sm text-on-surface-variant">RSA-4096 / AES-GCM</Text>
        </View>
      </Card>

      {/* Permissions */}
      <View className="gap-space-sm">
        <View className="flex-row items-center justify-between">
          <Text className="font-headline-sm text-headline-sm text-on-surface">
            Machine Intelligence & Permissions
          </Text>
          <Pill label="Local Strict" tone="accent" />
        </View>

        {PERMISSIONS.map((p) => (
          <Card key={p.id} tone="low" className="p-4">
            <View className="flex-row items-start gap-3">
              <IconBadge name={p.icon} bg="bg-surface-container" fg="text-primary-container" />
              <View className="flex-1">
                <Text className="font-label-lg text-label-lg text-on-surface">{p.title}</Text>
                <Text className="mt-0.5 font-body-sm text-body-sm text-on-surface-variant">{p.body}</Text>
              </View>
              <Toggle value={on[p.id]} onChange={(v) => setOn((s) => ({ ...s, [p.id]: v }))} />
            </View>

            <View className="mt-3 flex-row gap-2.5 rounded-xl bg-surface-container p-3">
              <Icon name="verified_user" size={14} className="text-on-surface-variant" />
              <Text className="flex-1 font-body-sm text-body-sm text-on-surface-variant">{p.detail}</Text>
            </View>
          </Card>
        ))}
      </View>

      {/* Audit & erasure */}
      <View className="gap-2">
        <View className="flex-row items-center justify-between px-1">
          <Text className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
            Audit & Data Erasure
          </Text>
          <Pill label="Zero Footprint" />
        </View>

        <RowGroup>
          <ListRow
            icon="folder_zip"
            title="Download Encrypted Vault"
            subtitle="Full cryptographic dump (.JSON + GPG signature)"
            chevron
          />
          <ListRow
            icon="link_off"
            title="Revoke Bank Feed Access"
            subtitle="Sever active Account Aggregator consent artifact"
            chevron
          />
        </RowGroup>
      </View>

      {/* Danger */}
      <Card tone="low" className="p-4">
        <View className="flex-row items-center gap-2">
          <Icon name="delete_forever" size={18} className="text-error" />
          <Text className="font-label-lg text-label-lg text-error">Financial Cache</Text>
        </View>
        <Text className="mt-2 font-body-sm text-body-sm text-on-surface-variant">
          Irrevocably shred all derived forecasting weights, merchant classifications, and SMS tokens from
          local storage.
        </Text>
        <Button title="Permanently Wipe Local Cache" variant="danger" className="mt-3" />
      </Card>

      {/* Compliance */}
      <View className="flex-row gap-2.5 rounded-2xl bg-surface-container-low p-4">
        <Icon name="policy" size={16} className="text-on-surface-variant" />
        <Text className="flex-1 font-body-sm text-body-sm text-on-surface-variant">
          Compliant with RBI Account Aggregator guidelines & the Indian Digital Personal Data Protection
          (DPDP) Act, 2023.
        </Text>
      </View>

      <View className="gap-2">
        <Button title="Save Privacy Settings" icon="lock_reset" onPress={() => router.back()} />
        <Text className="text-center font-body-sm text-body-sm text-on-surface-variant">
          Security parameters updated successfully
        </Text>
      </View>
    </Screen>
  );
}
