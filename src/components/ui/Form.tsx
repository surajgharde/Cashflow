import { useState } from 'react';
import { Pressable, Text, TextInput, View, type TextInputProps } from 'react-native';
import { Icon } from '../Icon';
import type { IconName } from '../glyphs';
import { colors } from '@/theme/tokens';

/** Labelled field with a leading icon, mirroring the export's input block. */
export function Field({
  label,
  hint,
  hintIcon,
  icon,
  secure,
  error,
  className = '',
  ...rest
}: TextInputProps & {
  label?: string;
  hint?: string;
  hintIcon?: IconName;
  icon?: IconName;
  secure?: boolean;
  error?: string;
  className?: string;
}) {
  const [hidden, setHidden] = useState(!!secure);
  const [focused, setFocused] = useState(false);

  return (
    <View className={`gap-1.5 ${className}`}>
      {label ? (
        <View className="flex-row items-center justify-between px-1">
          <Text className="font-label-md text-label-md text-on-surface-variant">{label}</Text>
          {hint ? (
            <View className="flex-row items-center gap-1">
              {hintIcon ? <Icon name={hintIcon} size={12} className="text-primary-container" /> : null}
              <Text className="font-label-sm text-label-sm text-primary-container">{hint}</Text>
            </View>
          ) : null}
        </View>
      ) : null}

      <View
        className={`flex-row items-center rounded-xl ${
          focused ? 'bg-surface-container-high' : 'bg-surface-container'
        } ${error ? 'border border-error' : ''}`}
      >
        {icon ? (
          <View className="pl-4 pr-3">
            <Icon name={icon} size={20} className="text-on-surface-variant" />
          </View>
        ) : null}
        <TextInput
          className={`flex-1 py-3.5 font-body-md text-body-md text-on-surface ${icon ? '' : 'pl-4'} ${
            secure ? 'pr-2' : 'pr-4'
          }`}
          placeholderTextColor={`${colors.onSurfaceVariant}80`}
          secureTextEntry={hidden}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...rest}
        />
        {secure ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Toggle password visibility"
            hitSlop={8}
            onPress={() => setHidden((v) => !v)}
            className="px-3 py-2"
          >
            <Icon name={hidden ? 'visibility' : 'visibility'} size={20} className="text-on-surface-variant" />
          </Pressable>
        ) : null}
      </View>

      {error ? (
        <View className="flex-row items-center gap-1 px-1">
          <Icon name="error" size={13} className="text-error" />
          <Text className="font-body-sm text-body-sm text-error">{error}</Text>
        </View>
      ) : null}
    </View>
  );
}

/** Token-styled switch; RN's own Switch can't be themed to the export's shape. */
export function Toggle({
  value,
  onChange,
  disabled,
}: {
  value: boolean;
  onChange?: (next: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityState={{ checked: value, disabled }}
      disabled={disabled}
      onPress={() => onChange?.(!value)}
      className={`h-7 w-12 justify-center rounded-full px-0.5 ${
        value ? 'bg-primary-container' : 'bg-surface-container-highest'
      } ${disabled ? 'opacity-40' : ''}`}
    >
      <View
        className={`h-6 w-6 rounded-full ${value ? 'bg-on-primary-fixed' : 'bg-outline'}`}
        style={{ transform: [{ translateX: value ? 20 : 0 }] }}
      />
    </Pressable>
  );
}

export function Checkbox({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange?: (next: boolean) => void;
  label?: string;
}) {
  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked }}
      onPress={() => onChange?.(!checked)}
      className="flex-row items-center gap-2.5"
    >
      <View
        className={`h-5 w-5 items-center justify-center rounded-lg ${
          checked ? 'bg-primary-container' : 'bg-surface-container-high'
        }`}
      >
        {checked ? <Icon name="check" size={15} className="text-on-primary-fixed" /> : null}
      </View>
      {label ? <Text className="font-label-md text-label-md text-on-surface-variant">{label}</Text> : null}
    </Pressable>
  );
}

export function RadioRow({
  selected,
  onPress,
  title,
  subtitle,
  trailing,
}: {
  selected: boolean;
  onPress?: () => void;
  title: string;
  subtitle?: string;
  trailing?: React.ReactNode;
}) {
  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      onPress={onPress}
      className={`flex-row items-center gap-3 rounded-xl p-4 ${
        selected ? 'bg-surface-container-high' : 'bg-surface-container-low'
      }`}
    >
      <View
        className={`h-5 w-5 items-center justify-center rounded-full border-2 ${
          selected ? 'border-primary-container' : 'border-outline'
        }`}
      >
        {selected ? <View className="h-2.5 w-2.5 rounded-full bg-primary-container" /> : null}
      </View>
      <View className="flex-1">
        <Text className="font-label-lg text-label-lg text-on-surface">{title}</Text>
        {subtitle ? (
          <Text className="mt-0.5 font-body-sm text-body-sm text-on-surface-variant">{subtitle}</Text>
        ) : null}
      </View>
      {trailing}
    </Pressable>
  );
}

/** Segmented track used for period selectors (7d / 14d / 30d / month). */
export function Segmented<T extends string>({
  options,
  value,
  onChange,
  className = '',
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange?: (next: T) => void;
  className?: string;
}) {
  return (
    <View className={`flex-row gap-1 rounded-xl bg-surface-container-low p-1.5 ${className}`}>
      {options.map((o) => {
        const active = o.value === value;
        return (
          <Pressable
            key={o.value}
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
            onPress={() => onChange?.(o.value)}
            className={`flex-1 rounded-lg px-3 py-2 ${active ? 'bg-surface-container-highest' : ''}`}
          >
            <Text
              className={`text-center font-label-md text-label-md ${
                active ? 'text-on-surface' : 'text-on-surface-variant'
              }`}
              numberOfLines={1}
            >
              {o.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

/** Token-styled slider without a native dependency: tap or drag along the track. */
export function Slider({
  value,
  min = 0,
  max = 100,
  onChange,
}: {
  value: number;
  min?: number;
  max?: number;
  onChange?: (next: number) => void;
}) {
  const [width, setWidth] = useState(0);
  const pct = max === min ? 0 : (value - min) / (max - min);

  const commit = (x: number) => {
    if (!width) return;
    const ratio = Math.max(0, Math.min(1, x / width));
    onChange?.(Math.round(min + ratio * (max - min)));
  };

  return (
    <View
      className="h-8 justify-center"
      onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
      onStartShouldSetResponder={() => true}
      onMoveShouldSetResponder={() => true}
      onResponderGrant={(e) => commit(e.nativeEvent.locationX)}
      onResponderMove={(e) => commit(e.nativeEvent.locationX)}
    >
      <View className="h-1.5 w-full rounded-full bg-surface-container-highest">
        <View className="h-full rounded-full bg-primary-container" style={{ width: `${pct * 100}%` }} />
      </View>
      <View
        className="absolute h-5 w-5 rounded-full bg-primary-container"
        style={{ left: Math.max(0, pct * width - 10) }}
      />
    </View>
  );
}
