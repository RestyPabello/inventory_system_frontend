import { http } from './http';
import type {  PaginatedItems, CreateItemRequest } from '@/types/frontend/FrontendItem';

export const getItems = async (search: string = '', page: number = 1): Promise<PaginatedItems> => {
    const result = await http.get('/items', { params: { search, page } });

    return {
        data: result.data.data.map(data => ({
            id: data.item_id,
            name: data.item_name,
            brand: data.item_brand ?? null,
            unit: data.unit_name ?? null,
            category: data.category_name ?? "N/A",
            image: data.image ?? null,
            description: data.description ?? null,
            price: Number(data.price) || 0,
            status: data.status ?? null,
            remaining_stock: Number(data.quantity) || 0,
            expires_at: data.expires_at ?? "",
            purchased_at: data.purchased_at ?? "",
        })),

        total: result.data.total,
        per_page: result.data.per_page,
        current_page: result.data.current_page,
        last_page: result.data.last_page,
        from: result.data.from,
        to: result.data.to,
    }
};

export const addItem = async (data: CreateItemRequest): Promise<any> => {
    const fd = new FormData();

    fd.append('name', data.name);
    fd.append('brand', data.brand);
    fd.append('price', String(data.price ?? 0));
    fd.append('category_id', String(data.category_id)); 
    fd.append('unit_id', String(data.unit_id));    
    fd.append('value', String(data.value ?? 0));
    fd.append('quantity', String(data.quantity ?? 0));
    fd.append('status', data.status ?? '');
    fd.append('expires_at', data.expires_at ?? '');
    fd.append('purchased_at', data.purchased_at ?? '');
    fd.append('item_description', data.description ?? '')
    
    if (data.image instanceof File) {
        fd.append('image', data.image);
    }

    const result = await http.post<any>('/items', fd);

    const variant = result.data.variants?.[0] || {};
    const stock   = variant.stocks?.[0] || {};

    return {
        id: result.data.id,
        name: result.data.name,
        brand: result.data.brand, 
        category_id: result.data.category_id,   
        unit_id: result.data.unit_id,
        image: variant.image_url ?? null,
        description: result.data.description ?? null,
        price: Number(variant.price) || 0,
        status: stock.status ?? null,
        quantity: Number(stock.quantity) || 0,
        expires_at: stock.expires_at ?? "",
        purchased_at: stock.purchased_at ?? "",
    };
}
