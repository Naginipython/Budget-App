
export interface Account {
    id: number;
    title: string;
    type: string; // e.g., "$", "₿"
    envelope_id: number
};

export interface Envelope {
    id: number;
    title: string;
    balance: number;
    balance_limit: number;
    period: string; // e.g., "Biweekly", "Monthly"
    created_at: string; // ISO date string
    transactions?: Transaction[]; // Optional, if you want to include transactions in the envelope
};

export interface Transaction {
    id: number;
    title: string;
    amount: number;
    envelope_id: number;
    add_money_id: number;
    created_at: string; // ISO date string
};
