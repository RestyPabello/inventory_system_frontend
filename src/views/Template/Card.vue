<template>
    <div class="relative  border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3 p-2 ">
        <div class="flex justify-center lg:justify-end mb-4">
            <SearchBar 
                class="w-full xl:w-[480px]"
                v-model="searchText"
                @search="handleSearch" 
                placeholderText="Search products..."
            />
        </div>
        <div v-if="isLoading" class="flex h-64 w-full items-center justify-center">
            <Loading /> 
        </div>
        <div v-else> 
            <div class="rounded-xl justify-items-center grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 mt-5 gap-y-6">
                <div v-for="item in paginatedItems" :key="item.id" class="card bg-base-100 w-full sm:w-96 shadow-sm">
                    <figure class="p-3 dark:bg-[#1D232A] bg-white">
                        <img 
                            :src="item.image_url" 
                            class="w-full aspect-video object-cover" 
                            alt="item image"
                        />
                    </figure>
                    <div class="card-body bg-white text-black dark:bg-[#1D232A] dark:text-white capitalize cursor-default pl-3 pr-3">
                        <h2 class="card-title items-start">
                            <span class="flex-1">{{ item.name }}</span>
                            <div class="badge badge-secondary"> {{ item.category }} </div>
                            <div class="badge badge-primary mr-3"> {{ item.brand }} </div>
                            <div 
                                class="ml-auto tooltip tooltip-left cursor-help flex items-center justify-center mt-1.5" 
                                :data-tip="getStockStatusText(item.remaining_stock)"
                            >
                                <span class="relative flex h-3 w-3">
                                    <span v-if="shouldAnimate(item.remaining_stock)" :class="getPingClass(item.remaining_stock)"></span>
                                    <span :class="getStockClass(item.remaining_stock)"></span>
                                </span>
                            </div>
                        </h2>

                        <p class="line-clamp-2 text-sm opacity-70"> {{ item.description }}</p>

                        <div class="card-actions justify-start mt-2">
                            <div class="flex gap-2">
                                <div class="badge badge-outline">Remaning stock </div>
                                <div class="badge badge-outline"> {{ item.remaining_stock }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="paginatedItems.length > empty">
                <AppPagination
                    :currentPage="currentPage"
                    :totalItems="items.length"
                    :perPage="perPage"
                    @update:page="currentPage = $event"
                    class="mb-3 mt-10"
                />
            </div>
            <div v-else class="flex flex-col items-center justify-center py-20 text-center">
                <NoResult  />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, onMounted, computed } from 'vue';
    import type { FrontendItem } from '@/types/frontend/FrontendItem';
    import { getItems } from '@/services/ItemService';
    import AppPagination from '@/components/ui/AppPagination.vue';
    import SearchBar from '@/components/layout/header/SearchBar.vue';
    import Loading from './Loading.vue';
    import NoResult from '@/components/common/NoResult.vue';

    defineOptions({
        name: 'CardComponent',
    });

    const items       = ref<FrontendItem[]>([]);
    const searchText  = ref('');
    const isLoading   = ref(false);
    const currentPage = ref(1);
    const perPage     = 9;
    const empty       = 0;

    const LOW_STOCK_LEVEL    = 9;
    const OUT_OF_STOCK_LEVEL = 0;

    const fetchItems = async (searchKeyword: string = '') => {
        isLoading.value = true;
        try {
            const response = await getItems(searchKeyword);
            const baseUrl = import.meta.env.VITE_API_URL;

            items.value = response.map((item: any) => ({
                ...item,
                image_url: item.image 
                    ? `${baseUrl}/storage/${item.image}` 
                    : 'https://placehold.co/600x400?font=roboto'
            }));
        } catch (error) {
            console.error("Error fetching items:", error);
        } finally {
            isLoading.value = false;
        }
    };

    onMounted(() => {
        fetchItems(); 
    });

    const handleSearch = () => {
        fetchItems(searchText.value); 
    };
    
    const paginatedItems = computed(() => {
        const start = (currentPage.value - 1) * perPage
        return items.value.slice(start, start + perPage)
    });

 
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
</script>


