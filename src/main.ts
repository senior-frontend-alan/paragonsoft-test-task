import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import DataTable from 'primevue/datatable'
import PrimeColumn from 'primevue/column'
import PrimeButton from 'primevue/button'
import PrimeToast from 'primevue/toast'
import ToastService from 'primevue/toastservice'
import InputGroup from 'primevue/inputgroup'

import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(createPinia())
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      prefix: 'p',
      darkModeSelector: 'none',
    },
  },
})
app.use(router)
app.use(ToastService)

app.component('PrimeDataTable', DataTable)
app.component('PrimeColumn', PrimeColumn)
app.component('PrimeButton', PrimeButton)
app.component('PrimeToast', PrimeToast)
app.component('PrimeInputGroup', InputGroup)

app.mount('#app')
