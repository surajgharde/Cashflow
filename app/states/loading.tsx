import { useEffect, useRef, useState } from 'react';
import { router } from 'expo-router';
import { Animated, Easing, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from '@/components/Icon';
import type { IconName } from '@/components/glyphs';
import { Card, Pill, ProgressBar } from '@/components/ui/Surface';

type Step = { icon: IconName; title: string; body: string; state: 'done' | 'active' | 'wait' };

const STEPS: Step[] = [
  {
    icon: 'check_circle',
    title: 'Syncing verified bank feeds via Account Aggregator',
    body: '248 settled ledger items parsed',
    state: 'done',
  },
  {
    icon: 'check_circle',
    title: 'Scanning upcoming NACH auto-debits & mandates',
    body: '11 scheduled recurring pulls identified',
    state: 'done',
  },
  {
    icon: 'progress_activity',
    title: 'Calculating stochastic Safe-to-Spend horizons...',
    body: 'Monte Carlo divergence test in-flight',
    state: 'active',
  },
  {
    icon: 'radio_button_unchecked',
    title: 'Evaluating dynamic buffer breach probability',
    body: 'Queued behind stochastic convergence',
    state: 'wait',
  },
];

const STATE_TAG = {
  done: { label: 'DONE', fg: 'text-secondary' },
  active: { label: 'ACTIVE', fg: 'text-primary-container' },
  wait: { label: 'WAIT', fg: 'text-on-surface-variant' },
};

export default function LoadingState() {
  const insets = useSafeAreaInsets();
  const spin = useRef(new Animated.Value(0)).current;
  const [progress, setProgress] = useState(74);

  useEffect(() => {
    // Continuous orbit for the radar core.
    const loop = Animated.loop(
      Animated.timing(spin, {
        toValue: 1,
        duration: 3200,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );
    loop.start();
    return () => loop.stop();
  }, [spin]);

  useEffect(() => {
    // Drift the inference counter, as the export's script does.
    const id = setInterval(() => setProgress((p) => (p >= 99 ? 74 : p + 1)), 220);
    return () => clearInterval(id);
  }, []);

  const rotate = spin.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });

  return (
    <View className="flex-1 bg-surface px-margin" style={{ paddingTop: insets.top + 24, paddingBottom: insets.bottom + 24 }}>
      {/* Brand header */}
      <View className="flex-row items-center justify-between">
        <Text className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">
          AI Cashflow Guardian
        </Text>
        <Pill label="Enclave Active" icon="lock" tone="positive" />
      </View>

      {/* Radar core */}
      <View className="flex-1 items-center justify-center">
        {/* NativeWind has no interop for Animated.View, so className is dropped on native.
            The transform stays on Animated.View and the ring itself is a plain View. */}
        <Animated.View style={{ transform: [{ rotate }] }}>
          <View className="h-48 w-48 items-center justify-center rounded-full border border-surface-container-high">
            <View className="absolute -top-1.5 h-3 w-3 rounded-full bg-primary-container" />
            <View className="absolute -bottom-1.5 h-2 w-2 rounded-full bg-secondary" />
            <View className="h-32 w-32 items-center justify-center rounded-full border border-surface-container-highest" />
          </View>
        </Animated.View>

        <View className="absolute h-20 w-20 items-center justify-center rounded-full bg-surface-container-high">
          <Icon name="psychology" size={38} className="text-primary-container" />
        </View>
      </View>

      {/* Narrative */}
      <View className="items-center">
        <Pill label="NEURAL TRAJECTORY ENGINE v3.4" icon="bolt" uppercase />
        <Text className="mt-3 text-center font-headline-md text-headline-md text-on-surface">
          Synthesizing Cashflow Trajectory...
        </Text>
        <Text className="mt-1.5 text-center font-body-sm text-body-sm text-on-surface-variant">
          Stochastic simulation running over 90-day liquidity buffer.
        </Text>
      </View>

      {/* Progress */}
      <Card tone="low" className="mt-6 p-4">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            <Icon name="data_thresholding" size={16} className="text-primary-container" />
            <Text className="font-label-md text-label-md text-on-surface">Inference Progress</Text>
          </View>
          <Text className="font-label-lg text-label-lg text-primary-container">{progress}%</Text>
        </View>

        <View className="mt-3">
          <ProgressBar value={progress / 100} height={6} />
        </View>

        <View className="mt-2 flex-row items-center justify-between">
          <Text className="font-label-sm text-label-sm text-on-surface-variant">
            Speed: 42,000 runs/sec
          </Text>
          <Text className="font-label-sm text-label-sm text-on-surface-variant">ETA ~1.8s</Text>
        </View>
      </Card>

      {/* Telemetry steps */}
      <Card tone="low" className="mt-3 gap-3 p-4">
        <View className="flex-row items-center justify-between">
          <Text className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
            Live Pipeline Telemetry
          </Text>
          <Text className="font-label-sm text-label-sm text-on-surface-variant">4 Nodes Linked</Text>
        </View>

        {STEPS.map((s) => {
          const tag = STATE_TAG[s.state];
          return (
            <View key={s.title} className="flex-row items-start gap-3">
              <Icon name={s.icon} size={16} className={tag.fg} />
              <View className="flex-1">
                <Text className="font-label-md text-label-md text-on-surface" numberOfLines={2}>
                  {s.title}
                </Text>
                <Text className="mt-0.5 font-label-sm text-label-sm text-on-surface-variant">{s.body}</Text>
              </View>
              <Text className={`font-label-sm text-label-sm ${tag.fg}`}>{tag.label}</Text>
            </View>
          );
        })}
      </Card>

      {/* Privacy footer */}
      <View className="mt-4 flex-row items-center justify-center gap-1.5">
        <Icon name="verified_user" size={13} className="text-on-surface-variant" />
        <Text className="text-center font-label-sm text-label-sm text-on-surface-variant">
          Client-Side Zero-Knowledge Inference
        </Text>
      </View>

      <Text
        onPress={() => router.replace('/(tabs)')}
        className="mt-3 text-center font-label-md text-label-md text-primary-container"
      >
        Skip to dashboard
      </Text>
    </View>
  );
}
