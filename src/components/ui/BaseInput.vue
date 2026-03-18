<template>
  <div>
    <label v-if="label" class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
        {{ label }}
    </label>
    
    <input
        :type="type"
        :placeholder="placeholder"
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 transition-all"
    />
  </div>
</template>

<script setup lang="ts">
    defineProps({
        label: { 
            type: String, 
            default: '' 
        },
        placeholder: {
            type: String, 
            default: '' 
        },
        type: { 
            type: String, 
            default: 'text' 
        },
        modelValue: { 
            type: [String, Number],
            default: '' 
        } 
    });

    defineEmits(['update:modelValue']);
</script>