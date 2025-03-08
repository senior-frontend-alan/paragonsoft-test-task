import { createRouter, createWebHistory } from 'vue-router'
import ProductsTable from '../components/ProductsTable.vue'
import ProductDetails from '../components/ProductDetails.vue'
import { useProductsStore } from '../stores/products'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ProductsTable,
    },
    {
      path: '/product/:id',
      name: 'product-details',
      component: ProductDetails,
      // Add metadata for product verification
      meta: { requiresProduct: true },
    },
    // Redirect to home page if route doesn't exist
    {
      path: '/:pathMatch(.*)*',
      redirect: (to) => {
        return { path: '/', query: { nonExistingRoute: 'true', path: to.path } }
      },
    },
  ],
})

// Hook for checking if product exists
router.beforeEach(async (to, from, next) => {
  // Only check routes that require a product
  if (to.meta.requiresProduct) {
    const productId = Number(to.params.id)
    const productsStore = useProductsStore()

    // If data is not loaded yet, load it
    if (!productsStore.dataLoaded) {
      await productsStore.fetchProducts()
    }

    const productExists = productsStore.products.some((p) => p.id === productId)

    if (!productExists) {
      return next({
        path: '/',
        query: {
          nonExistingRoute: 'true',
          path: `/product/${productId}`,
        },
      })
    }
  }

  next()
})

export default router
