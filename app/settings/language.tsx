import { useState } from 'react';
import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { Icon } from '@/components/Icon';
import { Screen } from '@/components/ui/Screen';
import { Button } from '@/components/ui/Button';
import { Toggle } from '@/components/ui/Form';
import { Card, Pill, IconBadge } from '@/components/ui/Surface';

const LANGUAGES = [
  { key: 'en', mark: 'EN', name: 'English', native: 'UK / Global', body: 'Default system language' },
  { key: 'hi', mark: 'हि', name: 'हिन्दी', native: '(Hindi)', body: 'दैनिक खर्च और सुरक्षा अलर्ट' },
  { key: 'mr', mark: 'म', name: 'मराठी', native: '(Marathi)', body: 'दैनिक खर्च आणि सुरक्षित रक्कम सूचना' },
];

export default function LanguageSettings() {
  const [lang, setLang] = useState('en');
  const [lakhs, setLakhs] = useState(true);

  return (
    <Screen title="Language Settings" subtitle="Cashflow Guardian AI" avatar contentClassName="gap-space-lg">
      {/* Banner */}
      <Card tone="low" className="flex-row gap-3 p-4">
        <IconBadge name="translate" bg="bg-surface-container" fg="text-primary-container" />
        <View className="flex-1">
          <Text className="font-label-lg text-label-lg text-on-surface">Cashflow Guardian AI</Text>
          <Text className="mt-1 font-body-sm text-body-sm text-on-surface-variant">
            Select your preferred language for financial insights, warnings, and AI recommendations.
          </Text>
        </View>
      </Card>

      {/* Language list */}
      <View className="gap-space-sm">
        <View className="flex-row items-center justify-between">
          <Text className="font-headline-sm text-headline-sm text-on-surface">Available Languages</Text>
          <Pill label="3 Supported" />
        </View>

        {LANGUAGES.map((l) => {
          const active = lang === l.key;
          return (
            <Pressable
              key={l.key}
              accessibilityRole="radio"
              accessibilityState={{ selected: active }}
              onPress={() => setLang(l.key)}
            >
              <Card tone={active ? 'high' : 'low'} className="flex-row items-center gap-3 p-4">
                <View
                  className={`h-11 w-11 items-center justify-center rounded-full ${
                    active ? 'bg-primary-container' : 'bg-surface-container'
                  }`}
                >
                  <Text
                    className={`font-label-lg text-label-lg ${
                      active ? 'text-on-primary-fixed' : 'text-on-surface-variant'
                    }`}
                  >
                    {l.mark}
                  </Text>
                </View>

                <View className="flex-1">
                  <View className="flex-row items-center gap-1.5">
                    <Text className="font-label-lg text-label-lg text-on-surface">{l.name}</Text>
                    <Text className="font-label-sm text-label-sm text-on-surface-variant">{l.native}</Text>
                  </View>
                  <Text className="mt-0.5 font-body-sm text-body-sm text-on-surface-variant">{l.body}</Text>
                </View>

                {active ? (
                  <View className="h-7 w-7 items-center justify-center rounded-full bg-primary-container">
                    <Icon name="check" size={16} className="text-on-primary-fixed" />
                  </View>
                ) : null}
              </Card>
            </Pressable>
          );
        })}
      </View>

      {/* Regional formatting */}
      <View className="gap-space-sm">
        <Text className="font-headline-sm text-headline-sm text-on-surface">Financial Conventions</Text>

        <Card tone="low" className="p-4">
          <View className="flex-row items-start gap-3">
            <IconBadge name="currency_rupee" bg="bg-surface-container" fg="text-primary-container" />
            <View className="flex-1">
              <Text className="font-label-lg text-label-lg text-on-surface">Lakhs / Crores System</Text>
              <Text className="mt-1 font-body-sm text-body-sm text-on-surface-variant">
                Format large balances using South Asian groupings (e.g., ₹1,50,000 instead of ₹150,000).
              </Text>
            </View>
            <Toggle value={lakhs} onChange={setLakhs} />
          </View>

          <View className="mt-3 flex-row items-center gap-2 rounded-xl bg-surface-container p-3">
            <Icon name="visibility" size={14} className="text-on-surface-variant" />
            <Text className="font-label-md text-label-md text-on-surface">
              Preview: {lakhs ? '₹14,85,250.00' : '₹1,485,250.00'}
            </Text>
          </View>
        </Card>
      </View>

      {/* Refresh note */}
      <View className="flex-row gap-2.5 rounded-2xl bg-surface-container-low p-4">
        <Icon name="bolt" size={16} className="text-primary-container" />
        <Text className="flex-1 font-body-sm text-body-sm text-on-surface-variant">
          Language updates instantly across all screens without restarting.
        </Text>
      </View>

      <View className="gap-2">
        <Button title="Apply Language" icon="done_all" onPress={() => router.back()} />
        <Text className="text-center font-body-sm text-body-sm text-on-surface-variant">
          Language preferences updated across guardian engines
        </Text>
      </View>
    </Screen>
  );
}
