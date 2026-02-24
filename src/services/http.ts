import { api } from './api';

export const http = {
    get: async <T>(url: string) => {
        const response = await api.get<T>(url);
        return response.data;
    },

    post: async <T>(url: string, data: any) => {
        const response = await api.post<T>(url, data);
        return response.data;
    },

    put: async <T>(url: string, data: any) => {
        const response = await api.put<T>(url, data);
        return response.data;
    },

    delete: async <T>(url: string) => {
        const response = await api.delete<T>(url);
        return response.data;
    },
};