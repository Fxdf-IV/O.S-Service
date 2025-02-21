import React, { createContext, useContext, useState, useCallback } from 'react';
import { invoke } from '@tauri-apps/api/tauri';

interface UserData {
    id: number;
    user_name: string;
    email: string;
    user_status: string;
    cellphone_number: string;
    role: string;
}

interface UserContextType {
    user: UserData | null;
    loading: boolean;
    error: string | null;
    fetchUserData: (userId: number) => Promise<void>;
    clearUser: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchUserData = useCallback(async (userId: number) => {
        setLoading(true);
        setError(null);
        try {
            const userData = await invoke<UserData>('get_user_data', { userId });
            setUser(userData);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Erro ao buscar dados do usuário';
            setError(errorMessage);
            setUser(null);
        } finally {
            setLoading(false);
        }
    }, []);

    const clearUser = useCallback(() => {
        setUser(null);
        setError(null);
    }, []);

    return (
        <UserContext.Provider value={{ user, loading, error, fetchUserData, clearUser }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser deve ser usado dentro de um UserProvider');
    }
    return context;
}
