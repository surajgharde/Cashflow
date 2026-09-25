import { router } from 'expo-router';
import { Text, View } from 'react-native';
import { Icon } from '@/components/Icon';
import type { IconName } from '@/components/glyphs';
import { Screen } from '@/components/ui/Screen';
import { Button } from '@/components/ui/Button';
import { Card, Pill, IconBadge } from '@/components/ui/Surface';
import { riskState } from '@/data/mock';

const CAUSES: { icon: IconName; title: string; metric: string; body: string; tag: string; note: string }[] = [
  {
    icon: 'bolt',
    title: 'Discretionary Velocity Spike',
    metric: '-₹1,200',
    body: 'Weekend dining & retail acceleration outpaced usual 14-day velocity profile.',
    tag: 'Out-of-pattern',
    note: 'High direct impact',
  },
  {
    icon: 'calendar_month',
    title: 'Mandate Concentration',
    metric: '<48h Span',
    body: 'BESCOM utility debit and residential rent coincide within a narrow liquidity window.',
    tag: 'Static auto-debit',
    note: 'Predictable clash',
  },
  {
    icon: 'hourglass_top',
    title: 'Inflow Timing Offset',
    metric: '+29h Gap',
    body: 'Freelance settlement window clears exactly 29 hours after rent debits execute.',
    tag: 'Asynchronous gap',
    note: 'Recoverable',
  },
];

export default function RiskExplanation() {
  return (
    <Screen
      title="Why Did Risk Change?"
      subtitle="Algorithmic Root-Cause Synthesis"
      avatar
      actions={[{ icon: 'restart_alt', label: 'Reset' }, { icon: 'more_vert', label: 'More' }]}
      contentClassName="gap-space-lg"
    >
      <View className="flex-row items-center justify-between">
        <Text className="font-label-sm text-label-sm text-on-surface-variant">
          Diagnostics updated 4 mins ago • Engine v4.2
        </Text>
        <Pill label="Active Audit" tone="positive" dot />
      </View>

      {/* State transition comparison */}
      <Card>
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            <Icon name="insights" size={18} className="text-primary-container" />
            <Text className="font-headline-sm text-headline-sm text-on-surface">
              Why Did Your Risk Level Change?
            </Text>
          </View>
        </View>
        <Pill label={`Cycle ${riskState.cycle}`} className="mt-2" />

        <View className="mt-4 flex-row gap-3">
          <View className="flex-1 rounded-xl bg-surface-container-low p-4">
            <Text className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
              Previous
            </Text>
            <Text className="mt-1 font-headline-md text-headline-md text-secondary">
              {riskState.previousScore}/100
            </Text>
            <Text className="font-label-sm text-label-sm text-secondary">Low Risk</Text>
            <Text className="mt-1 font-body-sm text-body-sm text-on-surface-variant">
              Historical stability zone
            </Text>
          </View>

          <View className="flex-1 rounded-xl bg-surface-container-high p-4">
            <Text className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
              Current
            </Text>
            <Text className="mt-1 font-headline-md text-headline-md text-primary-container">
              {riskState.score}/100
            </Text>
            <Text className="font-label-sm text-label-sm text-primary-container">Moderate Risk</Text>
            <Text className="mt-1 font-body-sm text-body-sm text-on-surface-variant">
              Buffer margin squeezed
            </Text>
          </View>
        </View>

        <View className="mt-3 items-center">
          <Pill label="+26 pt Risk Elevation • 48h temporal vector" icon="trending_up" tone="danger" />
        </View>
      </Card>

      {/* Narrative */}
      <Card tone="low" className="p-4">
        <View className="flex-row items-center gap-2">
          <Icon name="psychology" size={18} className="text-primary-container" />
          <Text className="font-label-lg text-label-lg text-on-surface">Guardian Diagnostic Narrative</Text>
        </View>
        <Text className="mt-2 font-body-md text-body-md text-on-surface-variant">
          Our Guardian neural engine identified two converging events: an unplanned ₹1,200 discretionary spend
          spike over the weekend, combined with a 24-hour timing offset between your ₹7,000 rent deduction and
          your ₹8,000 freelance client inflow.
        </Text>

        <View className="mt-4 gap-2">
          {[
            { when: 'Oct 25', label: 'Liquidity dip begins', detail: 'Rent Debit (-₹7k)', tone: 'text-error' },
            { when: 'Oct 27', label: 'Min Buffer: ₹1,200', detail: 'Buffer Floor: Critical', tone: 'text-error' },
            { when: 'Oct 28', label: 'Inflow Clears (+₹8k)', detail: 'Recovery', tone: 'text-secondary' },
          ].map((t) => (
            <View key={t.when} className="flex-row items-center gap-3 rounded-xl bg-surface-container p-3">
              <Text className="w-14 font-label-sm text-label-sm text-on-surface-variant">{t.when}</Text>
              <Text className={`flex-1 font-label-md text-label-md ${t.tone}`}>{t.label}</Text>
              <Text className="font-label-sm text-label-sm text-on-surface-variant">{t.detail}</Text>
            </View>
          ))}
        </View>
      </Card>

      {/* Root causes */}
      <View className="gap-space-sm">
        <View className="flex-row items-center justify-between">
          <Text className="font-headline-sm text-headline-sm text-on-surface">Identified Bottlenecks (3)</Text>
          <Pill label="Multi-Factor Impact" />
        </View>

        {CAUSES.map((c) => (
          <Card key={c.title} tone="low" className="p-4">
            <View className="flex-row items-start gap-3">
              <IconBadge name={c.icon} bg="bg-surface-container" fg="text-primary-container" />
              <View className="flex-1">
                <View className="flex-row items-center justify-between">
                  <Text className="flex-1 font-label-lg text-label-lg text-on-surface">{c.title}</Text>
                  <Text className="font-label-md text-label-md text-error">{c.metric}</Text>
                </View>
                <Text className="mt-1 font-body-sm text-body-sm text-on-surface-variant">{c.body}</Text>
                <Text className="mt-2 font-label-sm text-label-sm text-on-surface-variant">
                  {c.tag} • {c.note}
                </Text>
              </View>
            </View>
          </Card>
        ))}
      </View>

      {/* Resolution summary */}
      <Card tone="low" className="flex-row gap-3 p-4">
        <IconBadge name="verified_user" bg="bg-surface-container" fg="text-secondary" />
        <View className="flex-1">
          <Text className="font-label-lg text-label-lg text-on-surface">Autonomous Fix Available</Text>
          <Text className="mt-1 font-body-sm text-body-sm text-on-surface-variant">
            Applying 2 pre-calculated protective actions will restore your score from {riskState.score} to{' '}
            {riskState.targetScore} (Low Risk).
          </Text>
        </View>
      </Card>

      <View className="gap-3">
        <Button
          title="Open Recommendations Dashboard"
          icon="arrow_forward"
          iconTrailing
          onPress={() => router.push('/recommendations')}
        />
        <Button
          title="Acknowledge & Back to Risk Dashboard"
          variant="secondary"
          onPress={() => router.push('/risk/dashboard')}
        />
      </View>
    </Screen>
  );
}
