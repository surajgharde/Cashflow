import { ActivityIndicator, Pressable, Text, View, type PressableProps } from 'react-native';
import { Icon } from '../Icon';
import type { IconName } from '../glyphs';
import { colors } from '@/theme/tokens';

type Variant = 'primary' | 'secondary' | 'tonal' | 'ghost' | 'danger';

const surface: Record<Variant, string> = {
  primary: 'bg-primary-container',
  secondary: 'bg-surface-container-high',
  tonal: 'bg-surface-container',
  ghost: 'bg-transparent border border-outline-variant',
  danger: 'bg-error-container',
};

const label: Record<Variant, string> = {
  primary: 'text-on-primary-fixed',
  secondary: 'text-on-surface',
  tonal: 'text-on-surface',
  ghost: 'text-on-surface',
  danger: 'text-on-error-container',
};

type Props = Omit<PressableProps, 'children' | 'style'> & {
  title: string;
  variant?: Variant;
  icon?: IconName;
  /** Places the icon after the label, as the export's forward-arrow CTAs do. */
  iconTrailing?: boolean;
  loading?: boolean;
  full?: boolean;
  className?: string;
};

export function Button({
  title,
  variant = 'primary',
  icon,
  iconTrailing = false,
  loading = false,
  full = true,
  disabled,
  className = '',
  ...rest
}: Props) {
  const body = (
    <>
      {icon && !iconTrailing ? <Icon name={icon} size={20} className={label[variant]} /> : null}
      <Text className={`font-label-lg text-label-lg ${label[variant]}`}>{title}</Text>
      {icon && iconTrailing ? <Icon name={icon} size={20} className={label[variant]} /> : null}
    </>
  );

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled || loading}
      className={`h-[52px] flex-row items-center justify-center gap-2 rounded-full px-6 ${surface[variant]} ${
        full ? 'w-full' : ''
      } ${disabled || loading ? 'opacity-50' : ''} ${className}`}
      style={({ pressed }) => [
        pressed && { transform: [{ scale: 0.98 }] },
        variant === 'primary' && {
          shadowColor: colors.primaryContainer,
          shadowOpacity: 0.22,
          shadowRadius: 24,
          shadowOffset: { width: 0, height: 8 },
        },
      ]}
      {...rest}
    >
      {loading ? <ActivityIndicator color={variant === 'primary' ? colors.onPrimaryFixed : colors.onSurface} /> : body}
    </Pressable>
  );
}

/** Circular 44pt icon-only control used throughout the app bars. */
export function IconButton({
  name,
  size = 22,
  onPress,
  className = 'text-on-surface-variant',
  accessibilityLabel,
  filled,
}: {
  name: IconName;
  size?: number;
  onPress?: () => void;
  className?: string;
  accessibilityLabel?: string;
  filled?: boolean;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      onPress={onPress}
      hitSlop={6}
      className="h-11 w-11 items-center justify-center rounded-full"
      style={({ pressed }) => pressed && { transform: [{ scale: 0.95 }], opacity: 0.7 }}
    >
      <Icon name={name} size={size} filled={filled} className={className} />
    </Pressable>
  );
}

/** The lime FAB that sits in the notch of the tab bar. */
export function Fab({ onPress, icon = 'add' as IconName }: { onPress?: () => void; icon?: IconName }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="New cashflow action"
      onPress={onPress}
      className="h-14 w-14 items-center justify-center rounded-full bg-primary-container"
      style={({ pressed }) => [
        {
          shadowColor: colors.primaryContainer,
          shadowOpacity: 0.35,
          shadowRadius: 24,
          shadowOffset: { width: 0, height: 8 },
          elevation: 8,
        },
        pressed && { transform: [{ scale: 0.95 }] },
      ]}
    >
      <Icon name={icon} size={26} className="text-on-primary-fixed" />
    </Pressable>
  );
}

/** Small pressable used for the "View all"/"Details" affordances. */
export function TextLink({ title, onPress, className = '' }: { title: string; onPress?: () => void; className?: string }) {
  return (
    <Pressable onPress={onPress} hitSlop={8} accessibilityRole="link">
      <View className="flex-row items-center gap-1">
        <Text className={`font-label-md text-label-md text-primary-container ${className}`}>{title}</Text>
      </View>
    </Pressable>
  );
}
