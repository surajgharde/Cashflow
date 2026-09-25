import { useState } from 'react';
import { router } from 'expo-router';
import { Text, View } from 'react-native';
import { Icon } from '@/components/Icon';
import { Screen } from '@/components/ui/Screen';
import { Button, IconButton } from '@/components/ui/Button';
import { Toggle } from '@/components/ui/Form';
import { Card, Pill, IconBadge } from '@/components/ui/Surface';

const REFERENCE = [
  { code: 'USD', name: 'US Dollar', symbol: '$', rate: '1 USD ≈ ₹83.40', live: true },
  { code: 'EUR', name: 'Euro', symbol: '€', rate: '1 EUR ≈ ₹90.15' },
  { code: 'GBP', name: 'British Pound', symbol: '£', rate: '1 GBP ≈ ₹105.80' },
  { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ', rate: '1 AED ≈ ₹22.71' },
];

export default function CurrencySettings() {
  const [autoConvert, setAutoConvert] = useState(true);

  return (
    <Screen title="Currency Settings" subtitle="Smart FX Engine" avatar contentClassName="gap-space-lg">
      {/* Banner */}
      <Card tone="low" className="flex-row gap-3 p-4">
        <IconBadge name="currency_exchange" bg="bg-surface-container" fg="text-primary-container" />
        <View className="flex-1">
          <Text className="font-label-lg text-label-lg text-on-surface">Smart FX Engine Active</Text>
          <Text className="mt-1 font-body-sm text-body-sm text-on-surface-variant">
            Real-time mid-market rate feeds synced with Reserve Bank guidelines for foreign remittance
            tracking.
          </Text>
        </View>
      </Card>

      {/* Base currency */}
      <View className="gap-space-sm">
        <View className="flex-row items-center justify-between">
          <Text className="font-headline-sm text-headline-sm text-on-surface">Default Ledger Currency</Text>
          <Pill label="Compliant" icon="verified_user" tone="positive" />
        </View>

        <Card className="p-4">
          <View className="flex-row items-center gap-3">
            <View className="h-12 w-12 items-center justify-center rounded-full bg-primary-container">
              <Text className="font-headline-md text-headline-md text-on-primary-fixed">₹</Text>
            </View>
            <View className="flex-1">
              <View className="flex-row items-center gap-2">
                <Text className="font-headline-sm text-headline-sm text-on-surface">Indian Rupee</Text>
                <Pill label="INR" tone="accent" />
              </View>
              <Text className="mt-0.5 font-body-sm text-body-sm text-on-surface-variant">
                Primary Account Denomination
              </Text>
            </View>
            <Icon name="lock" size={18} className="text-on-surface-variant" />
          </View>

          <View className="mt-3 flex-row items-center justify-between rounded-xl bg-surface-container-low p-3">
            <View className="flex-row items-center gap-2">
              <Icon name="account_balance" size={14} className="text-on-surface-variant" />
              <Text className="font-label-sm text-label-sm text-on-surface-variant">
                Linked to 3 Indian Bank Accounts
              </Text>
            </View>
            <Text className="font-label-sm text-label-sm text-primary-container">Mandatory Base</Text>
          </View>

          <View className="mt-2 flex-row items-center justify-between rounded-xl bg-surface-container-low p-3">
            <Text className="font-label-sm text-label-sm text-on-surface-variant">
              Symbol Display Format
            </Text>
            <Text className="font-label-md text-label-md text-on-surface">Prefix (₹ 4,850.00)</Text>
          </View>
        </Card>
      </View>

      {/* Reference currencies */}
      <View className="gap-space-sm">
        <View className="flex-row items-start justify-between">
          <View className="flex-1">
            <Text className="font-headline-sm text-headline-sm text-on-surface">
              Multi-Currency Retainers
            </Text>
            <Text className="font-body-sm text-body-sm text-on-surface-variant">
              Real-time valuation for global invoice streams
            </Text>
          </View>
          <Button title="Add" icon="add" variant="secondary" full={false} className="h-9 px-4" />
        </View>

        <Card tone="low" className="gap-3 p-4">
          {REFERENCE.map((c, i) => (
            <View key={c.code}>
              {i > 0 ? <View className="mb-3 h-px bg-surface-container-high" /> : null}
              <View className="flex-row items-center gap-3">
                <View className="h-10 w-10 items-center justify-center rounded-full bg-surface-container">
                  <Text className="font-label-lg text-label-lg text-on-surface">{c.symbol}</Text>
                </View>
                <View className="flex-1">
                  <View className="flex-row items-center gap-1.5">
                    <Text className="font-label-lg text-label-lg text-on-surface">
                      {c.code} · {c.name}
                    </Text>
                    {c.live ? <Pill label="Live" tone="positive" dot /> : null}
                  </View>
                  <Text className="mt-0.5 font-body-sm text-body-sm text-on-surface-variant">
                    Mid-market: {c.rate}
                  </Text>
                </View>
                <Pill label="Active" tone="positive" />
                <IconButton name="more_vert" size={18} accessibilityLabel={`Options for ${c.code}`} />
              </View>
            </View>
          ))}
        </Card>
      </View>

      {/* Auto-conversion */}
      <Card tone="low" className="p-4">
        <View className="flex-row items-start gap-3">
          <IconBadge name="bolt" bg="bg-surface-container" fg="text-primary-container" />
          <View className="flex-1">
            <Text className="font-label-lg text-label-lg text-on-surface">
              Foreign Inflow Auto-Conversion
            </Text>
            <Text className="mt-1 font-body-sm text-body-sm text-on-surface-variant">
              Automatically convert freelance foreign payments using live mid-market exchange rate
            </Text>
          </View>
          <Toggle value={autoConvert} onChange={setAutoConvert} />
        </View>

        <View className="mt-3 flex-row items-center justify-between rounded-xl bg-surface-container p-3">
          <View className="flex-row items-center gap-2">
            <Icon name="trending_up" size={14} className="text-secondary" />
            <Text className="font-label-sm text-label-sm text-on-surface-variant">
              Zero Spread Fee Protection Active
            </Text>
          </View>
          <Text className="font-label-sm text-label-sm text-primary-container">Rate alerts</Text>
        </View>
      </Card>

      <View className="gap-2">
        <Button
          title="Confirm Currency Preferences"
          icon="arrow_forward"
          iconTrailing
          onPress={() => router.back()}
        />
        <Text className="text-center font-body-sm text-body-sm text-on-surface-variant">
          Updates propagate instantly across cashflow forecast graphs.
        </Text>
      </View>
    </Screen>
  );
}
