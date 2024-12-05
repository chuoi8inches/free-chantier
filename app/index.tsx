import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider } from '@/context/AuthContext';
import { Login } from '@/components/Login';
import Home from '@/components/Home';
import { SitesProvider } from '@/context/SiteContext';

const Stack = createNativeStackNavigator();
export default function Index() {
    return (
        <AuthProvider>
          <SitesProvider>
                <Stack.Navigator>
                    <Stack.Screen
                        name="Login"
                        component={Login}
                        options={{ title: "Login" }}
                    />
                    {/* Add other screens */}
                    <Stack.Screen
                        name="Home"
                        component={Home}
                        options={{ title: "Home" }}
                    />
                </Stack.Navigator>
          </SitesProvider>
        </AuthProvider>
    );
}
