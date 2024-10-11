<template>
  <div class="card">
    <p class="m-4">根據輸入範圍，取得隨機數(包含最小與最大值)</p>
    <div class="start">
      <p class="m-4" >min: </p>
      <input 
        v-model="minValue"
        class="input-xs"
        required
        type="number"
        inputmode="numeric"
        pattern="\d*"
      >

      <p class="m-4">max: </p>
      <input 
        v-model="maxValue" 
        class="input-xs" 
        required 
        type="number"
        inputmode="numeric" 
        pattern="\d*"
      >
    </div>

    <button class="btn" @click="() => randomNumber = getRandom(minValue, maxValue)">取得隨機數</button>
    <input :value="randomNumber" readonly class="input-xs"></input>
  </div>
</template>

<script setup>
const maxValue = ref(1);
const minValue = ref(0);
const randomNumber = ref(null);
let isCheckMin = false;
let isCheckMax = false;

watch(
  minValue,
  () => {
    if (!isCheckMin) {
      isCheckMin = true;
      setTimeout(() => {
        if (maxValue.value <= minValue.value) {
          maxValue.value = minValue.value + 5;
        }
        isCheckMin = false;
      }, 200);
    }
  }
);

watch(
  maxValue,
  () => {
    console.log(isCheckMax);
    if (!isCheckMax) {
      isCheckMax = true;
      setTimeout(() => {
        if (maxValue.value <= minValue.value) {
          console.log(maxValue.value);
          maxValue.value = minValue.value + 1;
        }
        isCheckMax = false;
      }, 500);
    }
  }
);

const getRandom = inject('getRandom');

</script>

<style lang="scss" scoped>

</style>