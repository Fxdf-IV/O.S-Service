import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    inputStyle, 
    selectStyle, 
    buttonStyle, 
    containerStyle, 
    cardStyle, 
    gridContainerStyle, 
    fullWidthStyle, 
    buttonContainerStyle, 
    errorAlertStyle, 
    modalOverlayStyle, 
    modalContentStyle, 
    modalButtonsStyle, 
    secondaryButtonStyle,
    helperTextStyle
} from '../styles/styles.tsx';

// Definição dos tipos
interface TicketFormData {
    category: string;
    description: string;
    created_at: Date;
    problem_at: Date;
    priority: string;
    location_id: number;
    user_id: number;
    department: string;
    phone_extension: string;
    cellphone: string;
    equipment_tag: string;
}

// Constantes
const CATEGORIES = ['hardware', 'software', 'network', 'printer', 'other'];
const PRIORITIES = ['low', 'medium', 'high'];

// Estado inicial do formulário
const INITIAL_FORM_STATE: TicketFormData = {
    category: 'other',
    description: '',
    created_at: new Date(),
    problem_at: new Date(),
    priority: 'low',
    location_id: 0,
    user_id: 0,
    department: '',
    phone_extension: '',
    cellphone: '',
    equipment_tag: '',
};

const CreateTicketPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<TicketFormData>(INITIAL_FORM_STATE);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showSuccessDialog, setShowSuccessDialog] = useState(false);
    const [showCancelDialog, setShowCancelDialog] = useState(false);
    const [equipmentInfo, setEquipmentInfo] = useState<string>('');

    // Simulação de usuário logado (substituir por contexto real)
    const [user] = useState({
        id: 1,
        department: 'TI',
        phone_extension: '1234',
        cellphone_number: '(11) 98765-4321',
        location_id: 1
    });

    // Simulação de permissões (substituir por contexto real)
    const hasPermission = (_permission: string) => {
        // Simulação: todos têm permissão para criar tickets
        return true;
    };

    // Handlers
    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }, []);

    const handleSelectChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }, []);

    const resetForm = useCallback(() => {
        setFormData(INITIAL_FORM_STATE);
    }, []);

    // Simulação de serviço de tickets (substituir por API real)
    const createTicket = async (data: TicketFormData) => {
        setLoading(true);
        setError(null);
        
        try {
            // Simulação de chamada API
            console.log('Criando ticket com os dados:', data);
            
            // Simulação de delay de processamento
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Sucesso
            setShowSuccessDialog(true);
        } catch (err) {
            console.error('Erro ao criar ticket:', err);
            setError('Ocorreu um erro ao criar o ticket. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        await createTicket(formData);
    }, [formData]);

    const handleSuccessDialogClose = useCallback((createNew: boolean) => {
        setShowSuccessDialog(false);
        if (createNew) {
            resetForm();
        } else {
            navigate('/');
        }
    }, [navigate, resetForm]);

    const handleCancel = useCallback(() => {
        if (JSON.stringify(formData) !== JSON.stringify(INITIAL_FORM_STATE)) {
            setShowCancelDialog(true);
        } else {
            navigate('/');
        }
    }, [formData, navigate]);

    // Efeito para carregar dados do usuário
    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                user_id: user.id,
                department: user.department || '',
                phone_extension: user.phone_extension || '',
                cellphone: user.cellphone_number || '',
                location_id: user.location_id || 0
            }));

            // Simulação de busca de equipamento do usuário
            const fetchEquipment = async () => {
                // Simulação de dados de equipamento
                const equipment = {
                    tag: 'PC12345',
                    type: 'Desktop',
                    model: 'Dell Optiplex 7080',
                    serial_number: 'SN123456789'
                };
                
                const equipmentDescription = `${equipment.tag} - ${equipment.type} ${equipment.model} (S/N: ${equipment.serial_number})`;
                setEquipmentInfo(equipmentDescription);
                setFormData(prev => ({
                    ...prev,
                    equipment_tag: equipment.tag
                }));
            };

            fetchEquipment();
        }
    }, [user]);

    // Verificação de permissão
    if (!hasPermission('create_ticket')) {
        return (
            <div style={containerStyle}>
                <div style={errorAlertStyle}>
                    Você não tem permissão para criar tickets.
                </div>
            </div>
        );
    }

    return (
        <div style={containerStyle}>
            <div style={cardStyle}>
                <h2 style={{ marginBottom: '20px' }}>Novo Ticket</h2>

                {error && (
                    <div style={errorAlertStyle}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div style={gridContainerStyle}>
                        <div style={fullWidthStyle}>
                            <label>Descrição do Problema</label>
                            <textarea
                                required
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                style={{ ...inputStyle, height: '100px' }}
                            />
                        </div>

                        <div>
                            <label>Categoria</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleSelectChange}
                                style={selectStyle}
                                required
                            >
                                {CATEGORIES.map(category => (
                                    <option key={category} value={category}>
                                        {category.charAt(0).toUpperCase() + category.slice(1)}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label>Prioridade</label>
                            <select
                                name="priority"
                                value={formData.priority}
                                onChange={handleSelectChange}
                                style={selectStyle}
                                required
                            >
                                {PRIORITIES.map(priority => (
                                    <option key={priority} value={priority}>
                                        {priority.charAt(0).toUpperCase() + priority.slice(1)}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label>Departamento</label>
                            <input
                                type="text"
                                name="department"
                                value={formData.department}
                                onChange={handleInputChange}
                                style={inputStyle}
                                disabled={!hasPermission('manage_users')}
                            />
                        </div>

                        <div>
                            <label>Ramal</label>
                            <input
                                type="text"
                                name="phone_extension"
                                value={formData.phone_extension}
                                onChange={handleInputChange}
                                style={inputStyle}
                                disabled={!hasPermission('manage_users')}
                            />
                        </div>

                        <div>
                            <label>Celular</label>
                            <input
                                type="text"
                                name="cellphone"
                                value={formData.cellphone}
                                onChange={handleInputChange}
                                style={inputStyle}
                                disabled={!hasPermission('manage_users')}
                            />
                        </div>

                        <div>
                            <label>Identificação do Equipamento</label>
                            <input
                                type="text"
                                name="equipment_tag"
                                value={formData.equipment_tag}
                                onChange={handleInputChange}
                                style={inputStyle}
                                disabled={!hasPermission('manage_users')}
                            />
                            {equipmentInfo && (
                                <small style={helperTextStyle}>
                                    {equipmentInfo}
                                </small>
                            )}
                        </div>

                        <div style={fullWidthStyle}>
                            <div style={buttonContainerStyle}>
                                <button
                                    type="submit"
                                    style={buttonStyle}
                                    disabled={loading}
                                >
                                    {loading ? 'Criando...' : 'Confirmar'}
                                </button>

                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    style={{ ...buttonStyle, backgroundColor: '#dc3545' }}
                                    disabled={loading}
                                >
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            {/* Diálogo de Sucesso */}
            {showSuccessDialog && (
                <div style={modalOverlayStyle}>
                    <div style={modalContentStyle}>
                        <h3>Ticket Criado com Sucesso!</h3>
                        <p>O que você deseja fazer agora?</p>
                        <div style={modalButtonsStyle}>
                            <button 
                                onClick={() => handleSuccessDialogClose(true)}
                                style={secondaryButtonStyle}
                            >
                                Criar Novo Ticket
                            </button>
                            <button 
                                onClick={() => handleSuccessDialogClose(false)}
                                style={buttonStyle}
                            >
                                Voltar para a Página Inicial
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Diálogo de Confirmação de Cancelamento */}
            {showCancelDialog && (
                <div style={modalOverlayStyle}>
                    <div style={modalContentStyle}>
                        <h3>Confirmar Cancelamento</h3>
                        <p>Você tem certeza que deseja cancelar? Todas as informações inseridas serão perdidas.</p>
                        <div style={modalButtonsStyle}>
                            <button 
                                onClick={() => setShowCancelDialog(false)}
                                style={secondaryButtonStyle}
                            >
                                Não, Continuar Editando
                            </button>
                            <button 
                                onClick={() => {
                                    setShowCancelDialog(false);
                                    navigate('/');
                                }}
                                style={{ ...buttonStyle, backgroundColor: '#dc3545' }}
                            >
                                Sim, Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreateTicketPage;