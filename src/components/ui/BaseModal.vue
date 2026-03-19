<template>
    <Transition name="fade"> 
        <div v-if="modelValue" class="fixed inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto pt-10 pb-10 mt-15">
            <div 
                class="absolute inset-0 bg-slate-900/20 dark:bg-black/60 backdrop-blur-[8px]" 
                @click="$emit('update:modelValue', false)"
            >
        </div>
            <div 
                :class="[
                    'relative w-full p-8 shadow-2xl transition-all bg-white dark:bg-[#111827] rounded-3xl border border-gray-100 dark:border-gray-800',
                    maxWidth
                ]"
            >
                <div class="p-8 pb-5 flex-none border-b border-gray-100 dark:border-gray-800">
                    <h3 class="text-xl font-bold mb-4 text-slate-900 dark:text-white " 
                    :class="centerTitle ? 'text-center' : 'text-left'" >
                        {{ title }}
                    </h3>
                </div>
                
                <p v-if="description" class="text-slate-600 dark:text-slate-400 mb-6">
                    {{ description }}
                </p>

                <div class="mb-6 ">
                    <slot />
                </div>

                <div class="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
                    <button 
                        type="button"
                        @click="$emit('update:modelValue', false)" 
                        class="px-5 py-2.5 rounded-xl text-sm font-medium text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                    >
                        Cancel
                    </button>
                    
                    <BaseButton :label="confirmLabel" @click="$emit('confirm')" />
                </div>
            </div>
        </div>
    </Transition>
</template>

<script setup lang="ts">
    import BaseButton from './BaseButton.vue';

    defineProps({
        modelValue: {
			type: Boolean, 
			required: true 
		},
        title: { 
			type: String, 
			default: 'Modal Title' 
		},
        description: { 
			type: String, 
			default: '' 
		},
        confirmLabel: { 
			type: String, 
			default: 'Confirm' 
		},
        maxWidth: { 
            type: String, 
            default: 'max-w-md' 
        },
		centerTitle: { 
			type: Boolean, 
			default: false 
		}
    });

    defineEmits(['update:modelValue', 'confirm']);
</script>

<style scoped>
    .fade-enter-active, .fade-leave-active { 
        transition: opacity 0.3s ease; 
    }
    .fade-enter-from, .fade-leave-to { 
        opacity: 0; 
    }
</style>