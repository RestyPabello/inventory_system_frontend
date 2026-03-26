<template>
    <div class="relative border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3 p-2">
        <div class="flex justify-between mb-4">
            <BaseButton label="Add Product" @click="openModal" />
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
        <BaseModal 
                v-model="isModalOpen" 
                title="Add New Product"
                maxWidth="max-w-4xl"
                @confirm="handleSave"
                :center-title="true"
                :is-loading="isSubmitting"
                :confirm-label="isSubmitting ? 'Saving...' : 'Save Product'"
            >
            <div class="max-h-[70vh] overflow-y-auto p-4 custom-scrollbar">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
                    <div class="md:col-span-2">
                        <BaseImageUpload 
                            label="Product Image"
                            v-model="formData.image"
                        />
                    </div>
                    <div class="space-y-4">
                        <BaseInput 
                            label="Product Name" 
                            v-model="formData.name" 
                            placeholder="e.g. Piattos" 
                        />
                        <BaseSelect 
                            label="Category" 
                            v-model="formData.category_id" 
                            :options="categoryOptions" 
                            :placeholder="'Select Category'"
                        />
                        <BaseInput 
                            label="Price" 
                            type="number" 
                            v-model="formData.price" 
                            placeholder="0.00" 
                        />
                        <BaseSelect 
                            label="Status" 
                            v-model="formData.status" 
                            :options="statusOptions" 
                            :placeholder="'Select Status'"
                        />
                        <BaseInput 
                            label="Expiration Date" 
                            type="date"
                            v-model="formData.expires_at" 
                        />
                    </div>

                    <div class="space-y-4">
                        <BaseInput 
                            label="Product Brand" 
                            v-model="formData.brand" 
                            placeholder="e.g. Rubina" 
                        />
                        <BaseSelect 
                            label="Unit" 
                            v-model="formData.unit_id" 
                            :options="unitOptions" 
                            :placeholder="'Select Unit'"
                        />
                        <BaseInput 
                            label="Unit Value" 
                            type="number" 
                            v-model="formData.value" 
                            placeholder="0.00" 
                        />
                        <BaseInput 
                            label="Quantity / Stock" 
                            type="number" 
                            v-model="formData.quantity" 
                            placeholder="0.00" 
                        />
                    <BaseInput 
                            label="Purchase Date" 
                            type="date"
                            v-model="formData.purchased_at" 
                        />
                    </div>
                    <div class="md:col-span-2">
                        <BaseTextArea 
                            label="Description"
                            v-model="formData.description"
                            placeholder="Enter description"
                        >
                        </BaseTextArea>
                    </div>
                </div>
            </div>
        </BaseModal>
    </div>
</template>

<script setup lang="ts">
    import { ref, onMounted, computed, reactive } from 'vue';
    import type { FrontendItem } from '@/types/frontend/FrontendItem';
    import { getItems, addItem } from '@/services/ItemService';
    import AppPagination from '@/components/ui/AppPagination.vue';
    import SearchBar from '@/components/layout/header/SearchBar.vue';
    import Loading from './Loading.vue';
    import NoResult from '@/components/common/NoResult.vue';
    import BaseButton from '@/components/ui/BaseButton.vue';
    import BaseModal from '@/components/ui/BaseModal.vue';
    import BaseInput from '@/components/ui/BaseInput.vue';
    import BaseTextArea from '@/components/ui/BaseTextArea.vue';
    import BaseSelect from '@/components/ui/BaseSelect.vue';
    import BaseImageUpload from '@/components/ui/BaseImageUpload.vue';

    defineOptions({
        name: 'CardComponent',
    });

    const categoryOptions = [
        { label: 'Snacks', value: 2 },
        { label: 'Drinks', value: 1 },
        { label: 'Personal Care', value: 3 },
        { label: 'Electronics', value: 4 }
    ];

    const unitOptions = [
        { label: 'Liter', value: 5 },
        { label: 'Gram', value: 1 },
        { label: 'Milliliter ', value: 2 },
        { label: 'Kilogram ', value: 6 },
    ];

    const statusOptions = [
        { label: 'Available Stock', value: 'available_stock' },
        { label: 'Low Stock', value: 'low_stock' },
        { label: 'Out of Stock', value: 'out_of_stock' }
    ];

    const formData = reactive({
        name: '',
        brand: '',
        price: 0,
        category_id: '',
        stock: '',
        quantity: 0,
        unit_id: '',
        value: '',
        status: '',
        // tags: [] as any[],
        image: null as File | null,
        description: '',
        expires_at: '',
        purchased_at: ''
    });

    const items        = ref<FrontendItem[]>([]);
    const searchText   = ref('');
    const isLoading    = ref(false);
    const currentPage  = ref(1);
    const isModalOpen  = ref(false)
    const perPage      = 10;
    const empty        = 0;
    const isSubmitting = ref(false);

    const LOW_STOCK_LEVEL    = 9;
    const OUT_OF_STOCK_LEVEL = 0;

    const fetchItems = async(searchKeyword: string = '') => {
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

    const openModal = () => {
        isModalOpen.value = true
    }

    const handleSave = async () => {
        isLoading.value    = true;
        isSubmitting.value = true;

        try {
            const newItem = await addItem(formData);
            
            console.log('Saved successfully:', newItem);
            alert('Product saved successfully!');
            
            resetFormData();
        } catch (error: any) {
            console.error('Save failed:', error);
            alert(error.response?.data?.message || 'Something went wrong while saving.');
        } finally {
            isLoading.value    = false;
            isSubmitting.value = false;
        }
    }

    const resetFormData = () => {
        Object.assign(formData, {
            name: '', brand: '', price: '', category: '', 
            quantity: 0, unit: '', value: '', status: '',
            image: null, description: '', expires_at: '', purchased_at: ''
        });
    };

</script>

<style scoped>
    .fade-enter-active, 
    .fade-leave-active { 
        transition: opacity 0.3s ease; 
    }
    .fade-enter-from, 
    .fade-leave-to { 
        opacity: 0; 
    }
</style>