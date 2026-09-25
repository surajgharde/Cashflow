import { useMemo, useState } from 'react';
import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { Icon } from '@/components/Icon';
import { Screen } from '@/components/ui/Screen';
import { Button } from '@/components/ui/Button';
import { Card, Pill, IconBadge } from '@/components/ui/Surface';
import { notifications } from '@/data/mock';

const FILTERS = [
  { key: 'all', label: 'All', count: 6 },
  { key: 'risk', label: 'Risk Alerts', count: 2 },
  { key: 'forecast', label: 'Forecast', count: 2 },
  { key: 'protective', label: 'Protective', count: 2 },
] as const;

const TONE = {
  neutral: { fg: 'text-on-surface-variant', pill: 'neutral' as const },
  positive: { fg: 'text-secondary', pill: 'positive' as const },
  warning: { fg: 'text-primary-container', pill: 'warning' as const },
  danger: { fg: 'text-error', pill: 'danger' as const },
};

export default function NotificationCenter() {
  const [filter, setFilter] = useState<string>('all');
  const [read, setRead] = useState(false);

  const rows = useMemo(() => {
    if (filter === 'all') return notifications;
    if (filter === 'risk') return notifications.filter((n) => n.tone === 'danger' || n.kind.includes('Risk'));
    if (filter === 'forecast')
      return notifications.filter((n) => n.kind.includes('Safe-To-Spend') || n.kind.includes('Inflow'));
    return notifications.filter((n) => n.kind.includes('Recommendation') || n.kind.includes('Protection'));
  }, [filter]);

  return (
    <Screen
      title="Notification Center"
      subtitle="Activity Stream"
      avatar
      actions={[{ icon: 'done_all', label: 'Mark read', onPress: () => setRead(true) }]}
      contentClassName="gap-space-lg"
    >
      {/* Filter track */}
      <View className="flex-row flex-wrap gap-2">
        {FILTERS.map((f) => {
          const active = filter === f.key;
          return (
            <Pressable
              key={f.key}
              onPress={() => setFilter(f.key)}
              accessibilityRole="tab"
              accessibilityState={{ selected: active }}
              className={`flex-row items-center gap-1.5 rounded-full px-3.5 py-2 ${
                active ? 'bg-primary-container' : 'bg-surface-container-high'
              }`}
            >
              <Text
                className={`font-label-md text-label-md ${
                  active ? 'text-on-primary-fixed' : 'text-on-surface-variant'
                }`}
              >
                {f.label}
              </Text>
              <Text
                className={`font-label-sm text-label-sm ${
                  active ? 'text-on-primary-fixed' : 'text-on-surface-variant'
                }`}
              >
                {f.count}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {/* Notification stream */}
      <View className="gap-space-sm">
        {rows.map((n) => {
          const tone = TONE[n.tone];
          const unread = n.unread && !read;
          return (
            <Pressable
              key={n.id}
              accessibilityRole="button"
              onPress={() => router.push('/notifications/details')}
            >
              <Card tone={unread ? 'container' : 'low'} className="p-4">
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center gap-2">
                    <IconBadge name={n.icon} size={32} iconSize={16} bg="bg-surface-container-high" fg={tone.fg} />
                    <Text className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                      {n.kind}
                    </Text>
                  </View>
                  <View className="flex-row items-center gap-2">
                    <Text className="font-label-sm text-label-sm text-on-surface-variant">{n.time}</Text>
                    {unread ? <View className="h-2 w-2 rounded-full bg-primary-container" /> : null}
                  </View>
                </View>

                <Text className="mt-3 font-headline-sm text-headline-sm text-on-surface">{n.title}</Text>
                <Text className="mt-1 font-body-sm text-body-sm text-on-surface-variant">{n.body}</Text>

                {n.cta ? (
                  <View className="mt-3 flex-row items-center justify-between">
                    <View className="flex-row items-center gap-1">
                      <Text className="font-label-md text-label-md text-primary-container">{n.cta}</Text>
                      <Icon name="arrow_forward" size={14} className="text-primary-container" />
                    </View>
                    {n.tag ? <Pill label={n.tag} tone={tone.pill} /> : null}
                  </View>
                ) : null}
              </Card>
            </Pressable>
          );
        })}
      </View>

      {/* Weekly digest */}
      <Pressable
        accessibilityRole="button"
        onPress={() => router.push('/learning/insights')}
        className="flex-row items-center gap-3 rounded-2xl bg-surface-container p-4"
      >
        <IconBadge name="insights" bg="bg-surface-container-high" fg="text-primary-container" />
        <View className="flex-1">
          <Text className="font-label-lg text-label-lg text-on-surface">Weekly Buffer Velocity</Text>
          <Text className="mt-0.5 font-body-sm text-body-sm text-on-surface-variant">
            4 auto-guards deployed this week saving ₹6,449
          </Text>
        </View>
        <Icon name="chevron_right" size={18} className="text-on-surface-variant" />
      </Pressable>

      <View className="gap-2">
        <Button
          title="Notification Preferences & Mute Settings"
          icon="tune"
          variant="secondary"
          onPress={() => router.push('/settings/notifications')}
        />
        <Text className="text-center font-body-sm text-body-sm text-on-surface-variant">
          Real-time liquidity surveillance powered by Guardian Buffer AI
        </Text>
      </View>
    </Screen>
  );
}
