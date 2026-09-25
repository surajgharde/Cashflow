import { useMemo, useState } from 'react';
import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { Icon } from '@/components/Icon';
import { Screen, EmptyState } from '@/components/ui/Screen';
import { Button, IconButton } from '@/components/ui/Button';
import { Field } from '@/components/ui/Form';
import { Card, Pill, IconBadge, ProgressBar } from '@/components/ui/Surface';
import { expenseCategories } from '@/data/mock';

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'essential', label: 'Essential' },
  { key: 'discretionary', label: 'Discretionary' },
] as const;

const EMOJI = ['☕', '🎮', '✈️', '🐾', '📚', '💪'];
const ACCENTS = ['bg-primary-container', 'bg-secondary', 'bg-tertiary-fixed-dim', 'bg-error', 'bg-outline'];

export default function ExpenseCategories() {
  const [filter, setFilter] = useState<string>('all');
  const [query, setQuery] = useState('');
  const [showCreator, setShowCreator] = useState(false);
  const [customName, setCustomName] = useState('Coffee & Cafes');
  const [customEmoji, setCustomEmoji] = useState('☕');
  const [accent, setAccent] = useState(0);

  const rows = useMemo(() => {
    let out = expenseCategories;
    if (filter === 'essential') out = out.filter((c) => c.kind.startsWith('Essential'));
    if (filter === 'discretionary') out = out.filter((c) => c.kind.startsWith('Discretionary'));
    if (query.trim()) {
      const q = query.toLowerCase();
      out = out.filter((c) => c.name.toLowerCase().includes(q) || c.kind.toLowerCase().includes(q));
    }
    return out;
  }, [filter, query]);

  const counts = useMemo(
    () => ({
      all: expenseCategories.length,
      essential: expenseCategories.filter((c) => c.kind.startsWith('Essential')).length,
      discretionary: expenseCategories.filter((c) => c.kind.startsWith('Discretionary')).length,
    }),
    [],
  );

  return (
    <Screen title="Expense Categories" subtitle="Smart buckets" avatar contentClassName="gap-space-lg">
      {/* Diagnostic banner */}
      <Card tone="low" className="flex-row items-center gap-3 p-4">
        <IconBadge name="smart_toy" bg="bg-surface-container" fg="text-primary-container" />
        <View className="flex-1">
          <Text className="font-label-lg text-label-lg text-on-surface">AI Autonomous Guardian Active</Text>
          <Text className="mt-0.5 font-body-sm text-body-sm text-on-surface-variant">
            3 Essential rules locked • ₹17,600 secured baseline
          </Text>
        </View>
        <Icon name="verified_user" size={20} className="text-secondary" />
      </Card>

      <Field
        icon="search"
        placeholder="Search dynamic rules, caps or tags..."
        value={query}
        onChangeText={setQuery}
      />

      {/* Filter chips */}
      <View className="flex-row flex-wrap items-center gap-2">
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
                {counts[f.key]}
              </Text>
            </Pressable>
          );
        })}
        <View className="flex-row items-center gap-1.5 px-1">
          <Icon name="tune" size={13} className="text-on-surface-variant" />
          <Text className="font-label-sm text-label-sm text-on-surface-variant">Auto-Adaptive</Text>
        </View>
      </View>

      {/* Category list */}
      {rows.length === 0 ? (
        <EmptyState
          icon="filter_alt_off"
          title="No matching rules found"
          body='Try searching for keywords like "Rent", "OTT", or switch to the All tab.'
        >
          <Button
            title="Clear filters"
            variant="secondary"
            onPress={() => {
              setFilter('all');
              setQuery('');
            }}
          />
        </EmptyState>
      ) : (
        <Card tone="low" className="gap-3 p-4">
          {rows.map((c, i) => (
            <View key={c.id}>
              {i > 0 ? <View className="mb-3 h-px bg-surface-container-high" /> : null}
              <View className="flex-row items-center gap-3">
                <View className="h-10 w-10 items-center justify-center rounded-full bg-surface-container">
                  <Text className="text-body-lg">{c.emoji}</Text>
                </View>
                <View className="flex-1">
                  <View className="flex-row items-center gap-1.5">
                    <Text className="font-label-lg text-label-lg text-on-surface">{c.name}</Text>
                    {c.locked ? <Icon name="lock" size={12} className="text-on-surface-variant" /> : null}
                  </View>
                  <Text className="mt-0.5 font-body-sm text-body-sm text-on-surface-variant">
                    {c.cap} • {c.kind}
                  </Text>
                </View>
                {c.tag ? <Pill label={c.tag} tone={c.locked ? 'positive' : 'neutral'} /> : null}
                <IconButton name="edit" size={16} accessibilityLabel={`Edit ${c.name}`} />
              </View>
            </View>
          ))}
        </Card>
      )}

      {/* Custom category creator */}
      <Button
        title="Create Custom Category"
        icon="add_circle"
        variant="secondary"
        onPress={() => setShowCreator((v) => !v)}
      />

      {showCreator ? (
        <Card tone="low" className="gap-4 p-4">
          <View className="flex-row items-center justify-between">
            <Text className="font-label-lg text-label-lg text-on-surface">AI Rule Sandbox</Text>
            <Pill label="Rule Preview" tone="positive" dot />
          </View>

          {/* Live preview */}
          <View className="flex-row items-center gap-3 rounded-xl bg-surface-container p-3">
            <View className="h-10 w-10 items-center justify-center rounded-full bg-surface-container-high">
              <Text className="text-body-lg">{customEmoji}</Text>
            </View>
            <View className="flex-1">
              <Text className="font-label-lg text-label-lg text-on-surface">{customName || 'Untitled'}</Text>
              <Text className="font-body-sm text-body-sm text-on-surface-variant">
                ₹150/day • Discretionary
              </Text>
            </View>
            <View className={`h-6 w-6 rounded-full ${ACCENTS[accent]}`} />
          </View>

          {/* Emoji picker */}
          <View className="gap-2">
            <View className="flex-row items-center justify-between px-1">
              <Text className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                Select Icon
              </Text>
              <Text className="font-label-sm text-label-sm text-on-surface-variant">Quick Tap</Text>
            </View>
            <View className="flex-row flex-wrap gap-2">
              {EMOJI.map((e) => (
                <Pressable
                  key={e}
                  onPress={() => setCustomEmoji(e)}
                  accessibilityRole="button"
                  className={`h-11 w-11 items-center justify-center rounded-xl ${
                    customEmoji === e ? 'bg-primary-container' : 'bg-surface-container'
                  }`}
                >
                  <Text className="text-body-lg">{e}</Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Accent picker */}
          <View className="gap-2">
            <Text className="px-1 font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
              Accent Color
            </Text>
            <View className="flex-row gap-2.5">
              {ACCENTS.map((a, i) => (
                <Pressable
                  key={a}
                  onPress={() => setAccent(i)}
                  accessibilityRole="button"
                  accessibilityLabel={`Accent ${i + 1}`}
                  className={`h-9 w-9 items-center justify-center rounded-full ${a} ${
                    accent === i ? 'border-2 border-on-surface' : ''
                  }`}
                >
                  {accent === i ? <Icon name="check" size={14} className="text-on-primary-fixed" /> : null}
                </Pressable>
              ))}
            </View>
          </View>

          <Field
            label="Category Name"
            icon="edit_note"
            value={customName}
            onChangeText={setCustomName}
            placeholder="Category name..."
          />
        </Card>
      ) : null}

      {/* Allocation ratio */}
      <Card tone="low" className="p-4">
        <View className="flex-row items-center justify-between">
          <Text className="font-label-md text-label-md text-on-surface">Monthly Protected Coverage</Text>
          <Text className="font-headline-sm text-headline-sm text-primary-container">82%</Text>
        </View>
        <View className="mt-3">
          <ProgressBar value={0.82} height={6} />
        </View>
        <View className="mt-3 flex-row justify-between">
          <Text className="font-label-sm text-label-sm text-on-surface-variant">Essential (₹14,500)</Text>
          <Text className="font-label-sm text-label-sm text-on-surface-variant">
            Flexible Caps (₹3,100)
          </Text>
          <Text className="font-label-sm text-label-sm text-secondary">Safety Cushion</Text>
        </View>
      </Card>

      <Button title="Save Category Rules" icon="save" onPress={() => router.back()} />
    </Screen>
  );
}
