<template>
  <Transition name="toast-fade">
    <div v-if="show" class="fixed top-20 right-5 z-[100] cursor-default mt-5">
        <div 
                class="flex items-center gap-4 w-96 border-l-4 p-5 shadow-2xl rounded-lg transition-colors duration-300 bg-white text-slate-800 dark:bg-[#1D232A] dark:text-white"
                :class="type === 'success' ? 'border-l-success' : 'border-l-error'"
            >
            <div 
            class="p-3 rounded-full shrink-0"
            :class="type === 'success' ? 'bg-success/20 text-success' : 'bg-error/20 text-error'"
            >
                <svg v-if="type === 'success'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>

            <div class="flex-1">
                <h3 
                    class="font-bold text-lg" 
                    :class="type === 'success' ? 'text-success' : 'text-error'"
                >
                    {{ title }}
                </h3>
                <p class="text-sm"
                    :class="type === 'success' ? 'text-success' : 'text-error'">
                    {{ message }}
                </p>
            </div>

            <button @click="$emit('close')" class="absolute top-2 right-2 opacity-40 hover:opacity-100 transition-opacity">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
            </button>
        </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
   const props = withDefaults(defineProps<{
        show: boolean;
        type: 'success' | 'error';
        title?: string;
        message: string;
    }>(), {
        show: false,
        type: 'success',
        title: 'Notification',
        message: 'Process completed'
    });

    defineEmits(['close']);
</script>

<style scoped>
    .toast-fade-enter-active, 
    .toast-fade-leave-active { 
        transition: all 0.4s ease;
    }
    .toast-fade-enter-from { 
        transform: translateX(100%); opacity: 0; 
    }
    .toast-fade-leave-to { 
        transform: translateX(100%); opacity: 0; 
    }
</style>