import React, { createContext, useContext, useState, useEffect } from 'react';
import * as authService from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setCurrentUser({ token });
            checkAdmin(token);
        }
    }, []);

    const handleLogin = async (credentials) => {
        try {
            const { token } = await authService.login(credentials);
            setCurrentUser({ token });
            await checkAdmin(token);
        } catch (error) {
            console.error("Login error:", error);
            throw error;
        }
    };

    const handleLogout = () => {
        authService.logout();
        setCurrentUser(null);
    };

    const handleSignup = async (credentials) => {
        try {
            await authService.signup(credentials);
        } catch (error) {
            console.error("Signup error:", error);
            throw error;
        }
    };

    const checkAdmin = async (token) => {
        try {
            const isAdmin = await authService.checkAdminStatus(token);
            setCurrentUser(currentUser => ({ ...currentUser, isAdmin }));
        } catch (error) {
            console.error("Error checking admin status:", error);
        }
    };

    const value = { currentUser, login: handleLogin, logout: handleLogout, signup: handleSignup };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
