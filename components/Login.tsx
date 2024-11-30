import {StyleSheet, Text, TextInput, TouchableOpacity, View, Alert} from "react-native";
import React, {useState} from "react";
import {useAuth} from "@/context/AuthContext";

export const Login = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [isLogin, setIsLogin] = useState(true);

    const { user, login, register,logout } = useAuth();

    const handleAuthentication = async () => {
        try {
            if (isLogin) {
                await login(email, password);
                //if login is successful, navigate to home screen
                navigation.navigate('Home');
            } else {
                await register(email, password, name);
            }
        } catch (error) {
            Alert.alert('Authentication Error', error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text>
                {isLogin ? 'Login' : 'Register'}
            </Text>

            {user && <Text>Logged in as: {user.name}</Text>}

            {!isLogin && (
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    value={name}
                    onChangeText={setName}
                />
            )}

            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />

            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <TouchableOpacity
                style={styles.button}
                onPress={handleAuthentication}
            >
                <Text>{isLogin ? 'Login' : 'Register'}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={logout}
            >
                <Text>Logout</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
                <Text>
                    {isLogin
                        ? 'Need an account? Register'
                        : 'Already have an account? Login'}
                </Text>
            </TouchableOpacity>
        </View>
    );
};
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
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
    },
});