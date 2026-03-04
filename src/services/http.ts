import { api } from './api';

export const http = {
    get: async <T>(url: string, config?: any) => {
        const response = await api.get<T>(url, config);
        return response.data;
    },
    post: async <T>(url: string, data?: any, config?: any) => {
        const response = await api.post<T>(url, data, config);
        return response.data;
    },
    put: async <T>(url: string, data?: any, config?: any) => {
        const response = await api.put<T>(url, data, config);
        return response.data;
    },
    delete: async <T>(url: string, config?: any) => {
        const response = await api.delete<T>(url, config);
        return response.data;
    }
};