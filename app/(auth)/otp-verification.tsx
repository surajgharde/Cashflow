import { useState } from 'react';
import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { Icon } from '@/components/Icon';
import { Screen } from '@/components/ui/Screen';
import { Button } from '@/components/ui/Button';

const KEYS = [
  { d: '1', l: '' },
  { d: '2', l: 'ABC' },
  { d: '3', l: 'DEF' },
  { d: '4', l: 'GHI' },
  { d: '5', l: 'JKL' },
  { d: '6', l: 'MNO' },
  { d: '7', l: 'PQRS' },
  { d: '8', l: 'TUV' },
  { d: '9', l: 'WXYZ' },
];

export default function OtpVerification() {
  const [code, setCode] = useState('842');

  const push = (d: string) => setCode((c) => (c.length < 6 ? c + d : c));
  const pop = () => setCode((c) => c.slice(0, -1));

  return (
    <Screen title="Verify Identity" subtitle="Guardian Setup" avatar contentClassName="gap-space-lg pb-space-xl">
      {/* Glowing security shield node */}
      <View className="items-center pt-space-sm">
        <View className="h-16 w-16 items-center justify-center rounded-full bg-surface-container-high">
          <Icon name="shield_lock" size={30} filled className="text-primary-container" />
        </View>
      </View>

      <View className="items-center">
        <Text className="font-headline-lg text-headline-lg text-on-surface">Verify Phone Number</Text>
        <Text className="mt-1.5 max-w-[300px] text-center font-body-md text-body-md text-on-surface-variant">
          We sent a 6-digit verification code to +91 98765 •••••
        </Text>
      </View>

      {/* 6-digit display row */}
      <View className="gap-4 rounded-2xl bg-surface-container-low p-4">
        <View className="flex-row justify-between">
          {Array.from({ length: 6 }).map((_, i) => {
            const filled = i < code.length;
            const active = i === code.length;
            return (
              <View
                key={i}
                className={`h-14 w-12 items-center justify-center rounded-xl ${
                  active ? 'bg-surface-container-highest' : 'bg-surface-container'
                } ${active ? 'border border-primary-container' : ''}`}
              >
                <Text
                  className={`font-headline-md text-headline-md ${
                    filled ? 'text-on-surface' : 'text-on-surface-variant'
                  }`}
                >
                  {filled ? code[i] : '•'}
                </Text>
              </View>
            );
          })}
        </View>

        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-1.5">
            <Icon name="schedule" size={14} className="text-on-surface-variant" />
            <Text className="font-label-sm text-label-sm text-on-surface-variant">Resend code in 00:42</Text>
          </View>
          <Text className="font-label-sm text-label-sm text-on-surface-variant opacity-50">Resend OTP</Text>
        </View>
      </View>

      {/* Tactile keypad */}
      <View className="flex-row flex-wrap justify-between gap-y-3">
        {KEYS.map((k) => (
          <Pressable
            key={k.d}
            onPress={() => push(k.d)}
            accessibilityRole="button"
            accessibilityLabel={k.d}
            className="h-16 w-[31%] items-center justify-center rounded-2xl bg-surface-container"
            style={({ pressed }) => pressed && { opacity: 0.6 }}
          >
            <Text className="font-headline-md text-headline-md text-on-surface">{k.d}</Text>
            {k.l ? (
              <Text className="font-label-sm text-label-sm tracking-widest text-on-surface-variant">{k.l}</Text>
            ) : null}
          </Pressable>
        ))}

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Use biometrics"
          className="h-16 w-[31%] items-center justify-center rounded-2xl bg-surface-container-low"
        >
          <Icon name="fingerprint" size={26} className="text-primary-container" />
        </Pressable>

        <Pressable
          onPress={() => push('0')}
          accessibilityRole="button"
          accessibilityLabel="0"
          className="h-16 w-[31%] items-center justify-center rounded-2xl bg-surface-container"
        >
          <Text className="font-headline-md text-headline-md text-on-surface">0</Text>
        </Pressable>

        <Pressable
          onPress={pop}
          accessibilityRole="button"
          accessibilityLabel="Delete"
          className="h-16 w-[31%] items-center justify-center rounded-2xl bg-surface-container-low"
        >
          <Icon name="backspace" size={24} className="text-on-surface-variant" />
        </Pressable>
      </View>

      <View className="gap-3">
        <Button
          title="Verify & Continue"
          icon="arrow_forward"
          iconTrailing
          onPress={() => router.push('/(auth)/personal-information')}
        />
        <View className="flex-row items-center justify-center gap-1.5">
          <Icon name="verified_user" size={13} className="text-on-surface-variant" />
          <Text className="font-body-sm text-body-sm text-on-surface-variant">
            Encrypted with bank-grade 256-bit security
          </Text>
        </View>
      </View>
    </Screen>
  );
}
