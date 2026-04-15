import { defineStore } from 'pinia'
import router from '@/router'
import AuthService from '@/services/AuthService'
import type { AuthUser, LoginRequest } from '@/interfaces/Auth'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: localStorage.getItem('token') ?? null as string | null,
        user: null as AuthUser | null,
        loading: false,
        error: null as string | null,
    }),

    getters: {
        isAuthenticated: (state) => !!state.token,
    },

    actions: {
        async login(payload: LoginRequest) {
            this.loading = true
            this.error = null

            try {
                const data = await AuthService.login(payload)

                this.token = data.token
                this.user = data.user
                localStorage.setItem('token', data.token)

                router.push('/')
            } catch (err: any) {
                this.error =
                err.response?.data?.message ??
                err.response?.data?.errors?.email?.[0] ??
                'Invalid email or password.'
            } finally {
                this.loading = false
            }
        },

        async logout() {
            try {
                await AuthService.logout()
            } catch (err: any) {

            } finally {
                this.token = null
                this.user = null
                localStorage.removeItem('token')
                router.push('/signin')
            }
        },
    },
})