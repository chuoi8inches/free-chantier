import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider } from '@/context/AuthContext';
import { Login } from '@/components/Login';
import Home from '@/components/Home';

const Stack = createNativeStackNavigator();
export default function Index() {
    return (
        <AuthProvider>
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
        </AuthProvider>
    );
}
