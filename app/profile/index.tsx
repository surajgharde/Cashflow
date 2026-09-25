import { useState } from 'react';
import { router } from 'expo-router';
import { Modal, Pressable, Text, View } from 'react-native';
import { Icon } from '@/components/Icon';
import type { IconName } from '@/components/glyphs';
import { Screen } from '@/components/ui/Screen';
import { Button } from '@/components/ui/Button';
import { Card, Pill, IconBadge, ProgressBar } from '@/components/ui/Surface';
import { ListRow, RowGroup } from '@/components/ui/Rows';
import { user, balances } from '@/data/mock';
import { formatCurrency } from '@/lib/format';

const GOVERNANCE: { icon: IconName; title: string; subtitle: string; value?: string; href: string }[] = [
  { icon: 'badge', title: 'Edit Profile', subtitle: 'Photo, contact handle, display tags', href: '/profile/edit' },
  { icon: 'assignment_ind', title: 'Personal Information', subtitle: 'Tax residence, employment & risk tier', value: 'KYC L2', href: '/profile/personal-information' },
  { icon: 'tune', title: 'Financial Preferences', subtitle: 'Essential vs Discretionary buckets', href: '/settings/financial-preferences' },
  { icon: 'security', title: 'Safety Buffer & Guardrails', subtitle: 'Autonomous lock threshold & shock absorbers', value: '₹5,650', href: '/settings/safety-buffer' },
];

export default function Profile() {
  const [confirm, setConfirm] = useState(false);

  return (
    <>
      <Screen
        title="Profile"
        subtitle="Guardian Enclave"
        avatar
        tabBarSpacing
        actions={[{ icon: 'notifications', label: 'Notifications', onPress: () => router.push('/notifications') }]}
        contentClassName="gap-space-lg"
      >
        {/* Hero profile */}
        <Card>
          <View className="flex-row items-center gap-3">
            <View className="h-16 w-16 items-center justify-center rounded-full bg-primary">
              <Icon name="person" size={32} className="text-on-primary" />
            </View>
            <View className="flex-1">
              <View className="flex-row items-center gap-1.5">
                <Text className="font-headline-md text-headline-md text-on-surface">{user.name}</Text>
                <Icon name="verified" size={16} className="text-secondary" />
              </View>
              <Text className="font-body-sm text-body-sm text-on-surface-variant">{user.email}</Text>
              <Pill label={user.tier} icon="shield" tone="positive" className="mt-1.5" />
            </View>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Quick edit"
              hitSlop={8}
              onPress={() => router.push('/profile/edit')}
            >
              <Icon name="edit" size={18} className="text-on-surface-variant" />
            </Pressable>
          </View>

          {/* Quick metrics ribbon */}
          <View className="mt-5 flex-row">
            {[
              { label: 'Liquid Buffer', value: formatCurrency(balances.buffer, { decimals: false }), sub: 'Protected', icon: 'lock' as IconName },
              { label: 'Guardrails', value: '4', sub: 'Active Locked', icon: 'verified_user' as IconName },
              { label: 'Solvency', value: '88/100', sub: 'Optimal', icon: 'trending_up' as IconName },
            ].map((m) => (
              <View key={m.label} className="flex-1 items-center">
                <Text className="font-label-sm text-label-sm text-on-surface-variant">{m.label}</Text>
                <Text className="mt-0.5 font-label-lg text-label-lg text-on-surface">{m.value}</Text>
                <View className="mt-0.5 flex-row items-center gap-1">
                  <Icon name={m.icon} size={10} className="text-secondary" />
                  <Text className="font-label-sm text-label-sm text-on-surface-variant">{m.sub}</Text>
                </View>
              </View>
            ))}
          </View>
        </Card>

        {/* Solvency health */}
        <Card tone="low" className="p-4">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-2">
              <Icon name="ecg_heart" size={18} className="text-secondary" />
              <Text className="font-label-lg text-label-lg text-on-surface">Guardian Solvency Health</Text>
            </View>
            <Pill label="Realtime Audit" tone="positive" dot />
          </View>

          <View className="mt-4 flex-row gap-3">
            <View className="flex-1 rounded-xl bg-surface-container p-3">
              <View className="flex-row items-center justify-between">
                <Text className="font-label-sm text-label-sm text-on-surface-variant">Monthly Burn</Text>
                <Icon name="local_fire_department" size={14} className="text-error" />
              </View>
              <Text className="mt-1 font-headline-sm text-headline-sm text-on-surface">₹14,269</Text>
              <Text className="font-label-sm text-label-sm text-on-surface-variant">Runway: 4.8 months</Text>
            </View>
            <View className="flex-1 rounded-xl bg-surface-container p-3">
              <View className="flex-row items-center justify-between">
                <Text className="font-label-sm text-label-sm text-on-surface-variant">Discretionary</Text>
                <Icon name="shopping_bag" size={14} className="text-primary-container" />
              </View>
              <Text className="mt-1 font-headline-sm text-headline-sm text-on-surface">₹450 / day</Text>
              <Text className="font-label-sm text-label-sm text-secondary">Within target cap</Text>
            </View>
          </View>

          {/* Intervention acceptance */}
          <View className="mt-4 rounded-xl bg-surface-container p-3">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-2">
                <Icon name="psychology" size={14} className="text-primary-container" />
                <Text className="font-label-md text-label-md text-on-surface">
                  Automated Interventions Accepted
                </Text>
              </View>
              <Text className="font-label-lg text-label-lg text-on-surface">11 / 18</Text>
            </View>
            <View className="mt-2">
              <ProgressBar value={11 / 18} />
            </View>
            <View className="mt-1.5 flex-row items-center justify-between">
              <Text className="font-label-sm text-label-sm text-on-surface-variant">
                61% Protocol Adoption
              </Text>
              <Text className="font-label-sm text-label-sm text-secondary">Saved ₹3,820 this cycle</Text>
            </View>
          </View>
        </Card>

        {/* Account governance */}
        <View className="gap-2">
          <Text className="px-1 font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
            Account Governance
          </Text>
          <RowGroup>
            {GOVERNANCE.map((g) => (
              <ListRow
                key={g.title}
                icon={g.icon}
                title={g.title}
                subtitle={g.subtitle}
                value={g.value}
                chevron
                onPress={() => router.push(g.href as never)}
              />
            ))}
          </RowGroup>
        </View>

        {/* System & node feeds */}
        <View className="gap-2">
          <Text className="px-1 font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
            System & Node Feeds
          </Text>
          <RowGroup>
            <ListRow
              icon="lock_clock"
              title="System & Security Settings"
              subtitle="Biometrics, hardware keys & PIN"
              chevron
              onPress={() => router.push('/settings/account')}
            />
            <ListRow
              icon="sync"
              title="Data & Sync Status"
              subtitle="Bank Feeds Synced 4m ago"
              trailing={
                <Pressable
                  accessibilityRole="button"
                  className="flex-row items-center gap-1 rounded-full bg-surface-container-high px-3 py-1.5"
                >
                  <Icon name="refresh" size={13} className="text-on-surface" />
                  <Text className="font-label-sm text-label-sm text-on-surface">Sync</Text>
                </Pressable>
              }
              onPress={() => router.push('/settings/data-import')}
            />
          </RowGroup>
        </View>

        <RowGroup>
          <ListRow
            icon="logout"
            title="Terminate Session & Logout"
            subtitle="Guardrails stay active in offline watch mode"
            destructive
            onPress={() => setConfirm(true)}
          />
        </RowGroup>

        <Text className="py-4 text-center font-label-sm text-label-sm text-on-surface-variant">
          AI Cashflow Guardian Core • v3.4.1 (Kinetic Engine)
        </Text>
      </Screen>

      {/* Logout confirmation */}
      <Modal visible={confirm} transparent animationType="fade" onRequestClose={() => setConfirm(false)}>
        <View className="flex-1 justify-center bg-surface-container-lowest/80 px-margin">
          <View className="items-center rounded-2xl bg-surface-container p-6">
            <View className="h-14 w-14 items-center justify-center rounded-full bg-error-container/40">
              <Icon name="power_settings_new" size={26} className="text-error" />
            </View>
            <Text className="mt-4 font-headline-sm text-headline-sm text-on-surface">End Session?</Text>
            <Text className="mt-2 text-center font-body-md text-body-md text-on-surface-variant">
              Your automated guardrails will remain active in offline watch mode.
            </Text>

            <View className="mt-5 w-full gap-2">
              <Button title="Stay Active" variant="secondary" onPress={() => setConfirm(false)} />
              <Button
                title="Confirm Exit"
                variant="danger"
                onPress={() => {
                  setConfirm(false);
                  router.replace('/(auth)/login');
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}
