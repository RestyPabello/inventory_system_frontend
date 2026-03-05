<template>
    <div class="flex flex-col items-center justify-center py-20 text-center w-full">
        <div class="text-gray-400 mb-3">
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                class="h-14 w-14 opacity-20" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
            >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
        </div>
        
        <h2 class="text-xl font-bold dark:text-white/90 text-gray-800 opacity-50">
            {{ title }}
        </h2>
        
        <p class="text-gray-500">
            {{ message }}
        </p>

        <slot name="action"></slot>
    </div>
</template>

<script setup lang="ts">
    interface Props {
        title?: string;
        message?: string;
    }

withDefaults(defineProps<Props>(), {
    title: 'No products found',
    message: 'Try adjusting your search or filters'
});
</script>