import { useState } from 'react';
import { Text, View } from 'react-native';
import Svg, {
  Circle,
  Defs,
  G,
  Line,
  LinearGradient,
  Path,
  Rect,
  Stop,
} from 'react-native-svg';
import { colors } from '@/theme/tokens';

/**
 * Catmull-Rom -> cubic Bezier. The export hand-authored smooth `C` curves in its SVG;
 * this reproduces that curvature from raw data instead of hardcoded path strings.
 */
function smoothPath(pts: { x: number; y: number }[]) {
  if (pts.length < 2) return '';
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${c1x} ${c1y}, ${c2x} ${c2y}, ${p2.x} ${p2.y}`;
  }
  return d;
}

export type Series = {
  data: number[];
  color: string;
  /** Adds the translucent area fill under the curve, as the export does for inflow/outflow. */
  fill?: boolean;
  dashed?: boolean;
};

/**
 * Dual-curve area chart used on the dashboard, forecast and safe-to-spend screens.
 * Scales to the width it is given rather than the export's fixed 340x180 viewBox.
 */
export function AreaChart({
  series,
  labels,
  height = 180,
  showGrid = true,
  markerIndex,
  zeroLine = false,
}: {
  series: Series[];
  labels?: string[];
  height?: number;
  showGrid?: boolean;
  /** Draws the emphasised dot + vertical rule the export uses to flag a shortfall day. */
  markerIndex?: number;
  zeroLine?: boolean;
}) {
  const [width, setWidth] = useState(0);
  const padX = 4;
  const padY = 12;

  const all = series.flatMap((s) => s.data);
  const min = Math.min(0, ...all);
  const max = Math.max(...all, 1);
  const span = max - min || 1;
  const count = Math.max(...series.map((s) => s.data.length));

  const toXY = (v: number, i: number) => ({
    x: padX + (i / Math.max(1, count - 1)) * (width - padX * 2),
    y: padY + (1 - (v - min) / span) * (height - padY * 2),
  });

  const yOfZero = padY + (1 - (0 - min) / span) * (height - padY * 2);

  return (
    <View>
      <View style={{ height }} onLayout={(e) => setWidth(e.nativeEvent.layout.width)}>
        {width > 0 ? (
          <Svg width={width} height={height}>
            <Defs>
              {series.map((s, si) => (
                <LinearGradient key={si} id={`grad${si}`} x1="0" y1="0" x2="0" y2="1">
                  <Stop offset="0%" stopColor={s.color} stopOpacity={0.35} />
                  <Stop offset="90%" stopColor={s.color} stopOpacity={0} />
                </LinearGradient>
              ))}
            </Defs>

            {showGrid
              ? [0, 0.25, 0.5, 0.75, 1].map((t) => (
                  <Line
                    key={t}
                    x1={padX}
                    x2={width - padX}
                    y1={padY + t * (height - padY * 2)}
                    y2={padY + t * (height - padY * 2)}
                    stroke={colors.surfaceContainerHigh}
                    strokeWidth={1}
                  />
                ))
              : null}

            {zeroLine ? (
              <Line
                x1={padX}
                x2={width - padX}
                y1={yOfZero}
                y2={yOfZero}
                stroke={colors.outline}
                strokeWidth={1}
                strokeDasharray="4 4"
              />
            ) : null}

            {series.map((s, si) => {
              const pts = s.data.map(toXY);
              const line = smoothPath(pts);
              const area = `${line} L ${pts[pts.length - 1].x} ${height - padY} L ${pts[0].x} ${height - padY} Z`;
              return (
                <G key={si}>
                  {s.fill ? <Path d={area} fill={`url(#grad${si})`} /> : null}
                  <Path
                    d={line}
                    stroke={s.color}
                    strokeWidth={2.5}
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={s.dashed ? '5 5' : undefined}
                  />
                </G>
              );
            })}

            {markerIndex != null && series[0]?.data[markerIndex] != null
              ? (() => {
                  const p = toXY(series[0].data[markerIndex], markerIndex);
                  return (
                    <G>
                      <Line
                        x1={p.x}
                        x2={p.x}
                        y1={padY}
                        y2={height - padY}
                        stroke={colors.error}
                        strokeWidth={1}
                        strokeDasharray="3 3"
                      />
                      <Circle cx={p.x} cy={p.y} r={7} fill={colors.error} fillOpacity={0.25} />
                      <Circle cx={p.x} cy={p.y} r={4} fill={colors.error} />
                    </G>
                  );
                })()
              : null}
          </Svg>
        ) : null}
      </View>

      {labels ? (
        <View className="mt-2 flex-row justify-between">
          {labels.map((l, i) => (
            <Text key={`${l}-${i}`} className="font-label-sm text-label-sm text-on-surface-variant">
              {l}
            </Text>
          ))}
        </View>
      ) : null}
    </View>
  );
}

