import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Client, Account, ID, Models } from 'react-native-appwrite';
import React, { useState } from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {AuthProvider} from "@/context/AuthContext";
import  {Login} from "@/components/Login";
import Home from "@/components/Home";

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
const styles = StyleSheet.create({
    root: {
        marginTop: 40,
        marginBottom: 40
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: 'gray',
        padding: 10,
        marginBottom: 10,
        alignItems: 'center',
    },
});
