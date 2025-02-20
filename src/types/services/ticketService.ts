import { invoke } from '@tauri-apps/api/tauri';
import { useState } from 'react';
import { TicketFormData, Ticket } from '../tickets.types';

export const useTicketService = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const createTicket = async (ticketData: TicketFormData): Promise<void> => {
        setLoading(true);
        setError(null);
        
        try {
            // Chamada para o backend via Tauri
            await invoke('create_ticket', { ticket: ticketData });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao criar ticket');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const getTickets = async (): Promise<Ticket[]> => {
        setLoading(true);
        setError(null);

        try {
            return await invoke('get_tickets');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao buscar tickets');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        createTicket,
        getTickets,
        loading,
        error
    };
};