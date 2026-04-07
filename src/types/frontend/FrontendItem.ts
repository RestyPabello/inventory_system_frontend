export interface FrontendItem {
    id: number,
    name: string,
    brand: string,
    unit: string,
    category_name: string,
    image: string | null;
    item_description: string | null;
    price: number;
    status: string | null;
    quantity: number;     
    expires_at: string;
    purchased_at: string;
}

export interface PaginatedItems {
    data: FrontendItem[]; 
    total: number;        
    per_page: number;
    current_page: number;
    last_page: number;
    from: number;
    to: number;
}

export interface CreateItemRequest {
    id: number | null;
    name: string;
    brand: string;
    unit_id: string;
    category_id: string;
    image: File | null; 
    item_description: string | null;
    price: number | string;
    status: string | null;
    quantity: number;
    item_variant_value: string | number; 
    expires_at: string;
    purchased_at: string;
}

export interface UpdateItemRequest {
    name: string;
    brand: string;
    price: number;
    category_id: number | string;
    quantity: number;
    unit_id: number | string;
    item_variant_value: string | number;
    status: string;
    item_description?: string;
    expires_at?: string;
    purchased_at?: string;
    image?: File | null; 
}

