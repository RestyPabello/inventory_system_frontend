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