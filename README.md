# AI Cashflow Guardian — React Native

React Native (Expo) port of the `stitch_ai_cashflow_guardian` Stitch export: all 64 screens,
built on the export's own "Obsidian Kinetic" design tokens.

## Run

```bash
npm install
npm start          # then press a / i, or scan the QR with Expo Go
npm run android
npm run ios
npm run web
npm run typecheck
```

### Expo Go

The project runs in Expo Go as-is — SDK 57, no custom native code, and every native
module it pulls in (`react-native-svg`, `react-native-reanimated`, `expo-font`,
`expo-blur`) ships inside the Expo Go client, so the manifest advertises
`exposdk:57.0.0` and the store build of Expo Go loads it directly.
`npx expo-doctor` should report 21/21.

`npm start` goes through `scripts/start-expo.js` rather than calling `expo start`
directly. Expo picks the first non-internal IPv4 it finds when it builds the QR code;
on a machine carrying a WSL/Hyper-V `vEthernet` adapter, VirtualBox, VMware, Docker or
a disconnected NIC on a 169.254.x.x link-local address, that detection loses and falls
back to `127.0.0.1` — which the phone resolves to *itself*, so Expo Go fails to connect.
The wrapper skips virtual and link-local adapters, picks the real Wi-Fi address and
pins it via `REACT_NATIVE_PACKAGER_HOSTNAME`. It prints the address it chose. Arguments
pass straight through (`npm start -- --clear`), and an address you set yourself in
`REACT_NATIVE_PACKAGER_HOSTNAME` always wins.

If the phone still can't reach the machine — separate subnets, client isolation on the
access point, or a firewall blocking inbound Node on the active network profile — use
`npm run start:tunnel`, which routes through Expo's relay instead of the LAN.

### Carried over from SDK 54

Three config keys moved when the project came up from SDK 54, and the schema check
rejects the old spelling: `newArchEnabled` is gone because the new architecture is the
only one left, `android.edgeToEdgeEnabled` is gone because edge-to-edge is always on,
and the top-level `splash` block is now options on the `expo-splash-screen` plugin.
TypeScript also moved to 6.x, which drops `baseUrl` (the `@/*` paths are resolved
relative to `tsconfig.json` instead) and refuses a side-effect import it has no
declaration for, so `nativewind-env.d.ts` declares `*.css` for `global.css`.

## Stack

- **Expo SDK 57** (React Native 0.86, React 19.2) with **expo-router** for file-based navigation
- **NativeWind v4** — the export was Tailwind, so classes port over almost 1:1
- **react-native-svg** for the trajectory/area/ring charts that were inline SVG in the export

## Design tokens

`tailwind.config.js` holds the palette, type ramp and spacing lifted verbatim from the export.
The palette is byte-identical across all 64 exported screens and matches the frontmatter of
`obsidian_kinetic/DESIGN.md`, so it is the single source of truth. `src/theme/tokens.ts` mirrors
the same values in TS for the places that need real values (SVG fills, status bar, navigation).

## Icons

The export used the Material Symbols **variable** font and toggled the `FILL` axis. React Native
can't drive variable-font axes, so `assets/fonts/MaterialSymbols-{Outlined,Filled}.ttf` are two
static instances cut at FILL=0 and FILL=1 and subset to just the 230 glyphs the screens use
(40 KB + 62 KB instead of a 10.7 MB variable font). `src/components/glyphs.ts` is the generated
name → codepoint map; `<Icon name="..." filled />` picks the instance.

`shield_check` is absent from the shipped Material Symbols codepoints and is aliased to
`verified_user`, which matches the design intent (a shield carrying a tick).

## Layout

```
app/
  (auth)/          login, create-account, otp-verification, forgot-password,
                   reset-password, personal-information
  (tabs)/          index (dashboard), activity, forecast (safe-to-spend), settings
                   + the raised lime FAB in the tab bar
  forecast/        7-day, 14-day, details, explanation, empty
  safe-to-spend/   breakdown, explanation, history
  risk/            dashboard, details, explanation, factors, shortfall
  recommendations/ index, details, modify, feedback, history, empty, updated, confirmation
  transactions/    details, edit, import, import-preview, empty
  learning/        insights, cycle-result, feedback-history
  notifications/   index, details
  profile/         index, edit, personal-information
  settings/        account, safety-buffer, income, expense-categories,
                   financial-preferences, spending-preferences, notifications,
                   language, currency, theme, privacy, data-import, about
  states/          stable, income-delayed, increased-risk, unexpected-expense,
                   loading, offline, error
  demo.tsx         hackathon scenario control center
  logout.tsx       presented as a transparent modal route

src/components/ui/  Button, Surface (Card/Pill/IconBadge/ProgressBar), Form (Field/Toggle/
                    Slider/Segmented/RadioRow/Checkbox), Rows (ListRow/TransactionRow/StatTile),
                    Charts (AreaChart/BarChart/RingGauge/StackedBar/Sparkline),
                    Screen (AppBar/Screen/EmptyState), Progress
src/data/mock.ts    all demo figures, taken from the export's own numbers
```

## Notes on the port

- The export shipped three shell types (`mobile_blank`, `mobile_stack`, `mobile_tab`). Auth screens
  use `header={false}`; stack screens get the `AppBar`; tab screens add `tabBarSpacing`.
- Two different bottom navs appear across the export; the dashboard's 4-tab + centre-FAB bar is the
  one implemented, and the other destinations are reachable as stack routes.
- The export's faux status bar ("9:41", wifi, battery) is dropped in favour of the real one.
- Charts are data-driven rather than hardcoded path strings: `smoothPath` reproduces the export's
  hand-authored Catmull-Rom curvature from raw numbers, so the series in `src/data/mock.ts` drive
  the shapes.
- There is no populated transaction-list screen in the export (only the empty state and the detail
  screen), so `(tabs)/activity` is composed from the same row and summary patterns.
- All data is mock and local; no network or persistence layer is wired up.
