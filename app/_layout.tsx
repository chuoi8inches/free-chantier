import { Stack } from 'expo-router';
import Index from '@/app/index';
import { UserProvider } from '@/context/UserContext';
import { SitesProvider } from '@/context/SiteContext';

export default function RootLayout() {
  return <UserProvider>
    <SitesProvider>
      <Stack>
        <Index />
      </Stack>
    </SitesProvider>
  </UserProvider>;
}
