import { invoke } from '@tauri-apps/api/tauri';
import { useState } from 'react';
import { TicketFormData, Ticket } from '../types/tickets.types';

export const useTicketService = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const createTicket = async (ticketData: TicketFormData): Promise<void> => {
        setLoading(true);
        setError(null);
        
        try {
            // Validação dos dados antes de enviar
            if (!ticketData.category) {
                throw new Error('A categoria é obrigatória');
            }
            if (!ticketData.description?.trim()) {
                throw new Error('A descrição é obrigatória');
            }

            await invoke('create_ticket', { ticket: ticketData });
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 
                               typeof err === 'object' && err && 'message' in err ? String(err.message) :
                               'Erro ao criar ticket';
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const getTickets = async (): Promise<Ticket[]> => {
        setLoading(true);
        setError(null);
        
        try {
            const tickets = await invoke<Ticket[]>('get_tickets');
            return tickets;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Erro ao buscar tickets';
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const updateTicket = async (ticketId: number, updates: Partial<TicketFormData>): Promise<void> => {
        setLoading(true);
        setError(null);
        
        try {
            await invoke('update_ticket', { ticketId, updates });
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Erro ao atualizar ticket';
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        error,
        createTicket,
        getTickets,
        updateTicket
    };
};
