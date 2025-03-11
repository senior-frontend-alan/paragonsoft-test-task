import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Product } from '../types/product'

export const useProductsStore = defineStore('products', () => {
  const currentSearchQuery = ref('')
  const products = ref<Product[]>([])
  const loading = ref(false)
  const totalProducts = ref(0)
  const dataLoaded = ref(false)
  const limit = ref(30) // Default limit is 30 (API documentation)
  const currentPage = ref(1)
  const skip = ref(0)
  const error = ref<string | null>(null)
  const currentProduct = ref<Product | null>(null)

  const fetchProducts = async (page = 1, newLimit?: number) => {
    currentPage.value = page
    if (newLimit !== undefined && newLimit > 0) {
      limit.value = newLimit
    }
    skip.value = (page - 1) * limit.value

    loading.value = true
    error.value = null

    try {
      const url = `https://dummyjson.com/products?skip=${skip.value}&limit=${limit.value}`
      const response = await fetch(url)
      const data = await response.json()

      if (data && data.products) {
        products.value = data.products
        totalProducts.value = data.total || data.products.length
        dataLoaded.value = true
      } else {
        error.value = 'Invalid data format'
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err)
      console.error('Error loading data:', err)
      error.value = 'Error loading data: ' + errorMessage
    } finally {
      loading.value = false
    }
  }

  const fetchProductById = async (id: number): Promise<boolean> => {
    loading.value = true
    error.value = null

    try {
      const existingProduct = products.value.find((p) => p.id === id)
      if (existingProduct) {
        currentProduct.value = existingProduct
        return true
      }

      const url = `https://dummyjson.com/products/${id}`
      const response = await fetch(url)

      if (!response.ok) {
        error.value = `HTTP error: ${response.status}`
        return false
      }

      const data = await response.json()

      if (data && data.id) {
        currentProduct.value = data
        if (!products.value.some((p) => p.id === data.id)) {
          products.value.push(data)
        }
        return true
      } else {
        error.value = 'Invalid data format'
        return false
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err)
      console.error('Error loading product:', err)
      error.value = 'Error loading product: ' + errorMessage
      return false
    } finally {
      loading.value = false
    }
  }

  const searchProducts = async (query: string, page = 1, newLimit?: number) => {
    currentPage.value = page
    if (newLimit !== undefined && newLimit > 0) {
      limit.value = newLimit
    }
    skip.value = (page - 1) * limit.value

    currentSearchQuery.value = query

    loading.value = true

    try {
      const url = `https://dummyjson.com/products/search?q=${encodeURIComponent(query)}&skip=${skip.value}&limit=${limit.value}`
      const response = await fetch(url)
      const data = await response.json()

      products.value = data.products || []
      totalProducts.value = data.total || 0

      dataLoaded.value = true
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err)
      console.error('Error searching products:', err)
      error.value = 'Error searching products: ' + errorMessage
    } finally {
      loading.value = false
    }
  }

  return {
    products,
    loading,
    error,
    totalProducts,
    dataLoaded,
    limit,
    currentPage,
    skip,
    currentProduct,
    fetchProducts,
    fetchProductById,
    searchProducts,
    currentSearchQuery,
  }
})
