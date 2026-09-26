#!/usr/bin/env node
/**
 * `expo start` wrapper that pins the packager host to a real LAN address.
 *
 * Expo's own LAN detection picks the first non-internal IPv4 it finds. On machines
 * carrying virtual adapters (WSL/Hyper-V `vEthernet`, VirtualBox, VMware, Docker) or a
 * disconnected NIC sitting on a 169.254.x.x link-local address, it either picks one of
 * those or gives up and falls back to 127.0.0.1 — so the QR code encodes
 * `exp://127.0.0.1:8081`, which Expo Go on a phone resolves to the phone itself and
 * cannot connect to.
 *
 * Setting REACT_NATIVE_PACKAGER_HOSTNAME overrides that detection. Every argument is
 * forwarded, so `npm start -- --clear`, `--tunnel`, `--port` and friends still work; an
 * explicit REACT_NATIVE_PACKAGER_HOSTNAME in the environment always wins.
 */
const os = require('os');
const { spawn } = require('child_process');

/** Adapters that exist on the host but are not reachable from a phone on the Wi-Fi. */
const VIRTUAL = /(vethernet|wsl|hyper-v|virtualbox|vmware|docker|loopback|bluetooth|tailscale|zerotier|tap-|tun-|npcap)/i;

function lanAddress() {
  const candidates = [];

  for (const [name, addrs] of Object.entries(os.networkInterfaces())) {
    if (VIRTUAL.test(name)) continue;
    for (const addr of addrs ?? []) {
      if (addr.family !== 'IPv4' || addr.internal) continue;
      if (addr.address.startsWith('169.254.')) continue; // APIPA: link dead
      candidates.push({ name, address: addr.address });
    }
  }

  // Home/office Wi-Fi subnets first, then the adapter that names itself wireless.
  const rank = ({ name, address }) =>
    (address.startsWith('192.168.') ? 0 : address.startsWith('10.') ? 1 : 2) +
    (/wi-?fi|wireless|wlan/i.test(name) ? 0 : 0.5);

  candidates.sort((a, b) => rank(a) - rank(b));
  return candidates[0];
}

const env = { ...process.env };

if (!env.REACT_NATIVE_PACKAGER_HOSTNAME) {
  const found = lanAddress();
  if (found) {
    env.REACT_NATIVE_PACKAGER_HOSTNAME = found.address;
    console.log(`Expo Go host: ${found.address} (${found.name})`);
  } else {
    console.log('No LAN address found — run `npm start -- --tunnel` to reach Expo Go.');
  }
}

const child = spawn('npx', ['expo', 'start', ...process.argv.slice(2)], {
  stdio: 'inherit',
  env,
  shell: process.platform === 'win32',
});

child.on('exit', (code, signal) => process.exit(signal ? 1 : code ?? 0));
