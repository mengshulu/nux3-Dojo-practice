<template>
  <!-- <NuxtLayout> -->
    <div class="mt-7 max-w-sm mx-auto text-center card">
      <p class="mt-7 text-7xl font-bold">{{ error.statusCode }}</p>
      <p class="mt-7 text-6xl">Ooops.</p>
      <p class="mt-7">{{ error.message }}</p>
      <button class="btn my-7" @click="handleClearError">Go Home...</button>
      <!-- <NuxtLink to="/">Home</NuxtLink> No! -->
    </div>
  <!-- </NuxtLayout> -->
</template>

<script setup>
  defineProps(['error'])

  const handleClearError = () => clearError({ redirect: '/' })
  
  // 在 Nuxt.js 中，clearError 方法通常用於錯誤頁面，用於清除錯誤狀態，以防止其持續存在。當在伺服器端渲染 (SSR) 或客戶端渲染 (CSR) 過程中發生錯誤時，Nuxt.js 會將錯誤狀態設置在 Vuex store 或 Vue 組件的 error 屬性中。

  // 在 Nuxt.js 中的錯誤頁面，定義在 layouts/error.vue 檔案中，負責渲染錯誤狀態並顯示相應的錯誤訊息。然而，如果不清除錯誤狀態，它可能會在頁面導航或後續請求中持續存在。

  // 為了防止錯誤狀態持續存在，通常在錯誤頁面中調用 clearError 方法。這個方法會從 Vuex store 或 Vue 組件的 error 屬性中清除錯誤狀態，確保後續的請求或頁面導航從一個乾淨的狀態開始。
</script>

<style scoped>

</style>