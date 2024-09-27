<template>
  <header class="shadow-sm bg-gray-300">
      <nav class="container mx-auto p-4 flex justify-between">
        <NuxtLink to="/" class="text-gray-900 font-bold">Shu</NuxtLink>
        <ul class="flex gap-4">
          <li><NuxtLink to="/" class="hover:text-zinc-500">
            <span class="material-symbols-outlined">
              home
            </span>
          </NuxtLink></li>
          <li><NuxtLink to="/about" class="hover:text-zinc-500">About</NuxtLink></li>
          <li><NuxtLink to="/count" class="hover:text-zinc-500">Count {{ count }}</NuxtLink></li>
          <li><NuxtLink to="/products" class="hover:text-zinc-500">Products</NuxtLink></li>
          <!-- <li><NuxtLink to="/products/abc">404</NuxtLink></li> -->
          <li v-if="!auth.isAuthenticate"><NuxtLink to="/login"  class="hover:text-zinc-500">Login</NuxtLink></li>
          <li v-else class="font-bold text-green-500"><NuxtLink to="/user"  class="hover:text-zinc-500">User</NuxtLink></li>
        </ul>
      </nav>
    </header>

    <!-- output the page content -->
    <div class="container mx-auto p-4">
      <slot />
    </div>
</template>
<script setup>
  const count = useCount();

  const auth = useAuth();
</script>
<style scoped>
  .router-link-exact-active {
    color: #64748b;
  }
</style>