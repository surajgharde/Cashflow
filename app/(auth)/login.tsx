import { useState } from 'react';
import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Icon } from '@/components/Icon';
import { Screen } from '@/components/ui/Screen';
import { Button } from '@/components/ui/Button';
import { Field, Checkbox } from '@/components/ui/Form';
import { IconBadge } from '@/components/ui/Surface';

function GoogleMark() {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24">
      <Path
        d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.4 1 3.5 3.6 1.6 7.4l3.7 2.9C6.2 7.3 8.9 5 12 5z"
        fill="#EA4335"
      />
      <Path
        d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
        fill="#4285F4"
      />
      <Path d="M5.3 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.6 7.4C.6 9.4 0 10.6 0 12s.6 2.6 1.6 4.6l3.7-1.8z" fill="#FBBC05" />
      <Path
        d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3.1 0-5.8-2.3-6.7-5.3L1.6 16.6C3.5 20.4 7.4 23 12 23z"
        fill="#34A853"
      />
    </Svg>
  );
}

export default function Login() {
  const [remember, setRemember] = useState(true);

  return (
    <Screen header={false} contentClassName="pb-space-xl">
      {/* Brand & shield header */}
      <View className="items-center pb-space-md pt-space-lg">
        <View className="mb-space-md h-14 w-14 items-center justify-center rounded-full bg-surface-container-high">
          <View className="h-11 w-11 items-center justify-center rounded-full bg-surface-container-low">
            <Icon name="shield_with_heart" size={26} filled className="text-primary-container" />
          </View>
          {/* AI status pulse */}
          <View className="absolute right-0.5 top-0.5 h-3.5 w-3.5 rounded-full bg-primary-container" />
        </View>

        <View className="mb-space-sm flex-row items-center gap-1.5 rounded-full bg-surface-container-high px-3 py-1">
          <Icon name="auto_awesome" size={13} className="text-primary-container" />
          <Text className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
            AI Cashflow Guardian
          </Text>
        </View>

        <Text className="mt-1 font-display-hero-mobile text-display-hero-mobile text-on-surface">
          Welcome Back
        </Text>
        <Text className="mt-1.5 max-w-[280px] text-center font-body-md text-body-md text-on-surface-variant">
          Sign in to access your real-time cashflow intelligence
        </Text>
      </View>

      <View className="mt-space-sm gap-4">
        <Field
          label="Email or Mobile Phone"
          hint="Encrypted"
          hintIcon="security"
          icon="alternate_email"
          placeholder="name@example.com / +91 98765 43210"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Field label="Password" icon="lock" placeholder="••••••••••••" secure />

        <View className="flex-row items-center justify-between px-1 pt-1">
          <Checkbox checked={remember} onChange={setRemember} label="Remember me" />
          <Pressable onPress={() => router.push('/(auth)/forgot-password')} hitSlop={8}>
            <Text className="font-label-md text-label-md text-primary-container">Forgot password?</Text>
          </Pressable>
        </View>

        {/* Live risk telemetry badge */}
        <View className="mt-1 flex-row items-center gap-2.5 rounded-xl bg-surface-container-low p-3">
          <IconBadge name="verified_user" size={28} iconSize={16} bg="bg-surface-container" fg="text-secondary" />
          <View className="flex-1">
            <Text className="font-label-md text-label-md text-on-surface">Guardian Active</Text>
            <Text className="font-body-sm text-body-sm text-on-surface-variant" numberOfLines={1}>
              Biometric anomaly engine initialized
            </Text>
          </View>
        </View>

        <Button
          title="Sign In to Guardian"
          icon="arrow_forward"
          iconTrailing
          className="mt-2"
          onPress={() => router.replace('/(tabs)')}
        />

        <View className="my-3 flex-row items-center gap-3">
          <View className="h-px flex-1 bg-surface-container-high" />
          <Text className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">
            or continue with
          </Text>
          <View className="h-px flex-1 bg-surface-container-high" />
        </View>

        <Pressable
          accessibilityRole="button"
          onPress={() => router.replace('/(tabs)')}
          className="h-[52px] w-full flex-row items-center justify-center gap-3 rounded-full bg-surface-container-high"
        >
          <GoogleMark />
          <Text className="font-label-lg text-label-lg text-on-surface">Google Workspace</Text>
        </Pressable>
      </View>

      <View className="mt-8 flex-row items-center justify-center">
        <Text className="font-body-md text-body-md text-on-surface-variant">Don't have an account? </Text>
        <Pressable onPress={() => router.push('/(auth)/create-account')} hitSlop={8}>
          <Text className="font-label-lg text-label-lg text-primary-container">Create Account</Text>
        </Pressable>
      </View>
    </Screen>
  );
}
