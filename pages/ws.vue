<template>
  <h2 class="mx-4">Websocket</h2>
  <p class="m-4">稍待片刻，數據將即時更新</p>
  <!-- <button class="btn" @click="send">
    send
  </button> -->

  <div class="card mx-4 py-5 bg-gray-200">
    <v-chart class="chart" :option="option" autoresize style="width: 100%; height: 400px;" />
  </div>

  <div class="card m-4 bg-gray-200 flex">
    <p class="m-4">關閉 websocket</p>
    <button class="btn bg-sky-900" @click="close">
      close
    </button>
  </div>
</template>

<script setup lang="ts">
import { useWebSocket } from '~/composables/useWebSocket';

import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
} from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { uniqBy, slice, min, max } from 'lodash-es';
// 註冊方法
// use([
//   CanvasRenderer,
//   TitleComponent,
//   TooltipComponent,
//   LegendComponent,
//   GridComponent,
//   LineChart
// ]);
use([
  CanvasRenderer,
  TitleComponent,
  GridComponent,
  LineChart
]);

interface COIN_TYPE {
  p: number;
  s: string;
  t: number;
  v: number;
};

const formatData = ref<COIN_TYPE[]>([]);
const option = computed(() => {
  return {
    title: {
      text: 'BTCUSDT Price Over Time'
    },
    xAxis: {
      type: 'category',
      data: formatData.value.map(item => new Date(item.t).toLocaleTimeString()),
      name: 'Time'
    },
    yAxis: {
      type: 'value',
      name: 'Price',
      min: min(formatData.value.map(item => item.p)) - 100,
      max: max(formatData.value.map(item => item.p)) + 100
    },
    series: [
      {
        data: formatData.value.map(item => item.p),
        type: 'line'
      }
    ]
  }
});

watch(() => option.value, () => {
  console.log('op!!', option.value);
});

const removeDuplicateTimes = (rawData: COIN_TYPE[]) => {
  console.log('rawData: ', rawData);
  const uniqData = uniqBy(rawData, 't');
  return uniqData;
}

const setEchartData = () => {
  formatData.value = [...formatData.value, ...removeDuplicateTimes(messages.value)];
};

let timer: NodeJS.Timeout | null = null;
// useRuntimeConfig 在 sfc 要用 public
const { finnhubKey } = useRuntimeConfig().public;
const { messages, sendMessage, closeWS } = useWebSocket(
  'wss://ws.finnhub.io/?token=' + finnhubKey,
  JSON.stringify({'type':'subscribe', 'symbol': 'BINANCE:BTCUSDT'})
);
    // socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'AAPL'}))
    // socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'BINANCE:BTCUSDT'}))
    // socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'IC MARKETS:1'}))

onMounted(() => {
  setEchartData();

  timer = setInterval(() => {
    setEchartData();
  }, 5000);
});

const close = () => {
  closeWS();
  clearInterval(timer as NodeJS.Timeout);
}

</script>

<style lang="scss" scoped>
.chart {
  height: 100vh;
}

.btn {
  background: #5d58ff;
  margin: var(--s-space);
}

</style>