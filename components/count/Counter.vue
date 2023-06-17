<template>
  <div class="mx-auto">
    <div class="card my-7 flex pa-7">
      <button class="btn mx-5" @click="increment">Increment</button>
      <p>State  {{ count }}</p>
      <button class="btn mx-5" @click="decrement">Decrement</button>
    </div>
  </div>
</template>

<script setup>
  const count = useCount()

  function increment() {
    count.value++
  }

  function decrement() {
    count.value--
  }
</script>

<style scoped>

</style>