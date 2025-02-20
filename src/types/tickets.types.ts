export interface TicketFormData {
    category: 'hardware' | 'software' | 'network' | 'printer' | 'other';
    description: string;
    priority?: 'low' | 'medium' | 'high' | 'critical';
    created_date: Date;
    problem_date: Date;
}

export interface Ticket extends TicketFormData {
    id: number;
    status: 'open' | 'in_progress' | 'resolved' | 'closed';
    userId: number;
    createdAt: Date;
    updatedAt: Date;
}

export type TicketCategory = TicketFormData['category'];
export type TicketPriority = NonNullable<TicketFormData['priority']>;
export type TicketStatus = Ticket['status'];