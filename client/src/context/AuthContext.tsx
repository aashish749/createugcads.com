import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import api from '../configs/axios';
import toast from 'react-hot-toast';

export interface UserProfile {
    id: string;
    name: string;
    email: string;
    image?: string;
    credits: number;
}

interface AuthContextType {
    user: UserProfile | null;
    token: string | null;
    isLoading: boolean;
    isAuthModalOpen: boolean;
    authModalMode: 'login' | 'register';
    openSignIn: () => void;
    openSignUp: () => void;
    closeAuthModal: () => void;
    login: (email: string, password: string) => Promise<boolean>;
    register: (name: string, email: string, password: string) => Promise<boolean>;
    logout: () => void;
    refreshUser: () => Promise<void>;
    setCredits: (credits: number) => void;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    token: null,
    isLoading: true,
    isAuthModalOpen: false,
    authModalMode: 'login',
    openSignIn: () => {},
    openSignUp: () => {},
    closeAuthModal: () => {},
    login: async () => false,
    register: async () => false,
    logout: () => {},
    refreshUser: async () => {},
    setCredits: () => {}
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [token, setToken] = useState<string | null>(() => localStorage.getItem('ugc_auth_token'));
    const [isLoading, setIsLoading] = useState(true);

    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');

    const openSignIn = () => {
        setAuthModalMode('login');
        setIsAuthModalOpen(true);
    };

    const openSignUp = () => {
        setAuthModalMode('register');
        setIsAuthModalOpen(true);
    };

    const closeAuthModal = () => {
        setIsAuthModalOpen(false);
    };

    const refreshUser = useCallback(async () => {
        const storedToken = localStorage.getItem('ugc_auth_token');
        if (!storedToken) {
            setUser(null);
            setIsLoading(false);
            return;
        }

        try {
            const { data } = await api.get('/api/auth/me', {
                headers: { Authorization: `Bearer ${storedToken}` }
            });
            if (data.user) {
                setUser(data.user);
            }
        } catch (error) {
            // Token might be invalid/expired
            localStorage.removeItem('ugc_auth_token');
            setToken(null);
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        refreshUser();
    }, [refreshUser]);

    const login = async (email: string, password: string): Promise<boolean> => {
        try {
            const { data } = await api.post('/api/auth/login', { email, password });
            if (data.token && data.user) {
                localStorage.setItem('ugc_auth_token', data.token);
                setToken(data.token);
                setUser(data.user);
                setIsAuthModalOpen(false);
                toast.success(`Welcome back, ${data.user.name}!`);
                return true;
            }
            return false;
        } catch (error: any) {
            const msg = error?.response?.data?.message || 'Invalid email or password';
            toast.error(msg);
            return false;
        }
    };

    const register = async (name: string, email: string, password: string): Promise<boolean> => {
        try {
            const { data } = await api.post('/api/auth/register', { name, email, password });
            if (data.token && data.user) {
                localStorage.setItem('ugc_auth_token', data.token);
                setToken(data.token);
                setUser(data.user);
                setIsAuthModalOpen(false);
                toast.success(`Account created! Welcome to Create UGC Ads, ${data.user.name}!`);
                return true;
            }
            return false;
        } catch (error: any) {
            const msg = error?.response?.data?.message || 'Registration failed';
            toast.error(msg);
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem('ugc_auth_token');
        setToken(null);
        setUser(null);
        toast.success('Signed out successfully');
    };

    const setCredits = (newCredits: number) => {
        setUser((prev) => (prev ? { ...prev, credits: newCredits } : null));
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                isLoading,
                isAuthModalOpen,
                authModalMode,
                openSignIn,
                openSignUp,
                closeAuthModal,
                login,
                register,
                logout,
                refreshUser,
                setCredits
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
export const useUser = () => {
    const { user, isLoading } = useContext(AuthContext);
    return { user, isLoaded: !isLoading, isSignedIn: !!user };
};
export const useClerk = () => {
    const { openSignIn, openSignUp, logout } = useContext(AuthContext);
    return { openSignIn, openSignUp, signOut: logout };
};
