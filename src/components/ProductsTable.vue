<template>
  <div class="products-table-container">
    <h1>Products</h1>
    <div class="total-products-info">
      Total products in database: <strong>{{ totalProducts }}</strong>
    </div>

    <ProductSearch />

    <div v-if="loading" class="loading-indicator">Loading products...</div>

    <div v-else-if="error" class="error-message">
      {{ error }}
    </div>

    <div v-else>
      <PrimeDataTable
        :value="products"
        :paginator="true"
        :rows="limit"
        :totalRecords="totalProducts"
        :lazy="true"
        :loading="loading"
        :first="(currentPage - 1) * limit"
        @page="onPageChange($event)"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        :rowsPerPageOptions="[10, 20, 30, 50]"
        tableStyle="min-width: 50rem"
        selectionMode="single"
        @rowClick="onRowClick"
        class="cursor-pointer"
      >
        <PrimeColumn field="title" header="Name"></PrimeColumn>
        <PrimeColumn field="description" header="Description"></PrimeColumn>
        <PrimeColumn field="price" header="Price" style="white-space: nowrap">
          <template #body="slotProps">
            {{ formatPrice(slotProps.data.price) }}
          </template>
        </PrimeColumn>
      </PrimeDataTable>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed, defineAsyncComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useProductsStore } from '../stores/products'
import type { Product } from '../types/product'

const ProductSearch = defineAsyncComponent(() => import('./ProductSearch.vue'))

const router = useRouter()
const productsStore = useProductsStore()

const products = computed(() => productsStore.products)
const loading = computed(() => productsStore.loading)
const error = computed(() => productsStore.error)
const totalProducts = computed(() => productsStore.totalProducts)
const limit = computed(() => productsStore.limit)
const currentPage = computed(() => productsStore.currentPage)

// Format price as $1 000.00
const formatPrice = (price: number): string => {
  const fixedPrice = price.toFixed(2)
  // Add space as thousands separator
  const formattedPrice = fixedPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  return `$ ${formattedPrice}`
}

interface PaginationEvent {
  page: number
  rows: number
  pageCount: number
  first: number
}

interface RowClickEvent {
  data: Product
  index: number
  originalEvent: MouseEvent
}

const onPageChange = (event: PaginationEvent) => {
  const page = event.page + 1 // PrimeVue pagination is 0-based
  const pageSize = event.rows

  if (productsStore.currentSearchQuery.trim()) {
    productsStore.searchProducts(productsStore.currentSearchQuery, page, pageSize)
  } else {
    productsStore.fetchProducts(page, pageSize)
  }
}

const onRowClick = (event: RowClickEvent) => {
  const productId = event.data.id
  router.push({
    name: 'product-details',
    params: { id: productId }
  })
}

// Load products when component is mounted
onMounted(() => {
  if (!productsStore.dataLoaded) {
    productsStore.fetchProducts()
  }
})
</script>
