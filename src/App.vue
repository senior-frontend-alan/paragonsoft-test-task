<template>
  <div class="app-container">
    <main class="app-content">
      <PrimeToast position="top-right" />
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import { useToast } from 'primevue/usetoast'
import { useRoute, useRouter } from 'vue-router'
import { watch, onMounted } from 'vue'

const toast = useToast()
const route = useRoute()
const router = useRouter()

const showNonExistingRouteMessage = () => {
  if (route.query.nonExistingRoute === 'true') {
    const path = route.query.path || ''
    toast.add({
      severity: 'error',
      summary: 'Route Error',
      detail: `Route "${path}" does not exist`,
      life: 3000,
    })

    setTimeout(() => {
      router.replace({ path: '/', query: {} })
    }, 100)
  }
}

onMounted(() => {
  showNonExistingRouteMessage()
})

watch(
  () => route.query,
  () => {
    showNonExistingRouteMessage()
  },
  { deep: true },
)
</script>

<style>
.app-container {
  padding: 20px;
}

.app-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}
</style>
