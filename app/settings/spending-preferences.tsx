import { useState } from 'react';
import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { Icon } from '@/components/Icon';
import type { IconName } from '@/components/glyphs';
import { Screen } from '@/components/ui/Screen';
import { Button } from '@/components/ui/Button';
import { Slider, Toggle } from '@/components/ui/Form';
import { Card, Pill, IconBadge } from '@/components/ui/Surface';
import { AreaChart } from '@/components/ui/Charts';
import { colors } from '@/theme/tokens';

const UNTOUCHABLE: { id: string; icon: IconName; title: string; body: string; fixed?: boolean; tag?: string }[] = [
  { id: 'u1', icon: 'fitness_center', title: 'Health & Fitness', body: 'Gym, Cult.fit, Pharmacy essentials' },
  { id: 'u2', icon: 'local_grocery_store', title: 'Groceries & Cooking Essentials', body: "Nature's Basket, Blinkit pantry staples" },
  { id: 'u3', icon: 'terminal', title: 'Work Subscriptions', body: 'GitHub Pro, Figma Team, Notion AI' },
  { id: 'u4', icon: 'apartment', title: 'Home Rent & Utilities', body: 'Electricity, Water, Escrow Mandates', fixed: true, tag: 'NACH' },
];

const MODES = [
  { key: 'conservative', label: 'Conservative', sub: 'Only warn' },
  { key: 'balanced', label: 'Balanced', sub: 'Recommended' },
  { key: 'strict', label: 'Strict Defense', sub: 'Max Liquidity' },
] as const;

