/**
 * The same tokens as tailwind.config.js, in TS form, for the places that need real
 * values rather than class names: navigation theming, status bar, gradients, SVG fills.
 */
export const colors = {
  surface: '#111317',
  surfaceDim: '#111317',
  surfaceBright: '#37393d',
  surfaceVariant: '#333538',
  surfaceContainerLowest: '#0c0e11',
  surfaceContainerLow: '#1a1c1f',
  surfaceContainer: '#1e2023',
  surfaceContainerHigh: '#282a2d',
  surfaceContainerHighest: '#333538',
  background: '#111317',
  onSurface: '#e2e2e6',
  onSurfaceVariant: '#c5c9ae',
  onBackground: '#e2e2e6',
  primary: '#ffffff',
  onPrimary: '#2a3400',
  primaryContainer: '#cbf230',
  onPrimaryContainer: '#586c00',
  primaryFixed: '#cbf230',
  primaryFixedDim: '#b0d500',
  onPrimaryFixed: '#171e00',
  onPrimaryFixedVariant: '#3e4c00',
  inversePrimary: '#536600',
  secondary: '#44f0a1',
  onSecondary: '#003921',
  secondaryContainer: '#04d388',
  onSecondaryContainer: '#005534',
  secondaryFixed: '#57feaf',
  secondaryFixedDim: '#2ee194',
  onSecondaryFixed: '#002111',
  onSecondaryFixedVariant: '#005232',
  tertiary: '#ffffff',
  onTertiary: '#67001b',
  tertiaryContainer: '#ffdadb',
  onTertiaryContainer: '#c51740',
  tertiaryFixed: '#ffdadb',
  tertiaryFixedDim: '#ffb2b7',
  onTertiaryFixed: '#40000d',
  onTertiaryFixedVariant: '#920029',
  error: '#ffb4ab',
  onError: '#690005',
  errorContainer: '#93000a',
  onErrorContainer: '#ffdad6',
  outline: '#8f937a',
  outlineVariant: '#454934',
  inverseSurface: '#e2e2e6',
  inverseOnSurface: '#2f3034',
  surfaceTint: '#b0d500',
} as const;

export const fonts = {
  regular: 'PlusJakartaSans_400Regular',
  medium: 'PlusJakartaSans_500Medium',
  semibold: 'PlusJakartaSans_600SemiBold',
  bold: 'PlusJakartaSans_700Bold',
} as const;

/** Risk bands drive most of the semantic colouring across the forecast + risk screens. */
export type RiskLevel = 'stable' | 'watch' | 'elevated' | 'critical';

export const riskPalette: Record<RiskLevel, { fg: string; label: string; icon: string }> = {
  stable: { fg: colors.secondary, label: 'Stable', icon: 'verified_user' },
  watch: { fg: colors.primaryContainer, label: 'Watch', icon: 'visibility' },
  elevated: { fg: colors.tertiaryFixedDim, label: 'Elevated', icon: 'warning' },
  critical: { fg: colors.error, label: 'Critical', icon: 'crisis_alert' },
};
