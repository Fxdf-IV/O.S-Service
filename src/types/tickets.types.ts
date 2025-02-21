export interface TicketFormData {
    category: 'hardware' | 'software' | 'network' | 'printer' | 'other';
    description: string;
    priority: 'low' | 'medium' | 'high' | 'critical';
    location_id: number;
    created_at: Date;
    problem_at: Date;
    user_id: number;
}

export interface TicketForTechnician extends TicketFormData {
    id: number;
    status: 'open' | 'in_progress' | 'resolved' | 'closed';
    updated_at: Date;
    closed_at: Date;
    technician_id: number;
}

export type TicketCategory = NonNullable<TicketFormData['category']>;
export type TicketPriority = NonNullable<TicketFormData['priority']>;
export type TicketStatus = NonNullable<TicketForTechnician['status']>;