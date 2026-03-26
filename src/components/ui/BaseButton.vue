<template>
    <button 
        class="btn rounded-xl bg-white dark:bg-white/3 text-black h-11 border-gray-200 shadow-theme-xs dark:text-white dark:border-gray-800 transition-all active:scale-95 flex items-center gap-2 px-6"
        :disabled="loading"
    >
    <slot v-if="!loading" name="icon"></slot>

    <slot>
        {{ loading && loadingLabel ? loadingLabel : label }}
    </slot>

    <span v-if="loading" class="loading loading-spinner loading-xs"></span>
  </button>
</template>

<script setup lang="ts">
    defineProps({
        label: {
            type: String,
            default: ''
        },
        loading: {
            type: Boolean,
            default: false
        },
        loadingLabel: { 
            type: String, 
            default: '' 
        }
    })
</script>