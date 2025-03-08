<template>
  <div class="product-details">
    <div v-if="!product" class="no-product">
      <p>Product not found</p>
      <PrimeButton label="Back to Products" icon="pi pi-arrow-left" @click="goBack" />
    </div>
    <div v-else class="product-card">
      <div class="product-header">
        <h2>{{ product.title }}</h2>
        <PrimeButton icon="pi pi-arrow-left" @click="goBack" class="p-button-text" />
      </div>

      <div class="product-content">
        <div class="product-price">
          <span class="price-label">Price:</span>
          <span class="price-value">${{ product.price }}</span>
        </div>

        <div class="product-description">
          <h3>Description</h3>
          <p>{{ product.description }}</p>
        </div>
      </div>

      <div class="product-footer">
        <PrimeButton label="Back to Products" icon="pi pi-arrow-left" @click="goBack" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useProductsStore } from '../stores/products'

defineOptions({
  name: 'ProductDetails',
})

const router = useRouter()
const route = useRoute()
const productsStore = useProductsStore()

const productId = computed(() => Number(route.params.id))

const product = computed(() => {
  return productsStore.products.find((p) => p.id === productId.value) || null
})

const goBack = () => {
  router.push('/')
}
</script>

<style scoped>
.product-details {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.no-product {
  text-align: center;
  padding: 50px 0;
}

.product-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.product-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}

.product-header h2 {
  margin: 0;
  font-size: 1.8rem;
}

.product-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 20px;
}

.product-price {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  background-color: #f8f9fa;
  border-radius: 4px;
}

.price-label {
  font-weight: 600;
}

.price-value {
  font-size: 1.5rem;
  font-weight: 700;
}

.product-description {
  line-height: 1.6;
  padding: 15px;
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid #eee;
}

.product-description h3 {
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 1.2rem;
}

.product-description p {
  margin: 0;
  color: #555;
}

.product-footer {
  padding-top: 15px;
  border-top: 1px solid #eee;
}

@media (max-width: 600px) {
  .product-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .product-header button {
    align-self: flex-end;
  }
}
</style>
