// src/context/AuthContext.tsx
import React, { createContext, ReactNode, useContext, useState } from 'react';
import { Account, ID, Models } from 'react-native-appwrite';
import { Alert } from 'react-native';
import { account, DATABASE_ID, databases, USER_COLLECTION_ID } from '@/libs/appwrite';

// Define the shape of the authentication context
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
            }
        } catch (error) {
            Alert.alert('Login Error', error instanceof Error ? error.message : 'An unknown error occurred');
            throw error;
        }
        console.log(user);
    };

    // Register method
    const register = async (email: string, password: string, name: string, role: string) => {
        try {
            // Create user account
            const currentUser = await account.create(ID.unique(), email, password, name);
            // Use the user's Appwrite ID to create a linked entry in the custom collection
            const userId = currentUser.$id;
            const userDetails = {
                userId: userId,
                role: role,
                name: currentUser.name,
            }
            console.log(userDetails);
            //save in UserDetails collection
            await databases.createDocument(
              DATABASE_ID,
              USER_COLLECTION_ID,
              ID.unique(),
              userDetails,
            )
            // Login after registration
            await login(email, password);
        } catch (error) {
            Alert.alert('Registration Error', error instanceof Error ? error.message : 'An unknown error occurred');
            throw error;
        }
    };

    // Logout method
    const logout = async () => {
        try {
            await account.deleteSession('current');
            setUser(null);
        } catch (error) {
            Alert.alert('Logout Error', error instanceof Error ? error.message : 'An unknown error occurred');
        }
    };

    return (
        <AuthContext.Provider value={{
            account,
            user,
            login,
            register,
            logout,
        }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the auth context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};