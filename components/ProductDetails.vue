<template>
  <div class="card">
    <div class="grid grid-cols-1 gap-3 lg:grid-cols-2 lg:gap-10">
      <div class="p-4 lg:p-7">
        <img :src="product.image" alt="product img" class="mx-auto my-7 size-full">
      </div>
      <div class="p-4 lg:p-7">
        <h2 class="text-4xl my-4 lg:my-7">{{ product.title }}</h2>
        <p class="text-xl my-4 lg:my-7">Price - ${{ product.price }}</p>
        <h3 class="fint-bold border-b-2 mb-4 pb-2">Product description:</h3>
        <p class="mb-4 lg:mb-7">{{ product.description }}</p>
        <button class="btn flex">
          <span class="material-symbols-outlined">
            add_shopping_cart
          </span>
          <span>Add to cart</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
  const { product } = defineProps(['product']);
</script>

<style scoped>
  img {
    max-width: 400px;
  }
</style>