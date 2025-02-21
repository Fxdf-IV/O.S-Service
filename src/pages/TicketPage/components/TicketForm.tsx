import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTicketService } from '../../../types/services/ticketService';
import { Alert, Button, FormControl, InputLabel, MenuItem, Select, TextField, Stack, Dialog, DialogTitle, DialogContent, DialogActions, SelectChangeEvent } from '@mui/material';
import { TicketFormData, TicketCategory } from '../../../types/tickets.types';

const INITIAL_FORM_STATE: TicketFormData = {
    category: 'other',
    description: '',
    created_at: new Date(),
    problem_at: new Date(),
    priority: 'high',
    location_id: 0,
    user_id: 0,
};

const CATEGORIES: TicketCategory[] = ['hardware', 'software', 'network', 'printer', 'other'];

export const TicketForm: React.FC = () => {
    const navigate = useNavigate();
    const { createTicket, loading, error } = useTicketService();
    const [formData, setFormData] = useState<TicketFormData>(INITIAL_FORM_STATE);
    const [showSuccessDialog, setShowSuccessDialog] = useState(false);
    const [showCancelDialog, setShowCancelDialog] = useState(false);

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target as HTMLInputElement;
        const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
        
        setFormData(prev => ({
            ...prev,
            [name]: newValue
        }));
    }, []);

    const handleSelectChange = useCallback((e: SelectChangeEvent<TicketCategory>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }, []);

    const resetForm = useCallback(() => {
        setFormData(INITIAL_FORM_STATE);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
            await createTicket({
                ...formData,
                priority: 'low' // Default priority
            });
            setShowSuccessDialog(true);
        } catch (error) {
            console.error('Erro ao criar ticket:', error);
        }
    };

    const handleSuccessDialogClose = (createNew: boolean) => {
        setShowSuccessDialog(false);
        if (createNew) {
            resetForm();
        } else {
            navigate('/');
        }
    };

    const handleCancel = () => {
        // Se o formulário foi modificado, mostra o diálogo de confirmação
        if (JSON.stringify(formData) !== JSON.stringify(INITIAL_FORM_STATE)) {
            setShowCancelDialog(true);
        } else {
            // Se não houve modificações, volta direto para a página inicial
            navigate('/');
        }
    };

    return (
        <Stack component="form" onSubmit={handleSubmit} spacing={3} className="ticket-container">
            <div className="ticket-box">
                <h2>Novo Ticket</h2>

                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}

                <Stack spacing={2}>
                    <TextField
                        required
                        fullWidth
                        multiline
                        rows={4}
                        name="description"
                        label="Descrição"
                        value={formData.description}
                        onChange={handleInputChange}
                    />

                    <FormControl fullWidth required>
                        <InputLabel>Categoria</InputLabel>
                        <Select
                            name="category"
                            value={formData.category}
                            label="Categoria"
                            onChange={handleSelectChange}
                        >
                            {CATEGORIES.map(category => (
                                <MenuItem key={category} value={category}>
                                    {category.charAt(0).toUpperCase() + category.slice(1)}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <Stack direction="row" spacing={2}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={loading}
                            fullWidth
                        >
                            {loading ? 'Criando...' : 'Confirmar'}
                        </Button>

                        <Button
                            type="button"
                            variant="outlined"
                            color="error"
                            disabled={loading}
                            fullWidth
                            onClick={handleCancel}
                        >
                            Cancelar
                        </Button>
                    </Stack>
                </Stack>
            </div>

            {/* Diálogo de Sucesso */}
            <Dialog open={showSuccessDialog} onClose={() => handleSuccessDialogClose(false)}>
                <DialogTitle>Ticket Criado com Sucesso!</DialogTitle>
                <DialogContent>
                    O que você deseja fazer agora?
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleSuccessDialogClose(true)}>
                        Criar Novo Ticket
                    </Button>
                    <Button onClick={() => handleSuccessDialogClose(false)} autoFocus>
                        Voltar para a Página Inicial
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Diálogo de Confirmação de Cancelamento */}
            <Dialog open={showCancelDialog} onClose={() => setShowCancelDialog(false)}>
                <DialogTitle>Confirmar Cancelamento</DialogTitle>
                <DialogContent>
                    Você tem certeza que deseja cancelar? Todas as informações inseridas serão perdidas.
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setShowCancelDialog(false)}>
                        Não, Continuar Editando
                    </Button>
                    <Button 
                        onClick={() => {
                            setShowCancelDialog(false);
                            navigate('/');
                        }} 
                        color="error" 
                        autoFocus
                    >
                        Sim, Cancelar
                    </Button>
                </DialogActions>
            </Dialog>
        </Stack>
    );
};