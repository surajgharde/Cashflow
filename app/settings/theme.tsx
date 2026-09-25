import { useState } from 'react';
import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { Icon } from '@/components/Icon';
import type { IconName } from '@/components/glyphs';
import { Screen } from '@/components/ui/Screen';
import { Button } from '@/components/ui/Button';
import { Toggle } from '@/components/ui/Form';
import { Card, Pill, IconBadge } from '@/components/ui/Surface';

const THEMES: { key: string; icon: IconName; title: string; tag?: string; body: string }[] = [
  {
    key: 'system',
    icon: 'routine',
    title: 'System Default',
    body: 'Matches device operating system settings',
  },
  {
    key: 'dark',
    icon: 'dark_mode',
    title: 'Obsidian Kinetic',
    tag: 'Dark',
    body: 'Pitch black & deep slate surfaces with vibrant lime green accents',
  },
  {
    key: 'light',
    icon: 'light_mode',
    title: 'Light Theme',
    body: 'Crisp clean white and ivory surfaces with dark typography and lime accents',
  },
];

export default function ThemeSettings() {
  const [theme, setTheme] = useState('dark');
  const [contrast, setContrast] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  return (
    <Screen title="Theme Settings" subtitle="Customization Lab" avatar contentClassName="gap-space-lg">
      <View>
        <View className="flex-row items-center gap-2">
          <Icon name="palette" size={18} className="text-primary-container" />
          <Text className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
            Customization Lab
          </Text>
        </View>
        <Text className="mt-2 font-headline-md text-headline-md text-on-surface">
          Appearance & Display Theme
        </Text>
        <Text className="mt-1 font-body-md text-body-md text-on-surface-variant">
          Choose your visual interface preference. Optimized for high contrast and OLED displays.
        </Text>
      </View>

      {THEMES.map((t) => {
        const active = theme === t.key;
        return (
          <Pressable
            key={t.key}
            accessibilityRole="radio"
            accessibilityState={{ selected: active }}
            onPress={() => setTheme(t.key)}
          >
            <Card tone={active ? 'container' : 'low'} className="p-4">
              <View className="flex-row items-center gap-3">
                <IconBadge
                  name={t.icon}
                  bg={active ? 'bg-primary-container' : 'bg-surface-container'}
                  fg={active ? 'text-on-primary-fixed' : 'text-on-surface-variant'}
                />
                <View className="flex-1">
                  <View className="flex-row items-center gap-2">
                    <Text className="font-label-lg text-label-lg text-on-surface">{t.title}</Text>
                    {t.tag ? <Pill label={t.tag} tone="accent" /> : null}
                  </View>
                  <Text className="mt-0.5 font-body-sm text-body-sm text-on-surface-variant">{t.body}</Text>
                </View>
                {active ? (
                  <View className="h-7 w-7 items-center justify-center rounded-full bg-primary-container">
                    <Icon name="check" size={16} className="text-on-primary-fixed" />
                  </View>
                ) : null}
              </View>

              {/* Preview card, shown for the active dark theme as in the export */}
              {t.key === 'dark' && active ? (
                <>
                  <View className="mt-3 flex-row items-center gap-1.5">
                    <Icon name="battery_charging_full" size={13} className="text-secondary" />
                    <Text className="font-label-sm text-label-sm text-secondary">
                      Recommended for OLED battery saving
                    </Text>
                  </View>

                  <View className="mt-3 rounded-xl bg-surface-container-lowest p-4">
                    <View className="flex-row items-center justify-between">
                      <View className="flex-row items-center gap-1.5">
                        <Icon name="shield" size={12} className="text-primary-container" />
                        <Text className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                          AI Guardian
                        </Text>
                      </View>
                      <Pill label="OLED SAFE" />
                    </View>
                    <Text className="mt-3 font-label-sm text-label-sm text-on-surface-variant">
                      Net Cashflow
                    </Text>
                    <View className="flex-row items-center justify-between">
                      <Text className="font-headline-md text-headline-md text-on-surface">₹14,820.40</Text>
                      <View className="flex-row items-center gap-1">
                        <Icon name="trending_up" size={14} className="text-secondary" />
                        <Text className="font-label-md text-label-md text-secondary">+18.4%</Text>
                      </View>
                    </View>
                  </View>
                </>
              ) : null}
            </Card>
          </Pressable>
        );
      })}

      {/* Accessibility */}
      <View className="gap-space-sm">
        <View className="flex-row items-center justify-between">
          <Text className="font-headline-sm text-headline-sm text-on-surface">
            Contrast & Accessibility
          </Text>
          <Pill label="Adaptive Engine" tone="positive" dot />
        </View>

        <Card tone="low" className="gap-4 p-4">
          <View className="flex-row items-center gap-3">
            <IconBadge name="contrast" bg="bg-surface-container" />
            <View className="flex-1">
              <Text className="font-label-lg text-label-lg text-on-surface">High Contrast Numbers</Text>
              <Text className="mt-0.5 font-body-sm text-body-sm text-on-surface-variant">
                Elevates legibility for currencies & balance metrics
              </Text>
            </View>
            <Toggle value={contrast} onChange={setContrast} />
          </View>

          <View className="h-px bg-surface-container-high" />

          <View className="flex-row items-center gap-3">
            <IconBadge name="motion_sensor_idle" bg="bg-surface-container" />
            <View className="flex-1">
              <Text className="font-label-lg text-label-lg text-on-surface">Reduce Motion & Charts</Text>
              <Text className="mt-0.5 font-body-sm text-body-sm text-on-surface-variant">
                Minimizes sparkline pulsing and kinetic micro-hops
              </Text>
            </View>
            <Toggle value={reduceMotion} onChange={setReduceMotion} />
          </View>
        </Card>
      </View>

      <View className="gap-2">
        <Button title="Save Theme Preference" icon="check_circle" onPress={() => router.back()} />
        <Text className="text-center font-body-sm text-body-sm text-on-surface-variant">
          Settings will apply instantly across all linked mobile nodes
        </Text>
      </View>
    </Screen>
  );
}
