import { defineStore } from 'pinia'
import router from '@/router'
import AuthService from '@/services/AuthService'
import type { AuthUser, LoginRequest } from '@/interfaces/Auth'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: localStorage.getItem('access_token') ?? null as string | null,
        user: null as AuthUser | null,
        loading: false,
        error: null as string | null,
        toastMessage: '' as string,
        toastType: 'success' as 'success' | 'error' | 'warning',
        showToast: false as boolean,
    }),

    getters: {
        isAuthenticated: (state) => !!state.token,
    },

    actions: {
        triggerToast(message: string, type: 'success' | 'error' | 'warning' = 'success') {
            this.toastMessage = message;
            this.toastType    = type;
            this.showToast    = true;

            setTimeout(() => {
                this.showToast = false;
            }, 3000);
        },

        async login(payload: LoginRequest) {
            this.loading = true
            this.error   = null

            try {
                const data = await AuthService.login(payload)

                this.token = data.access_token 
                localStorage.setItem('access_token', data.access_token)

                this.triggerToast('Successfully logged in!', 'success')

                router.push('/')
            } catch (err: any) {
                this.error =
                err.response?.data?.message ??
                err.response?.data?.errors?.email?.[0] ??
                'Invalid email or password.'

                this.triggerToast(this.error as string, 'error')
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
                localStorage.removeItem('access_token')
                router.push('/signin')
            }
        },
    },
})