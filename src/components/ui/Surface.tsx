import { Pressable, Text, View, type ViewProps } from 'react-native';
import { Icon } from '../Icon';
import type { IconName } from '../glyphs';

/** Rounded container matching the export's `rounded-2xl bg-surface-container p-5 shadow-xl`. */
export function Card({
  className = '',
  tone = 'container',
  children,
  ...rest
}: ViewProps & { className?: string; tone?: 'container' | 'low' | 'high' | 'lowest' }) {
  const bg = {
    container: 'bg-surface-container',
    low: 'bg-surface-container-low',
    high: 'bg-surface-container-high',
    lowest: 'bg-surface-container-lowest',
  }[tone];
  return (
    <View className={`overflow-hidden rounded-2xl p-5 ${bg} ${className}`} {...rest}>
      {children}
    </View>
  );
}

/** Section heading with an optional trailing action, used above most card groups. */
export function SectionTitle({
  title,
  subtitle,
  action,
  onAction,
  icon,
}: {
  title: string;
  subtitle?: string;
  action?: string;
  onAction?: () => void;
  icon?: IconName;
}) {
  return (
    <View className="flex-row items-end justify-between">
      <View className="flex-1 pr-3">
        <View className="flex-row items-center gap-2">
          {icon ? <Icon name={icon} size={18} className="text-primary-container" /> : null}
          <Text className="font-headline-sm text-headline-sm text-on-surface">{title}</Text>
        </View>
        {subtitle ? (
          <Text className="mt-0.5 font-body-sm text-body-sm text-on-surface-variant">{subtitle}</Text>
        ) : null}
      </View>
      {action ? (
        <Pressable onPress={onAction} hitSlop={8} accessibilityRole="button">
          <Text className="font-label-md text-label-md text-primary-container">{action}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

type PillTone = 'neutral' | 'positive' | 'warning' | 'danger' | 'accent';

const pillTone: Record<PillTone, { bg: string; fg: string }> = {
  neutral: { bg: 'bg-surface-container-high', fg: 'text-on-surface-variant' },
  positive: { bg: 'bg-surface-container-high', fg: 'text-secondary' },
  warning: { bg: 'bg-surface-container-high', fg: 'text-primary-container' },
  danger: { bg: 'bg-error-container/40', fg: 'text-error' },
  accent: { bg: 'bg-primary-container', fg: 'text-on-primary-fixed' },
};

/** Small status chip — the export uses these for risk bands, deltas and engine state. */
export function Pill({
  label,
  icon,
  tone = 'neutral',
  uppercase = false,
  dot = false,
  className = '',
}: {
  label: string;
  icon?: IconName;
  tone?: PillTone;
  uppercase?: boolean;
  dot?: boolean;
  className?: string;
}) {
  const t = pillTone[tone];
  return (
    <View className={`flex-row items-center gap-1.5 self-start rounded-full px-2.5 py-1 ${t.bg} ${className}`}>
      {dot ? <View className={`h-2 w-2 rounded-full ${t.fg.replace('text-', 'bg-')}`} /> : null}
      {icon ? <Icon name={icon} size={13} className={t.fg} /> : null}
      <Text className={`font-label-sm text-label-sm ${t.fg} ${uppercase ? 'uppercase tracking-wider' : ''}`}>
        {label}
      </Text>
    </View>
  );
}

/** Circular icon badge that fronts most list rows and card headers. */
export function IconBadge({
  name,
  size = 36,
  iconSize = 18,
  bg = 'bg-surface-container-high',
  fg = 'text-on-surface-variant',
  filled,
}: {
  name: IconName;
  size?: number;
  iconSize?: number;
  bg?: string;
  fg?: string;
  filled?: boolean;
}) {
  return (
    <View className={`items-center justify-center rounded-full ${bg}`} style={{ width: size, height: size }}>
      <Icon name={name} size={iconSize} filled={filled} className={fg} />
    </View>
  );
}

/** Thin token-coloured meter used for budget/confidence/utilisation bars. */
export function ProgressBar({
  value,
  tone = 'bg-primary-container',
  track = 'bg-surface-container-highest',
  height = 4,
}: {
  /** 0–1 */
  value: number;
  tone?: string;
  track?: string;
  height?: number;
}) {
  const pct = Math.max(0, Math.min(1, value)) * 100;
  return (
    <View className={`w-full overflow-hidden rounded-full ${track}`} style={{ height }}>
      <View className={`h-full rounded-full ${tone}`} style={{ width: `${pct}%` }} />
    </View>
  );
}

export function Divider({ className = '' }: { className?: string }) {
  return <View className={`h-px w-full bg-surface-container-high ${className}`} />;
}
