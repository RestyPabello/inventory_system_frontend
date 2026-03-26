<template>
    <div>
        <label v-if="label" class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
            {{ label }}
        </label>
        <div class="relative">
            <flat-pickr
                v-if="type === 'date'"
                :model-value="modelValue"
                @update:model-value="$emit('update:modelValue', $event)"
                :config="flatpickrConfig"
                :placeholder="placeholder || 'Select Date'"
                class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 transition-all"
            />

            <input
                v-else
                :type="type"
                :placeholder="placeholder"
                :value="modelValue"
                @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
                class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 transition-all"
            />

            <div 
                v-if="type === 'date'" 
                class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 dark:text-white/30 "
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import flatPickr from 'vue-flatpickr-component';
    import 'flatpickr/dist/flatpickr.css';

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

    const flatpickrConfig = {
        dateFormat: 'Y-m-d',
        altInput: true, 
        altFormat: 'F j, Y',
        allowInput: false, 
        altInputClass: 'cursor-pointer dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 pr-10 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 transition-all',
    };
</script>

<style>

.dark .flatpickr-monthDropdown-months,
.dark .flatpickr-monthDropdown-month {
    background-color: #101828 !important; 
    color: #ffffff !important;
}

.flatpickr-monthDropdown-months:focus {
    outline: none !important;
}
</style>