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
                <div v-for="item in items" :key="item.id" class="card bg-base-100 w-full sm:w-96 shadow-sm">
                    <figure class="p-3 dark:bg-[#1D232A] bg-white relative group overflow-hidden">
                        <img 
                            :src="item.image_url" 
                            class="w-full aspect-video object-cover" 
                            alt="item image"
                        />
                        <BaseEditButton 
                            @click="handleEdit(item)"
                            class="absolute top-5 right-5 
                                opacity-0 group-hover:opacity-100 
                                translate-y-2 group-hover:translate-y-0 
                                transition-all duration-300 shadow-xl"
                        />
                    </figure>
                    <div class="card-body bg-white text-black dark:bg-[#1D232A] dark:text-white capitalize cursor-default pl-3 pr-3">
                        <h2 class="card-title items-start">
                            <div class="flex-1 tooltip tooltip-bottom" :data-tip="item.name">
                                <span class="flex-1 line-clamp-2 cursor-help">
                                    {{ item.name }}
                                </span>
                            </div>
                            <div class="badge badge-secondary"> 
                                {{ item.category_name }} 
                            </div>
                            <div class="badge badge-primary mr-3"> 
                                {{ item.brand }} 
                            </div>
                            <div 
                                class="ml-auto tooltip tooltip-left cursor-help flex items-center justify-center mt-1.5" 
                                :data-tip="getStockStatusText(item.quantity)"
                            >
                                <span class="relative flex h-3 w-3">
                                    <span v-if="shouldAnimate(item.quantity)" :class="getPingClass(item.quantity)"></span>
                                    <span :class="getStockClass(item.quantity)"></span>
                                </span>
                            </div>
                        </h2>

                        <div class="flex-1 tooltip tooltip-bottom" :data-tip="item.item_description">
                            <p class="line-clamp-2 text-sm opacity-70 cursor-help">
                                {{ item.item_description }}
                            </p>
                        </div>

                        <div class="card-actions justify-start mt-2">
                            <div class="flex gap-2">
                                <div class="badge badge-outline">Remaning stock </div>
                                <div class="badge badge-outline"> {{ item.quantity }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="items.length > empty">
                <AppPagination
                    :currentPage="currentPage"
                    :totalItems="totalItems"
                    :perPage="perPage"
                    @update:page="handlePageChange"
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
                            :initial-preview="imagePreview"
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
                            v-model="formData.item_variant_value" 
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
                            v-model="formData.item_description"
                            placeholder="Enter description"
                        >
                        </BaseTextArea>
                    </div>
                </div>
            </div>
        </BaseModal>
    </div>

    <AppToast 
        :show="showSuccessAlert" 
        type="success" 
        :message="alertMessage" 
        @close="showSuccessAlert = false" 
    />

    <AppToast 
        :show="showErrorAlert" 
        type="error" 
        :message="alertMessage" 
        @close="showErrorAlert = false" 
    />
</template>

<script setup lang="ts">
    import { ref, onMounted, computed, reactive, watch } from 'vue';
    import type { FrontendItem } from '@/types/frontend/FrontendItem';
    import { getItems, addItem, updateItem } from '@/services/ItemService';
    import { useItemStore } from '@/stores/itemStore';
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
    import BaseEditButton from '@/components/ui/BaseEditButton.vue';
    import AppToast from '@/components/ui/AppToast.vue';

    defineOptions({
        name: 'CardComponent',
    });

    const categoryOptions = [
        { label: 'Food', value: 1 },
        { label: 'Drinks', value: 2 },
        { label: 'Persoanl Care', value: 3 },
        { label: 'Household', value: 4 },
        { label: 'Condiments', value: 5 },
        { label: 'Dairy', value: 6 },
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
        category_id: 0,
        stock: '',
        quantity: 0,
        unit_id: '',
        item_variant_value: 0,
        status: '',
        image: null as File | null,
        item_description: '',
        expires_at: '',
        purchased_at: ''
    });

    const items        = ref<FrontendItem[]>([]);
    const searchText   = ref('');
    const isLoading    = ref(false);
    const currentPage  = ref(1);
    const isModalOpen  = ref(false)
    const totalItems   = ref(0);
    const isSubmitting = ref(false);

    const showSuccessAlert = ref(false);
    const showErrorAlert   = ref(false);
    const alertMessage     = ref('');

    const isEditMode   = ref(false);
    const itemId       = ref<number | null>(null);
    const imagePreview = ref<string | null>(null);

    const itemStore = useItemStore();

    const notifySuccess = (msg: string) => {
        alertMessage.value = msg;
        showSuccessAlert.value = true;
        setTimeout(() => { showSuccessAlert.value = false; }, 3000);
    };

    const notifyError = (msg: string) => {
        alertMessage.value = msg;
        showErrorAlert.value = true;
        setTimeout(() => { showErrorAlert.value = false; }, 5000);
    };

    const perPage = 9;
    const empty   = 0;

    const LOW_STOCK_LEVEL    = 9;
    const OUT_OF_STOCK_LEVEL = 0;

    const fetchItems = async(searchKeyword: string = '') => {
        isLoading.value = true;
        try {
            const response = await getItems(searchKeyword, currentPage.value);
            const baseUrl = import.meta.env.VITE_API_URL;

            totalItems.value = response.total;

            items.value = response.data.map((item: any) => ({
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
        console.log('Component mounted!')
        fetchItems(); 
    });

    const handleSearch = () => {
        currentPage.value = 1;
        fetchItems(searchText.value); 
    };

    const handlePageChange = (newPage: number) => {
        currentPage.value = newPage;
        fetchItems(searchText.value);
    };

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
        isEditMode.value = false;
        itemId.value = null;
        resetFormData();
        isModalOpen.value = true;
    };

    const handleSave = async () => {
        isLoading.value    = true;
        isSubmitting.value = true;

        try {
            if (isEditMode.value && itemId.value) {
                await updateItem(itemId.value, formData);
                notifySuccess('Product has been updated successfully!');
            } else {
                await addItem(formData);
                notifySuccess('Product has been saved successfully!');
            }

            resetFormData();
            isModalOpen.value = false;

            currentPage.value = 1;
            await fetchItems();
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'System is busy. Please try again later.';
            notifyError(errorMessage);
        } finally {
            isLoading.value    = false;
            isSubmitting.value = false;
        }
    };

    const handleEdit = (item: any) => {
        isEditMode.value = true;
        itemId.value  = item.id; 

        Object.assign(formData, item);

        imagePreview.value = item.image_url;
        formData.image     = null; 

        isModalOpen.value = true; 
    }

    const resetFormData = () => {
        Object.assign(formData, {
            name: '', brand: '', price: '', category_id: '', 
            quantity: 0, unit: '', value: '', status: '',
            image: null, item_description: '', expires_at: '', purchased_at: ''
        });
    };

    
    const handleImageScan = async (file: File) => {
       try {
        const detected = await itemStore.scanProduct(file);
        
        if (detected) {
            formData.name  = detected.name  ?? formData.name;
            formData.brand = detected.brand ?? formData.brand;
            formData.price = detected.price ?? formData.price;
            formData.category_id = detected.category_id ?? formData.category_id;
        }
    } catch (error: any) {
            notifyError(error?.response?.data?.message ?? "Invalid image. Please upload a product image.");
        }
    };

    watch(() => formData.image, (newFile) => {
        if (newFile instanceof File) {
            handleImageScan(newFile);
        }
    });

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