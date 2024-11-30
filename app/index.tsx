import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Client, Account, ID, Models } from 'react-native-appwrite';
import React, { useState } from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";


const client = new Client();
client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('673fb35f00308b078cf5')   // Your Project ID
    .setPlatform('fr.istic.freechantier');   // Your package name / bundle identifier
function Index() {
    const account = new Account(client);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loggedInUser, setLoggedInUser] = useState<Models.User<Models.Preferences> | null>(null);
    const [name, setName] = useState('');
    async function login(email: string, password: string) {
        try {
            console.log('Login started');
            // Create a session
            const session = await account.createEmailPasswordSession(email, password);
            if(session){
                const user = await account.get();
                setLoggedInUser(user);
                // go to the home page
            }
        } catch (error) {
            console.error('Login failed:', error.message);
        }
    }
    async function register(email: string, password: string, name: string) {
        try {
            // Register the user
            await account.create(ID.unique(), email, password, name);

            // Log the user in after registration
            await login(email, password);
        } catch (error) {
            console.error('Registration failed:', error.message);
        }
    }
        return(
            <View style={styles.root}>
                <Text>
                    {loggedInUser ? `Logged in as ${loggedInUser.name}` : 'Not logged in'}
                </Text>
                <View>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Name"
                        value={name}
                        onChangeText={(text) => setName(text)}
                    />

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => login(email, password)}
                    >
                        <Text>Login</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={()=> register(email, password, name)}
                    >
                        <Text>Register</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={async () => {
                            await account.deleteSession('current');
                            setLoggedInUser(null);
                        }}
                    >
                        <Text>Logout</Text>
                    </TouchableOpacity>
                </View>
            </View>
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
export default Index;