import { Tabs, router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from '@/components/Icon';
import type { IconName } from '@/components/glyphs';
import { Fab } from '@/components/ui/Button';
import { colors } from '@/theme/tokens';

const TABS: { name: string; label: string; icon: IconName }[] = [
  { name: 'index', label: 'Home', icon: 'home' },
  { name: 'activity', label: 'Activity', icon: 'receipt_long' },
  { name: 'forecast', label: 'Forecast', icon: 'insights' },
  { name: 'settings', label: 'Settings', icon: 'tune' },
];

/**
 * Custom bar reproducing the export's floating dock: four labelled destinations with the
 * raised lime FAB sitting in the middle gap.
 */
function TabBar({ state, navigation }: any) {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="absolute inset-x-0 bottom-0 z-50 bg-surface-container-lowest"
      style={{ paddingBottom: insets.bottom }}
    >
      <View className="h-20 flex-row items-center justify-around px-space-sm">
        {state.routes.map((route: any, index: number) => {
          const tab = TABS.find((t) => t.name === route.name);
          if (!tab) return null;
          const focused = state.index === index;

          // The FAB is injected between Activity and Forecast, as in the export.
          const fab =
            tab.name === 'forecast' ? (
              <View key="fab" className="h-14 w-14 items-center justify-center" style={{ marginTop: -20 }}>
                <Fab onPress={() => router.push('/transactions/edit')} />
              </View>
            ) : null;

          const item = (
            <Pressable
              key={route.key}
              accessibilityRole="tab"
              accessibilityState={{ selected: focused }}
              accessibilityLabel={tab.label}
              onPress={() => {
                const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
                if (!focused && !event.defaultPrevented) navigation.navigate(route.name);
              }}
              className="h-14 w-14 items-center justify-center gap-1"
            >
              <Icon
                name={tab.icon}
                size={24}
                filled={focused}
                className={focused ? 'text-primary-container' : 'text-on-surface-variant'}
              />
              <Text
                className={`font-label-sm text-label-sm ${
                  focused ? 'text-primary-container' : 'text-on-surface-variant'
                }`}
              >
                {tab.label}
              </Text>
            </Pressable>
          );

          return fab ? [fab, item] : item;
        })}
      </View>
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,
        sceneStyle: { backgroundColor: colors.surface },
      }}
    >
      {TABS.map((t) => (
        <Tabs.Screen key={t.name} name={t.name} options={{ title: t.label }} />
      ))}
    </Tabs>
  );
}
