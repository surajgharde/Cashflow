import { Redirect } from 'expo-router';

/** Entry point: the export opens on the login screen. */
export default function Index() {
  return <Redirect href="/(auth)/login" />;
}
