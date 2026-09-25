import { useState } from 'react';
import { router } from 'expo-router';
import { Text, View } from 'react-native';
import { Icon } from '@/components/Icon';
import { Screen } from '@/components/ui/Screen';
import { Button } from '@/components/ui/Button';
import { Toggle } from '@/components/ui/Form';
import { Card, Pill, IconBadge } from '@/components/ui/Surface';

type Item = { id: string; title: string; body: string; tags?: string[] };

const SECTIONS: { title: string; tag?: string; items: Item[]; footer?: { label: string; value: string } }[] = [
  {
    title: 'Liquidity & Risk Alerts',
    tag: 'High Priority',
    items: [
      {
        id: 'n1',
        title: 'Liquidity Compression & Shortfalls',
        body: 'Real-time flags when forecasted balance dips below zero',
        tags: ['Push', 'In-App'],
      },
      {
        id: 'n2',
        title: 'Buffer Breach Risk Alerts',
        body: 'Notifies if reserves fall beneath the ₹5,650 target floor',
      },
    ],
    footer: { label: 'Frequency', value: 'Instant real-time dispatch' },
  },
  {
    title: 'Forecast & Trajectory',
    items: [
      {
        id: 'n3',
        title: '7-Day & 14-Day Trajectory Shifts',
        body: 'Alerts when recurring obligations cause multi-week deviation',
      },
      {
        id: 'n4',
        title: 'Weekly Health Digest',
        body: 'Summary delivered every Sunday at 09:00 AM',
      },
    ],
  },
  {
    title: 'Transaction & Inflow',
    items: [
      {
        id: 'n5',
        title: 'Salary & Retainer Arrival',
        body: 'Verification when payroll or invoice deposits clear',
      },
      {
        id: 'n6',
        title: 'Spend Velocity Spikes',
        body: 'Triggered when 24h burn rate exceeds >20% over rolling baseline',
      },
    ],
  },
  {
    title: 'AI Protective Recommendations',
    items: [
      {
        id: 'n7',
        title: 'Proactive Bill-Pause Nudges',
        body: 'Smart recommendations to defer flexible vendor subscriptions',
      },
      {
        id: 'n8',
        title: 'Dining & Discretionary Reminders',
        body: 'Gentle pacing checkpoints when hitting 80% category budget',
      },
    ],
  },
];

export default function NotificationSettings() {
  const [on, setOn] = useState<Record<string, boolean>>({
    n1: true,
    n2: true,
    n3: true,
    n4: true,
    n5: true,
    n6: true,
    n7: true,
    n8: false,
  });

  const [dnd, setDnd] = useState(true);

  return (
    <Screen title="Notification Settings" subtitle="Guardian Active" avatar contentClassName="gap-space-lg">
      {/* Status banner */}
      <Card tone="low" className="flex-row gap-3 p-4">
        <IconBadge name="verified_user" bg="bg-surface-container" fg="text-secondary" />
        <View className="flex-1">
          <Text className="font-label-lg text-label-lg text-on-surface">Guardian Active</Text>
          <Text className="mt-1 font-body-sm text-body-sm text-on-surface-variant">
            Machine intelligence continuously scans 41 cashflow metrics to prevent sudden shortfalls.
          </Text>
        </View>
      </Card>

      {SECTIONS.map((section) => (
        <View key={section.title} className="gap-space-sm">
          <View className="flex-row items-center justify-between">
            <Text className="font-headline-sm text-headline-sm text-on-surface">{section.title}</Text>
            {section.tag ? <Pill label={section.tag} tone="danger" /> : null}
          </View>

          <Card tone="low" className="gap-4 p-4">
            {section.items.map((item, i) => (
              <View key={item.id}>
                {i > 0 ? <View className="mb-4 h-px bg-surface-container-high" /> : null}
                <View className="flex-row items-start gap-3">
                  <View className="flex-1">
                    <Text className="font-label-lg text-label-lg text-on-surface">{item.title}</Text>
                    <Text className="mt-0.5 font-body-sm text-body-sm text-on-surface-variant">
                      {item.body}
                    </Text>
                    {item.tags ? (
                      <View className="mt-2 flex-row gap-2">
                        {item.tags.map((t) => (
                          <Pill key={t} label={t} />
                        ))}
                      </View>
                    ) : null}
                  </View>
                  <Toggle
                    value={on[item.id]}
                    onChange={(v) => setOn((s) => ({ ...s, [item.id]: v }))}
                  />
                </View>
              </View>
            ))}

            {section.footer ? (
              <View className="flex-row items-center justify-between rounded-xl bg-surface-container p-3">
                <View className="flex-row items-center gap-2">
                  <Icon name="bolt" size={14} className="text-primary-container" />
                  <Text className="font-label-sm text-label-sm text-on-surface-variant">
                    {section.footer.label}
                  </Text>
                </View>
                <Text className="font-label-md text-label-md text-on-surface">{section.footer.value}</Text>
              </View>
            ) : null}
          </Card>
        </View>
      ))}

      {/* Quiet hours */}
      <View className="gap-space-sm">
        <Text className="font-headline-sm text-headline-sm text-on-surface">Quiet Hours & Delivery</Text>

        <Card tone="low" className="p-4">
          <View className="flex-row items-center gap-3">
            <IconBadge name="bedtime" bg="bg-surface-container" fg="text-primary-container" />
            <View className="flex-1">
              <Text className="font-label-lg text-label-lg text-on-surface">Do Not Disturb Window</Text>
              <Text className="mt-0.5 font-body-sm text-body-sm text-on-surface-variant">
                11:00 PM – 07:00 AM
              </Text>
            </View>
            <Toggle value={dnd} onChange={setDnd} />
          </View>

          <View className="mt-3 flex-row gap-2.5 rounded-xl bg-error-container/30 p-3">
            <Icon name="error" size={16} className="text-error" />
            <Text className="flex-1 font-body-sm text-body-sm text-on-surface-variant">
              <Text className="text-on-surface">Safety Override:</Text> Critical overdraft risks will still
              vibrate through quiet mode to preserve account protection.
            </Text>
          </View>
        </Card>
      </View>

      <View className="gap-2">
        <Button title="Save Notification Preferences" icon="check_circle" onPress={() => router.back()} />
        <Text className="text-center font-body-sm text-body-sm text-on-surface-variant">
          Preferences securely updated
        </Text>
      </View>
    </Screen>
  );
}
