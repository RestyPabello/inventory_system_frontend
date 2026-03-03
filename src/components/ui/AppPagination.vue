<script setup lang="ts">

import { computed } from 'vue'

interface PaginationProps {
    currentPage: number
    totalItems: number
    perPage: number
}

const props = defineProps<PaginationProps>()
const emit = defineEmits(['update:page'])

const totalPages = computed(() =>
    Math.ceil(props.totalItems / props.perPage)
)

const changePage = (page: number) => {
    if (page >= 1 && page <= totalPages.value) {
        emit('update:page', page)
    }
}
</script>

<template>
    <div class="flex justify-center items-center gap-2 mt-6">
        <button
            @click="changePage(currentPage - 1)"
            :disabled="currentPage === 1"
            class="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-50">
                Prev
        </button>

        <span class="text-white">
            Page {{ currentPage }} of {{ totalPages }}
        </span>

        <button
            @click="changePage(currentPage + 1)"
            :disabled="currentPage === totalPages"
            class="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-50">
            Next
        </button>
    </div>
    </template>