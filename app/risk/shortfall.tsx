import { router } from 'expo-router';
import { Text, View } from 'react-native';
import { Icon } from '@/components/Icon';
import { Screen } from '@/components/ui/Screen';
import { Button } from '@/components/ui/Button';
import { Card, Pill, IconBadge } from '@/components/ui/Surface';
import { AreaChart } from '@/components/ui/Charts';
import { colors } from '@/theme/tokens';
import { riskState, shortfallTimeline } from '@/data/mock';
import { formatCurrency } from '@/lib/format';

const TONE = {
  positive: { pill: 'positive' as const, fg: 'text-secondary' },
  warning: { pill: 'warning' as const, fg: 'text-primary-container' },
  danger: { pill: 'danger' as const, fg: 'text-error' },
};

export default function ShortfallPrediction() {
  return (
    <Screen
      title="Shortfall Prediction"
      subtitle="Predictive Liquidity Compression Window"
      avatar
      actions={[{ icon: 'restart_alt', label: 'Reset' }, { icon: 'more_vert', label: 'More' }]}
      contentClassName="gap-space-lg"
    >
      <View className="flex-row justify-end">
        <Pill label="v4.2 Neural Run" tone="positive" dot />
      </View>

      {/* Hero prediction alert */}
      <Card>
        <View className="flex-row items-center justify-between">
          <Pill label="High Squeeze Risk" icon="warning" tone="danger" />
          <Pill label="88% Confidence" icon="psychology" />
        </View>

        <Text className="mt-4 font-headline-lg text-headline-lg text-on-surface">
          Potential Liquidity Squeeze in 4 Days
        </Text>
        <Text className="mt-1 font-body-md text-body-md text-on-surface-variant">
          Sun, Oct 27 — Mon, Oct 28
        </Text>

        <View className="mt-4 flex-row gap-3">
          <View className="flex-1 rounded-xl bg-surface-container-low p-4">
            <Text className="font-label-sm text-label-sm text-on-surface-variant">Projected Floor</Text>
            <Text className="mt-1 font-headline-md text-headline-md text-error">
              {formatCurrency(riskState.projectedFloor, { decimals: false })}
            </Text>
            <Text className="font-label-sm text-label-sm text-on-surface-variant">Trough on Oct 27</Text>
          </View>
          <View className="flex-1 rounded-xl bg-surface-container-low p-4">
            <Text className="font-label-sm text-label-sm text-on-surface-variant">Safety Buffer Gap</Text>
            <Text className="mt-1 font-headline-md text-headline-md text-error">-₹4,450</Text>
            <Text className="font-label-sm text-label-sm text-on-surface-variant">Deficit threshold</Text>
          </View>
        </View>
      </Card>

      {/* Liquidity trajectory */}
      <Card>
        <View className="flex-row items-center justify-between">
          <Text className="font-headline-sm text-headline-sm text-on-surface">Liquidity Trajectory</Text>
          <Pill label="-87.4%" icon="arrow_downward" tone="danger" />
        </View>
        <View className="mt-space-md">
          <AreaChart
            height={150}
            markerIndex={2}
            series={[{ data: [9500, 7400, 1200, 9200], color: colors.error, fill: true }]}
            labels={['Oct 25', 'Oct 26', 'Oct 27 (Dip)', 'Oct 28']}
          />
        </View>
      </Card>

      {/* Responsible AI disclaimer */}
      <View className="flex-row gap-2.5 rounded-2xl bg-surface-container-low p-4">
        <Icon name="verified_user" size={16} className="text-on-surface-variant" />
        <Text className="flex-1 font-body-sm text-body-sm text-on-surface-variant">
          Simulated projection based on historical patterns and recurring mandates. Discretionary spending
          variability modeled via stochastic monte-carlo runs.
        </Text>
      </View>

      {/* Corridor callout */}
      <Card tone="low" className="flex-row items-center gap-3 p-4">
        <IconBadge name="timer" bg="bg-surface-container" fg="text-error" />
        <View className="flex-1">
          <Text className="font-label-lg text-label-lg text-error">29-Hour Vulnerability Corridor</Text>
          <Text className="mt-0.5 font-body-sm text-body-sm text-on-surface-variant">
            Detected between Rent execution and Freelance settlement.
          </Text>
        </View>
      </Card>

      {/* Hourly timeline */}
      <View className="gap-space-sm">
        <View className="flex-row items-center justify-between">
          <Text className="font-headline-sm text-headline-sm text-on-surface">Hourly Liquidity Timeline</Text>
          <Pill label="4 Key Impulses" />
        </View>

        <Card tone="low" className="gap-4 p-4">
          {shortfallTimeline.map((t, i) => {
            const tone = TONE[t.tone];
            return (
              <View key={t.id}>
                {i > 0 ? <View className="mb-4 h-px bg-surface-container-high" /> : null}
                <View className="flex-row items-start gap-3">
                  <IconBadge name={t.icon} size={40} iconSize={20} bg="bg-surface-container" fg={tone.fg} />
                  <View className="flex-1">
                    <View className="flex-row items-center justify-between">
                      <Text className="font-label-sm text-label-sm text-on-surface-variant">{t.when}</Text>
                      <Pill label={t.status} tone={tone.pill} />
                    </View>
                    <Text className="mt-1 font-label-lg text-label-lg text-on-surface">{t.title}</Text>
                    <View className="mt-1 flex-row items-center gap-2">
                      <Text className={`font-label-md text-label-md ${tone.fg}`}>{t.amount}</Text>
                      <Text className="font-body-sm text-body-sm text-on-surface-variant">
                        • {t.balanceLabel}: <Text className="text-on-surface">{t.balance}</Text>
                      </Text>
                    </View>
                    {t.note ? (
                      <Text className="mt-1 font-label-sm text-label-sm text-error">{t.note}</Text>
                    ) : null}
                  </View>
                </View>
              </View>
            );
          })}
        </Card>
      </View>

      {/* Shield ready */}
      <Card tone="low" className="flex-row gap-3 p-4">
        <IconBadge name="shield_with_heart" bg="bg-surface-container" fg="text-primary-container" filled />
        <View className="flex-1">
          <Text className="font-label-lg text-label-lg text-on-surface">Automated Shield Ready</Text>
          <Text className="mt-1 font-body-sm text-body-sm text-on-surface-variant">
            AI found 2 zero-friction ways to bridge the ₹4,450 vulnerability span seamlessly.
          </Text>
        </View>
      </Card>

      <View className="gap-3">
        <Button
          title="See Preventive Interventions"
          icon="arrow_forward"
          iconTrailing
          onPress={() => router.push('/recommendations')}
        />
        <Button
          title="Run Stress Test Simulation"
          icon="tune"
          variant="secondary"
          onPress={() => router.push('/demo')}
        />
      </View>
    </Screen>
  );
}
