import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { Icon } from '@/components/Icon';
import type { IconName } from '@/components/glyphs';
import { Screen } from '@/components/ui/Screen';
import { Button } from '@/components/ui/Button';
import { Card, Pill, IconBadge, ProgressBar } from '@/components/ui/Surface';

type Row = {
  id: string;
  icon: IconName;
  title: string;
  date: string;
  category: string;
  amount: string;
  positive: boolean;
  state: 'valid' | 'duplicate' | 'flagged';
  action?: string;
};

const ROWS: Row[] = [
  { id: 'r1', icon: 'check', title: 'Swiggy Gourmet', date: '24 Oct', category: 'Food & Dining', amount: '-₹420.00', positive: false, state: 'valid' },
  { id: 'r2', icon: 'check', title: 'Studio X Tech', date: '23 Oct', category: 'Freelance Inflow', amount: '+₹8,000.00', positive: true, state: 'valid' },
  { id: 'r3', icon: 'content_copy', title: 'Netflix 4K UHD', date: '21 Oct', category: 'Matched recurring mandate', amount: '-₹649.00', positive: false, state: 'duplicate', action: 'Merge / Skip' },
  { id: 'r4', icon: 'check', title: 'BESCOM Electricity', date: '20 Oct', category: 'Utilities', amount: '-₹3,000.00', positive: false, state: 'valid' },
  { id: 'r5', icon: 'error_outline', title: 'Transfer XX9102', date: '19 Oct', category: 'Category missing • tap to assign', amount: '-₹1,200.00', positive: false, state: 'flagged', action: 'Resolve' },
];

const STATE = {
  valid: { fg: 'text-secondary', bg: 'bg-secondary-container/20', tag: 'Validated', tone: 'positive' as const },
  duplicate: { fg: 'text-primary-container', bg: 'bg-surface-container-high', tag: 'Duplicate', tone: 'warning' as const },
  flagged: { fg: 'text-error', bg: 'bg-error-container/30', tag: 'Flagged', tone: 'danger' as const },
};

export default function ImportPreview() {
  return (
    <Screen
      title="Import Preview"
      subtitle="Parsing Engine Active"
      actions={[{ icon: 'close', label: 'Clear', onPress: () => router.back() }]}
      contentClassName="gap-space-lg"
    >
      {/* Source file */}
      <Card tone="low" className="flex-row items-center gap-3 p-4">
        <IconBadge name="description" bg="bg-surface-container" fg="text-primary-container" />
        <View className="flex-1">
          <Text className="font-label-lg text-label-lg text-on-surface">HDFC_Statement_Oct2024.csv</Text>
          <Text className="font-body-sm text-body-sm text-on-surface-variant">38 records detected</Text>
        </View>
        <Icon name="verified" size={20} className="text-secondary" />
      </Card>

      {/* Validation summary */}
      <View className="flex-row gap-space-sm">
        {[
          { icon: 'check_circle' as IconName, label: 'Valid', count: '34', sub: 'Ready', fg: 'text-secondary' },
          { icon: 'copy_all' as IconName, label: 'Duplicate', count: '3', sub: 'Needs review', fg: 'text-primary-container' },
          { icon: 'warning' as IconName, label: 'Flagged', count: '1', sub: 'Action req.', fg: 'text-error' },
        ].map((s) => (
          <Card key={s.label} tone="low" className="flex-1 p-3">
            <Icon name={s.icon} size={16} className={s.fg} />
            <Text className="mt-1.5 font-label-sm text-label-sm text-on-surface-variant">{s.label}</Text>
            <Text className={`font-headline-md text-headline-md ${s.fg}`}>{s.count}</Text>
            <Text className="font-label-sm text-label-sm text-on-surface-variant">{s.sub}</Text>
          </Card>
        ))}
      </View>

      {/* AI confidence */}
      <Card tone="low" className="p-4">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            <Icon name="auto_awesome" size={18} className="text-primary-container" />
            <Text className="font-label-lg text-label-lg text-on-surface">Guardian AI Engine</Text>
          </View>
          <Pill label="94% score" tone="positive" />
        </View>
        <View className="mt-3 gap-1.5">
          <ProgressBar value={0.94} tone="bg-secondary" />
          <Text className="font-body-sm text-body-sm text-on-surface-variant">
            94% of entries mapped to Guardian categories automatically.
          </Text>
        </View>
      </Card>

      {/* Record stream */}
      <View className="gap-space-sm">
        <View className="flex-row items-center justify-between">
          <Text className="font-headline-sm text-headline-sm text-on-surface">Batch Preview (5 of 38)</Text>
          <Pill label="Swipe to filter" />
        </View>

        <Card tone="low" className="gap-3 p-4">
          {ROWS.map((r, i) => {
            const st = STATE[r.state];
            return (
              <View key={r.id}>
                {i > 0 ? <View className="mb-3 h-px bg-surface-container-high" /> : null}
                <View className="flex-row items-center gap-3">
                  <View className={`h-9 w-9 items-center justify-center rounded-full ${st.bg}`}>
                    <Icon name={r.icon} size={16} className={st.fg} />
                  </View>
                  <View className="flex-1">
                    <View className="flex-row items-center gap-2">
                      <Text className="font-label-lg text-label-lg text-on-surface">{r.title}</Text>
                      <Text className="font-label-sm text-label-sm text-on-surface-variant">{r.date}</Text>
                    </View>
                    <Text className="mt-0.5 font-body-sm text-body-sm text-on-surface-variant">
                      {r.category}
                    </Text>
                  </View>
                  <View className="items-end">
                    <Text
                      className={`font-label-lg text-label-lg ${
                        r.positive ? 'text-secondary' : 'text-on-surface'
                      }`}
                    >
                      {r.amount}
                    </Text>
                    {r.action ? (
                      <Pressable hitSlop={6} accessibilityRole="button">
                        <Text className={`font-label-sm text-label-sm ${st.fg}`}>{r.action}</Text>
                      </Pressable>
                    ) : (
                      <Text className="font-label-sm text-label-sm text-secondary">{st.tag}</Text>
                    )}
                  </View>
                </View>
              </View>
            );
          })}
        </Card>
      </View>

      <View className="gap-3">
        <Button
          title="Import 34 Valid Transactions"
          icon="arrow_forward"
          iconTrailing
          onPress={() => router.replace('/(tabs)/activity')}
        />
        <Button title="Review 4 Flagged Entries" icon="rule" variant="secondary" />
      </View>
    </Screen>
  );
}
