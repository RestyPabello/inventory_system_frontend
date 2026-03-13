<template>
  <AdminLayout>
    <div class="grid grid-cols-1 gap-5">
      <Statistics></Statistics>
      <ItemList/>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
    import AdminLayout from '@/components/layout/AdminLayout.vue';
    import Statistics from '@/components/Inventory/Statistics.vue';
    import ItemList from '../Template/Card.vue';
</script>