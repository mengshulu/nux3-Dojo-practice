<template>
  <div class="card">
    <p class="m-4">輸入一數字，產出其長度的連續數列，此數列從數字 1 開始</p>
    <div class="start">
      <p class="m-4">數字：</p>
      <input 
        v-model="arrayLength"
        class="input-xs"
        required
        type="number"
        inputmode="numeric"
        pattern="\d*"
      >
    </div>
    <button class="btn" @click="getRandom">取得隨機陣列</button>
    <div class="start">
      <p class="m-4">數列：</p>
      <p class="text-sky-800">{{ numsArray }}</p>
    </div>
  </div>
</template>

<script setup>
const arrayLength = ref(10);
const getRandomNum = inject('getRandom');
const numsArray = ref([]);
watch(arrayLength, () => {
  numsArray.value = [... new Array(arrayLength.value)].map((item, index) => index + 1);
},{
  immediate: true
});
const getRandom = () => {
  for(let i = 0;i<arrayLength.value;i++) {
    const j = getRandomNum(0, arrayLength.value - 1);
    [numsArray.value[i], numsArray.value[j]] = [numsArray.value[j], numsArray.value[i]];
  }
};


</script>

<style lang="scss" scoped>

</style>