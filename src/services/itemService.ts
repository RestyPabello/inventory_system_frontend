import { http } from './http';
import type { Item } from '@/types/backend/Item';
import type { FrontendItem } from '@/types/frontend/FrontendItem';

export const getItems = async (): Promise<FrontendItem[]> => {
    const result = await http.get<Item[]>('/items');

    return result.data.data.map(data => ({
        id: data.item_id,
        name: data.item_name,
        brand: data.item_brand ?? null,
        unit: data.unit_name ?? null,
        category: data.category_name ?? "N/A",
        image: data.image ?? null,
        description: data.description ?? null,
        price: data.price ?? 0,
        status: data.status ?? null,
        remaining_stock: data.quantity ?? 0,
        expires_at: data.expires_at ?? "",
        purchased_at: data.purchased_at ?? "",
    }));
};
