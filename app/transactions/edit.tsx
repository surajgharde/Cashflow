import { useState } from 'react';
import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { Icon } from '@/components/Icon';
import { Screen } from '@/components/ui/Screen';
import { Button } from '@/components/ui/Button';
import { Field, Toggle } from '@/components/ui/Form';
import { Card, Pill, IconBadge } from '@/components/ui/Surface';

const QUICK = [-50, 50, 100];

export default function EditTransaction() {
  const [kind, setKind] = useState<'expense' | 'income'>('expense');
  const [amount, setAmount] = useState(420);
  const [recurring, setRecurring] = useState(false);

  return (
    <Screen
      title="Edit Transaction"
      subtitle="Live Guardian Node"
      actions={[{ icon: 'restart_alt', label: 'Reset', onPress: () => setAmount(420) }]}
      contentClassName="gap-space-lg"
    >
      {/* Type switcher */}
      <View className="flex-row gap-1 rounded-xl bg-surface-container-low p-1.5">
        {(
          [
            { key: 'expense', label: 'Expense', icon: 'arrow_outward' },
            { key: 'income', label: 'Income', icon: 'arrow_downward' },
          ] as const
        ).map((o) => {
          const active = kind === o.key;
          return (
            <Pressable
              key={o.key}
              onPress={() => setKind(o.key)}
              accessibilityRole="tab"
              accessibilityState={{ selected: active }}
              className={`flex-1 flex-row items-center justify-center gap-1.5 rounded-lg py-2.5 ${
                active ? 'bg-surface-container-highest' : ''
              }`}
            >
              <Icon
                name={o.icon}
                size={16}
                className={
                  active
                    ? o.key === 'income'
                      ? 'text-secondary'
                      : 'text-error'
                    : 'text-on-surface-variant'
                }
              />
              <Text
                className={`font-label-md text-label-md ${active ? 'text-on-surface' : 'text-on-surface-variant'}`}
              >
                {o.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {/* Amount display */}
      <Card className="items-center">
        <Text className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">
          Transaction Value
        </Text>
        <View className="mt-3 flex-row items-baseline gap-1">
          <Text className="font-headline-md text-headline-md text-on-surface-variant">₹</Text>
          <Text className="font-display-hero text-display-hero text-on-surface">{amount.toFixed(2)}</Text>
        </View>

        <View className="mt-3 flex-row items-center gap-1.5">
          <Icon name="auto_awesome" size={13} className="text-primary-container" />
          <Text className="font-label-sm text-label-sm text-on-surface-variant">
            Safe budget impact: ~1.2% daily limit
          </Text>
        </View>

        <View className="mt-4 flex-row gap-2">
          {QUICK.map((q) => (
            <Pressable
              key={q}
              onPress={() => setAmount((a) => Math.max(0, a + q))}
              accessibilityRole="button"
              className="rounded-full bg-surface-container-high px-4 py-2"
            >
              <Text className="font-label-md text-label-md text-on-surface">
                {q > 0 ? `+ ₹${q}` : `- ₹${Math.abs(q)}`}
              </Text>
            </Pressable>
          ))}
        </View>
      </Card>

      <View className="gap-4">
        <Field
          label="Merchant & Title"
          icon="storefront"
          defaultValue="Swiggy Gourmet - Lunch Order"
          placeholder="Where did this happen?"
        />

        {/* Category selector */}
        <View className="gap-1.5">
          <Text className="px-1 font-label-md text-label-md text-on-surface-variant">
            Category Allocation
          </Text>
          <Pressable
            accessibilityRole="button"
            onPress={() => router.push('/settings/expense-categories')}
            className="flex-row items-center gap-3 rounded-xl bg-surface-container p-3.5"
          >
            <IconBadge name="restaurant" bg="bg-surface-container-high" fg="text-primary-container" />
            <View className="flex-1">
              <Text className="font-label-lg text-label-lg text-on-surface">Food & Dining</Text>
              <Text className="font-body-sm text-body-sm text-on-surface-variant">
                Discretionary Spending
              </Text>
            </View>
            <Icon name="expand_more" size={20} className="text-on-surface-variant" />
          </Pressable>
        </View>

        {/* Date & payment source */}
        <View className="gap-1.5">
          <Text className="px-1 font-label-md text-label-md text-on-surface-variant">Date & Time</Text>
          <Pressable
            accessibilityRole="button"
            className="flex-row items-center gap-3 rounded-xl bg-surface-container p-3.5"
          >
            <Icon name="calendar_today" size={20} className="text-on-surface-variant" />
            <Text className="flex-1 font-label-lg text-label-lg text-on-surface">
              24 Oct 2024, 02:12 PM
            </Text>
            <Icon name="edit_calendar" size={18} className="text-on-surface-variant" />
          </Pressable>
        </View>

        <View className="gap-1.5">
          <Text className="px-1 font-label-md text-label-md text-on-surface-variant">Payment Source</Text>
          <Pressable
            accessibilityRole="button"
            className="flex-row items-center gap-3 rounded-xl bg-surface-container p-3.5"
          >
            <IconBadge name="account_balance" bg="bg-surface-container-high" />
            <View className="flex-1">
              <Text className="font-label-lg text-label-lg text-on-surface">UPI / HDFC Bank **4021</Text>
              <Text className="font-body-sm text-body-sm text-on-surface-variant">
                Primary Liquid Account
              </Text>
            </View>
            <Icon name="unfold_more" size={18} className="text-on-surface-variant" />
          </Pressable>
        </View>

        {/* Recurring switch */}
        <View className="flex-row items-center gap-3 rounded-xl bg-surface-container p-4">
          <IconBadge name="repeat" bg="bg-surface-container-high" />
          <View className="flex-1">
            <Text className="font-label-lg text-label-lg text-on-surface">Recurring Commitment</Text>
            <Text className="font-body-sm text-body-sm text-on-surface-variant">
              Flag as fixed subscription schedule
            </Text>
          </View>
          <Toggle value={recurring} onChange={setRecurring} />
        </View>

        <Field
          label="Guardian Note & Context Tag"
          icon="loyalty"
          defaultValue="Lunch with team"
          placeholder="Add a note for the model"
        />
      </View>

      {/* Live recalculation */}
      <Card tone="low" className="p-4">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            <Icon name="insights" size={18} className="text-primary-container" />
            <Text className="font-label-lg text-label-lg text-on-surface">AI Impact Prediction</Text>
          </View>
          <Pill label="Engine v4" />
        </View>
        <Text className="mt-2 font-body-sm text-body-sm text-on-surface-variant">
          Modifying this entry will automatically recalculate your 7-day forecast and safe-to-spend balance.
        </Text>
      </Card>

      <View className="gap-3">
        <Button title="Save Changes" icon="check" onPress={() => router.back()} />
        <Button title="Cancel" variant="ghost" onPress={() => router.back()} />
      </View>
    </Screen>
  );
}
