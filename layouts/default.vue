<template>
  <header class="shadow-sm bg-white">
      <nav class="container mx-auto p-4 flex justify-between">
        <NuxtLink to="/" class="font-bold">Nuxt Dojo</NuxtLink>
        <ul class="flex gap-4">
          <li class="font-bold text-[blue]">Count {{ count }}</li>
          <li><NuxtLink to="/">Home</NuxtLink></li>
          <li><NuxtLink to="/about">About</NuxtLink></li>
          <li><NuxtLink to="/count">Count</NuxtLink></li>
          <li><NuxtLink to="/products" class="btn">Products</NuxtLink></li>
          <li><NuxtLink to="/products/abc">Pdabc</NuxtLink></li>
          <li v-if="!auth.isAuthenticate"><NuxtLink to="/login" class="">Login</NuxtLink></li>
          <li v-else class="font-bold text-green-500"><NuxtLink to="/user" class="">User</NuxtLink></li>
        </ul>
      </nav>
    </header>

    <!-- output the page content -->
    <div class="container mx-auto p-4">
      <slot />
    </div>
</template>
<script setup>
  const count = useCount()

  const auth = useAuth()
</script>
<style scoped>
  .router-link-exact-active {
    color: #12b488;
  }
</style>