/** Vertical bars with per-bar tone — used for daily burn and category breakdowns. */
export function BarChart({
  data,
  labels,
  height = 150,
  highlightIndex,
}: {
  data: { value: number; color?: string }[];
  labels?: string[];
  height?: number;
  highlightIndex?: number;
}) {
  const [width, setWidth] = useState(0);
  const max = Math.max(...data.map((d) => d.value), 1);
  const gap = 8;
  const barW = width > 0 ? Math.max(4, (width - gap * (data.length - 1)) / data.length) : 0;

  return (
    <View>
      <View style={{ height }} onLayout={(e) => setWidth(e.nativeEvent.layout.width)}>
        {width > 0 ? (
          <Svg width={width} height={height}>
            {data.map((d, i) => {
              const h = Math.max(2, (d.value / max) * (height - 8));
              const isHi = highlightIndex === i;
              return (
                <Rect
                  key={i}
                  x={i * (barW + gap)}
                  y={height - h}
                  width={barW}
                  height={h}
                  rx={Math.min(6, barW / 2)}
                  fill={d.color ?? (isHi ? colors.primaryContainer : colors.surfaceContainerHighest)}
                />
              );
            })}
          </Svg>
        ) : null}
      </View>
      {labels ? (
        <View className="mt-2 flex-row justify-between">
          {labels.map((l, i) => (
            <Text
              key={`${l}-${i}`}
              className={`font-label-sm text-label-sm ${
                highlightIndex === i ? 'text-on-surface' : 'text-on-surface-variant'
              }`}
            >
              {l}
            </Text>
          ))}
        </View>
      ) : null}
    </View>
  );
}

/** Ring gauge for risk score / confidence dials. */
export function RingGauge({
  value,
  size = 160,
  stroke = 12,
  color = colors.primaryContainer,
  track = colors.surfaceContainerHighest,
  children,
}: {
  /** 0–1 */
  value: number;
  size?: number;
  stroke?: number;
  color?: string;
  track?: string;
  children?: React.ReactNode;
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(1, value));

  return (
    <View style={{ width: size, height: size }} className="items-center justify-center">
      <Svg width={size} height={size} style={{ position: 'absolute' }}>
        <G rotation={-90} origin={`${size / 2}, ${size / 2}`}>
          <Circle cx={size / 2} cy={size / 2} r={r} stroke={track} strokeWidth={stroke} fill="none" />
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            stroke={color}
            strokeWidth={stroke}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={`${c * pct} ${c}`}
          />
        </G>
      </Svg>
      {children}
    </View>
  );
}

/** Horizontal stacked bar for the safe-to-spend / buffer breakdowns. */
export function StackedBar({
  segments,
  height = 12,
}: {
  segments: { value: number; color: string }[];
  height?: number;
}) {
  const total = segments.reduce((s, x) => s + x.value, 0) || 1;
  return (
    <View className="w-full flex-row overflow-hidden rounded-full" style={{ height }}>
      {segments.map((s, i) => (
        <View key={i} style={{ flex: s.value / total, backgroundColor: s.color }} />
      ))}
    </View>
  );
}

/** Tiny inline trend line for list rows. */
export function Sparkline({
  data,
  color = colors.secondary,
  width = 64,
  height = 24,
}: {
  data: number[];
  color?: string;
  width?: number;
  height?: number;
}) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const span = max - min || 1;
  const pts = data.map((v, i) => ({
    x: (i / Math.max(1, data.length - 1)) * width,
    y: 2 + (1 - (v - min) / span) * (height - 4),
  }));
  return (
    <Svg width={width} height={height}>
      <Path d={smoothPath(pts)} stroke={color} strokeWidth={2} fill="none" strokeLinecap="round" />
    </Svg>
  );
}
