<template>
    <button 
        @click.stop="$emit('click')" 
        type="button"
        class="p-2 rounded-full shadow-lg border transition-all duration-300 transform
            bg-white/80 text-slate-900 border-white/20 backdrop-blur-md
            dark:bg-slate-800/60 dark:text-white dark:border-slate-700/50 dark:backdrop-blur-lg
            hover:scale-110 active:scale-95 hover:bg-white dark:hover:bg-slate-700"
        title="Edit"
    >
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" viewBox="0 0 24 24" 
            stroke-width="1.5" 
            stroke="currentColor" 
            class="size-5"
        >
            <path 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" 
            />
        </svg>
    </button>
</template>

<script setup lang="ts">
    defineEmits(['click']);
</script>