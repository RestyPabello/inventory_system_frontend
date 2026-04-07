import { http } from './http';
import type {  PaginatedItems, CreateItemRequest, UpdateItemRequest } from '@/types/frontend/FrontendItem';

export const getItems = async (search: string = '', page: number = 1): Promise<PaginatedItems> => {
    const result = await http.get('/items', { params: { search, page } });

    return {
        data: result.data.data.map(data => ({
            id: data.item_id,
            name: data.item_name,
            brand: data.item_brand ?? null,
            unit_name: data.unit_name ?? null,
            unit_id: data.unit_id,
            category_name: data.category_name ?? "N/A",
            category_id: data.category_id,
            image: data.image ?? null,
            item_variant_value:  Number(data.item_variant_value) || 0,
            item_description: data.item_description ?? null,
            price: Number(data.price) || 0,
            status: data.status ?? null,
            quantity: Number(data.quantity) || 0,
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
    fd.append('item_variant_value', String(data.item_variant_value ?? 0));
    fd.append('quantity', String(data.quantity ?? 0));
    fd.append('status', data.status ?? '');
    fd.append('expires_at', data.expires_at ?? '');
    fd.append('purchased_at', data.purchased_at ?? '');
    fd.append('item_description', data.item_description ?? '')
    
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
        item_description: result.data.item_description ?? null,
        price: Number(variant.price) || 0,
        status: stock.status ?? null,
        quantity: Number(stock.quantity) || 0,
        expires_at: stock.expires_at ?? "",
        purchased_at: stock.purchased_at ?? "",
    };
}

export const updateItem = async (id: number, data: UpdateItemRequest): Promise<any> => {
    const fd = new FormData();

    fd.append('name', data.name);
    fd.append('brand', data.brand);
    fd.append('price', String(data.price ?? 0));
    fd.append('category_id', String(data.category_id)); 
    fd.append('unit_id', String(data.unit_id));    
    fd.append('item_variant_value', String(data.item_variant_value ?? 0));
    fd.append('quantity', String(data.quantity ?? 0));
    fd.append('status', data.status ?? '');
    fd.append('expires_at', data.expires_at ?? '');
    fd.append('purchased_at', data.purchased_at ?? '');
    fd.append('item_description', data.item_description ?? '');

    if (data.image instanceof File) {
        fd.append('image', data.image);
    }

    const result = await http.put<any>(`/items/${id}`, fd);

    const variant = result.data.variants?.[0] || {};
    const stock   = variant.stocks?.[0] || {};

    return {
        id: result.data.id,
        name: result.data.name,
        brand: result.data.brand, 
        category_id: result.data.category_id,   
        unit_id: result.data.unit_id,
        image: variant.image_url ?? null,
        item_description: result.data.item_description ?? null,
        price: Number(variant.price) || 0,
        status: stock.status ?? null,
        quantity: Number(stock.quantity) || 0,
        expires_at: stock.expires_at ?? "",
        purchased_at: stock.purchased_at ?? "",
    };
}
