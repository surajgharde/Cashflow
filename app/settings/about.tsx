import { Text, View } from 'react-native';
import { Icon } from '@/components/Icon';
import type { IconName } from '@/components/glyphs';
import { Screen } from '@/components/ui/Screen';
import { Button } from '@/components/ui/Button';
import { Card, Pill, IconBadge } from '@/components/ui/Surface';
import { ListRow, RowGroup } from '@/components/ui/Rows';
import { user } from '@/data/mock';

const STACK: { icon: IconName; kicker: string; title: string; body: string }[] = [
  {
    icon: 'psychology',
    kicker: 'Predictive Engine',
    title: 'Guardian Neural Core v4.2',
    body: 'Sub-14ms micro-trajectory forecast modeling',
  },
  {
    icon: 'lock_person',
    kicker: 'Privacy Model',
    title: 'Zero-Knowledge Client Inference',
    body: 'Isolated on-device biometric enclaves without raw telemetry exfiltration',
  },
  {
    icon: 'sync_saved_locally',
    kicker: 'Real-Time Protocol',
    title: 'UPI AutoPay & NACH Surveillance',
    body: 'Active liquidity locking pre-debit buffer verification',
  },
];

export default function About() {
  return (
    <Screen title="About" subtitle="Guardian build info" avatar contentClassName="gap-space-lg">
      {/* Identity hero */}
      <Card className="items-center py-7">
        <View className="h-20 w-20 items-center justify-center rounded-full bg-surface-container-high">
          <Icon name="shield_with_heart" size={40} filled className="text-primary-container" />
        </View>
        <Pill label="Live AI" tone="positive" dot className="mt-3" />

        <Text className="mt-3 text-center font-headline-lg text-headline-lg text-on-surface">
          AI Cashflow Guardian
        </Text>
        <Text className="mt-1 font-label-sm text-label-sm text-on-surface-variant">{user.appVersion}</Text>

        <Pill label="Hackronyx 2.0 Finalist" tone="accent" className="mt-3" />
        <Text className="mt-2 text-center font-label-sm text-label-sm text-on-surface-variant">
          Hackronyx 2.0 • Problem Statement 4 Finalist Build
        </Text>
      </Card>

      {/* Mission */}
      <Card tone="low" className="p-4">
        <View className="flex-row items-center gap-2">
          <Icon name="auto_awesome" size={18} className="text-primary-container" />
          <Text className="font-label-lg text-label-lg text-on-surface">Core Mandate</Text>
        </View>
        <Text className="mt-2 font-body-md text-body-md text-on-surface-variant">
          "Autonomous real-time liquidity surveillance, proactive cashflow shortfall prevention, and adaptive
          financial guardrails."
        </Text>
      </Card>

      {/* Telemetry */}
      <Card tone="low" className="p-4">
        <View className="flex-row items-center justify-between">
          <Text className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">
            Surveillance Telemetry
          </Text>
          <Text className="font-label-md text-label-md text-secondary">99.98%</Text>
        </View>
        <Text className="mt-1 font-headline-sm text-headline-sm text-on-surface">Anomaly Intercept</Text>
        <View className="mt-3 flex-row items-center gap-1.5">
          <Icon name="verified" size={13} className="text-secondary" />
          <Text className="font-label-sm text-label-sm text-on-surface-variant">
            Real-time mandate shield engaged
          </Text>
        </View>
      </Card>

      {/* Architecture */}
      <View className="gap-space-sm">
        <View className="flex-row items-center justify-between">
          <Text className="font-headline-sm text-headline-sm text-on-surface">System Architecture</Text>
          <Pill label="Active Stack" tone="positive" dot />
        </View>

        <Card tone="low" className="gap-4 p-4">
          {STACK.map((s, i) => (
            <View key={s.kicker}>
              {i > 0 ? <View className="mb-4 h-px bg-surface-container-high" /> : null}
              <View className="flex-row items-start gap-3">
                <IconBadge name={s.icon} bg="bg-surface-container" fg="text-primary-container" />
                <View className="flex-1">
                  <Text className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                    {s.kicker}
                  </Text>
                  <Text className="mt-0.5 font-label-lg text-label-lg text-on-surface">{s.title}</Text>
                  <Text className="mt-0.5 font-body-sm text-body-sm text-on-surface-variant">{s.body}</Text>
                </View>
              </View>
            </View>
          ))}
        </Card>
      </View>

      {/* Credits */}
      <Card tone="low" className="flex-row items-center gap-3 p-4">
        <IconBadge name="terminal" bg="bg-surface-container" fg="text-primary-container" />
        <View className="flex-1">
          <Text className="font-label-lg text-label-lg text-on-surface">Hackronyx 2.0 • PS4 Finalist</Text>
          <Text className="mt-0.5 font-body-sm text-body-sm text-on-surface-variant">
            Engineered & Designed by Team FinFlow AI
          </Text>
        </View>
      </Card>

      {/* Legal */}
      <RowGroup title="Legal & Licenses">
        <ListRow icon="description" title="Terms of Service" subtitle="Usage agreement" chevron />
        <ListRow
          icon="policy"
          title="Privacy Policy & Enclave Attestation"
          subtitle="Data handling commitments"
          chevron
        />
        <ListRow icon="code_blocks" title="Open Source Licenses" subtitle="Third-party attributions" chevron />
      </RowGroup>

      <View className="gap-2">
        <Button title="Check for Updates" icon="sync" />
        <Text className="text-center font-body-sm text-body-sm text-on-surface-variant">
          System firmware and Neural Core are current (Build 9082-ALPHA)
        </Text>
      </View>

      <View className="flex-row items-center justify-center gap-1.5 py-2">
        <Icon name="bolt" size={13} className="text-primary-container" />
        <Text className="font-label-sm text-label-sm text-on-surface-variant">
          Protected by Guardian Sentinel Real-Time Node
        </Text>
      </View>
    </Screen>
  );
}
