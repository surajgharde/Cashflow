import { useState } from 'react';
import { router } from 'expo-router';
import { Text, View } from 'react-native';
import { Icon } from '@/components/Icon';
import { Screen } from '@/components/ui/Screen';
import { Button } from '@/components/ui/Button';
import { Toggle } from '@/components/ui/Form';
import { Card, Pill, IconBadge } from '@/components/ui/Surface';
import { ListRow, RowGroup } from '@/components/ui/Rows';

const SESSIONS = [
  {
    id: 's1',
    icon: 'smartphone' as const,
    name: 'Pixel 8 Pro',
    meta: 'Bengaluru, IN • Active Now',
    tag: 'Current',
    badge: 'Guardian Node',
  },
  {
    id: 's2',
    icon: 'laptop_mac' as const,
    name: 'MacBook Pro 16"',
    meta: 'Singapore • 3 hours ago',
    badge: 'Chrome 122',
  },
];

export default function AccountSettings() {
  const [biometric, setBiometric] = useState(true);
  const [twoFactor, setTwoFactor] = useState(true);
  const [freeze, setFreeze] = useState(false);

  return (
    <Screen title="Account Settings" subtitle="Encrypted" avatar contentClassName="gap-space-lg">
      {/* Profile header */}
      <Card className="flex-row items-center gap-3">
        <View className="h-14 w-14 items-center justify-center rounded-full bg-primary">
          <Icon name="person" size={28} className="text-on-primary" />
        </View>
        <View className="flex-1">
          <View className="flex-row items-center gap-2">
            <Text className="font-headline-sm text-headline-sm text-on-surface">Alex Mercer</Text>
            <Pill label="Pro Tier" tone="accent" />
          </View>
          <Text className="font-body-sm text-body-sm text-on-surface-variant">
            alex.mercer@finflow.guardian
          </Text>
        </View>
        <Icon name="verified_user" size={20} className="text-secondary" />
      </Card>

      {/* Security & authentication */}
      <View className="gap-2">
        <View className="flex-row items-center justify-between px-1">
          <View className="flex-row items-center gap-2">
            <Icon name="shield" size={16} className="text-primary-container" />
            <Text className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
              Security & Authentication
            </Text>
          </View>
          <Pill label="100% Protected" tone="positive" />
        </View>

        <RowGroup>
          <ListRow
            icon="lock_reset"
            title="Change Password"
            subtitle="Last changed 45 days ago"
            chevron
            onPress={() => router.push('/(auth)/reset-password')}
          />
          <ListRow
            icon="phonelink_lock"
            title="Two-Factor Authentication"
            subtitle="Biometric / SMS OTP"
            trailing={<Toggle value={twoFactor} onChange={setTwoFactor} />}
          />
          <ListRow
            icon="fingerprint"
            title="Biometric Lock"
            subtitle="FaceID / Fingerprint Quick Access"
            trailing={<Toggle value={biometric} onChange={setBiometric} />}
          />
        </RowGroup>
      </View>

      {/* Sessions */}
      <View className="gap-2">
        <View className="flex-row items-center justify-between px-1">
          <Text className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
            Session & Device Management
          </Text>
          <Pill label="2 Nodes Connected" />
        </View>

        <Card tone="low" className="gap-3 p-4">
          {SESSIONS.map((s, i) => (
            <View key={s.id}>
              {i > 0 ? <View className="mb-3 h-px bg-surface-container-high" /> : null}
              <View className="flex-row items-center gap-3">
                <IconBadge name={s.icon} bg="bg-surface-container" />
                <View className="flex-1">
                  <View className="flex-row items-center gap-2">
                    <Text className="font-label-lg text-label-lg text-on-surface">{s.name}</Text>
                    {s.tag ? <Pill label={s.tag} tone="positive" /> : null}
                  </View>
                  <Text className="mt-0.5 font-body-sm text-body-sm text-on-surface-variant">{s.meta}</Text>
                </View>
                <Text className="font-label-sm text-label-sm text-on-surface-variant">{s.badge}</Text>
              </View>
            </View>
          ))}
        </Card>

        <Button title="Terminate Other Sessions" icon="power_settings_new" variant="secondary" />
      </View>

      {/* Danger zone */}
      <View className="gap-2">
        <View className="flex-row items-center gap-2 px-1">
          <Icon name="warning" size={16} className="text-error" />
          <Text className="font-label-sm text-label-sm uppercase tracking-wider text-error">
            Danger Zone
          </Text>
        </View>

        <RowGroup>
          <ListRow
            icon="shield_with_heart"
            title="Freeze Account Shield"
            subtitle="Temporarily pauses automated Guardian AI tracking & auto-rules"
            trailing={<Toggle value={freeze} onChange={setFreeze} />}
          />
          <ListRow
            icon="delete_forever"
            title="Delete Account & Purge Data"
            subtitle="Permanent irreversible wipe of ledger logs"
            destructive
            chevron
          />
        </RowGroup>
      </View>

      <Button
        title="Logout of Account"
        icon="logout"
        variant="danger"
        onPress={() => router.push('/logout')}
      />

      <Text className="py-2 text-center font-label-sm text-label-sm text-on-surface-variant">
        AI Cashflow Guardian v3.4.1 (Encrypted Build)
      </Text>
    </Screen>
  );
}
