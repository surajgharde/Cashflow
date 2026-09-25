import { useState } from 'react';
import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { Icon } from '@/components/Icon';
import type { IconName } from '@/components/glyphs';
import { Screen } from '@/components/ui/Screen';
import { Button } from '@/components/ui/Button';
import { Slider, Toggle } from '@/components/ui/Form';
import { Card, Pill, IconBadge } from '@/components/ui/Surface';

const BASELINES: { icon: IconName; title: string; body: string }[] = [
  { icon: 'home', title: 'Home Rent & Maintenance', body: 'Fixed NACH Mandate' },
  { icon: 'bolt', title: 'Electricity & Utilities', body: 'BESCOM Direct Auto-Pay' },
  { icon: 'medical_services', title: 'Healthcare & Pharmacy', body: 'Unrestricted Reserve Pool' },
];

const MODES = [
  { key: 'conservative', label: 'Conservative', sub: 'Warn Only' },
  { key: 'balanced', label: 'Balanced', sub: 'Proactive Defense' },
  { key: 'strict', label: 'Strict', sub: 'Preservation' },
] as const;

export default function FinancialPreferences() {
  const [diningCap, setDiningCap] = useState(450);
  const [autoPause, setAutoPause] = useState(true);
  const [cooldown, setCooldown] = useState(true);
  const [dynamicSts, setDynamicSts] = useState(true);
  const [mode, setMode] = useState<(typeof MODES)[number]['key']>('balanced');

  return (
    <Screen title="Financial Preferences" subtitle="Guardian Active" avatar contentClassName="gap-space-lg">
      <Text className="font-body-md text-body-md text-on-surface-variant">
        Configure your essential baseline, discretionary spending leeway, and AI intervention tolerance.
      </Text>

      <Card tone="low" className="flex-row items-center gap-3 p-4">
        <IconBadge name="shield" bg="bg-surface-container" fg="text-primary-container" />
        <View className="flex-1">
          <View className="flex-row items-center gap-2">
            <Text className="font-label-lg text-label-lg text-on-surface">Guardian Active</Text>
            <Pill label="Self-Adapting" tone="positive" dot />
          </View>
          <Text className="mt-0.5 font-body-sm text-body-sm text-on-surface-variant">
            Protecting ₹48,200 non-negotiable monthly runway
          </Text>
        </View>
      </Card>

      {/* Untouchable baselines */}
      <View className="gap-space-sm">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            <Icon name="lock" size={18} className="text-primary-container" />
            <Text className="font-headline-sm text-headline-sm text-on-surface">Untouchable Baselines</Text>
          </View>
          <Pill label="Permanent Shield" tone="accent" />
        </View>

        <Card tone="low" className="gap-3 p-4">
          {BASELINES.map((b, i) => (
            <View key={b.title}>
              {i > 0 ? <View className="mb-3 h-px bg-surface-container-high" /> : null}
              <View className="flex-row items-center gap-3">
                <IconBadge name={b.icon} bg="bg-surface-container" />
                <View className="flex-1">
                  <Text className="font-label-lg text-label-lg text-on-surface">{b.title}</Text>
                  <Text className="font-body-sm text-body-sm text-on-surface-variant">{b.body}</Text>
                </View>
                <Icon name="lock" size={16} className="text-on-surface-variant" />
              </View>
            </View>
          ))}
        </Card>
      </View>

      {/* Flexible leeway */}
      <View className="gap-space-sm">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            <Icon name="tune" size={18} className="text-primary-container" />
            <Text className="font-headline-sm text-headline-sm text-on-surface">Flexible Leeway</Text>
          </View>
          <Pill label="AI Regulated" tone="positive" dot />
        </View>

        <Card tone="low" className="p-4">
          <View className="flex-row items-center gap-3">
            <IconBadge name="restaurant" bg="bg-surface-container" fg="text-primary-container" />
            <View className="flex-1">
              <Text className="font-label-lg text-label-lg text-on-surface">Food & Dining Out</Text>
              <Text className="font-body-sm text-body-sm text-on-surface-variant">
                Adaptive micro-pacing cap
              </Text>
            </View>
            <Text className="font-label-lg text-label-lg text-primary-container">₹{diningCap}/day</Text>
          </View>

          <View className="mt-3">
            <Slider value={diningCap} min={200} max={1200} onChange={(v) => setDiningCap(Math.round(v / 50) * 50)} />
            <View className="flex-row justify-between">
              <Text className="font-label-sm text-label-sm text-on-surface-variant">₹200 (Frugal)</Text>
              <Text className="font-label-sm text-label-sm text-on-surface-variant">₹1,200 (Relaxed)</Text>
            </View>
          </View>
        </Card>

        <Card tone="low" className="gap-4 p-4">
          <View className="flex-row items-center gap-3">
            <IconBadge name="subscriptions" bg="bg-surface-container" />
            <View className="flex-1">
              <Text className="font-label-lg text-label-lg text-on-surface">Streaming & Subscriptions</Text>
              <Text className="font-body-sm text-body-sm text-on-surface-variant">
                Permit auto-pause during low buffer
              </Text>
            </View>
            <Toggle value={autoPause} onChange={setAutoPause} />
          </View>

          <View className="h-px bg-surface-container-high" />

          <View className="flex-row items-center gap-3">
            <IconBadge name="shopping_bag" bg="bg-surface-container" />
            <View className="flex-1">
              <Text className="font-label-lg text-label-lg text-on-surface">Shopping & E-Commerce</Text>
              <Text className="font-body-sm text-body-sm text-on-surface-variant">
                72h cooldown hold on items {'>'} ₹1,500
              </Text>
            </View>
            <Toggle value={cooldown} onChange={setCooldown} />
          </View>
        </Card>
      </View>

      {/* Intervention style */}
      <View className="gap-space-sm">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            <Icon name="psychology" size={18} className="text-primary-container" />
            <Text className="font-headline-sm text-headline-sm text-on-surface">
              Guardian Intervention Style
            </Text>
          </View>
          <Pill label="Aggressiveness" />
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
          <Icon name="info" size={16} className="text-primary-container" />
          <Text className="flex-1 font-body-sm text-body-sm text-on-surface-variant">
            <Text className="text-on-surface">Balanced Defense:</Text> Intercepts high-velocity checkout
            sprees, prompts dual confirmation on impulsive UPI transactions, and temporarily diverts dynamic
            savings buffers.
          </Text>
        </View>
      </View>

      {/* Dynamic safe-to-spend */}
      <Card tone="low" className="flex-row items-center gap-3 p-4">
        <IconBadge name="sync" bg="bg-surface-container" fg="text-primary-container" />
        <View className="flex-1">
          <Text className="font-label-lg text-label-lg text-on-surface">Dynamic Safe-to-Spend</Text>
          <Text className="mt-0.5 font-body-sm text-body-sm text-on-surface-variant">
            Auto-recalculate ledger after every incoming & outgoing transaction
          </Text>
        </View>
        <Toggle value={dynamicSts} onChange={setDynamicSts} />
      </Card>

      <View className="gap-2">
        <Button title="Save Financial Preferences" icon="check_circle" onPress={() => router.back()} />
        <Text className="text-center font-body-sm text-body-sm text-on-surface-variant">
          Preferences locked and deployed to neural guardian
        </Text>
      </View>
    </Screen>
  );
}
