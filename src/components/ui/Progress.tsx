import { Text, View } from 'react-native';
import { Icon } from '../Icon';
import type { IconName } from '../glyphs';

/** Onboarding step track ("Step 1 of 4" + segmented bar). */
export function StepTracker({
  step,
  total,
  label = 'Onboarding sequence',
}: {
  step: number;
  total: number;
  label?: string;
}) {
  return (
    <View className="gap-2">
      <View className="flex-row items-center justify-between px-1">
        <Text className="font-label-md text-label-md text-on-surface-variant">{label}</Text>
        <Text className="font-label-md text-label-md text-primary-container">
          Step {step} of {total}
        </Text>
      </View>
      <View className="flex-row gap-1.5">
        {Array.from({ length: total }).map((_, i) => (
          <View
            key={i}
            className={`h-1.5 flex-1 rounded-full ${
              i < step ? 'bg-primary-container' : 'bg-surface-container-high'
            }`}
          />
        ))}
      </View>
    </View>
  );
}

/** Four-bar password strength meter used on sign-up and reset. */
export function StrengthMeter({
  score,
  label,
  caption = 'Password Strength',
}: {
  /** 0–4 */
  score: number;
  label: string;
  caption?: string;
}) {
  const tone = score >= 4 ? 'bg-secondary' : score === 3 ? 'bg-primary-container' : score === 2 ? 'bg-tertiary-fixed-dim' : 'bg-error';
  const text = score >= 4 ? 'text-secondary' : score === 3 ? 'text-primary-container' : score === 2 ? 'text-tertiary-fixed-dim' : 'text-error';

  return (
    <View className="gap-1.5 px-1">
      <View className="flex-row gap-1.5">
        {[0, 1, 2, 3].map((i) => (
          <View key={i} className={`h-1 flex-1 rounded-full ${i < score ? tone : 'bg-surface-container-high'}`} />
        ))}
      </View>
      <View className="flex-row items-center justify-between">
        <Text className="font-label-sm text-label-sm text-on-surface-variant">{caption}</Text>
        <Text className={`font-label-sm text-label-sm ${text}`}>{label}</Text>
      </View>
    </View>
  );
}

/** Checklist row with a met/unmet marker — password rules, prerequisite matrices. */
export function CheckItem({
  met,
  label,
  metIcon = 'check',
  unmetIcon = 'radio_button_unchecked',
}: {
  met: boolean;
  label: string;
  metIcon?: IconName;
  unmetIcon?: IconName;
}) {
  return (
    <View className="flex-row items-center gap-2">
      <Icon
        name={met ? metIcon : unmetIcon}
        size={14}
        className={met ? 'text-secondary' : 'text-on-surface-variant'}
      />
      <Text className={`font-body-sm text-body-sm ${met ? 'text-on-surface' : 'text-on-surface-variant'}`}>
        {label}
      </Text>
    </View>
  );
}

/** Banner used across screens for "engine active" style status lines. */
export function StatusBanner({
  icon,
  title,
  body,
  tag,
  tone = 'neutral',
}: {
  icon: IconName;
  title: string;
  body?: string;
  tag?: string;
  tone?: 'neutral' | 'positive' | 'warning' | 'danger';
}) {
  const fg = {
    neutral: 'text-primary-container',
    positive: 'text-secondary',
    warning: 'text-primary-container',
    danger: 'text-error',
  }[tone];

  return (
    <View className="flex-row items-start gap-3 rounded-2xl bg-surface-container-low p-4">
      <View className="h-9 w-9 items-center justify-center rounded-full bg-surface-container">
        <Icon name={icon} size={18} className={fg} />
      </View>
      <View className="flex-1">
        <View className="flex-row items-center justify-between">
          <Text className="font-label-lg text-label-lg text-on-surface">{title}</Text>
          {tag ? <Text className={`font-label-sm text-label-sm ${fg}`}>{tag}</Text> : null}
        </View>
        {body ? (
          <Text className="mt-1 font-body-sm text-body-sm text-on-surface-variant">{body}</Text>
        ) : null}
      </View>
    </View>
  );
}
