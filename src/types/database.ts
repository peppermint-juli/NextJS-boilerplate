import type { Database } from './supabase';

// Extract table types for easier use
export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];
export type TablesInsert<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert'];
export type TablesUpdate<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update'];

// Specific types for your tables
export type Item = Tables<'Items'>;
export type Payment = Tables<'Payments'>;

// Insert and update types
export type ItemInsert = TablesInsert<'Items'>;
export type ItemUpdate = TablesUpdate<'Items'>;
export type PaymentInsert = TablesInsert<'Payments'>;
export type PaymentUpdate = TablesUpdate<'Payments'>;
