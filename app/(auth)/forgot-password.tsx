import { useState } from 'react';
import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { Icon } from '@/components/Icon';
import { Screen } from '@/components/ui/Screen';
import { Button } from '@/components/ui/Button';
import { Field } from '@/components/ui/Form';
import { StatusBanner } from '@/components/ui/Progress';

export default function ForgotPassword() {
  const [channel, setChannel] = useState<'email' | 'phone'>('email');

  return (
    <Screen title="Reset Access" subtitle="Guardian Setup" avatar contentClassName="gap-space-lg pb-space-xl">
      <View className="items-center pt-space-md">
        <View className="h-16 w-16 items-center justify-center rounded-full bg-surface-container-high">
          <Icon name="lock_reset" size={30} className="text-primary-container" />
        </View>
      </View>

      <View className="items-center">
        <Text className="font-headline-lg text-headline-lg text-on-surface">Forgot Password?</Text>
        <Text className="mt-1.5 max-w-[310px] text-center font-body-md text-body-md text-on-surface-variant">
          Enter your registered email or phone number to receive a verification reset code.
        </Text>
      </View>

      <View className="gap-4 rounded-2xl bg-surface-container-low p-4">
        {/* Segmented channel track */}
        <View className="flex-row gap-1 rounded-xl bg-surface-container p-1.5">
          {(
            [
              { key: 'email', label: 'Email', icon: 'mail' },
              { key: 'phone', label: 'Phone Number', icon: 'smartphone' },
            ] as const
          ).map((o) => {
            const active = channel === o.key;
            return (
              <Pressable
                key={o.key}
                onPress={() => setChannel(o.key)}
                accessibilityRole="tab"
                accessibilityState={{ selected: active }}
                className={`flex-1 flex-row items-center justify-center gap-1.5 rounded-lg py-2 ${
                  active ? 'bg-surface-container-highest' : ''
                }`}
              >
                <Icon
                  name={o.icon}
                  size={16}
                  className={active ? 'text-primary-container' : 'text-on-surface-variant'}
                />
                <Text
                  className={`font-label-md text-label-md ${active ? 'text-on-surface' : 'text-on-surface-variant'}`}
                >
                  {o.label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {channel === 'email' ? (
          <Field
            label="Email Address"
            icon="alternate_email"
            placeholder="alex.miller@guardian.ai"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        ) : (
          <Field label="Phone Number" icon="call" placeholder="98765 43210" keyboardType="phone-pad" />
        )}

        <StatusBanner
          icon="verified_user"
          title="Automated Dispatch"
          body="We will dispatch an OTP verification code immediately."
        />

        <Button
          title="Send Verification Code"
          icon="arrow_forward"
          iconTrailing
          onPress={() => router.push('/(auth)/reset-password')}
        />
      </View>

      <View className="flex-row items-center justify-between rounded-2xl bg-surface-container p-4">
        <View className="flex-row items-center gap-3">
          <Icon name="encrypted" size={20} className="text-primary-container" />
          <Text className="font-label-md text-label-md text-on-surface">End-to-End Key Rotation</Text>
        </View>
        <Text className="font-label-sm text-label-sm text-on-surface-variant">256-bit AES</Text>
      </View>

      <View className="flex-row items-center justify-center">
        <Text className="font-body-md text-body-md text-on-surface-variant">Remember your password? </Text>
        <Pressable onPress={() => router.replace('/(auth)/login')} hitSlop={8}>
          <Text className="font-label-lg text-label-lg text-primary-container">Back to Login</Text>
        </Pressable>
      </View>
    </Screen>
  );
}
