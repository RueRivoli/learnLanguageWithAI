import * as echarts from 'echarts'

export default defineNuxtPlugin(() => {
  // Initialiser echarts avec le renderer canvas
  if (process.client) {
    // S'assurer que echarts est disponible globalement
    window.echarts = echarts
  }
})

