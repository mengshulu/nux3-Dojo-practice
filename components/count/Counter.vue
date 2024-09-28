<template>
  <div class="mx-auto">
    <div class="card my-7 flex pa-7 bg-gray-200 flex items-center">
    <h5>{{ title }}</h5>
      <button class="btn mx-5 bg-sky-900 hover:bg-cyan-500" @click="increment">Increment</button>
      <p>State  {{ count }}</p>
      <button class="btn mx-5 bg-sky-900 hover:bg-cyan-500" @click="decrement">Decrement</button>
    </div>
  </div>
</template>

<script setup>
  defineProps({
    title: {
      type: String,
      default: 'Component'
    }
  });
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