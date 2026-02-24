<template>
    <div class="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] p-2 justify-items-center grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3">
        <div v-for="item in items" :key="item.id" class="card bg-base-100 w-96 shadow-sm">
            <figure>
                <img :src="item.image ?? 'https://via.placeholder.com/150'" alt="item image" />
            </figure>
            <div class="card-body bg-white text-black dark:bg-[#1D232A] dark:text-white capitalize cursor-default">
                <h2 class="card-title">
                    {{ item.name }}
                    <div class="badge badge-secondary"> {{ item.category }} </div>
                    <div class="badge badge-primary"> {{ item.brand }} </div>
                </h2>
                <p> {{ item.description }}</p>
                <div class="card-actions justify-start"></div>
                 <div class="badge badge-outline">Remaning stock</div>
                <div class="badge badge-outline"> {{ item.remaining_stock }}</div>
            </div>
        </div>
    </div>


    <!-- <div
    class="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] p-2 justify-items-center grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3">  
        <div class="card bg-base-100 w-96 shadow-sm">
            <figure>
                <img
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                alt="Shoes" />
            </figure>
            <div class="card-body bg-white text-black dark:bg-[#1D232A] dark:text-white">
                <h2 class="card-title">
                Piattos
                <div class="badge badge-secondary">Food</div>
                <div class="badge badge-primary">Universal Robina</div>
                </h2>
                <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                <div class="card-actions justify-start">
                <div class="badge badge-outline">Remaning stock</div>
                <div class="badge badge-outline">15</div>
                </div>
            </div>
        </div>
        <div class="card bg-base-100 w-96 shadow-sm">
            <figure>
                <img
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                alt="Shoes" />
            </figure>
            <div class="card-body bg-white text-black dark:bg-[#1D232A] dark:text-white">
                <h2 class="card-title">
                Card Title
                <div class="badge badge-secondary">NEW</div>
                </h2>
                <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                <div class="card-actions justify-end">
                <div class="badge badge-outline">Fashion</div>
                <div class="badge badge-outline">Products</div>
                </div>
            </div>
        </div>
        <div class="card bg-base-100 w-96 shadow-sm">
            <figure>
                <img
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                alt="Shoes" />
            </figure>
            <div class="card-body bg-white text-black dark:bg-[#1D232A] dark:text-white">
                <h2 class="card-title">
                Card Title
                <div class="badge badge-secondary">NEW</div>
                </h2>
                <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                <div class="card-actions justify-end">
                <div class="badge badge-outline">Fashion</div>
                <div class="badge badge-outline">Products</div>
                </div>
            </div>
        </div>
    </div> -->
</template>




<script setup lang="ts">
    import { ref, onMounted } from 'vue';
    import type { FrontendItem } from '@/types/frontend/FrontendItem';
    import { getItems } from '@/services/itemService';

    const items = ref<FrontendItem[]>([]);

    onMounted(async () => {
        items.value = await getItems();
    });

    defineOptions({
        name: 'CardComponent',
    });
</script>



