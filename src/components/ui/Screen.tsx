import { router } from 'expo-router';
import { ScrollView, Text, View, type ScrollViewProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from '../Icon';
import type { IconName } from '../glyphs';
import { IconButton } from './Button';

export type HeaderAction = {
  icon: IconName;
  onPress?: () => void;
  label: string;
};

/**
 * The export shipped three shell types: `mobile_stack` (back arrow + title bar),
 * `mobile_tab` (title bar + bottom nav) and `mobile_blank` (no chrome).
 * This renders the bar; the tab bar itself comes from the expo-router Tabs layout.
 */
export function AppBar({
  title,
  subtitle,
  back = true,
  actions = [],
  avatar = false,
  large = false,
}: {
  title?: string;
  subtitle?: string;
  back?: boolean;
  actions?: HeaderAction[];
  avatar?: boolean;
  large?: boolean;
}) {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="absolute inset-x-0 top-0 z-50 bg-surface/95"
      style={{ paddingTop: insets.top }}
    >
      <View className="h-16 flex-row items-center justify-between px-margin">
        <View className="flex-1 flex-row items-center">
          {back ? (
            <IconButton
              name="arrow_back"
              size={24}
              accessibilityLabel="Go back"
              className="text-on-surface"
              onPress={() => (router.canGoBack() ? router.back() : router.replace('/(tabs)'))}
            />
          ) : null}
          <View className={`flex-1 ${back ? 'pl-1' : ''}`}>
            {title ? (
              <Text
                className={`${
                  large ? 'font-headline-lg text-headline-lg' : 'font-headline-md text-headline-md'
                } text-on-surface`}
                numberOfLines={1}
              >
                {title}
              </Text>
            ) : null}
            {subtitle ? (
              <Text className="font-label-sm text-label-sm text-on-surface-variant" numberOfLines={1}>
                {subtitle}
              </Text>
            ) : null}
          </View>
        </View>

        <View className="flex-row items-center">
          {actions.map((a) => (
            <IconButton key={a.label} name={a.icon} accessibilityLabel={a.label} onPress={a.onPress} />
          ))}
          {avatar ? (
            <View className="ml-1 h-8 w-8 items-center justify-center rounded-full bg-primary">
              <Icon name="person" size={18} className="text-on-primary" />
            </View>
          ) : null}
        </View>
      </View>
    </View>
  );
}

/**
 * Scrollable screen body. `pt` clears the fixed app bar and `pb` clears the tab bar,
 * matching the export's `pt-16 pb-28` spacing.
 */
export function Screen({
  title,
  subtitle,
  back,
  actions,
  avatar,
  large,
  header = true,
  tabBarSpacing = false,
  contentClassName = '',
  children,
  ...rest
}: ScrollViewProps & {
  title?: string;
  subtitle?: string;
  back?: boolean;
  actions?: HeaderAction[];
  avatar?: boolean;
  large?: boolean;
  /** Set false for the auth screens, which the export exported as `mobile_blank`. */
  header?: boolean;
  /** Adds bottom padding so content clears the floating tab bar. */
  tabBarSpacing?: boolean;
  contentClassName?: string;
  children: React.ReactNode;
}) {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-surface">
      {header ? (
        <AppBar title={title} subtitle={subtitle} back={back} actions={actions} avatar={avatar} large={large} />
      ) : null}
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: (header ? 64 : 12) + insets.top,
          paddingBottom: (tabBarSpacing ? 108 : 32) + insets.bottom,
        }}
        {...rest}
      >
        <View className={`px-margin ${contentClassName}`}>{children}</View>
      </ScrollView>
    </View>
  );
}

/** Non-scrolling variant for confirmation/dialog-style screens. */
export function FixedScreen({
  title,
  back,
  header = true,
  children,
}: {
  title?: string;
  back?: boolean;
  header?: boolean;
  children: React.ReactNode;
}) {
  const insets = useSafeAreaInsets();
  return (
    <View className="flex-1 bg-surface">
      {header ? <AppBar title={title} back={back} /> : null}
      <View
        className="flex-1 px-margin"
        style={{ paddingTop: (header ? 64 : 0) + insets.top, paddingBottom: insets.bottom + 24 }}
      >
        {children}
      </View>
    </View>
  );
}

/** Shared "nothing here yet" block behind the five empty-state screens. */
export function EmptyState({
  icon,
  title,
  body,
  children,
}: {
  icon: IconName;
  title: string;
  body: string;
  children?: React.ReactNode;
}) {
  return (
    <View className="items-center px-4 py-10">
      <View className="h-20 w-20 items-center justify-center rounded-full bg-surface-container-low">
        <Icon name={icon} size={36} className="text-on-surface-variant" />
      </View>
      <Text className="mt-5 text-center font-headline-sm text-headline-sm text-on-surface">{title}</Text>
      <Text className="mt-2 max-w-[300px] text-center font-body-md text-body-md text-on-surface-variant">
        {body}
      </Text>
      {children ? <View className="mt-6 w-full">{children}</View> : null}
    </View>
  );
}
