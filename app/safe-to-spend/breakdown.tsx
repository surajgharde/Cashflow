import { router } from 'expo-router';
import { Text, View } from 'react-native';
import { Icon } from '@/components/Icon';
import type { IconName } from '@/components/glyphs';
import { Screen } from '@/components/ui/Screen';
import { Button } from '@/components/ui/Button';
import { Card, Pill, IconBadge } from '@/components/ui/Surface';
import { balances } from '@/data/mock';
import { formatCurrency } from '@/lib/format';

type Vector = {
  key: string;
  icon: IconName;
  op: '+ ADD' | '- SUB';
  title: string;
  body: string;
  amount: string;
  tag: string;
  tagIcon?: IconName;
  positive: boolean;
};

const VECTORS: Vector[] = [
  {
    key: 'L1',
    icon: 'account_balance_wallet',
    op: '+ ADD',
    title: 'Current Liquid Balance',
    body: 'ICICI Primary Savings (₹9,500) + Cash-in-hand (₹3,000)',
    amount: '+₹12,500.00',
    tag: 'Verified Sync',
    positive: true,
  },
  {
    key: 'I2',
    icon: 'trending_up',
    op: '+ ADD',
    title: 'Expected Inflows (7 Days)',
    body: 'Studio X Freelance Milestone (Due Oct 28)',
    amount: '+₹8,000.00',
    tag: '75% Confidence',
    positive: true,
  },
  {
    key: 'C3',
    icon: 'event_busy',
    op: '- SUB',
    title: 'Locked Commitments',
    body: 'Apartment Rent (₹7,000) + BESCOM (₹3,000)',
    amount: '-₹10,000.00',
    tag: 'Mandatory NACH',
    positive: false,
  },
  {
    key: 'V4',
    icon: 'shopping_bag',
    op: '- SUB',
    title: 'Discretionary Outflows',
    body: 'Food & Transit tracked under daily safe ceiling',
    amount: '-₹0.00',
    tag: 'Zero Reserved',
    positive: false,
  },
  {
    key: 'B5',
    icon: 'verified_user',
    op: '- SUB',
    title: 'Untouchable Safety Buffer',
    body: 'User-defined cushion for anomalies & surprises',
    amount: '-₹5,650.00',
    tag: '100% Protected',
    tagIcon: 'lock',
    positive: false,
  },
];

export default function SafeToSpendBreakdown() {
  return (
    <Screen
      title="Safe-to-Spend Math"
      subtitle="Transparent Component Architecture"
      avatar
      actions={[{ icon: 'restart_alt', label: 'Reset' }, { icon: 'more_vert', label: 'More' }]}
      contentClassName="gap-space-lg"
    >
      <View className="flex-row justify-end">
        <Pill label="AI Audit v4.2" tone="positive" dot />
      </View>

      {/* Grand total */}
      <Card className="items-center">
        <View className="flex-row items-center justify-between self-stretch">
          <View className="flex-row items-center gap-2">
            <Icon name="verified_user" size={16} className="text-primary-container" />
            <Text className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">
              Computed Safe-to-Spend
            </Text>
          </View>
          <Pill label="Real-time Model" />
        </View>

        <Text className="mt-4 font-display-hero text-display-hero text-on-surface">
          {formatCurrency(balances.safeToSpend)}
        </Text>
        <Pill label="Runway Safe" tone="positive" className="mt-2" />

        <View className="mt-4 flex-row items-center justify-between self-stretch rounded-xl bg-surface-container-low p-3">
          <View className="flex-row items-center gap-2">
            <Icon name="analytics" size={16} className="text-on-surface-variant" />
            <Text className="font-label-sm text-label-sm text-on-surface-variant">
              5 Core Financial Vectors Analyzed
            </Text>
          </View>
          <Text className="font-label-sm text-label-sm text-primary-container">Deterministic</Text>
        </View>
      </Card>

      {/* Formula pipeline */}
      <Card tone="low" className="flex-row flex-wrap items-center justify-center gap-2 p-4">
        {['L₁ + I₂', '−', 'C₃', '−', 'V₄', '−', 'B₅', '='].map((t, i) => (
          <Text
            key={i}
            className={`font-label-md text-label-md ${
              t === '−' || t === '=' ? 'text-on-surface-variant' : 'text-on-surface'
            }`}
          >
            {t}
          </Text>
        ))}
        <Text className="font-label-lg text-label-lg text-primary-container">₹4,850</Text>
      </Card>

      {/* Vector stack */}
      <View className="gap-space-sm">
        {VECTORS.map((v, i) => (
          <View key={v.key}>
            <Card tone="low" className="p-4">
              <View className="flex-row items-start gap-3">
                <IconBadge
                  name={v.icon}
                  size={40}
                  iconSize={20}
                  bg="bg-surface-container"
                  fg={v.positive ? 'text-secondary' : 'text-on-surface-variant'}
                />
                <View className="flex-1">
                  <Text
                    className={`font-label-sm text-label-sm uppercase tracking-wider ${
                      v.positive ? 'text-secondary' : 'text-error'
                    }`}
                  >
                    {v.op}
                  </Text>
                  <Text className="mt-0.5 font-label-lg text-label-lg text-on-surface">{v.title}</Text>
                  <Text className="mt-0.5 font-body-sm text-body-sm text-on-surface-variant">{v.body}</Text>
                </View>
                <View className="items-end">
                  <Text
                    className={`font-label-lg text-label-lg ${
                      v.positive ? 'text-secondary' : 'text-on-surface'
                    }`}
                  >
                    {v.amount}
                  </Text>
                  <View className="mt-0.5 flex-row items-center gap-1">
                    {v.tagIcon ? (
                      <Icon name={v.tagIcon} size={11} className="text-on-surface-variant" />
                    ) : null}
                    <Text className="font-label-sm text-label-sm text-on-surface-variant">{v.tag}</Text>
                  </View>
                </View>
              </View>
            </Card>

            {i < VECTORS.length - 1 ? (
              <View className="items-center py-1">
                <View className="h-7 w-7 items-center justify-center rounded-full bg-surface-container-high">
                  <Icon
                    name={VECTORS[i + 1].positive ? 'add' : 'remove'}
                    size={14}
                    className="text-on-surface-variant"
                  />
                </View>
              </View>
            ) : null}
          </View>
        ))}
      </View>

      {/* Result */}
      <Card className="items-center">
        <View className="h-11 w-11 items-center justify-center rounded-full bg-primary-container">
          <Icon name="equal" size={20} className="text-on-primary-fixed" />
        </View>
        <Text className="mt-3 font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">
          Final Net Liquid Runway
        </Text>
        <Text className="mt-1 font-numeral-display text-numeral-display text-primary-container">
          {formatCurrency(balances.safeToSpend)}
        </Text>
        <View className="mt-3 flex-row gap-2">
          <Pill label="14 Days Clean" tone="positive" />
          <Pill label="Safe Daily: ₹346.42" />
        </View>
      </Card>

      <View className="gap-3">
        <Button
          title="View Day-over-Day Explanation"
          icon="arrow_forward"
          iconTrailing
          onPress={() => router.push('/safe-to-spend/explanation')}
        />
        <Button
          title="Adjust Buffer Settings"
          icon="tune"
          variant="secondary"
          onPress={() => router.push('/settings/safety-buffer')}
        />
      </View>
    </Screen>
  );
}
