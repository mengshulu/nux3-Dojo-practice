<template>
  <h3 class="m-4">電影資料列表</h3>
  <p class="m-4">一次只載入10筆資料，滾動至底部後，自動加載10筆</p>
  <template v-for="movie in movies">
    <div class="card">
      <div class="flex">
        <p class="w-20">電影名稱</p>
        <span>：</span>
        <p>{{ movie.title }}</p>
      </div>
      <div class="flex">
        <p class="w-20">導演</p>
        <span>：</span>
        <p>{{ movie.directors.join(", ") }}</p>
      </div>
      <div class="flex">
        <p class="w-20">演員</p>
        <span>：</span>
        <p>{{ movie.cast.join(", ") }}</p>
      </div>
      <div class="flex">
        <p class="w-20">類型</p>
        <span>：</span>
        <p>{{ movie.genres.join(", ") }}</p>
      </div>
      <div class="flex">
        <p class="w-20">上映年份</p>
        <span>：</span>
        <p>{{ movie.year }}</p>
      </div>
      <img class="w-3/5 my-4 mx-auto" :src="movie.poster" />
    </div>
  </template>
  <div class="text-center trigger-element">{{ isLoading ? ' Loading... ' : '加載成功' }}</div>
</template>

<script setup>
const isLoading = ref(false);
let page_number = 1;
onMounted(() => {
  
  // 定義 Intersection Observer 的回調函數
  const observerCallback = async (entries, observer) => {
      // 檢查 .trigger-element 是否進入視口
      if (entries[0].isIntersecting && !isLoading.value) {
          isLoading.value = true;  // 開始加載數據，避免重複觸發

          // 加載更多數據
          await getMoviesApi();

          isLoading.value = false;  // 數據加載完成，允許再次加載
      }
  };
  // 創建 Intersection Observer
  const observer = new IntersectionObserver(observerCallback, {
      root: null,         // 默認是 viewport
      rootMargin: '0px',  // 可選：在元素出現在視口中 100px 前就觸發
      threshold: 1.0      // 元素 100% 出現在視口時觸發
  });

  // 選擇 .trigger-element 作為監測對象
  const triggerElement = document.querySelector('.trigger-element');
  observer.observe(triggerElement);
});

const movies = ref([]);
const getMoviesApi = async () => {
  isLoading.value = true;
  try {
    const response = await fetch('https://my-python-app-rho.vercel.app/api/movies', {
      method: 'POST', // 設置請求方法為 POST
      headers: {
          'Content-Type': 'application/json' // 設置請求標頭
      },
      body: JSON.stringify({  // 將參數轉為 JSON 格式
          page_number,
          page_size: 10})
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    movies.value.push(...data);
    console.log(data);
    isLoading.value = false;
    page_number += 1;
  } catch (error) {
    console.error('Error:', error);
  }
};
getMoviesApi();

</script>

<style lang="scss" scoped>

</style>