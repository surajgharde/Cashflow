import { useState } from 'react';
import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { Icon } from '@/components/Icon';
import { Screen } from '@/components/ui/Screen';
import { Button } from '@/components/ui/Button';
import { Slider, Toggle } from '@/components/ui/Form';
import { Card, Pill, IconBadge } from '@/components/ui/Surface';
import { balances } from '@/data/mock';
import { formatCurrency } from '@/lib/format';

const PRESETS = [3000, 5000, 5650, 8000, 10000];

export default function SafetyBufferSettings() {
  const [buffer, setBuffer] = useState(balances.buffer);
  const [adaptive, setAdaptive] = useState(true);

  // Safe-to-Spend = liquid + expected inflows − commitments − buffer.
  const safeToSpend =
    balances.liquid + balances.expectedInflows - balances.essentialCommitments - buffer;

  return (
    <Screen title="Safety Buffer" subtitle="AI Liquidity Guard" avatar contentClassName="gap-space-lg">
      {/* Hero */}
      <Card className="items-center">
        <View className="flex-row items-center justify-between self-stretch">
          <View className="flex-row items-center gap-2">
            <Icon name="shield_locked" size={18} className="text-primary-container" />
            <Text className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">
              Target Floor
            </Text>
          </View>
          <Pill label="Active Defense" tone="positive" dot />
        </View>

        <Text className="mt-4 font-label-sm text-label-sm text-on-surface-variant">
          Untouchable Emergency Floor
        </Text>
        <View className="mt-1 flex-row items-baseline">
          <Text className="font-headline-md text-headline-md text-on-surface-variant">₹</Text>
          <Text className="font-display-hero text-display-hero text-primary-container">
            {buffer.toLocaleString('en-IN')}
          </Text>
        </View>
        <Text className="mt-2 text-center font-body-sm text-body-sm text-on-surface-variant">
          Locked reserves inaccessible for routine discretionary spending
        </Text>

        <View className="mt-5 w-full">
          <Slider value={buffer} min={1000} max={15000} onChange={(v) => setBuffer(Math.round(v / 50) * 50)} />
          <View className="flex-row justify-between">
            <Text className="font-label-sm text-label-sm text-on-surface-variant">Min ₹1,000</Text>
            <Text className="font-label-sm text-label-sm text-on-surface-variant">Max ₹15,000</Text>
          </View>
        </View>
      </Card>

      {/* Quick presets */}
      <View className="gap-2">
        <Text className="px-1 font-label-md text-label-md text-on-surface-variant">Quick Presets</Text>
        <View className="flex-row flex-wrap gap-2">
          {PRESETS.map((p) => {
            const active = buffer === p;
            const recommended = p === balances.buffer;
            return (
              <Pressable
                key={p}
                onPress={() => setBuffer(p)}
                accessibilityRole="button"
                className={`flex-row items-center gap-1 rounded-full px-4 py-2.5 ${
                  active ? 'bg-primary-container' : 'bg-surface-container-high'
                }`}
              >
                <Text
                  className={`font-label-md text-label-md ${
                    active ? 'text-on-primary-fixed' : 'text-on-surface-variant'
                  }`}
                >
                  {formatCurrency(p, { decimals: false })}
                </Text>
                {recommended ? (
                  <Icon
                    name="auto_awesome"
                    size={12}
                    className={active ? 'text-on-primary-fixed' : 'text-primary-container'}
                  />
                ) : null}
              </Pressable>
            );
          })}
        </View>
      </View>

      {/* Formula */}
      <Card tone="low" className="p-4">
        <View className="flex-row items-center gap-2">
          <Icon name="calculate" size={18} className="text-primary-container" />
          <Text className="font-label-lg text-label-lg text-on-surface">
            Formula & Safe-to-Spend Dynamic
          </Text>
        </View>
        <Text className="mt-2 font-body-sm text-body-sm text-on-surface-variant">
          Safe-to-Spend is dynamically balanced in real-time: Total Liquid Cash − Scheduled Obligations −
          Safety Buffer.
        </Text>

        <View className="mt-4 flex-row gap-3">
          <View className="flex-1 rounded-xl bg-surface-container p-3">
            <View className="flex-row items-center justify-between">
              <Text className="font-label-sm text-label-sm text-on-surface-variant">Selected Buffer</Text>
              <Icon name="check_circle" size={14} className="text-secondary" />
            </View>
            <Text className="mt-1 font-label-lg text-label-lg text-on-surface">
              {formatCurrency(buffer, { decimals: false })}
            </Text>
            <Text className="mt-2 font-label-sm text-label-sm text-on-surface-variant">Safe-to-Spend</Text>
            <Text className="font-headline-sm text-headline-sm text-secondary">
              {formatCurrency(safeToSpend, { decimals: false })}
            </Text>
            <Text className="mt-0.5 font-label-sm text-label-sm text-secondary">Shielded & Optimal</Text>
          </View>

          <View className="flex-1 rounded-xl bg-surface-container p-3">
            <View className="flex-row items-center justify-between">
              <Text className="font-label-sm text-label-sm text-on-surface-variant">Reduced Floor</Text>
              <Icon name="warning" size={14} className="text-error" />
            </View>
            <Text className="mt-1 font-label-lg text-label-lg text-on-surface">₹3,000</Text>
            <Text className="mt-2 font-label-sm text-label-sm text-on-surface-variant">Safe-to-Spend</Text>
            <Text className="font-headline-sm text-headline-sm text-on-surface">₹7,500</Text>
            <Text className="mt-0.5 font-label-sm text-label-sm text-error">High Liquidity Risk</Text>
          </View>
        </View>
      </Card>

      {/* Why maintain */}
      <Card tone="low" className="flex-row gap-3 p-4">
        <IconBadge name="verified_user" bg="bg-surface-container" fg="text-secondary" />
        <View className="flex-1">
          <Text className="font-label-lg text-label-lg text-on-surface">
            Why maintain a {formatCurrency(buffer, { decimals: false })} buffer?
          </Text>
          <Text className="mt-1 font-body-sm text-body-sm text-on-surface-variant">
            Covers exactly 15 days of essential utilities and recurring bills in the event of an unexpected
            delay in your primary receivables.
          </Text>
        </View>
      </Card>

      {/* Dynamic adaptation */}
      <Card tone="low" className="p-4">
        <View className="flex-row items-center gap-3">
          <IconBadge name="smart_toy" bg="bg-surface-container" fg="text-primary-container" />
          <View className="flex-1">
            <Text className="font-label-lg text-label-lg text-on-surface">Dynamic Buffer Adaptation</Text>
            <Text className="mt-0.5 font-body-sm text-body-sm text-on-surface-variant">
              Allow Guardian AI to recommend temporary buffer expansion before high-bill clusters
            </Text>
          </View>
          <Toggle value={adaptive} onChange={setAdaptive} />
        </View>

        <View className="mt-3 flex-row items-center justify-between rounded-xl bg-surface-container p-3">
          <View className="flex-row items-center gap-2">
            <Icon name="schedule" size={14} className="text-on-surface-variant" />
            <Text className="font-label-sm text-label-sm text-on-surface-variant">
              Next heavy cycle: In 9 days (₹8,400 dues)
            </Text>
          </View>
          <Pill label="Ready" tone="positive" />
        </View>
      </Card>

      <View className="gap-2">
        <Button title="Update Safety Buffer" icon="check" onPress={() => router.back()} />
        <Text className="text-center font-body-sm text-body-sm text-on-surface-variant">
          Changes reflect instantaneously across Safe-to-Spend limits
        </Text>
      </View>
    </Screen>
  );
}
