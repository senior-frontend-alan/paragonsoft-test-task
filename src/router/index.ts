import { createRouter, createWebHashHistory } from 'vue-router'
import ProductsTable from '../components/ProductsTable.vue'
import ProductDetails from '../components/ProductDetails.vue'
import { useProductsStore } from '../stores/products'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
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
      beforeEnter: async (to, from, next) => {
        const productId = Number(to.params.id)
        const productsStore = useProductsStore()

        // Check if product exists via API
        const productExists = await productsStore.fetchProductById(productId)

        if (!productExists) {
          return next({
            name: 'home',
            query: {
              nonExistingRoute: 'true',
              path: to.fullPath,
            },
          })
        }

        next()
      },
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

export default router
