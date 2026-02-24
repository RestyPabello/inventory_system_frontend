<template>
  <ul class="mt-2 space-y-1 ml-9">
    <li v-for="(subItem, i) in items" :key="subItem.name">
        <div v-if="subItem.subItems">
            <button
            @click="toggle(subItem)"
            class="menu-dropdown-item flex items-center justify-between w-full"
            >
            <span>{{ subItem.name }}</span>
            <ChevronDownIcon
                class="w-4 h-4 transition-transform"
                :class="{ 'rotate-180': openItem === subItem.name }"
            />
            </button>
            <transition name="fade">
            <SidebarSubmenu
                v-show="openItem === subItem.name"
                :items="subItem.subItems"
            />
            </transition>
        </div>
      <router-link
            v-else
            :to="subItem.path"
            :class="[
            'menu-dropdown-item',
            {
                'menu-dropdown-item-active': isActive(subItem.path),
                'menu-dropdown-item-inactive': !isActive(subItem.path),
            },
            ]"
        >
        {{ subItem.name }}
        <span class="flex items-center gap-1 ml-auto">
            <span
                v-if="subItem.new"
                class="menu-dropdown-badge"
            >
                new
            </span>
            <span
                v-if="subItem.pro"
                class="menu-dropdown-badge"
            >
                pro
            </span>
        </span>
      </router-link>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import { ChevronDownIcon } from "@/icons";

defineProps<{ items: any[] }>();

const route = useRoute();
const openItem = ref<string | null>(null);

const isActive = (path: string) => route.path === path;
const toggle = (item: any) => {
  openItem.value = openItem.value === item.name ? null : item.name;
};
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: all 0.2s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
