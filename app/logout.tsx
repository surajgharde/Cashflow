import { useState } from 'react';
import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from '@/components/Icon';
import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Form';

/**
 * Presented as a transparent modal route (see the root Stack), which is how the export's
 * dimmed backdrop + bottom sheet reads on device.
 */
export default function LogoutConfirmation() {
  const [keepCache, setKeepCache] = useState(true);
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 justify-end bg-surface-container-lowest/85">
      <Pressable
        className="flex-1"
        accessibilityRole="button"
        accessibilityLabel="Dismiss"
        onPress={() => router.back()}
      />

      <View
        className="rounded-t-2xl bg-surface-container px-margin pt-3"
        style={{ paddingBottom: insets.bottom + 24 }}
      >
        {/* Drag handle */}
        <View className="self-center h-1 w-10 rounded-full bg-surface-container-highest" />

        <View className="mt-5 items-center">
          <View className="h-16 w-16 items-center justify-center rounded-full bg-error-container/40">
            <Icon name="logout" size={30} className="text-error" />
          </View>

          <Text className="mt-4 text-center font-headline-md text-headline-md text-on-surface">
            Log Out of AI Cashflow Guardian?
          </Text>
          <Text className="mt-2 text-center font-body-md text-body-md text-on-surface-variant">
            Your active financial guardrails and offline Safe-to-Spend tracking will pause until your next
            biometric sign in.
          </Text>
        </View>

        {/* Safe device cache */}
        <Pressable
          accessibilityRole="checkbox"
          accessibilityState={{ checked: keepCache }}
          onPress={() => setKeepCache((v) => !v)}
          className="mt-5 flex-row items-start gap-3 rounded-xl bg-surface-container-low p-4"
        >
          <Checkbox checked={keepCache} onChange={setKeepCache} />
          <View className="flex-1">
            <Text className="font-label-lg text-label-lg text-on-surface">
              Keep encrypted transaction cache
            </Text>
            <Text className="mt-0.5 font-body-sm text-body-sm text-on-surface-variant">
              Retains local data for instant biometric unlock on this safe device
            </Text>
          </View>
        </Pressable>

        <View className="mt-5 gap-2.5">
          <Button
            title="Yes, Log Out"
            icon="power_settings_new"
            variant="danger"
            onPress={() => router.replace('/(auth)/login')}
          />
          <Button title="Cancel & Return" variant="secondary" onPress={() => router.back()} />
        </View>
      </View>
    </View>
  );
}
