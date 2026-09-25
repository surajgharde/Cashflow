import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { Icon } from '@/components/Icon';
import { Screen } from '@/components/ui/Screen';
import { Button } from '@/components/ui/Button';
import { Card, Pill, IconBadge } from '@/components/ui/Surface';
import { AreaChart } from '@/components/ui/Charts';
import { colors } from '@/theme/tokens';
import { forecast7d, forecast7dLabels, dailyBreakdown, balances } from '@/data/mock';
import { formatCurrency } from '@/lib/format';

const TONE = {
  neutral: { bg: 'bg-surface-container-high', fg: 'text-on-surface-variant' },
  positive: { bg: 'bg-secondary-container/20', fg: 'text-secondary' },
  warning: { bg: 'bg-surface-container-high', fg: 'text-primary-container' },
  danger: { bg: 'bg-error-container/30', fg: 'text-error' },
} as const;

export default function SevenDayForecast() {
  return (
    <Screen
      title="7-Day Forecast"
      subtitle="High-Confidence Liquidity Horizon"
      avatar
      tabBarSpacing
      actions={[{ icon: 'info', label: 'About this forecast' }]}
      contentClassName="gap-space-lg"
    >
      {/* Horizon switcher */}
      <View className="flex-row gap-1 rounded-xl bg-surface-container-low p-1.5">
        <View className="flex-1 rounded-lg bg-surface-container-highest px-3 py-2">
          <Text className="text-center font-label-md text-label-md text-on-surface">7-Day</Text>
        </View>
        <Pressable onPress={() => router.replace('/forecast/14-day')} className="flex-1 rounded-lg px-3 py-2">
          <Text className="text-center font-label-md text-label-md text-on-surface-variant">14-Day</Text>
        </Pressable>
        <Pressable
          onPress={() => router.push('/safe-to-spend/history')}
          className="flex-1 rounded-lg px-3 py-2"
        >
          <Text className="text-center font-label-md text-label-md text-on-surface-variant">Accuracy</Text>
        </Pressable>
      </View>

      {/* Hero summary */}
      <Card>
        <View className="flex-row items-start justify-between">
          <View className="flex-1">
            <View className="flex-row items-center gap-1.5">
              <Icon name="calendar_today" size={14} className="text-on-surface-variant" />
              <Text className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">
                Projected Ending (Day 7)
              </Text>
            </View>
            <Text className="mt-2 font-numeral-display text-numeral-display text-on-surface">
              {formatCurrency(7200)}
            </Text>
            <View className="mt-1 flex-row items-center gap-1.5">
              <Icon name="trending_down" size={14} className="text-error" />
              <Text className="font-label-sm text-label-sm text-on-surface-variant">
                Net horizon change: -₹5,300
              </Text>
            </View>
          </View>
          <View className="items-end">
            <Pill label="96% Confident" icon="verified" tone="positive" />
            <Text className="mt-1 font-label-sm text-label-sm text-on-surface-variant">Verified sync</Text>
          </View>
        </View>

        {/* Floor alert */}
        <View className="mt-4 flex-row items-center gap-3 rounded-xl bg-error-container/30 p-3">
          <Icon name="warning" size={20} className="text-error" />
          <View className="flex-1">
            <Text className="font-label-lg text-label-lg text-error">Floor Risk: Day 4 (Sun, 27 Oct)</Text>
            <Text className="font-body-sm text-body-sm text-on-surface-variant">
              ₹1,200.00 vs. ₹5,650 buffer
            </Text>
          </View>
          <Text className="font-label-md text-label-md text-error">-78%</Text>
        </View>
      </Card>

      {/* Trajectory chart */}
      <Card>
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            <Icon name="show_chart" size={18} className="text-primary-container" />
            <Text className="font-headline-sm text-headline-sm text-on-surface">Trajectory Mapping</Text>
          </View>
          <Pill label={`Buffer (${formatCurrency(balances.buffer, { decimals: false })})`} />
        </View>

        <View className="mt-space-md">
          <AreaChart
            height={180}
            markerIndex={3}
            labels={forecast7dLabels}
            series={[{ data: forecast7d, color: colors.primaryContainer, fill: true }]}
          />
        </View>

        <View className="mt-2 flex-row justify-between">
          {['Today', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed'].map((d, i) => (
            <Text
              key={d}
              className={`font-label-sm text-label-sm ${i === 3 ? 'text-error' : 'text-on-surface-variant'}`}
            >
              {d}
            </Text>
          ))}
        </View>
      </Card>

      {/* Day-by-day breakdown */}
      <View className="gap-space-sm">
        <View className="flex-row items-center justify-between">
          <Text className="font-headline-sm text-headline-sm text-on-surface">Daily Breakdown</Text>
          <View className="flex-row items-center gap-2">
            <Pill label="7 Events" />
            <Pill label="Real-time sync" tone="positive" dot />
          </View>
        </View>

        <Card tone="low" className="gap-3 p-4">
          {dailyBreakdown.map((d, i) => {
            const tone = TONE[d.tone];
            return (
              <View key={d.day}>
                {i > 0 ? <View className="mb-3 h-px bg-surface-container-high" /> : null}
                <View className="flex-row items-center gap-3">
                  <View className={`h-12 w-12 items-center justify-center rounded-xl ${tone.bg}`}>
                    <Text className={`font-label-lg text-label-lg ${tone.fg}`}>{d.date}</Text>
                    <Text className="font-label-sm text-label-sm text-on-surface-variant">{d.month}</Text>
                  </View>

                  <View className="flex-1">
                    <View className="flex-row items-center gap-1.5">
                      <Text className="font-label-lg text-label-lg text-on-surface">{d.weekday}</Text>
                      {d.icon ? <Icon name={d.icon} size={13} className={tone.fg} /> : null}
                      {d.status ? <Pill label={d.status} tone={d.tone === 'danger' ? 'danger' : 'neutral'} /> : null}
                    </View>
                    <Text className="mt-0.5 font-body-sm text-body-sm text-on-surface-variant">{d.detail}</Text>
                  </View>

                  <View className="items-end">
                    <Text className={`font-label-lg text-label-lg ${d.tone === 'danger' ? 'text-error' : 'text-on-surface'}`}>
                      {formatCurrency(d.balance, { decimals: false })}
                    </Text>
                    <Text className={`font-label-sm text-label-sm ${tone.fg}`}>{d.delta}</Text>
                  </View>
                </View>
              </View>
            );
          })}
        </Card>
      </View>

      {/* Guardian recommendation */}
      <Card tone="low" className="flex-row gap-3 p-4">
        <IconBadge name="smart_toy" bg="bg-surface-container" fg="text-primary-container" />
        <View className="flex-1">
          <Text className="font-label-lg text-label-lg text-on-surface">Guardian Recommendation</Text>
          <Text className="mt-1 font-body-sm text-body-sm text-on-surface-variant">
            Delay the ₹6,200 rent transfer by 48 hours to Monday, or activate an instant ₹4,000 micro-buffer
            from Liquidity Stash to prevent breaching zero threshold on Sunday.
          </Text>
        </View>
      </Card>

      <Button
        title="Why This Forecast?"
        icon="psychology"
        onPress={() => router.push('/forecast/explanation')}
      />
    </Screen>
  );
}
