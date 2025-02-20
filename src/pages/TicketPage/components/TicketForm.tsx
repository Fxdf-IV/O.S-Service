import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTicketService } from '../../../types/services/ticketService';
import { Alert, Button, FormControl, InputLabel, MenuItem, Select, TextField, Stack, Dialog, DialogTitle, DialogContent, DialogActions, SelectChangeEvent } from '@mui/material';
import { TicketFormData, TicketCategory } from '../../../types/tickets.types';

const INITIAL_FORM_STATE: TicketFormData = {
    category: 'other',
    description: '',
    created_date: new Date(),
    problem_date: new Date()
};

const CATEGORIES: TicketCategory[] = ['hardware', 'software', 'network', 'printer', 'other'];

export const TicketForm: React.FC = () => {
    const navigate = useNavigate();
    const { createTicket, loading, error } = useTicketService();
    const [formData, setFormData] = useState<TicketFormData>(INITIAL_FORM_STATE);
    const [showSuccessDialog, setShowSuccessDialog] = useState(false);

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
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

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={loading}
                        fullWidth
                    >
                        {loading ? 'Criando...' : 'Criar Ticket'}
                    </Button>
                </Stack>
            </div>

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
        </Stack>
    );
};