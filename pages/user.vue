<template>
  <div class="card m-7 p-7">
    Hi! User!
  </div>
</template>

<script setup>
  definePageMeta({
    middleware: ['auth']
  })
</script>

<style scoped>

</style>