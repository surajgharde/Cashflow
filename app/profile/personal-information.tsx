import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Icon } from '@/components/Icon';
import { Screen } from '@/components/ui/Screen';
import { Button } from '@/components/ui/Button';
import { Card, Pill, IconBadge } from '@/components/ui/Surface';
import { user } from '@/data/mock';

function Row({
  label,
  value,
  sub,
  tag,
  right,
}: {
  label: string;
  value: string;
  sub?: string;
  tag?: string;
  right?: React.ReactNode;
}) {
  return (
    <View className="flex-row items-center justify-between py-2.5">
      <View className="flex-1">
        <View className="flex-row items-center gap-2">
          <Text className="font-label-sm text-label-sm text-on-surface-variant">{label}</Text>
          {tag ? <Pill label={tag} /> : null}
        </View>
        <Text className="mt-0.5 font-label-lg text-label-lg text-on-surface">{value}</Text>
        {sub ? (
          <Text className="mt-0.5 font-label-sm text-label-sm text-on-surface-variant">{sub}</Text>
        ) : null}
      </View>
      {right}
    </View>
  );
}

export default function PersonalInformation() {
  const [showPan, setShowPan] = useState(false);
  const [toast, setToast] = useState(false);

  return (
    <Screen
      title="Personal Information"
      subtitle="Personal & KYC Details"
      avatar
      contentClassName="gap-space-lg"
    >
      <Text className="font-body-md text-body-md text-on-surface-variant">
        Verified personal information used to establish creditworthiness and dynamic buffer calibration.
      </Text>

      {/* Profile glance */}
      <Card className="flex-row items-center gap-3">
        <View className="h-14 w-14 items-center justify-center rounded-full bg-primary">
          <Icon name="person" size={28} className="text-on-primary" />
        </View>
        <View className="flex-1">
          <View className="flex-row items-center gap-1.5">
            <Text className="font-headline-sm text-headline-sm text-on-surface">{user.name}</Text>
            <Icon name="check" size={14} className="text-secondary" />
          </View>
          <Pill label={user.kyc} tone="accent" className="mt-1" />
          <Text className="mt-1 font-label-sm text-label-sm text-on-surface-variant">
            Trust Index: {user.trustIndex} (Tier 1 Buffer)
          </Text>
        </View>
        <View className="items-end">
          <Text className="font-label-sm text-label-sm text-on-surface-variant">Health</Text>
          <Text className="font-label-md text-label-md text-secondary">Optimal</Text>
        </View>
      </Card>

      {/* Legal identity */}
      <View className="gap-space-sm">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            <Icon name="badge" size={18} className="text-primary-container" />
            <Text className="font-headline-sm text-headline-sm text-on-surface">Legal Identity</Text>
          </View>
          <Pill label="Validated" tone="positive" />
        </View>

        <Card tone="low" className="px-4 py-2">
          <Row label="Full Legal Name" value={user.name} />
          <View className="h-px bg-surface-container-high" />
          <Row label="Date of Birth" value={user.dob} sub={`Age: ${user.age}`} />
          <View className="h-px bg-surface-container-high" />
          <Row
            label="Government ID / PAN"
            value={showPan ? 'ABCDE1234F' : user.pan}
            sub="Verified"
            right={
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Toggle PAN visibility"
                hitSlop={8}
                onPress={() => setShowPan((v) => !v)}
              >
                <Icon name="visibility" size={18} className="text-on-surface-variant" />
              </Pressable>
            }
          />
        </Card>
      </View>

      {/* Employment */}
      <View className="gap-space-sm">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            <Icon name="trending_up" size={18} className="text-primary-container" />
            <Text className="font-headline-sm text-headline-sm text-on-surface">
              Employment & Income Stability
            </Text>
          </View>
          <Pill label="Real-time AI" icon="auto_graph" tone="positive" />
        </View>

        <Card tone="low" className="px-4 py-2">
          <Row
            label="Primary Occupation"
            value={user.occupation}
            sub={user.occupationDetail}
            tag="Core Anchor"
          />
          <View className="h-px bg-surface-container-high" />
          <Row
            label="Secondary Revenue Stream"
            value="Freelance Development & Retainers"
            tag="Dynamic Inflow"
            right={<Icon name="bolt" size={18} className="text-primary-container" />}
          />
          <View className="h-px bg-surface-container-high" />
          <Row
            label="Employment Tenure"
            value={user.tenure}
            right={<Icon name="verified" size={18} className="text-secondary" />}
          />
        </Card>
      </View>

      {/* Address */}
      <View className="gap-space-sm">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            <Icon name="location_on" size={18} className="text-primary-container" />
            <Text className="font-headline-sm text-headline-sm text-on-surface">
              Address & Jurisdiction
            </Text>
          </View>
          <Pill label="Geo-synced" tone="positive" dot />
        </View>

        <Card tone="low" className="p-4">
          {/* Mini map placeholder */}
          <View className="h-24 items-center justify-center rounded-xl bg-surface-container">
            <Icon name="location_on" size={24} className="text-primary-container" />
            <Text className="mt-1 font-label-sm text-label-sm text-on-surface-variant">
              Indiranagar 100ft Road Cluster
            </Text>
            <Pill label="GPS Verified" tone="positive" className="mt-1.5" />
          </View>

          <View className="mt-2">
            <Row label="Residential Address" value={user.address} />
            <View className="h-px bg-surface-container-high" />
            <Row label="Tax Residency" value="India" sub="INR ₹" />
          </View>
        </Card>
      </View>

      {/* Vault badge */}
      <Card tone="low" className="flex-row gap-3 p-4">
        <IconBadge name="shield_lock" bg="bg-surface-container" fg="text-primary-container" filled />
        <View className="flex-1">
          <Text className="font-label-lg text-label-lg text-on-surface">Hardware Vault Security</Text>
          <Text className="mt-1 font-body-sm text-body-sm text-on-surface-variant">
            Protected by Tier-4 End-to-End Cryptographic Enclave. Never shared with third parties.
          </Text>
        </View>
      </Card>

      <Button title="Request Verification Update" icon="sync_alt" onPress={() => setToast(true)} />

      {toast ? (
        <Card tone="low" className="flex-row items-center gap-3 p-4">
          <Icon name="check_circle" size={20} className="text-secondary" />
          <View className="flex-1">
            <Text className="font-label-lg text-label-lg text-on-surface">Update Pipeline Initiated</Text>
            <Text className="font-body-sm text-body-sm text-on-surface-variant">
              KYC verification pinged via Digilocker.
            </Text>
          </View>
          <Pressable onPress={() => setToast(false)} hitSlop={8} accessibilityLabel="Dismiss">
            <Icon name="close" size={18} className="text-on-surface-variant" />
          </Pressable>
        </Card>
      ) : null}
    </Screen>
  );
}
