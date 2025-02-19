export interface IUser {
    id: number;                                     // ID do usuário
    userName: string                                // Nome de usuário
    email: string;                                  // Email do usuário
    departament: string;                            // Departamento do usuário
    role: UserRole;                                 // Função do usuário
    status: UserStatus;                             // Status do usuário
    createdDate: Date;                              // Data de criação do usuário
    cellphoneNumber: string;                        // Celular do usuário
    ramalNumber: number;                            // Ramal do usuário
    locationId: number;                             // ID da localização do usuário
}

export type UserRole = 'user' | 'technician' | 'admin';         // Função do usuário
export type UserStatus = 'active' | 'inactive';                 // Status do usuário

export interface IAuthCredentials {                             // Credenciais de autenticaçã 
    email: string;
    password: string;
}

export interface IAuthResponse {                                 // Resposta de autenticaçã 
    user: IUser;
    token: string;
    expirensIn: number;
}

export interface ITicket {                                        // Interface de ticket
    id: number;
    title: string;
    description: string;
    status: TicketStatus;
    userId: number;
    techinicianId: number;
    createdAt: Date;
    updatedAt: Date;
    category: TicketCategory;
}

export type TicketStatus = 'open' | 'closed' | 'in progress' | 'on hold';                     // Status do ticket 
export type TicketCategory = 'hardware' | 'software' | 'network' | 'service' | 'other';       // Categoria do ticket