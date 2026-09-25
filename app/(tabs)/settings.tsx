import { router } from 'expo-router';
import { Text, View } from 'react-native';
import { Icon } from '@/components/Icon';
import type { IconName } from '@/components/glyphs';
import { Screen } from '@/components/ui/Screen';
import { Card, Pill, IconBadge } from '@/components/ui/Surface';
import { ListRow, RowGroup } from '@/components/ui/Rows';
import { user } from '@/data/mock';

type Row = { icon: IconName; title: string; subtitle: string; value?: string; href: string };

const SECTIONS: { title: string; tag?: string; rows: Row[] }[] = [
  {
    title: 'Account & Security',
    tag: 'Encrypted',
    rows: [
      { icon: 'manage_accounts', title: 'Account Settings', subtitle: 'Profile, Password, Authentication', href: '/settings/account' },
      { icon: 'badge', title: 'Personal Information', subtitle: 'KYC Tier 2 • Contact • Occupation', value: 'Verified', href: '/profile/personal-information' },
      { icon: 'savings', title: 'Safety Buffer Settings', subtitle: 'Autonomous overdraft floor lock', value: '₹5,650.00', href: '/settings/safety-buffer' },
    ],
  },
  {
    title: 'Financial Engine',
    tag: 'Kinetic Model v2',
    rows: [
      { icon: 'trending_up', title: 'Income Settings', subtitle: 'Payroll schedules, side hustles & APYs', value: '2 Active', href: '/settings/income' },
      { icon: 'pie_chart', title: 'Expense Categories', subtitle: 'Smart buckets & auto-deductions', value: '8 Active', href: '/settings/expense-categories' },
      { icon: 'tune', title: 'Financial Preferences', subtitle: 'Defensive algorithmic guardrails', value: 'Balanced', href: '/settings/financial-preferences' },
    ],
  },
  {
    title: 'Preferences & Localization',
    rows: [
      { icon: 'notifications_active', title: 'Notification Settings', subtitle: 'Outflow spikes, weekly digest, mutes', value: 'Instant', href: '/settings/notifications' },
      { icon: 'translate', title: 'Language Settings', subtitle: 'Display and voice prompt dialect', value: 'English (UK)', href: '/settings/language' },
      { icon: 'currency_rupee', title: 'Currency Settings', subtitle: 'Base denomination & conversion fx', value: 'INR (₹)', href: '/settings/currency' },
      { icon: 'dark_mode', title: 'Theme Settings', subtitle: 'Obsidian Kinetic contrast palette', value: 'Dark Mode', href: '/settings/theme' },
    ],
  },
  {
    title: 'Privacy & Data',
    rows: [
      { icon: 'lock', title: 'Privacy Settings', subtitle: 'Telemetry opt-in, model federated training', value: 'Zero-Retention', href: '/settings/privacy' },
      { icon: 'database', title: 'Data & Import Settings', subtitle: 'CSV/JSON sync, export bundle, purge', value: 'Ready', href: '/settings/data-import' },
    ],
  },
  {
    title: 'About & Session',
    rows: [
      { icon: 'info', title: 'About AI Cashflow Guardian', subtitle: 'v2.4.0 • Hackronyx 2.0 Build', value: 'Stable', href: '/settings/about' },
      { icon: 'person', title: 'Profile & Governance', subtitle: 'Health, guardrails, session nodes', href: '/profile' },
      { icon: 'science', title: 'Demo Control Center', subtitle: 'Hackathon scenario controller', href: '/demo' },
    ],
  },
];

export default function Settings() {
  return (
    <Screen
      title="Settings"
      subtitle="Guardian Enclave"
      back={false}
      avatar
      tabBarSpacing
      actions={[{ icon: 'notifications', label: 'Notifications', onPress: () => router.push('/notifications') }]}
      contentClassName="gap-space-lg"
    >
      {/* Profile snapshot */}
      <Card tone="low" className="flex-row items-center gap-3 p-4">
        <View className="h-14 w-14 items-center justify-center rounded-full bg-primary">
          <Icon name="person" size={28} className="text-on-primary" />
        </View>
        <View className="flex-1">
          <Text className="font-headline-sm text-headline-sm text-on-surface">{user.name}</Text>
          <Text className="font-body-sm text-body-sm text-on-surface-variant">{user.email}</Text>
          <View className="mt-1.5 flex-row items-center gap-1.5">
            <Icon name="verified_user" size={13} className="text-secondary" />
            <Text className="font-label-sm text-label-sm text-secondary">AI Shield Active • 99.8% Healthy</Text>
          </View>
        </View>
      </Card>

      {SECTIONS.map((section) => (
        <View key={section.title} className="gap-2">
          <View className="flex-row items-center justify-between px-1">
            <Text className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
              {section.title}
            </Text>
            {section.tag ? <Pill label={section.tag} /> : null}
          </View>
          <RowGroup>
            {section.rows.map((r) => (
              <ListRow
                key={r.title}
                icon={r.icon}
                title={r.title}
                subtitle={r.subtitle}
                value={r.value}
                chevron
                onPress={() => router.push(r.href as never)}
              />
            ))}
          </RowGroup>
        </View>
      ))}

      <RowGroup>
        <ListRow
          icon="logout"
          title="Sign Out"
          subtitle="Terminates active session & biometric lock"
          destructive
          chevron
          onPress={() => router.push('/logout')}
        />
      </RowGroup>

      <View className="items-center gap-1.5 py-4">
        <View className="flex-row items-center gap-1.5">
          <IconBadge name="shield" size={20} iconSize={12} bg="bg-transparent" />
          <Text className="font-label-sm text-label-sm text-on-surface-variant">
            Hackronyx Kinetic Defense Layer
          </Text>
        </View>
        <Text className="font-label-sm text-label-sm text-on-surface-variant opacity-60">
          Device Node #HX-9082-ALPHA
        </Text>
      </View>
    </Screen>
  );
}
