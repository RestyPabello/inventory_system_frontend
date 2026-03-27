export interface FrontendItem {
    id: number,
    name: string,
    brand: string,
    unit: string,
    category: string,
    image: string | null;
    description: string | null;
    price: number;
    status: string | null;
    remaining_stock: number;     
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
    description: string | null;
    price: number | string;
    status: string | null;
    quantity: number;
    value: string | number; 
    expires_at: string;
    purchased_at: string;
}