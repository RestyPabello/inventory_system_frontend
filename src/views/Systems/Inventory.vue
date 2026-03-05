<template>
  <AdminLayout>
    <div class="grid grid-cols-1 gap-5">
      <EcommerceMetrics></EcommerceMetrics>
      <ItemList/>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
    import AdminLayout from '@/components/layout/AdminLayout.vue';
    import EcommerceMetrics from '../../components/ecommerce/EcommerceMetrics.vue';
    import ItemList from '../Template/Card.vue';
</script>