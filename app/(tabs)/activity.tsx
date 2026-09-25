import { useMemo, useState } from 'react';
import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { Icon } from '@/components/Icon';
import { Screen, EmptyState } from '@/components/ui/Screen';
import { Button, IconButton } from '@/components/ui/Button';
import { Field } from '@/components/ui/Form';
import { Card, Pill } from '@/components/ui/Surface';
import { TransactionRow } from '@/components/ui/Rows';
import { transactions, balances } from '@/data/mock';
import { formatCurrency, formatSigned } from '@/lib/format';

const FILTERS = ['All', 'Inflows', 'Outflows', 'Recurring', 'Pending'] as const;
type Filter = (typeof FILTERS)[number];

/**
 * Activity ledger. The export shipped only the empty state and the detail screen for this
 * destination, so the populated list is composed from the same row and summary patterns.
 */
export default function Activity() {
  const [filter, setFilter] = useState<Filter>('All');
  const [query, setQuery] = useState('');

  const rows = useMemo(() => {
    let out = transactions;
    if (filter === 'Inflows') out = out.filter((t) => t.amount > 0);
    if (filter === 'Outflows') out = out.filter((t) => t.amount < 0);
    if (filter === 'Recurring') out = out.filter((t) => t.recurring);
    if (filter === 'Pending') out = out.filter((t) => t.pending);
    if (query.trim()) {
      const q = query.toLowerCase();
      out = out.filter((t) => t.title.toLowerCase().includes(q) || t.category.toLowerCase().includes(q));
    }
    return out;
  }, [filter, query]);

  return (
    <Screen
      title="Activity"
      subtitle="Live ledger"
      back={false}
      avatar
      tabBarSpacing
      actions={[{ icon: 'upload_file', label: 'Import', onPress: () => router.push('/transactions/import') }]}
      contentClassName="gap-space-md"
    >
      <View className="flex-row items-center gap-2">
        <Field
          icon="search"
          placeholder="Search transactions, tags, payees..."
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

      {/* Velocity summary */}
      <Card tone="low" className="p-4">
        <View className="flex-row items-center justify-between">
          <Text className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
            Ledger Velocity • Current Cycle
          </Text>
          <Pill label="Live" tone="positive" dot />
        </View>
        <View className="mt-3 flex-row">
          {[
            { icon: 'arrow_downward_alt' as const, label: 'Inflows', value: formatCurrency(balances.inflows7d, { decimals: false }), sub: `${balances.inflowCount} records`, fg: 'text-secondary' },
            { icon: 'arrow_upward_alt' as const, label: 'Outflows', value: formatCurrency(balances.outflows7d, { decimals: false }), sub: `${balances.outflowCount} debits`, fg: 'text-error' },
            { icon: 'bolt' as const, label: 'Velocity', value: formatSigned(balances.netVelocity, { decimals: false }), sub: '1.4x base', fg: 'text-primary-container' },
          ].map((s) => (
            <View key={s.label} className="flex-1 gap-0.5">
              <Icon name={s.icon} size={16} className={s.fg} />
              <Text className="font-label-sm text-label-sm text-on-surface-variant">{s.label}</Text>
              <Text className={`font-label-lg text-label-lg ${s.fg}`}>{s.value}</Text>
              <Text className="font-label-sm text-label-sm text-on-surface-variant">{s.sub}</Text>
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

      {rows.length === 0 ? (
        <EmptyState
          icon="search_off"
          title="No matching transactions"
          body="Try a different filter or clear the search query to see your full ledger."
        >
          <Button title="Clear filters" variant="secondary" onPress={() => { setFilter('All'); setQuery(''); }} />
        </EmptyState>
      ) : (
        <Card tone="low" className="px-4 py-1">
          {rows.map((t, i) => (
            <View key={t.id}>
              {i > 0 ? <View className="h-px bg-surface-container-high" /> : null}
              <TransactionRow txn={t} onPress={() => router.push('/transactions/details')} />
            </View>
          ))}
        </Card>
      )}

      <View className="flex-row gap-3">
        <Button
          title="Add manual"
          icon="add_circle"
          full={false}
          className="flex-1"
          onPress={() => router.push('/transactions/edit')}
        />
        <Button
          title="Import"
          icon="folder_open"
          variant="secondary"
          full={false}
          className="flex-1"
          onPress={() => router.push('/transactions/import')}
        />
      </View>

      <Pressable onPress={() => router.push('/transactions/empty')} className="items-center py-2">
        <Text className="font-label-sm text-label-sm text-on-surface-variant">
          View empty ledger state
        </Text>
      </Pressable>
    </Screen>
  );
}
