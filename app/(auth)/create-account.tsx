import { useState } from 'react';
import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { Icon } from '@/components/Icon';
import { Screen } from '@/components/ui/Screen';
import { Button } from '@/components/ui/Button';
import { Field, Checkbox } from '@/components/ui/Form';
import { StepTracker, StrengthMeter, StatusBanner } from '@/components/ui/Progress';
import { Pill } from '@/components/ui/Surface';

export default function CreateAccount() {
  const [agreed, setAgreed] = useState(true);

  return (
    <Screen title="Create Account" subtitle="Guardian Setup" avatar contentClassName="gap-space-lg pb-space-xl">
      <StepTracker step={1} total={4} />

      <View>
        <View className="flex-row items-center gap-2">
          <Text className="font-headline-lg text-headline-lg text-on-surface">Create Account</Text>
          <Icon name="shield_person" size={20} className="text-primary-container" />
        </View>
        <Text className="mt-1 font-body-md text-body-md text-on-surface-variant">
          Activate your AI Cashflow Guardian protection & predictive security.
        </Text>
      </View>

      <StatusBanner
        icon="verified_user"
        title="256-Bit Bank-Grade Protocol"
        body="Real-time fraud surveillance enabled at setup"
      />

      <View className="gap-4">
        <Field
          label="Legal Full Name"
          hint="Matches ID"
          icon="person"
          placeholder="e.g. Leonard Lopez"
          defaultValue="Leonard Lopez"
        />
        <Field
          label="Email Address"
          icon="mail"
          placeholder="leonard@example.com"
          defaultValue="leonard@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {/* Phone with country chip */}
        <View className="gap-1.5">
          <Text className="px-1 font-label-md text-label-md text-on-surface-variant">Phone Number</Text>
          <View className="flex-row gap-2">
            <Pressable className="h-[50px] flex-row items-center gap-1 rounded-xl bg-surface-container px-3">
              <Text className="text-body-lg">🇮🇳</Text>
              <Text className="font-label-lg text-label-lg text-on-surface">+91</Text>
              <Icon name="expand_more" size={18} className="text-on-surface-variant" />
            </Pressable>
            <Field icon="call" placeholder="98765 43210" keyboardType="phone-pad" className="flex-1" />
          </View>
        </View>

        <View className="gap-2">
          <Field label="Password" icon="lock" placeholder="Create strong password" secure defaultValue="CyberShield*2025" />
          <StrengthMeter score={3} label="Strong" />
        </View>

        <Field
          label="Confirm Password"
          icon="lock_reset"
          placeholder="Repeat your password"
          secure
          defaultValue="CyberShield*2025"
        />

        <View className="flex-row items-start gap-3 px-1">
          <Checkbox checked={agreed} onChange={setAgreed} />
          <Text className="flex-1 font-body-sm text-body-sm text-on-surface-variant">
            I agree to the <Text className="text-primary-container">Terms of Service</Text> &{' '}
            <Text className="text-primary-container">Privacy Policy</Text>, authorizing AI automated balance
            alerts.
          </Text>
        </View>

        <Button
          title="Create Account"
          icon="arrow_forward"
          iconTrailing
          onPress={() => router.push('/(auth)/otp-verification')}
        />

        <View className="flex-row justify-center gap-2">
          <Pill label="Zero-Knowledge Vault" icon="encrypted" />
          <Pill label="Instant Setup" icon="bolt" />
        </View>
      </View>

      <View className="flex-row items-center justify-center">
        <Text className="font-body-md text-body-md text-on-surface-variant">Already have an account? </Text>
        <Pressable onPress={() => router.replace('/(auth)/login')} hitSlop={8}>
          <Text className="font-label-lg text-label-lg text-primary-container">Sign In</Text>
        </Pressable>
      </View>
    </Screen>
  );
}
