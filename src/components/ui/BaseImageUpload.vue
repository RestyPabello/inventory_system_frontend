<template>
    <div class="w-full">
        <label v-if="label" class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
            {{ label }}
        </label>

        <div
            @dragover.prevent="isDragging = true"
            @dragleave.prevent="isDragging = false"
            @drop.prevent="handleDrop"
            @click="$refs.fileInput.click()"
            :class="[
                'relative flex flex-col items-center justify-center w-full h-44 border-2 border-dashed rounded-xl cursor-pointer transition-all gap-3',
                isDragging 
                    ? 'border-brand-500 bg-brand-50/50 dark:bg-brand-500/10' 
                    : 'border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-white/5'
            ]"
        >
            <input
                type="file"
                ref="fileInput"
                class="hidden"
                accept="image/*"
                @change="handleFileChange"
            />

            <div v-if="previewUrl" class="absolute inset-0 p-2">
                <img 
                    :src="previewUrl" 
                    class="w-full h-full object-contain rounded-lg shadow-sm" 
                    alt="Preview"
                />
                <div class="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 flex items-center justify-center rounded-lg transition-opacity">
                    <span class="text-white text-xs font-medium bg-gray-900/50 px-3 py-1.5 rounded-full">
                        Change Image
                    </span>
                </div>
            </div>

            <div v-else class="flex flex-col items-center justify-center pb-6 pt-5 text-center px-4">
                <svg class="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span class="font-semibold text-brand-600">Click to upload</span> or drag and drop
                </p>
                <p class="text-xs text-gray-400">SVG, PNG, JPG or GIF (MAX. 2MB)</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, watch } from 'vue'

    const props = defineProps({
        label: { 
            type: String, 
            default: '' 
        },
        modelValue: { 
            type: [File, null], 
            default: null 
        },
        initialPreview: { 
            type: String, 
            default: null 
        }
    });

    const emit = defineEmits(['update:modelValue'])

    const isDragging = ref(false)
    const previewUrl = ref<string | null>(null)
    const fileInput  = ref<HTMLInputElement | null>(null)

    watch(() => props.initialPreview, (newVal) => {
        previewUrl.value = newVal
    }, { 
        immediate: true 
    })
        
    const processFile = (file: File | undefined) => {
        if (!file || !file.type.startsWith('image/')) return
        
        emit('update:modelValue', file)
        previewUrl.value = URL.createObjectURL(file)
    }

    const handleFileChange = (event: Event) => {
        const target = event.target as HTMLInputElement
        processFile(target.files?.[0])
    }

    const handleDrop = (event: DragEvent) => {
        isDragging.value = false
        const file = event.dataTransfer?.files[0]
        processFile(file)
    }
</script>