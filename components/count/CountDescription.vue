<template>
  <div class="card pa-7">
    <h5>{{ title }}</h5>
    <p>與 Layout 的 Count 綁定</p>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: 'Component'
  }
});
</script>

<style scoped>

</style>