<template>
  <div>
    <h2>About Currency Api</h2>
    <a href="https://currencyapi.com/">currencyapi link</a>
    <p>
      當前與美金的換匯匯率
    </p>
    
    <div class="select-box card p-6 m-8">
      <label for="currency-select">Choose a contry:</label>

      <select v-model="selected" class="card" name="currencies" id="currency-select">
        <option value="">--Please choose an option--</option>
        <template
          v-for="contry in currencies" 
          :key="contry" 
        >
          <option :value="contry" >
            {{ contry }}
          </option>
        </template>
      </select>
    </div>

    <div v-for="data in currency" :key="data" class="card p-6 m-8">{{ data }}</div>
  </div>
</template>

<script setup>
  // const { data } = await useFetch('/api/ninja?name=mario', {
  //   method: 'post',
  //   body: { age: 30 }
  // })

  const selected = ref('');
  const currencyFetchData = ref({});

  watch(selected,async () => {
    const { data } = await useFetch('/api/currency/' + (selected.value || 'TWD'));
    console.log(data);
    currencyFetchData.value = data.value;
  }, {
    immediate: true
  });
  const currency = computed(() => {
    const newData = Object.entries(currencyFetchData.value).map(([key, value]) => `${key}: ${value.value.toFixed(2)}`);
    return newData;
  });
  const { data: fetchAllCurrencies } = await useFetch('/api/currency/all');
  const currencies = computed(() => Object.keys(fetchAllCurrencies.value));

</script>

<style scoped>
  h2 {
    margin-bottom: 20px;
    font-size: 36px;
  }
  p {
    margin: 20px 0;
  }
</style>