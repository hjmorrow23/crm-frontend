export interface LeadInfo {
    name: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    zip: string;
    email: string;
    phone?: string;
}

export interface Lead extends LeadInfo{
    _id?: string | Object;
    contacts?: Contact[];
    interactions?: Interaction[];
    payments?: Payment[];
    primaryContact?: Contact;
    created_at?: string;
    updated_at?: string;

}

export interface Contact {
    _id?: string | Object;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    title?: string;
    company: string | Lead | Object;
    addressLine1?: string;
    addressLine2?: string;
    city?: string;
    state?: string;
    zip?: string;
    isPrimaryContact: boolean;
    primaryContactLeadId?: string | Lead | Object;
    created_at?: string;
    updated_at?: string;
}

export interface Interaction {
    _id?: string | Object;
    label: string;
    type: string;
    description?: string;
    lead?: string | Lead | Object;
    contact?: string | Contact;
    created_at?: string;
    updated_at?: string;
}

export interface Payment {
    _id?: string | Object;
    label: string;
    description?: string;
    paymentDate: string;
    type: string;
    amount: string;
    lead?: string | Lead | Object;
    created_at?: string;
    updated_at?: string;
}