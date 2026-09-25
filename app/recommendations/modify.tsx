import { useState } from 'react';
import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { Icon } from '@/components/Icon';
import { Screen } from '@/components/ui/Screen';
import { Button } from '@/components/ui/Button';
import { Slider, RadioRow } from '@/components/ui/Form';
import { Card, Pill, IconBadge, ProgressBar } from '@/components/ui/Surface';
import { formatCurrency } from '@/lib/format';

const PRESETS = [250, 350, 450, 600];

const REASONS = [
  { key: 'restrictive', label: 'Original cap was too restrictive for my schedule' },
  { key: 'event', label: 'Dining out with client / special event' },
  { key: 'subscriptions', label: 'Prefer cutting digital subscriptions instead' },
  { key: 'other', label: 'Other personal allocation' },
];

export default function ModifyRecommendation() {
  const [cap, setCap] = useState(450);
  const [days, setDays] = useState(4);
  const [reason, setReason] = useState('restrictive');

  // The original AI plan protected ₹1,500 at ₹300/day; raising the cap gives back less buffer.
  const protectedBuffer = Math.max(0, Math.round((600 - cap) * days * 0.875));
  const bufferFloor = 1200 + protectedBuffer;
  const safeScore = Math.max(40, Math.min(100, Math.round(100 - (cap - 150) / 8)));

  return (
    <Screen
      title="Modify Recommendation"
      subtitle="Tune the intervention"
      avatar
      actions={[{ icon: 'more_vert', label: 'More' }]}
      contentClassName="gap-space-lg"
    >
      <View className="flex-row gap-2.5">
        <Icon name="tune" size={16} className="text-primary-container" />
        <Text className="flex-1 font-body-md text-body-md text-on-surface-variant">
          Customize parameters to fit your personal spending comfort while keeping your liquidity buffer
          protected.
        </Text>
      </View>

      {/* Target recommendation */}
      <Card tone="low" className="p-4">
        <View className="flex-row items-center gap-3">
          <IconBadge name="restaurant" bg="bg-surface-container" fg="text-primary-container" />
          <View className="flex-1">
            <Text className="font-label-lg text-label-lg text-on-surface">Cap Dining & Delivery</Text>
          </View>
          <Pill label="AI Safe Mode" tone="positive" />
        </View>
        <Text className="mt-2 font-body-sm text-body-sm text-on-surface-variant">
          Recommended: ₹300 / day for 4 days (Total cap: ₹1,200 | Buffer saved: ₹1,500)
        </Text>
      </Card>

      {/* Daily cap */}
      <Card className="p-5">
        <View className="flex-row items-center justify-between">
          <Text className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">
            Target Daily Cap
          </Text>
          <Pill label="Safe Zone" tone="positive" />
        </View>

        <View className="mt-3 flex-row items-baseline justify-center gap-1">
          <Text className="font-headline-md text-headline-md text-on-surface-variant">₹</Text>
          <Text className="font-display-hero text-display-hero text-primary-container">{cap}</Text>
          <Text className="font-label-md text-label-md text-on-surface-variant">/ day</Text>
        </View>

        <View className="mt-4 flex-row gap-2">
          {PRESETS.map((p) => {
            const active = cap === p;
            return (
              <Pressable
                key={p}
                onPress={() => setCap(p)}
                accessibilityRole="button"
                className={`flex-1 rounded-full py-2.5 ${
                  active ? 'bg-primary-container' : 'bg-surface-container-high'
                }`}
              >
                <Text
                  className={`text-center font-label-md text-label-md ${
                    active ? 'text-on-primary-fixed' : 'text-on-surface-variant'
                  }`}
                >
                  ₹{p}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <View className="mt-4">
          <Slider value={cap} min={150} max={800} onChange={setCap} />
          <View className="flex-row justify-between">
            <Text className="font-label-sm text-label-sm text-on-surface-variant">Conservative (₹150)</Text>
            <Text className="font-label-sm text-label-sm text-on-surface-variant">Comfort Flex (₹800)</Text>
          </View>
        </View>
      </Card>

      {/* Duration stepper */}
      <Card tone="low" className="p-4">
        <View className="flex-row items-center justify-between">
          <View className="flex-1">
            <Text className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">
              Adjustment Window
            </Text>
            <Text className="mt-1 font-headline-sm text-headline-sm text-on-surface">
              {days} Days{' '}
              <Text className="font-body-sm text-body-sm text-on-surface-variant">(until Oct 27)</Text>
            </Text>
            <Text className="mt-0.5 font-label-sm text-label-sm text-on-surface-variant">
              Anchored to Rent clearance date
            </Text>
          </View>

          <View className="flex-row items-center gap-3">
            <Pressable
              onPress={() => setDays((d) => Math.max(1, d - 1))}
              accessibilityRole="button"
              accessibilityLabel="Fewer days"
              className="h-10 w-10 items-center justify-center rounded-full bg-surface-container-high"
            >
              <Icon name="remove" size={18} className="text-on-surface" />
            </Pressable>
            <Text className="w-6 text-center font-headline-sm text-headline-sm text-on-surface">{days}</Text>
            <Pressable
              onPress={() => setDays((d) => Math.min(14, d + 1))}
              accessibilityRole="button"
              accessibilityLabel="More days"
              className="h-10 w-10 items-center justify-center rounded-full bg-surface-container-high"
            >
              <Icon name="add" size={18} className="text-on-surface" />
            </Pressable>
          </View>
        </View>
      </Card>

      {/* Real-time impact */}
      <Card className="p-5">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            <Icon name="insights" size={18} className="text-primary-container" />
            <Text className="font-label-lg text-label-lg text-on-surface">Projected Impact</Text>
          </View>
          <Pill label={`${safeScore}/100 Safe Zone`} tone={safeScore > 70 ? 'positive' : 'warning'} />
        </View>

        <View className="mt-4 flex-row gap-3">
          <View className="flex-1 rounded-xl bg-surface-container-low p-4">
            <Text className="font-label-sm text-label-sm text-on-surface-variant">Protected Buffer</Text>
            <Text className="mt-1 font-headline-md text-headline-md text-secondary">
              +{formatCurrency(protectedBuffer)}
            </Text>
            <Text className="font-label-sm text-label-sm text-on-surface-variant">orig. +₹1,500</Text>
          </View>
          <View className="flex-1 rounded-xl bg-surface-container-low p-4">
            <Text className="font-label-sm text-label-sm text-on-surface-variant">Buffer Floor</Text>
            <Text className="mt-1 font-headline-md text-headline-md text-on-surface">
              {formatCurrency(bufferFloor, { decimals: false })}
            </Text>
            <Text className="font-label-sm text-label-sm text-primary-container">Safe Margin</Text>
          </View>
        </View>

        <View className="mt-4">
          <ProgressBar value={safeScore / 100} tone={safeScore > 70 ? 'bg-secondary' : 'bg-primary-container'} height={6} />
        </View>

        <View className="mt-3 flex-row gap-2.5 rounded-xl bg-surface-container-low p-3">
          <Icon name="shield" size={16} className="text-secondary" />
          <Text className="flex-1 font-body-sm text-body-sm text-on-surface-variant">
            Adjusted plan continues to absorb impending rent shock safely.
          </Text>
        </View>
      </Card>

      {/* Reason for modification */}
      <View className="gap-space-sm">
        <View className="flex-row items-center gap-2">
          <Icon name="psychology" size={18} className="text-primary-container" />
          <Text className="font-headline-sm text-headline-sm text-on-surface">
            Help Guardian Learn (Optional)
          </Text>
        </View>

        <View className="gap-2">
          {REASONS.map((r) => (
            <RadioRow
              key={r.key}
              selected={reason === r.key}
              onPress={() => setReason(r.key)}
              title={r.label}
            />
          ))}
        </View>
      </View>

      <View className="gap-3">
        <Button
          title="Apply Modified Plan"
          icon="check_circle"
          onPress={() => router.push('/recommendations/confirmation')}
        />
        <Button
          title="Reset to AI Original (₹300/day)"
          icon="restart_alt"
          variant="secondary"
          onPress={() => {
            setCap(300);
            setDays(4);
          }}
        />
      </View>
    </Screen>
  );
}
