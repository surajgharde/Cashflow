import { useState } from 'react';
import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { Icon } from '@/components/Icon';
import type { IconName } from '@/components/glyphs';
import { Screen } from '@/components/ui/Screen';
import { Button } from '@/components/ui/Button';
import { Toggle } from '@/components/ui/Form';
import { Card, Pill, IconBadge, ProgressBar } from '@/components/ui/Surface';

const META: { icon: IconName; label: string; value: string; sub?: string; copyable?: boolean }[] = [
  { icon: 'fingerprint', label: 'Transaction ID', value: '#TXN-894021482', copyable: true },
  { icon: 'calendar_today', label: 'Date & Time', value: 'Today, 24 Oct • 02:12 PM' },
  { icon: 'account_balance_wallet', label: 'Payment Mode', value: 'Google Pay / UPI', sub: 'Linked to HDFC ••4021' },
  { icon: 'category', label: 'Category Segment', value: 'MCC 5812 (Eating Places)' },
  { icon: 'verified_user', label: 'Settlement Status', value: 'Instant Clearance' },
];

export default function TransactionDetails() {
  const [essential, setEssential] = useState(false);
  const [copied, setCopied] = useState(false);

  return (
    <Screen
      title="Transaction Details"
      subtitle="Guardian Verified"
      tabBarSpacing
      actions={[{ icon: 'share', label: 'Share' }]}
      contentClassName="gap-space-lg"
    >
      {/* Hero specimen */}
      <Card className="items-center">
        <View className="h-16 w-16 items-center justify-center rounded-full bg-surface-container-high">
          <Icon name="restaurant" size={30} className="text-primary-container" />
        </View>

        <View className="mt-3 flex-row items-center gap-1.5">
          <Text className="font-headline-md text-headline-md text-on-surface">Swiggy Gourmet</Text>
          <Icon name="verified" size={16} className="text-secondary" />
        </View>
        <Text className="mt-0.5 font-body-sm text-body-sm text-on-surface-variant">
          Settled • UPI via ICICI Bank
        </Text>

        <Text className="mt-4 font-display-hero text-display-hero text-on-surface">-₹420.00</Text>

        <View className="mt-3 flex-row gap-2">
          <Pill label="Food & Dining" tone="accent" />
          <Pill label="Discretionary" />
        </View>
      </Card>

      {/* Safe-to-spend impact */}
      <Card tone="low" className="p-4">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            <Icon name="bolt" size={18} className="text-primary-container" />
            <Text className="font-label-lg text-label-lg text-on-surface">Guardian Dynamic Impact</Text>
          </View>
          <Text className="font-label-md text-label-md text-error">-₹420.00 Today</Text>
        </View>

        <View className="mt-3 gap-1.5">
          <ProgressBar value={0.76} />
          <View className="flex-row items-center justify-between">
            <Text className="font-body-sm text-body-sm text-on-surface-variant">
              Remaining Safe-to-Spend: <Text className="text-on-surface">₹2,580.00</Text>
            </Text>
            <Text className="font-label-sm text-label-sm text-on-surface-variant">Baseline 76%</Text>
          </View>
        </View>
      </Card>

      {/* AI classification */}
      <Card tone="low" className="p-4">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            <Icon name="psychology" size={18} className="text-primary-container" />
            <Text className="font-label-lg text-label-lg text-on-surface">AI Classification</Text>
          </View>
          <Pill label="98.4% Confidence" tone="positive" />
        </View>

        <Text className="mt-2 font-body-sm text-body-sm text-on-surface-variant">
          Variable Discretionary Spending • 12% above weekly food baseline. Friday dinner trend recognized.
        </Text>

        <View className="mt-3 flex-row items-center justify-between rounded-xl bg-surface-container p-3">
          <Text className="flex-1 font-label-md text-label-md text-on-surface">
            Mark as Essential Expense?
          </Text>
          <Toggle value={essential} onChange={setEssential} />
        </View>
      </Card>

      {/* Audit metadata */}
      <View className="gap-space-sm">
        <Text className="font-headline-sm text-headline-sm text-on-surface">Audit Metadata</Text>

        <Card tone="low" className="gap-3 p-4">
          {META.map((m, i) => (
            <View key={m.label}>
              {i > 0 ? <View className="mb-3 h-px bg-surface-container-high" /> : null}
              <View className="flex-row items-center gap-3">
                <IconBadge name={m.icon} size={32} iconSize={16} bg="bg-surface-container" />
                <View className="flex-1">
                  <Text className="font-label-sm text-label-sm text-on-surface-variant">{m.label}</Text>
                  <Text className="font-label-md text-label-md text-on-surface">{m.value}</Text>
                  {m.sub ? (
                    <Text className="font-label-sm text-label-sm text-on-surface-variant">{m.sub}</Text>
                  ) : null}
                </View>
                {m.copyable ? (
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel="Copy transaction ID"
                    hitSlop={8}
                    onPress={() => {
                      setCopied(true);
                      setTimeout(() => setCopied(false), 1500);
                    }}
                  >
                    <Icon name="content_copy" size={16} className="text-on-surface-variant" />
                  </Pressable>
                ) : null}
                {m.label === 'Settlement Status' ? (
                  <Icon name="check_circle" size={18} className="text-secondary" />
                ) : null}
              </View>
            </View>
          ))}
        </Card>

        {copied ? (
          <View className="flex-row items-center justify-center gap-1.5 rounded-full bg-surface-container-high py-2">
            <Icon name="check" size={14} className="text-secondary" />
            <Text className="font-label-sm text-label-sm text-on-surface">Copied to clipboard</Text>
          </View>
        ) : null}
      </View>

      <View className="gap-3">
        <Button
          title="Edit Category & Split"
          icon="edit_note"
          onPress={() => router.push('/transactions/edit')}
        />
        <Button title="Download Tax Invoice & Receipt" icon="download" variant="secondary" />
        <Button title="Delete Transaction Record" icon="delete" variant="ghost" />
      </View>
    </Screen>
  );
}
