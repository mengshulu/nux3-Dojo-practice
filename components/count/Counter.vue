<template>
  <div class="mx-auto">
    <div class="card my-5 pa-4 bg-gray-200 flex items-center flex-wrap">
      <div class="w-full">{{ title }}</div>
      <button class="btn m-2 bg-sky-900 hover:bg-cyan-500" @click="increment">Increment</button>
      <p>State  {{ count }}</p>
      <button class="btn m-2 bg-sky-900 hover:bg-cyan-500" @click="decrement">Decrement</button>
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