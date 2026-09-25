import { useMemo, useState } from 'react';
import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { Icon } from '@/components/Icon';
import { Screen, EmptyState } from '@/components/ui/Screen';
import { Button } from '@/components/ui/Button';
import { Field } from '@/components/ui/Form';
import { Card, Pill, IconBadge } from '@/components/ui/Surface';
import { recommendationHistory } from '@/data/mock';

const FILTERS = ['All (14)', 'Accepted (10)', 'Modified (2)', 'Rejected (2)', 'This Month'] as const;

const TONE = {
  positive: { fg: 'text-secondary', pill: 'positive' as const },
  warning: { fg: 'text-primary-container', pill: 'warning' as const },
  danger: { fg: 'text-error', pill: 'danger' as const },
};

export default function RecommendationHistory() {
  const [filter, setFilter] = useState<string>(FILTERS[0]);
  const [query, setQuery] = useState('');

  const rows = useMemo(() => {
    let out = recommendationHistory;
    if (filter.startsWith('Accepted')) out = out.filter((r) => r.status.startsWith('ACCEPTED'));
    if (filter.startsWith('Modified')) out = out.filter((r) => r.status.startsWith('MODIFIED'));
    if (filter.startsWith('Rejected')) out = out.filter((r) => r.status.startsWith('REJECTED'));
    if (query.trim()) {
      const q = query.toLowerCase();
      out = out.filter((r) => r.title.toLowerCase().includes(q) || r.body.toLowerCase().includes(q));
    }
    return out;
  }, [filter, query]);

  const groups = useMemo(() => {
    const map = new Map<string, typeof recommendationHistory>();
    rows.forEach((r) => {
      const list = map.get(r.group) ?? [];
      list.push(r);
      map.set(r.group, list);
    });
    return Array.from(map.entries());
  }, [rows]);

  return (
    <Screen
      title="Recommendation History"
      subtitle="Autopilot audit trail"
      avatar
      actions={[{ icon: 'more_vert', label: 'More' }]}
      contentClassName="gap-space-lg"
    >
      <View className="flex-row items-center gap-2">
        <Field
          icon="search"
          placeholder="Search rules, merchants, impacts..."
          value={query}
          onChangeText={setQuery}
          className="flex-1"
        />
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Filters"
          className="h-[50px] w-[50px] items-center justify-center rounded-xl bg-surface-container"
        >
          <Icon name="tune" size={20} className="text-on-surface-variant" />
        </Pressable>
      </View>

      {/* Cumulative value hero */}
      <Card className="items-center">
        <Text className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">
          Total Value Preserved
        </Text>
        <Text className="mt-2 font-display-hero text-display-hero text-primary-container">₹12,450</Text>
        <View className="mt-1 flex-row items-center gap-1.5">
          <Icon name="verified_user" size={13} className="text-secondary" />
          <Text className="font-body-sm text-body-sm text-on-surface-variant">
            Cumulative Buffer Saved via Autopilot
          </Text>
        </View>

        <View className="mt-5 flex-row self-stretch">
          {[
            { v: '14', l: 'Total' },
            { v: '10', l: 'Accepted (71%)' },
            { v: '2', l: 'Modified' },
            { v: '2', l: 'Rejected' },
          ].map((s) => (
            <View key={s.l} className="flex-1 items-center">
              <Text className="font-headline-sm text-headline-sm text-on-surface">{s.v}</Text>
              <Text className="mt-0.5 text-center font-label-sm text-label-sm text-on-surface-variant">
                {s.l}
              </Text>
            </View>
          ))}
        </View>
      </Card>

      {/* Filter chips */}
      <View className="flex-row flex-wrap gap-2">
        {FILTERS.map((f) => {
          const active = filter === f;
          return (
            <Pressable
              key={f}
              onPress={() => setFilter(f)}
              accessibilityRole="tab"
              accessibilityState={{ selected: active }}
              className={`rounded-full px-3.5 py-2 ${
                active ? 'bg-primary-container' : 'bg-surface-container-high'
              }`}
            >
              <Text
                className={`font-label-md text-label-md ${
                  active ? 'text-on-primary-fixed' : 'text-on-surface-variant'
                }`}
              >
                {f}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {groups.length === 0 ? (
        <EmptyState
          icon="search_off"
          title="No recommendations match"
          body="Try switching filter tags or clearing the search query."
        >
          <Button
            title="Clear filters"
            variant="secondary"
            onPress={() => {
              setFilter(FILTERS[0]);
              setQuery('');
            }}
          />
        </EmptyState>
      ) : (
        groups.map(([group, items]) => (
          <View key={group} className="gap-space-sm">
            <View className="flex-row items-center justify-between">
              <Text className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                {group}
              </Text>
              <Text className="font-label-sm text-label-sm text-on-surface-variant">
                {items.length} Signals
              </Text>
            </View>

            {items.map((r) => {
              const tone = TONE[r.tone];
              return (
                <Card key={r.id} tone="low" className="p-4">
                  <View className="flex-row items-start gap-3">
                    <IconBadge name={r.icon} size={40} iconSize={20} bg="bg-surface-container" fg={tone.fg} />
                    <View className="flex-1">
                      <View className="flex-row items-start justify-between">
                        <Text className="flex-1 font-label-lg text-label-lg text-on-surface">{r.title}</Text>
                        <View className="items-end">
                          <Text className={`font-label-lg text-label-lg ${tone.fg}`}>{r.amount}</Text>
                          <Text className="font-label-sm text-label-sm text-on-surface-variant">
                            {r.amountLabel}
                          </Text>
                        </View>
                      </View>
                      <View className="mt-1 flex-row items-center gap-2">
                        <Pill label={r.status} tone={tone.pill} />
                        {r.date ? (
                          <Text className="font-label-sm text-label-sm text-on-surface-variant">{r.date}</Text>
                        ) : null}
                      </View>
                    </View>
                  </View>

                  <Text className="mt-3 font-body-sm text-body-sm text-on-surface-variant">{r.body}</Text>

                  {r.footnote ? (
                    <View className="mt-3 flex-row items-center gap-2 rounded-xl bg-surface-container p-3">
                      <Icon name="psychology" size={14} className="text-primary-container" />
                      <Text className="flex-1 font-label-sm text-label-sm text-on-surface-variant">
                        {r.footnote}
                      </Text>
                    </View>
                  ) : null}
                </Card>
              );
            })}
          </View>
        ))
      )}

      <Pressable
        accessibilityRole="button"
        onPress={() => router.push('/learning/insights')}
        className="flex-row items-center gap-3 rounded-2xl bg-surface-container p-4"
      >
        <IconBadge name="model_training" bg="bg-surface-container-high" fg="text-primary-container" />
        <View className="flex-1">
          <Text className="font-label-lg text-label-lg text-on-surface">
            Learning Insights & Preferences
          </Text>
          <Text className="mt-0.5 font-body-sm text-body-sm text-on-surface-variant">
            Configure AI rules & behavioral bounds
          </Text>
        </View>
        <Icon name="arrow_forward" size={18} className="text-on-surface-variant" />
      </Pressable>
    </Screen>
  );
}
