// src/context/AuthContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Client, Account, ID, Models } from 'react-native-appwrite';

// Create Appwrite Client
const client = new Client();
client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('673fb35f00308b078cf5')
    .setPlatform('fr.istic.freechantier');

const account = new Account(client);

// Define the shape of the context
interface AuthContextType {
    account: Account;
    user: Models.User<Models.Preferences> | null;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string, name: string) => Promise<void>;
    logout: () => Promise<void>;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);

    const login = async (email: string, password: string) => {
        try {
            const session = await account.createEmailPasswordSession(email, password);
            if (session) {
                const currentUser = await account.get();
                setUser(currentUser);
                // TODO: Navigate to home screen
            }
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    };

    const register = async (email: string, password: string, name: string) => {
        try {
            await account.create(ID.unique(), email, password, name);
            await login(email, password);
        } catch (error) {
            console.error('Registration failed:', error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await account.deleteSession('current');
            setUser(null);
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <AuthContext.Provider value={{
            account,
            user,
            login,
            register,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook for using the auth context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};