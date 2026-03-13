import { http } from './http';

export const getInventoryStats = async () => {
    const result = await http.get('/items/stats/products');

    return result.data;     
};