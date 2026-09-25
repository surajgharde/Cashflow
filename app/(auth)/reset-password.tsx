import { useState } from 'react';
import { router } from 'expo-router';
import { Modal, Pressable, Text, View } from 'react-native';
import { Icon } from '@/components/Icon';
import { Screen } from '@/components/ui/Screen';
import { Button, IconButton } from '@/components/ui/Button';
import { Field } from '@/components/ui/Form';
import { StrengthMeter, CheckItem, StatusBanner } from '@/components/ui/Progress';
import { Pill } from '@/components/ui/Surface';

export default function ResetPassword() {
  const [done, setDone] = useState(false);

  return (
    <>
      <Screen title="New Password" subtitle="Guardian Setup" avatar contentClassName="gap-space-lg pb-space-xl">
        <View className="items-center pt-space-sm">
          <View className="h-16 w-16 items-center justify-center rounded-full bg-surface-container-high">
            <Icon name="shield_lock" size={30} filled className="text-primary-container" />
          </View>
          <Pill label="Security Protocol" className="mt-3" uppercase />
        </View>

        <View className="items-center">
          <Text className="font-headline-lg text-headline-lg text-on-surface">Create New Password</Text>
          <Text className="mt-1.5 max-w-[310px] text-center font-body-md text-body-md text-on-surface-variant">
            Create a strong, new password to secure your account and financial data.
          </Text>
        </View>

        <StatusBanner
          icon="verified_user"
          title="AI Guardian Vault Encrypted"
          body="Zero-knowledge proof secured credentials"
        />

        <View className="gap-4">
          <View className="gap-3">
            <Field label="New Password" icon="lock" placeholder="Enter new password" secure defaultValue="NeonGuardian99" />
            <StrengthMeter score={3} label="Good (3/4)" caption="Security Strength" />
            <View className="gap-1.5 px-1">
              <CheckItem met label="At least 8 characters" />
              <CheckItem met label="One uppercase letter & number" />
              <CheckItem met={false} label="At least one special character (!@#$%^&*)" />
            </View>
          </View>

          <Field
            label="Confirm New Password"
            icon="lock_reset"
            placeholder="Re-enter password"
            secure
            defaultValue="NeonGuardian99!"
          />

          <View className="flex-row items-center gap-1.5 px-1">
            <Icon name="done_all" size={14} className="text-secondary" />
            <Text className="font-body-sm text-body-sm text-secondary">Passwords match perfectly</Text>
          </View>

          <Button title="Reset Password" icon="arrow_forward" iconTrailing onPress={() => setDone(true)} />

          <Pressable onPress={() => router.replace('/(auth)/login')} hitSlop={8} className="items-center">
            <Text className="font-label-md text-label-md text-on-surface-variant">
              Cancel and Return to Login
            </Text>
          </Pressable>
        </View>
      </Screen>

      {/* Success feedback sheet */}
      <Modal visible={done} transparent animationType="fade" onRequestClose={() => setDone(false)}>
        <View className="flex-1 justify-center bg-surface-container-lowest/80 px-margin">
          <View className="rounded-2xl bg-surface-container p-6">
            <View className="flex-row items-start justify-between">
              <View className="h-14 w-14 items-center justify-center rounded-full bg-surface-container-high">
                <Icon name="lock_reset" size={28} className="text-secondary" />
              </View>
              <IconButton name="close" accessibilityLabel="Dismiss" onPress={() => setDone(false)} />
            </View>
            <Text className="mt-4 font-headline-md text-headline-md text-on-surface">Password Updated!</Text>
            <Text className="mt-2 font-body-md text-body-md text-on-surface-variant">
              Your credentials have been securely stored in the Guardian Enclave. Redirecting you to login...
            </Text>
            <Button
              title="Back to Login"
              className="mt-5"
              onPress={() => {
                setDone(false);
                router.replace('/(auth)/login');
              }}
            />
          </View>
        </View>
      </Modal>
    </>
  );
}
