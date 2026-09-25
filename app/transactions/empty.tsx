import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { Icon } from '@/components/Icon';
import { Screen } from '@/components/ui/Screen';
import { Button } from '@/components/ui/Button';
import { Field } from '@/components/ui/Form';
import { Card, Pill, IconBadge } from '@/components/ui/Surface';

export default function EmptyTransactionsState() {
  return (
    <Screen
      title="Activity"
      subtitle="Guardian Enclave"
      avatar
      tabBarSpacing
      actions={[{ icon: 'notifications', label: 'Notifications', onPress: () => router.push('/notifications') }]}
      contentClassName="gap-space-lg"
    >
      {/* Search (disabled in the empty state) */}
      <View className="flex-row items-center gap-2 opacity-50">
        <Field
          icon="search"
          placeholder="Search transactions, tags, payees..."
          editable={false}
          className="flex-1"
        />
        <View className="h-[50px] w-[50px] items-center justify-center rounded-xl bg-surface-container">
          <Icon name="tune" size={20} className="text-on-surface-variant" />
        </View>
      </View>

      {/* Zeroed velocity summary */}
      <Card tone="low" className="p-4">
        <View className="flex-row items-center justify-between">
          <Text className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
            Ledger Calibration • Current Cycle
          </Text>
          <Pill label="Standby" />
        </View>
        <View className="mt-3 flex-row">
          {[
            { icon: 'arrow_downward_alt' as const, label: 'Inflows', sub: '0 records' },
            { icon: 'arrow_upward_alt' as const, label: 'Outflows', sub: '0 debits' },
            { icon: 'bolt' as const, label: 'Velocity', sub: '0.0x base' },
          ].map((s) => (
            <View key={s.label} className="flex-1 gap-0.5">
              <Icon name={s.icon} size={16} className="text-on-surface-variant" />
              <Text className="font-label-sm text-label-sm text-on-surface-variant">{s.label}</Text>
              <Text className="font-label-lg text-label-lg text-on-surface-variant">₹0.00</Text>
              <Text className="font-label-sm text-label-sm text-on-surface-variant">{s.sub}</Text>
            </View>
          ))}
        </View>
      </Card>

      {/* Empty illustration */}
      <Card className="items-center py-10">
        <View className="h-24 w-24 items-center justify-center rounded-full bg-surface-container-low">
          <Icon name="receipt_long" size={44} className="text-on-surface-variant" />
        </View>

        <Text className="mt-6 text-center font-headline-md text-headline-md text-on-surface">
          No Transactions Recorded Yet
        </Text>
        <Text className="mt-2 text-center font-body-md text-body-md text-on-surface-variant">
          Your financial ledger is currently empty. Connect your bank via Account Aggregator, import a
          statement, or log an initial transaction to calibrate your Safe-to-Spend engine.
        </Text>

        <View className="mt-6 flex-row gap-2">
          <Pill label="AI ready" icon="auto_awesome" tone="positive" />
          <Pill label="Encrypted" icon="lock" />
        </View>
      </Card>

      <View className="gap-3">
        <Button
          title="Add Manual Transaction"
          icon="add_circle"
          onPress={() => router.push('/transactions/edit')}
        />
        <Button
          title="Import Bank CSV / JSON Ledger"
          icon="folder_open"
          variant="secondary"
          onPress={() => router.push('/transactions/import')}
        />
      </View>

      {/* Account Aggregator prompt */}
      <Card tone="low" className="p-4">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            <Icon name="account_balance" size={18} className="text-primary-container" />
            <Text className="font-label-lg text-label-lg text-on-surface">Automated Live Connect</Text>
          </View>
          <Pill label="RBI Approved" tone="positive" />
        </View>

        <Text className="mt-2 font-body-sm text-body-sm text-on-surface-variant">
          Link HDFC, ICICI, or SBI via RBI Account Aggregator for automated instant sync.
        </Text>

        <View className="mt-3 flex-row items-center justify-between rounded-xl bg-surface-container p-3">
          <Text className="font-label-sm text-label-sm text-on-surface-variant">
            HDFC • ICICI • SBI • Axis
          </Text>
          <Pressable
            accessibilityRole="button"
            onPress={() => router.push('/settings/data-import')}
            className="flex-row items-center gap-1"
          >
            <Text className="font-label-md text-label-md text-primary-container">Link Account</Text>
            <Icon name="arrow_forward" size={14} className="text-primary-container" />
          </Pressable>
        </View>
      </Card>

      <View className="flex-row items-center justify-between rounded-2xl bg-surface-container p-4">
        <View className="flex-row items-center gap-2">
          <IconBadge name="encrypted" size={28} iconSize={14} bg="bg-surface-container-high" />
          <Text className="font-label-sm text-label-sm text-on-surface-variant">
            256-bit Enclave Isolation
          </Text>
        </View>
        <Pressable accessibilityRole="button" className="flex-row items-center gap-1">
          <Text className="font-label-sm text-label-sm text-primary-container">How safety works</Text>
          <Icon name="help_outline" size={13} className="text-primary-container" />
        </Pressable>
      </View>
    </Screen>
  );
}
