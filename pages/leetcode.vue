<template>
  <leetcodeRandomNumber />
  <leetcodeRandomArray />
</template>

<script setup>

  const getRandom = (min, max) => {
    return Math.floor(Math.random() * (max + 1 - min) + min);
  };
  provide('getRandom', getRandom);
</script>

<style lang="scss" scoped>

</style>