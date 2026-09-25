import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { Icon } from '@/components/Icon';
import type { IconName } from '@/components/glyphs';
import { Screen } from '@/components/ui/Screen';
import { Button } from '@/components/ui/Button';
import { Card, Pill, IconBadge } from '@/components/ui/Surface';

const CHANNELS: { icon: IconName; title: string; body: string; trailing?: IconName }[] = [
  { icon: 'account_balance', title: 'Bank CSV / Excel', body: 'HDFC, SBI, ICICI, Axis supported' },
  { icon: 'phone_iphone', title: 'UPI App Export', body: 'Google Pay, PhonePe, Paytm JSON / CSV' },
  { icon: 'data_object', title: 'Custom Guardian Schema', body: 'Download sample format', trailing: 'download' },
];

export default function ImportTransactions() {
  return (
    <Screen
      title="Import Transactions"
      subtitle="Safe Horizon Engine"
      contentClassName="gap-space-lg"
    >
      <View>
        <Text className="font-headline-lg text-headline-lg text-on-surface">Sync Financial Ledger</Text>
        <Text className="mt-1 font-body-md text-body-md text-on-surface-variant">
          Bulk import your transaction logs to train your AI Cashflow Guardian and calibrate Safe-to-Spend
          horizons.
        </Text>
      </View>

      {/* Dropzone */}
      <Pressable
        accessibilityRole="button"
        onPress={() => router.push('/transactions/import-preview')}
        className="items-center rounded-2xl border border-dashed border-outline-variant bg-surface-container-low p-8"
      >
        <View className="h-16 w-16 items-center justify-center rounded-full bg-surface-container">
          <Icon name="cloud_upload" size={30} className="text-primary-container" />
        </View>
        <Text className="mt-4 text-center font-headline-sm text-headline-sm text-on-surface">
          Tap to browse files
        </Text>
        <Text className="mt-1.5 text-center font-body-sm text-body-sm text-on-surface-variant">
          Supports CSV, JSON and Bank XLS statements (Max 15MB)
        </Text>
        <Pill label="Zero-knowledge parsing" icon="verified_user" tone="positive" className="mt-4" />
      </Pressable>

      {/* Validated channels */}
      <View className="gap-space-sm">
        <View className="flex-row items-center justify-between">
          <Text className="font-headline-sm text-headline-sm text-on-surface">Validated Channels</Text>
          <Pill label="Auto-detect Enabled" tone="positive" dot />
        </View>

        <Card tone="low" className="gap-3 p-4">
          {CHANNELS.map((c, i) => (
            <View key={c.title}>
              {i > 0 ? <View className="mb-3 h-px bg-surface-container-high" /> : null}
              <Pressable accessibilityRole="button" className="flex-row items-center gap-3">
                <IconBadge name={c.icon} bg="bg-surface-container" />
                <View className="flex-1">
                  <Text className="font-label-lg text-label-lg text-on-surface">{c.title}</Text>
                  <Text className="font-body-sm text-body-sm text-on-surface-variant">{c.body}</Text>
                </View>
                <Icon
                  name={c.trailing ?? 'chevron_right'}
                  size={18}
                  className="text-on-surface-variant"
                />
              </Pressable>
            </View>
          ))}
        </Card>
      </View>

      {/* Privacy note */}
      <Card tone="low" className="flex-row gap-3 p-4">
        <IconBadge name="shield_locked" bg="bg-surface-container" fg="text-primary-container" />
        <View className="flex-1">
          <Text className="font-label-lg text-label-lg text-on-surface">Tier-4 Client-Side Parsing</Text>
          <Text className="mt-1 font-body-sm text-body-sm text-on-surface-variant">
            Your statement is processed locally and credentials are never stored. Mathematical weightings
            compute on device.
          </Text>
        </View>
      </Card>

      {/* Audit log */}
      <View className="gap-space-sm">
        <View className="flex-row items-center justify-between">
          <Text className="font-headline-sm text-headline-sm text-on-surface">Audit Log</Text>
          <View className="flex-row items-center gap-1.5">
            <Icon name="history" size={14} className="text-on-surface-variant" />
            <Text className="font-label-sm text-label-sm text-on-surface-variant">Sync History</Text>
          </View>
        </View>

        <Card tone="low" className="flex-row items-center gap-3 p-4">
          <IconBadge name="description" bg="bg-surface-container" />
          <View className="flex-1">
            <Text className="font-label-lg text-label-lg text-on-surface">ICICI_Oct_Stmt.csv</Text>
            <Text className="font-body-sm text-body-sm text-on-surface-variant">
              42 transactions • Oct 18
            </Text>
          </View>
          <Pill label="Calibrated" icon="check_circle" tone="positive" />
        </Card>
      </View>

      <Button
        title="Select File & Upload"
        icon="upload_file"
        onPress={() => router.push('/transactions/import-preview')}
      />
    </Screen>
  );
}
