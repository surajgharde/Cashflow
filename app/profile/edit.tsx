import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { Icon } from '@/components/Icon';
import { Screen } from '@/components/ui/Screen';
import { Button } from '@/components/ui/Button';
import { Field } from '@/components/ui/Form';
import { Card, IconBadge } from '@/components/ui/Surface';
import { user } from '@/data/mock';

export default function EditProfile() {
  return (
    <Screen title="Edit Profile" subtitle="Universal Sync Enabled" avatar contentClassName="gap-space-lg">
      {/* Avatar */}
      <View className="items-center">
        <View className="h-24 w-24 items-center justify-center rounded-full bg-primary">
          <Icon name="person" size={48} className="text-on-primary" />
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Change photo"
            className="absolute bottom-0 right-0 h-8 w-8 items-center justify-center rounded-full bg-primary-container"
          >
            <Icon name="photo_camera" size={16} className="text-on-primary-fixed" />
          </Pressable>
        </View>
        <Button
          title="Change Profile Picture"
          icon="edit"
          variant="ghost"
          full={false}
          className="mt-3 h-10"
        />
      </View>

      <View className="gap-4">
        <Field label="Full Legal Name" icon="badge" defaultValue={user.name} />
        <Field label="Display Handle" hint="Unique" icon="alternate_email" defaultValue={user.handle} />
        <Field
          label="Primary Email Address"
          hint="Verified"
          hintIcon="verified"
          icon="mail"
          defaultValue={user.email}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <View className="gap-1.5">
          <Text className="px-1 font-label-md text-label-md text-on-surface-variant">Contact Mobile</Text>
          <View className="flex-row gap-2">
            <View className="h-[50px] flex-row items-center gap-1 rounded-xl bg-surface-container px-3">
              <Text className="text-body-lg">🇮🇳</Text>
              <Text className="font-label-lg text-label-lg text-on-surface">+91</Text>
            </View>
            <Field defaultValue={user.phone} keyboardType="phone-pad" className="flex-1" />
          </View>
        </View>

        {/* Occupation picker */}
        <View className="gap-1.5">
          <Text className="px-1 font-label-md text-label-md text-on-surface-variant">
            Occupation & Cashflow Profile
          </Text>
          <Pressable
            accessibilityRole="button"
            className="flex-row items-center gap-3 rounded-xl bg-surface-container p-3.5"
          >
            <IconBadge name="work" bg="bg-surface-container-high" fg="text-primary-container" />
            <Text className="flex-1 font-label-lg text-label-lg text-on-surface">
              Salaried Pro & Freelancer
            </Text>
            <Icon name="expand_more" size={20} className="text-on-surface-variant" />
          </Pressable>
        </View>

        <Field
          label="City / Region (Timezone)"
          icon="location_on"
          defaultValue={user.city}
          hint="Locked"
          hintIcon="lock"
        />
      </View>

      {/* Sync note */}
      <Card tone="low" className="flex-row gap-3 p-4">
        <IconBadge name="sync" bg="bg-surface-container" fg="text-primary-container" />
        <View className="flex-1">
          <Text className="font-label-lg text-label-lg text-on-surface">Universal Sync Enabled</Text>
          <Text className="mt-1 font-body-sm text-body-sm text-on-surface-variant">
            Changes will synchronize across your Guardian AI profile and notifications.
          </Text>
        </View>
      </Card>

      <View className="gap-3">
        <Button title="Save Changes" icon="check_circle" onPress={() => router.back()} />
        <Button title="Cancel" variant="ghost" onPress={() => router.back()} />
      </View>
    </Screen>
  );
}
