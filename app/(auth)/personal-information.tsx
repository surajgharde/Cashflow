import { useState } from 'react';
import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { Icon } from '@/components/Icon';
import type { IconName } from '@/components/glyphs';
import { Screen } from '@/components/ui/Screen';
import { Button } from '@/components/ui/Button';
import { Field } from '@/components/ui/Form';
import { StepTracker } from '@/components/ui/Progress';
import { Card, Pill } from '@/components/ui/Surface';

const OCCUPATIONS: { key: string; icon: IconName; title: string; sub: string }[] = [
  { key: 'student', icon: 'school', title: 'Student', sub: 'Stipend / Support' },
  { key: 'freelancer', icon: 'draw', title: 'Freelancer', sub: 'Dynamic Inflow' },
  { key: 'salaried', icon: 'work', title: 'Salaried Pro', sub: 'Steady Paycycle' },
  { key: 'creator', icon: 'bolt', title: 'Creator / Gig', sub: 'Multi-channel' },
];

export default function OnboardingPersonalInformation() {
  const [occupation, setOccupation] = useState('salaried');
  const [age, setAge] = useState(24);

  return (
    <Screen title="Personal Profile" subtitle="Guardian Setup" avatar contentClassName="gap-space-lg pb-space-xl">
      <View className="gap-2">
        <StepTracker step={2} total={4} label="Onboarding sequence" />
        <Text className="px-1 font-label-sm text-label-sm text-on-surface-variant">50% Completed</Text>
      </View>

      <View>
        <View className="flex-row items-center gap-2">
          <Icon name="shield_person" size={18} className="text-primary-container" />
          <Text className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
            Guardian Telemetry
          </Text>
        </View>
        <Text className="mt-1.5 font-headline-lg text-headline-lg text-on-surface">Personal Profile</Text>
        <Text className="mt-1 font-body-md text-body-md text-on-surface-variant">
          Help the Guardian personalize your cashflow buffer and liquidity horizons.
        </Text>
      </View>

      {/* AI companion insight card */}
      <Card tone="low">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            <Icon name="smart_toy" size={18} className="text-primary-container" />
            <Text className="font-label-lg text-label-lg text-on-surface">AI Adaptive Calibration</Text>
          </View>
          <Pill label="LIVE" tone="positive" dot />
        </View>
        <Text className="mt-2 font-body-sm text-body-sm text-on-surface-variant">
          Your profile metrics define autonomous treasury thresholds, predictive tax pools, and weekly
          discretionary bounds.
        </Text>
      </Card>

      <View className="gap-4">
        <Field
          label="Full Legal Name"
          hint="KYC Verified ID"
          hintIcon="check_circle"
          icon="badge"
          placeholder="Enter legal full name"
          defaultValue="Leonard Lopez"
        />

        {/* Age stepper + locked base currency */}
        <View className="flex-row gap-3">
          <View className="flex-1 gap-1.5">
            <Text className="px-1 font-label-md text-label-md text-on-surface-variant">Age</Text>
            <View className="h-[50px] flex-row items-center justify-between rounded-xl bg-surface-container px-2">
              <Pressable
                onPress={() => setAge((a) => Math.max(18, a - 1))}
                accessibilityRole="button"
                accessibilityLabel="Decrease age"
                className="h-9 w-9 items-center justify-center rounded-full bg-surface-container-high"
              >
                <Icon name="remove" size={18} className="text-on-surface" />
              </Pressable>
              <View className="flex-row items-baseline gap-1">
                <Text className="font-headline-sm text-headline-sm text-on-surface">{age}</Text>
                <Text className="font-label-sm text-label-sm text-on-surface-variant">yrs</Text>
              </View>
              <Pressable
                onPress={() => setAge((a) => Math.min(99, a + 1))}
                accessibilityRole="button"
                accessibilityLabel="Increase age"
                className="h-9 w-9 items-center justify-center rounded-full bg-surface-container-high"
              >
                <Icon name="add" size={18} className="text-on-surface" />
              </Pressable>
            </View>
          </View>

          <View className="flex-1 gap-1.5">
            <Text className="px-1 font-label-md text-label-md text-on-surface-variant">Base Currency</Text>
            <View className="h-[50px] flex-row items-center justify-between rounded-xl bg-surface-container px-4">
              <View className="flex-row items-center gap-2">
                <Text className="font-headline-sm text-headline-sm text-primary-container">₹</Text>
                <Text className="font-label-lg text-label-lg text-on-surface">INR (₹)</Text>
              </View>
              <Icon name="lock" size={16} className="text-on-surface-variant" />
            </View>
          </View>
        </View>

        {/* Occupation radio pills */}
        <View className="gap-2">
          <View className="flex-row items-center justify-between px-1">
            <Text className="font-label-md text-label-md text-on-surface-variant">Occupation Category</Text>
            <Text className="font-label-sm text-label-sm text-primary-container">Income Stability Factor</Text>
          </View>
          <View className="flex-row flex-wrap gap-2">
            {OCCUPATIONS.map((o) => {
              const active = occupation === o.key;
              return (
                <Pressable
                  key={o.key}
                  onPress={() => setOccupation(o.key)}
                  accessibilityRole="radio"
                  accessibilityState={{ selected: active }}
                  className={`w-[48%] gap-1 rounded-xl p-3 ${
                    active ? 'bg-surface-container-high' : 'bg-surface-container-low'
                  }`}
                >
                  <Icon
                    name={o.icon}
                    size={20}
                    className={active ? 'text-primary-container' : 'text-on-surface-variant'}
                  />
                  <Text className="font-label-lg text-label-lg text-on-surface">{o.title}</Text>
                  <Text className="font-label-sm text-label-sm text-on-surface-variant">{o.sub}</Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <Field
          label="Primary Email Address"
          hint="Verified"
          hintIcon="verified"
          icon="alternate_email"
          placeholder="name@domain.com"
          defaultValue="leonard.lopez@fintechlabs.io"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <View className="gap-1.5">
          <Text className="px-1 font-label-md text-label-md text-on-surface-variant">Contact Phone Number</Text>
          <View className="flex-row gap-2">
            <View className="h-[50px] flex-row items-center gap-1 rounded-xl bg-surface-container px-3">
              <Text className="text-body-lg">🇮🇳</Text>
              <Text className="font-label-lg text-label-lg text-on-surface">+91</Text>
            </View>
            <Field
              icon="call"
              placeholder="00000 00000"
              defaultValue="98420 54119"
              keyboardType="phone-pad"
              className="flex-1"
            />
          </View>
        </View>

        <View className="flex-row items-center gap-2 px-1">
          <Icon name="verified_user" size={14} className="text-on-surface-variant" />
          <Text className="flex-1 font-body-sm text-body-sm text-on-surface-variant">
            Protected by Tier-4 End-to-End Cryptographic Enclaves.
          </Text>
        </View>

        <Button
          title="Continue to Financial Setup"
          icon="arrow_forward"
          iconTrailing
          onPress={() => router.replace('/(tabs)')}
        />
      </View>
    </Screen>
  );
}
