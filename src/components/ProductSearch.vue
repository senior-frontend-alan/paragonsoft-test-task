<template>
  <PrimeInputGroup class="search-input-group">
    <InputText
      v-model="productsStore.currentSearchQuery"
      placeholder="Search products..."
      @keyup.enter="search"
    />
    <PrimeButton label="Search" icon="pi pi-search" @click="search" />
  </PrimeInputGroup>
</template>

<script setup lang="ts">
import InputText from 'primevue/inputtext'
import { useProductsStore } from '../stores/products'

defineOptions({
  name: 'ProductSearch',
})

const productsStore = useProductsStore()

const search = () => {
  if (!productsStore.currentSearchQuery.trim()) {
    // If search query is empty, load all products
    productsStore.fetchProducts()
    return
  }

  productsStore.searchProducts(productsStore.currentSearchQuery)
}
</script>

<style scoped>
.search-input-group {
  max-width: 400px;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
