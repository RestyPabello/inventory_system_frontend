<template>
    <div class="relative" ref="multiSelectRef">
        <label v-if="label" class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
            {{ label }}
        </label>

        <div
            @click="toggleDropdown"
            class="dark:bg-dark-900 min-h-[44px] flex items-center w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2 text-sm text-gray-800 shadow-theme-xs cursor-pointer transition-all"
            :class="[
                isOpen ? 'border-brand-300 ring-3 ring-brand-500/10' : 'dark:border-gray-700',
            ]"
        >
            <span v-if="modelValue.length === 0" class="text-gray-400">
                {{ placeholder }}
            </span>
            
            <div class="flex flex-wrap items-center flex-auto gap-2">
                <div
                    v-for="item in modelValue"
                    :key="String(item.value)"
                    class="group flex items-center h-[26px] rounded-full bg-gray-100 py-1 pl-2.5 pr-1.5 text-xs font-medium text-gray-800 dark:bg-gray-800 dark:text-white/90"
                >
                    <span>{{ item.label }}</span>
                    <button
                        type="button"
                        @click.stop="removeItem(item)"
                        class="ml-1 text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors"
                    >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M3.40717 4.46881L6.99943 5.93975L10.5916 4.46888M3.40717 9.53201L6.99943 7.00041L10.5916 9.53193" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                        <path d="M10.5916 3.40822L6.99943 5.93975L3.40717 3.40815M10.5916 10.5926L6.99943 8.06107L3.40717 10.5927" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                        </svg>
                    </button>
                </div>
            </div>

            <svg
                class="ml-2 transition-transform duration-200 text-gray-500"
                :class="{ 'rotate-180': isOpen }"
                width="20" height="20" viewBox="0 0 20 20" fill="none"
            >
                <path d="M4.79175 7.39551L10.0001 12.6038L15.2084 7.39551" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        </div>

        <transition
            enter-active-class="transition duration-100 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-in"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0"
        >
            <div 
                v-if="isOpen" 
                class="absolute z-50 w-full mt-1 bg-white rounded-lg shadow-xl border border-gray-100 dark:bg-gray-900 dark:border-gray-800"
            >
                <ul class="overflow-y-auto max-h-60 p-1 custom-scrollbar">
                    <li
                        v-for="option in options"
                        :key="String(option.value)"
                        @click="toggleItemSelection(option)"
                        class="flex items-center justify-between px-3 py-2 rounded-md cursor-pointer text-sm transition-colors dark:text-white hover:bg-gray-100 dark:hover:bg-white/5"
                        :class="{ 'bg-brand-50/50 dark:bg-brand-500/10 text-brand-600 font-medium': isSelected(option) }"
                    >
                        <span>{{ option.label }}</span>
                        <svg v-if="isSelected(option)" class="w-4 h-4 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
                        </svg>
                    </li>
                </ul>
            </div>
        </transition>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

    interface Option {
        label: string;
        value: string | number;
    }

    const props = defineProps({
        label: {
            type: String, 
            default: '' 
        },
        placeholder: {
            type: String, 
            default: 'Select items...'
        },
        options: {
            type: Array as () => Option[],
            required: true,
        },
        modelValue: {
            type: Array as () => Option[],
            default: () => [],
        },
    })

    const emit = defineEmits(['update:modelValue'])

    const isOpen = ref(false)
    const multiSelectRef = ref<HTMLElement | null>(null)

    const toggleDropdown = () => (isOpen.value = !isOpen.value)

    const toggleItemSelection   = (item) => {
        const currentSelection  = [...props.modelValue];
        const isAlreadySelected = currentSelection.some(selected => selected.value === item.value);

        if (isAlreadySelected) {
            const updatedSelection = currentSelection.filter(selected => selected.value !== item.value);
            emit('update:modelValue', updatedSelection);
        } else {
            const updatedSelection = [...currentSelection, item];
            emit('update:modelValue', updatedSelection);
        }
    }

    const removeItem = (item: Option) => {
        const newValue = props.modelValue.filter((selected) => selected.value !== item.value)
        emit('update:modelValue', newValue)
    }

    const isSelected = (item: Option) => {
        return props.modelValue.some((selected) => selected.value === item.value)
    }

    const handleClickOutside = (event: MouseEvent) => {
    if (multiSelectRef.value && !multiSelectRef.value.contains(event.target as Node)) {
        isOpen.value = false
    }
    }

    onMounted(() => document.addEventListener('click', handleClickOutside))
    onBeforeUnmount(() => document.removeEventListener('click', handleClickOutside))
</script>