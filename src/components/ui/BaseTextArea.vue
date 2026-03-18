<template>
  <div>
    <label v-if="label" class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
      {{ label }}
    </label>
    <textarea
        :placeholder="placeholder"
        :rows="rows"
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
        class="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 transition-all resize-none"
    >
    </textarea>
  </div>
</template>

<script setup lang="ts">
    defineProps({
        label: { 
            type: String, default: '' 
        },
        placeholder: { 
            type: String, default: 'Enter description...' 
        },
        rows: { 
            type: [String, Number], default: 4 
        },
        modelValue: { 
            type: String, default: '' 
        }
    });

    defineEmits(['update:modelValue']);
</script>