<template>
    <ThemeProvider>
        <SidebarProvider>
            <RouterView />
            <AppToast 
                :show="authStore.showToast" 
                :type="authStore.toastType" 
                :message="authStore.toastMessage" 
                @close="authStore.showToast = false" 
            />
        </SidebarProvider>
    </ThemeProvider>
</template>

<script setup lang="ts">
    import { useAuthStore } from './stores/auth';   
    import ThemeProvider from './components/layout/ThemeProvider.vue'
    import SidebarProvider from './components/layout/SidebarProvider.vue'
    import AppToast from './components/ui/AppToast.vue';

    const authStore = useAuthStore()
</script>
