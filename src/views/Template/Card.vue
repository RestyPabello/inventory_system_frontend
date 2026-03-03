<template>
    <div class="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] p-2 justify-items-center grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3">
        <div v-for="item in paginatedItems" :key="item.id" class="card bg-base-100 w-96 shadow-sm">
            <figure>
                <img :src="item.image ?? 'https://via.placeholder.com/150'" alt="item image" />
            </figure>
            <div class="card-body bg-white text-black dark:bg-[#1D232A] dark:text-white capitalize cursor-default">
                <h2 class="card-title">
                    {{ item.name }}
                    <div class="badge badge-secondary"> {{ item.category }} </div>
                    <div class="badge badge-primary"> {{ item.brand }} </div>
                    <div 
                        class="ml-auto tooltip tooltip-left cursor-help flex items-center justify-center" 
                        :data-tip="getStockStatusText(item.remaining_stock)"
                        >
                        <span class="relative flex h-3 w-3">
                            <span 
                                v-if="shouldAnimate(item.remaining_stock)"
                                :class="getPingClass(item.remaining_stock)"
                                >
                            </span>
                            
                            <span :class="getStockClass(item.remaining_stock)"></span>
                        </span>
                    </div>
                </h2>
                <p> {{ item.description }}</p>
                <div class="card-actions justify-start"></div>
                <div class="flex gap-2">
                    <div class="badge badge-outline">Remaning stock </div>
                    <div class="badge badge-outline"> {{ item.remaining_stock }}</div>
                </div>
            </div>
        </div>
    </div>
    <AppPagination
        :currentPage="currentPage"
        :totalItems="items.length"
        :perPage="perPage"
        @update:page="currentPage = $event"
    />

   
</template>

<script setup lang="ts">
    import { ref, onMounted, computed } from 'vue';
    import type { FrontendItem } from '@/types/frontend/FrontendItem';
    import { getItems } from '@/services/itemService';
    import AppPagination from '@/components/ui/AppPagination.vue';
    

    defineOptions({
        name: 'CardComponent',
    });

    const items       = ref<FrontendItem[]>([]);
    const currentPage = ref(1);
    const perPage     = 10;

    const LOW_STOCK_LEVEL    = 9;
    const OUT_OF_STOCK_LEVEL = 0;

    onMounted(async () => {
        items.value = await getItems();
    });

    const paginatedItems = computed(() => {
        const start = (currentPage.value - 1) * perPage
        return items.value.slice(start, start + perPage)
    });

    //Animation for low stock and  out of stock items
    const shouldAnimate = (stock: number): boolean => {
        return stock <= LOW_STOCK_LEVEL;
    };

    const getPingClass = (stock: number): string => {
        const base = "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75";
        
        if (stock <= OUT_OF_STOCK_LEVEL) {
            return `${base} bg-error`; 
        }
        return `${base} bg-warning`;
    };

    const getStockStatusText = (stock: number): string => {
        switch (true) {
            case (stock <= OUT_OF_STOCK_LEVEL): 
                return 'Out of Stock';
            case (stock <= LOW_STOCK_LEVEL): 
                return 'Low Stock';
            default: 
                return 'In Stock';
        }
    };

    const getStockClass = (stock: number): string => {
        const base = "relative badge w-3 h-3 p-0 rounded-full border-none shadow-sm flex-shrink-0";
        
        switch (true) {
            case (stock <= OUT_OF_STOCK_LEVEL):
                return `${base} bg-error`;
            case (stock <= LOW_STOCK_LEVEL):
                return `${base} bg-warning animate-pulse`;
            default:
                return `${base} bg-success`;
        }
    };

    

    // const getStatusLabelClass = (stock: number): string => {
    //     const base = "text-[10px] font-black uppercase tracking-tighter opacity-70 hidden sm:block";
        
    //     switch (true) {
    //         case (stock <= OUT_OF_STOCK_LEVEL):
    //             return `${base} text-error`;
    //         case (stock <= LOW_STOCK_THRESHOLD):
    //             return `${base} text-warning`;
    //         default:
    //             return `${base} text-success`;
    //     }
    // };
</script>



