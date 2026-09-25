import { Pressable, Text, View } from 'react-native';
import { Icon } from '../Icon';
import type { IconName } from '../glyphs';
import { IconBadge } from './Surface';
import { formatCurrency } from '@/lib/format';

/**
 * Settings-style row: leading icon badge, title/subtitle, then a chevron, value or
 * arbitrary trailing control. Covers the bulk of the settings screens.
 */
export function ListRow({
  icon,
  iconBg = 'bg-surface-container-high',
  iconFg = 'text-on-surface-variant',
  title,
  subtitle,
  value,
  trailing,
  chevron = false,
  onPress,
  destructive = false,
  className = '',
}: {
  icon?: IconName;
  iconBg?: string;
  iconFg?: string;
  title: string;
  subtitle?: string;
  value?: string;
  trailing?: React.ReactNode;
  chevron?: boolean;
  onPress?: () => void;
  destructive?: boolean;
  className?: string;
}) {
  const Wrapper: React.ElementType = onPress ? Pressable : View;

  return (
    <Wrapper
      onPress={onPress}
      accessibilityRole={onPress ? 'button' : undefined}
      className={`flex-row items-center gap-3 py-3 ${className}`}
    >
      {icon ? <IconBadge name={icon} bg={iconBg} fg={destructive ? 'text-error' : iconFg} /> : null}
      <View className="flex-1">
        <Text className={`font-label-lg text-label-lg ${destructive ? 'text-error' : 'text-on-surface'}`}>
          {title}
        </Text>
        {subtitle ? (
          <Text className="mt-0.5 font-body-sm text-body-sm text-on-surface-variant">{subtitle}</Text>
        ) : null}
      </View>
      {value ? <Text className="font-label-md text-label-md text-on-surface-variant">{value}</Text> : null}
      {trailing}
      {chevron ? <Icon name="chevron_right" size={20} className="text-on-surface-variant" /> : null}
    </Wrapper>
  );
}

/** Grouped card of rows with hairline separators, as used on every settings screen. */
export function RowGroup({
  title,
  children,
  className = '',
}: {
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  const items = Array.isArray(children) ? children.filter(Boolean) : [children];
  return (
    <View className={className}>
      {title ? (
        <Text className="mb-2 px-1 font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
          {title}
        </Text>
      ) : null}
      <View className="rounded-2xl bg-surface-container px-4">
        {items.map((child, i) => (
          <View key={i}>
            {i > 0 ? <View className="h-px bg-surface-container-high" /> : null}
            {child}
          </View>
        ))}
      </View>
    </View>
  );
}

export type Txn = {
  id: string;
  title: string;
  category: string;
  icon: IconName;
  amount: number;
  date: string;
  pending?: boolean;
  recurring?: boolean;
};

/** Transaction line item shared by the activity list, import preview and details screens. */
export function TransactionRow({ txn, onPress }: { txn: Txn; onPress?: () => void }) {
  const credit = txn.amount > 0;
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole={onPress ? 'button' : undefined}
      className="flex-row items-center gap-3 py-3"
    >
      <IconBadge
        name={txn.icon}
        size={40}
        iconSize={20}
        bg={credit ? 'bg-secondary-container/20' : 'bg-surface-container-high'}
        fg={credit ? 'text-secondary' : 'text-on-surface-variant'}
      />
      <View className="flex-1">
        <View className="flex-row items-center gap-1.5">
          <Text className="font-label-lg text-label-lg text-on-surface" numberOfLines={1}>
            {txn.title}
          </Text>
          {txn.recurring ? <Icon name="repeat" size={13} className="text-on-surface-variant" /> : null}
        </View>
        <Text className="mt-0.5 font-body-sm text-body-sm text-on-surface-variant">
          {txn.category} · {txn.date}
        </Text>
      </View>
      <View className="items-end">
        <Text
          className={`font-label-lg text-label-lg ${credit ? 'text-secondary' : 'text-on-surface'}`}
        >
          {credit ? '+' : '-'}
          {formatCurrency(Math.abs(txn.amount))}
        </Text>
        {txn.pending ? (
          <Text className="mt-0.5 font-label-sm text-label-sm text-primary-container">Pending</Text>
        ) : null}
      </View>
    </Pressable>
  );
}

/** Two-up metric tile used in the dashboard's inflow/outflow duo and elsewhere. */
export function StatTile({
  icon,
  iconBg,
  iconFg,
  caption,
  label,
  value,
  valueClass = 'text-on-surface',
  progress,
  progressTone,
}: {
  icon: IconName;
  iconBg?: string;
  iconFg?: string;
  caption?: string;
  label: string;
  value: string;
  valueClass?: string;
  progress?: number;
  progressTone?: string;
}) {
  return (
    <View className="flex-1 justify-between rounded-xl bg-surface-container-low p-4">
      <View className="flex-row items-center justify-between pb-2">
        <IconBadge name={icon} size={32} iconSize={18} bg={iconBg} fg={iconFg} />
        {caption ? (
          <Text className="font-label-sm text-label-sm text-on-surface-variant">{caption}</Text>
        ) : null}
      </View>
      <View className="gap-0.5">
        <Text className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
          {label}
        </Text>
        <Text className={`font-headline-sm text-headline-sm ${valueClass}`}>{value}</Text>
      </View>
      {progress != null ? (
        <View className="mt-3 h-1 w-full overflow-hidden rounded-full bg-surface-container-highest">
          <View
            className={`h-full rounded-full ${progressTone ?? 'bg-primary-container'}`}
            style={{ width: `${Math.max(0, Math.min(1, progress)) * 100}%` }}
          />
        </View>
      ) : null}
    </View>
  );
}
