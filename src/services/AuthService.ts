import { http } from './http'
import type { LoginRequest, LoginResponse } from '@/types/frontend/Auth'

const AuthService = {
    async login(payload: LoginRequest): Promise<LoginResponse> {
        return await http.post<LoginResponse>('/users/login', payload)
    },

    async logout(): Promise<void> {
        await http.post('/users/logout')
    },
}

export default AuthService