import { Text, type TextProps } from 'react-native';
import { glyphMap, aliases, type IconName } from './glyphs';

type Props = Omit<TextProps, 'children'> & {
  name: IconName;
  size?: number;
  /** Renders the FILL=1 instance, matching `font-variation-settings: 'FILL' 1` in the export. */
  filled?: boolean;
  className?: string;
};

/**
 * Material Symbols renderer backed by two subset static fonts. The web export used a
 * variable font and toggled the FILL axis; React Native can't drive variation axes, so
 * the axis is baked into two instances at build time instead.
 */
export function Icon({ name, size = 24, filled = false, className, style, ...rest }: Props) {
  const resolved = (name in aliases ? aliases[name as keyof typeof aliases] : name) as keyof typeof glyphMap;
  return (
    <Text
      {...rest}
      allowFontScaling={false}
      className={className}
      style={[
        {
          fontFamily: filled ? 'MaterialSymbolsFilled' : 'MaterialSymbolsOutlined',
          fontSize: size,
          lineHeight: size,
          width: size,
          height: size,
          textAlign: 'center',
        },
        style,
      ]}
    >
      {glyphMap[resolved] ?? glyphMap.help_outline}
    </Text>
  );
}
