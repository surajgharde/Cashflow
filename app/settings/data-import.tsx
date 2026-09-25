import { useState } from 'react';
import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { Icon } from '@/components/Icon';
import { Screen } from '@/components/ui/Screen';
import { Button, IconButton } from '@/components/ui/Button';
import { Card, Pill, IconBadge } from '@/components/ui/Surface';
import { ListRow, RowGroup } from '@/components/ui/Rows';

const FEEDS = [
  { id: 'f1', bank: 'HDFC', name: 'HDFC Bank Savings (**4021)', synced: 'Synced 4m ago • Live' },
  { id: 'f2', bank: 'ICICI', name: 'ICICI Bank Primary (**9500)', synced: 'Synced 12m ago • Live' },
];

export default function DataImportSettings() {
  const [saved, setSaved] = useState(false);

  return (
    <Screen
      title="Data & Import"
      subtitle="AA Engine v3.4 Active"
      avatar
      contentClassName="gap-space-lg"
    >
      <View>
        <Text className="font-headline-md text-headline-md text-on-surface">
          Data Synchronization & Import Hub
        </Text>
        <Text className="mt-1 font-body-md text-body-md text-on-surface-variant">
          Automated telemetry & encrypted financial pipelines
        </Text>
      </View>

      {/* Connected feeds */}
      <View className="gap-space-sm">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            <Icon name="cloud_sync" size={18} className="text-primary-container" />
            <Text className="font-headline-sm text-headline-sm text-on-surface">Connected Bank & UPI</Text>
          </View>
          <Pill label="2 Active Feeds" tone="positive" dot />
        </View>

        <Card tone="low" className="gap-3 p-4">
          {FEEDS.map((f, i) => (
            <View key={f.id}>
              {i > 0 ? <View className="mb-3 h-px bg-surface-container-high" /> : null}
              <View className="flex-row items-center gap-3">
                <View className="h-10 w-12 items-center justify-center rounded-lg bg-surface-container">
                  <Text className="font-label-sm text-label-sm text-primary-container">{f.bank}</Text>
                </View>
                <View className="flex-1">
                  <Text className="font-label-lg text-label-lg text-on-surface">{f.name}</Text>
                  <Text className="mt-0.5 font-body-sm text-body-sm text-secondary">{f.synced}</Text>
                </View>
                <IconButton name="sync" size={18} accessibilityLabel={`Force sync ${f.bank}`} />
              </View>
            </View>
          ))}
        </Card>

        <Button title="Link New Bank via Account Aggregator" icon="add_circle" variant="secondary" />
      </View>

      {/* Manual operations */}
      <View className="gap-2">
        <View className="flex-row items-center gap-2 px-1">
          <Icon name="sync_alt" size={16} className="text-primary-container" />
          <Text className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
            Manual Data Operations
          </Text>
        </View>

        <RowGroup>
          <ListRow
            icon="upload_file"
            title="Import Statement"
            subtitle="CSV, JSON, XLS ledger parsing"
            chevron
            onPress={() => router.push('/transactions/import')}
          />
          <ListRow
            icon="download"
            title="Export Financial Ledger"
            subtitle="Complete audit-ready .CSV or .PDF statement"
            value="PDF/CSV"
          />
          <ListRow
            icon="enhanced_encryption"
            title="Backup Financial Settings"
            subtitle="End-to-end encrypted personal cloud backup"
            trailing={<Icon name="verified_user" size={18} className="text-secondary" />}
          />
        </RowGroup>
      </View>

      {/* Demo data */}
      <View className="gap-space-sm">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            <Icon name="bug_report" size={18} className="text-primary-container" />
            <Text className="font-headline-sm text-headline-sm text-on-surface">Demo Data & Testing</Text>
          </View>
          <Pill label="Hackathon Mode" tone="accent" />
        </View>

        <Card tone="low" className="p-4">
          <View className="flex-row gap-2.5">
            <Icon name="info" size={16} className="text-on-surface-variant" />
            <Text className="flex-1 font-body-sm text-body-sm text-on-surface-variant">
              Resetting reinstates sample balance parameters and re-seeds synthetic scheduled bills for
              testing real-time cashflow predictions.
            </Text>
          </View>

          <Button
            title="Reset to Default Demo Scenario"
            icon="restart_alt"
            variant="secondary"
            className="mt-4"
            onPress={() => router.push('/demo')}
          />
          <Text className="mt-2 text-center font-label-sm text-label-sm text-on-surface-variant">
            Restores initial ₹12,500 balance and upcoming rent schedule
          </Text>

          <Button title="Clear All Transaction History" icon="delete_sweep" variant="danger" className="mt-4" />
        </Card>
      </View>

      <View className="gap-2">
        <Button title="Save Data Configurations" icon="save" onPress={() => setSaved(true)} />
        {saved ? (
          <View className="flex-row items-center justify-center gap-1.5">
            <Icon name="check_circle" size={14} className="text-secondary" />
            <Text className="font-body-sm text-body-sm text-secondary">Configuration updated</Text>
          </View>
        ) : null}
      </View>
    </Screen>
  );
}
