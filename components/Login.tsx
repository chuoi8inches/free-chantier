import React, { useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuth } from '@/context/AuthContext';
import { Picker } from '@react-native-picker/picker';
import { Role } from '@/utils/type';

export const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState<Role>('chef');
    const [name, setName] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const { login, register,logout } = useAuth();

    const handleAuthentication = async () => {
        // Logout if there's an active session
        if (isLogin) {
            await logout();
        }
        // Input validation
        if (!email || !password || (!isLogin && !name)) {
            Alert.alert('Validation Error', 'Please fill in all fields');
            return;
        }

        setIsLoading(true);
        try {
            if (isLogin) {
                await login(email, password);
                // Navigate based on role (you'll need to implement this logic)
                navigation.navigate('Home');
            } else {
                await register(email, password, name,role);
                // After registration, navigate to home or complete profile
                navigation.navigate('Home');
            }
        } catch (error) {
            // Error handling is already done in the AuthContext
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                {isLogin ? 'Login to Site Management' : 'Register New Account'}
            </Text>

            {!isLogin && (
                <View>
                    <Picker
                      selectedValue={role}
                      onValueChange={(itemValue) => setRole(itemValue)}
                    >
                        <Picker.Item label="Chef" value="chef" />
                        <Picker.Item label="Responsable" value="responsable" />
                    </Picker>
                    <TextInput
                      style={styles.input}
                      placeholder="Full Name"
                      value={name}
                      onChangeText={setName}
                      autoCapitalize="words"
                    />
                </View>
            )}

            <TextInput
                style={styles.input}
                placeholder="Email Address"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
            />

            {isLoading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleAuthentication}
                >
                    <Text style={styles.buttonText}>
                        {isLogin ? 'Login' : 'Register'}
                    </Text>
                </TouchableOpacity>
            )}

            <TouchableOpacity
                style={styles.switchButton}
                onPress={() => setIsLogin(!isLogin)}
            >
                <Text style={styles.switchButtonText}>
                    {isLogin
                        ? 'Need an account? Register'
                        : 'Already have an account? Login'}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    input: {
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 15,
        borderRadius: 8,
        backgroundColor: 'white',
    },
    button: {
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    switchButton: {
        marginTop: 15,
        alignItems: 'center',
    },
    switchButtonText: {
        color: '#007bff',
    },
});

export default Login;