export default function PersonalSpendingPreferences() {
  const [locked, setLocked] = useState<string[]>(['u1', 'u2', 'u3']);
  const [ottPause, setOttPause] = useState(true);
  const [diningCap, setDiningCap] = useState(450);
  const [mode, setMode] = useState<(typeof MODES)[number]['key']>('balanced');
  const [earlyInvoice, setEarlyInvoice] = useState(true);

  const toggleLock = (id: string) =>
    setLocked((l) => (l.includes(id) ? l.filter((x) => x !== id) : [...l, id]));

  return (
    <Screen
      title="Spending Preferences"
      subtitle="AI Guardian Safeguard"
      avatar
      tabBarSpacing
      actions={[{ icon: 'notifications', label: 'Notifications', onPress: () => router.push('/notifications') }]}
      contentClassName="gap-space-lg"
    >
      <View className="flex-row items-center justify-between">
        <Text className="flex-1 font-body-md text-body-md text-on-surface-variant">
          Fine-tune what the AI can & cannot touch
        </Text>
        <Pill label="Adaptive Mode" icon="verified_user" tone="positive" />
      </View>

      {/* Shield status */}
      <Card className="flex-row items-center gap-3">
        <IconBadge
          name="lock"
          size={48}
          iconSize={22}
          bg="bg-surface-container-high"
          fg="text-primary-container"
        />
        <View className="flex-1">
          <View className="flex-row items-center gap-2">
            <Text className="font-headline-sm text-headline-sm text-on-surface">
              Custom Liquidity Shield
            </Text>
            <Pill label="Active" tone="positive" dot />
          </View>
          <Text className="mt-1 font-body-sm text-body-sm text-on-surface-variant">
            4 Essential Pillars Secured • 4 Flexible Flows
          </Text>
        </View>
      </Card>

      {/* Untouchable categories */}
      <View className="gap-space-sm">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            <Icon name="shield" size={18} className="text-primary-container" />
            <Text className="font-headline-sm text-headline-sm text-on-surface">
              Untouchable Categories
            </Text>
          </View>
          <Pill label="Never Cut" tone="accent" />
        </View>
        <Text className="font-body-sm text-body-sm text-on-surface-variant">
          Guardian will never postpone, suppress, or propose reducing allocations in these vaults.
        </Text>

        {UNTOUCHABLE.map((u) => {
          const isLocked = u.fixed || locked.includes(u.id);
          return (
            <Card key={u.id} tone="low" className="flex-row items-center gap-3 p-4">
              <IconBadge
                name={u.icon}
                bg="bg-surface-container"
                fg={isLocked ? 'text-primary-container' : 'text-on-surface-variant'}
              />
              <View className="flex-1">
                <View className="flex-row items-center gap-1.5">
                  <Text className="font-label-lg text-label-lg text-on-surface">{u.title}</Text>
                  {u.tag ? <Pill label={u.tag} icon="bolt" /> : null}
                </View>
                <Text className="mt-0.5 font-body-sm text-body-sm text-on-surface-variant">{u.body}</Text>
              </View>

              {u.fixed ? (
                <View className="flex-row items-center gap-1.5">
                  <Text className="font-label-sm text-label-sm text-on-surface-variant">Fixed</Text>
                  <Icon name="lock" size={16} className="text-on-surface-variant" />
                </View>
              ) : (
                <Pressable
                  accessibilityRole="checkbox"
                  accessibilityState={{ checked: isLocked }}
                  accessibilityLabel={`Lock ${u.title}`}
                  onPress={() => toggleLock(u.id)}
                  className={`h-8 w-8 items-center justify-center rounded-full ${
                    isLocked ? 'bg-primary-container' : 'bg-surface-container-high'
                  }`}
                >
                  <Icon
                    name="check"
                    size={16}
                    className={isLocked ? 'text-on-primary-fixed' : 'text-on-surface-variant'}
                  />
                </Pressable>
              )}
            </Card>
          );
        })}
      </View>

      {/* Flexible categories */}
      <View className="gap-space-sm">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            <Icon name="tune" size={18} className="text-primary-container" />
            <Text className="font-headline-sm text-headline-sm text-on-surface">Flexible Categories</Text>
          </View>
          <Pill label="Adaptive Limits" tone="positive" dot />
        </View>
        <Text className="font-body-sm text-body-sm text-on-surface-variant">
          Allowed intervention actions when predictive weekly cash flow dips below safe threshold.
        </Text>

        {/* OTT */}
        <Card tone="low" className="p-4">
          <View className="flex-row items-center gap-3">
            <IconBadge name="smart_display" bg="bg-surface-container" />
            <View className="flex-1">
              <Text className="font-label-lg text-label-lg text-on-surface">OTT & Media Streaming</Text>
              <Text className="font-body-sm text-body-sm text-on-surface-variant">
                Netflix 4K, Disney+ Hotstar, Spotify HiFi
              </Text>
            </View>
            <Toggle value={ottPause} onChange={setOttPause} />
          </View>
          <View className="mt-3 flex-row items-center justify-between rounded-xl bg-surface-container p-3">
            <Text className="font-label-sm text-label-sm text-on-surface-variant">Recommended Action:</Text>
            <View className="flex-row items-center gap-1.5">
              <Icon name="pause_circle" size={14} className="text-primary-container" />
              <Text className="font-label-md text-label-md text-primary-container">Allow Auto-Pause</Text>
            </View>
          </View>
        </Card>

        {/* Dining */}
        <Card tone="low" className="p-4">
          <View className="flex-row items-center gap-3">
            <IconBadge name="restaurant" bg="bg-surface-container" />
            <View className="flex-1">
              <Text className="font-label-lg text-label-lg text-on-surface">Weekend Dining & Delivery</Text>
              <Text className="font-body-sm text-body-sm text-on-surface-variant">
                Swiggy Gourmet, Zomato, Bistros
              </Text>
            </View>
          </View>

          <View className="mt-3 flex-row items-center justify-between">
            <Text className="font-label-sm text-label-sm text-on-surface-variant">Daily Floor</Text>
            <Text className="font-label-lg text-label-lg text-primary-container">₹{diningCap}/day</Text>
          </View>

          <View className="mt-2">
            <Slider value={diningCap} min={200} max={1200} onChange={(v) => setDiningCap(Math.round(v / 50) * 50)} />
            <View className="flex-row justify-between">
              <Text className="font-label-sm text-label-sm text-on-surface-variant">Tighter (₹200)</Text>
              <Text className="font-label-sm text-label-sm text-on-surface-variant">Relaxed (₹1,200)</Text>
            </View>
          </View>
        </Card>

        {/* Shopping */}
        <Card tone="low" className="p-4">
          <View className="flex-row items-center gap-3">
            <IconBadge name="shopping_bag" bg="bg-surface-container" />
            <View className="flex-1">
              <Text className="font-label-lg text-label-lg text-on-surface">Shopping & E-Commerce</Text>
              <Text className="font-body-sm text-body-sm text-on-surface-variant">
                Amazon Prime Cart, Myntra drops
              </Text>
            </View>
            <Pill label="72h Hold" tone="warning" />
          </View>
          <View className="mt-3 flex-row items-center gap-2 rounded-xl bg-surface-container p-3">
            <Icon name="schedule" size={14} className="text-primary-container" />
            <Text className="flex-1 font-label-md text-label-md text-on-surface">
              Delay Bulk Orders {'>'} ₹2,500
            </Text>
          </View>
        </Card>

        {/* Rideshare */}
        <Card tone="low" className="p-4">
          <View className="flex-row items-center gap-3">
            <IconBadge name="local_taxi" bg="bg-surface-container" />
            <View className="flex-1">
              <Text className="font-label-lg text-label-lg text-on-surface">Rideshare & Cabs</Text>
              <Text className="font-body-sm text-body-sm text-on-surface-variant">
                Uber Premier, Ola Electric, BluSmart
              </Text>
            </View>
            <Pill label="Surge Response" icon="alt_route" />
          </View>
          <View className="mt-3 flex-row items-center gap-2 rounded-xl bg-surface-container p-3">
            <Icon name="directions_subway" size={14} className="text-primary-container" />
            <Text className="flex-1 font-label-md text-label-md text-on-surface">
              Suggest Metro / Transit
            </Text>
          </View>
        </Card>
      </View>

      {/* Aggressiveness */}
      <View className="gap-space-sm">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            <Icon name="speed" size={18} className="text-primary-container" />
            <Text className="font-headline-sm text-headline-sm text-on-surface">
              Intervention Aggressiveness
            </Text>
          </View>
          <Pill label="AI Threshold" />
        </View>

        <View className="flex-row gap-1 rounded-xl bg-surface-container-low p-1.5">
          {MODES.map((m) => {
            const active = mode === m.key;
            return (
              <Pressable
                key={m.key}
                onPress={() => setMode(m.key)}
                accessibilityRole="tab"
                accessibilityState={{ selected: active }}
                className={`flex-1 rounded-lg px-2 py-2.5 ${active ? 'bg-surface-container-highest' : ''}`}
              >
                <Text
                  className={`text-center font-label-md text-label-md ${
                    active ? 'text-on-surface' : 'text-on-surface-variant'
                  }`}
                >
                  {m.label}
                </Text>
                <Text className="mt-0.5 text-center font-label-sm text-label-sm text-on-surface-variant">
                  {m.sub}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <View className="flex-row gap-2.5 rounded-2xl bg-surface-container-low p-4">
          <Icon name="auto_graph" size={16} className="text-primary-container" />
          <Text className="flex-1 font-body-sm text-body-sm text-on-surface-variant">
            <Text className="text-on-surface">Balanced Mode:</Text> Guardian proactively reserves liquidity 4
            days ahead, soft-pausing luxury non-essentials before overdraft or penalty triggers.
          </Text>
        </View>
      </View>

      {/* Emergency inflow acceleration */}
      <View className="gap-space-sm">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            <Icon name="payments" size={18} className="text-primary-container" />
            <Text className="font-headline-sm text-headline-sm text-on-surface">
              Emergency Inflow Acceleration
            </Text>
          </View>
          <Pill label="Faster Liquidity" tone="positive" />
        </View>

        <Card tone="low" className="flex-row items-center gap-3 p-4">
          <View className="flex-1">
            <Text className="font-label-lg text-label-lg text-on-surface">
              Early Invoice & Settlement Nudges
            </Text>
            <Text className="mt-1 font-body-sm text-body-sm text-on-surface-variant">
              Allow Guardian to suggest early invoice discounting or prompt instant client settlement nudges
              when forecast balance dips under ₹8,000.
            </Text>
          </View>
          <Toggle value={earlyInvoice} onChange={setEarlyInvoice} />
        </Card>
      </View>

      {/* Projected simulation */}
      <Card tone="low" className="p-4">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            <Icon name="query_stats" size={18} className="text-primary-container" />
            <Text className="font-label-lg text-label-lg text-on-surface">Protected Buffer Forecast</Text>
          </View>
          <Pill label="+₹14,280 Saved" tone="positive" />
        </View>

        <View className="mt-space-md">
          <AreaChart
            height={120}
            showGrid={false}
            series={[{ data: [6050, 7200, 8400, 9800, 11200, 12800, 14280], color: colors.secondary, fill: true }]}
            labels={['Today', 'Day 3', 'Day 7']}
          />
        </View>
      </Card>

      <View className="gap-2">
        <Button title="Save Behavioral Preferences" icon="save" onPress={() => router.back()} />
        <View className="flex-row items-center justify-center gap-1.5">
          <Icon name="update" size={13} className="text-on-surface-variant" />
          <Text className="font-body-sm text-body-sm text-on-surface-variant">
            Applied to upcoming 7-day shortfall simulations.
          </Text>
        </View>
      </View>
    </Screen>
  );
}
