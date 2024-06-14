<template>
  <h2>Websocket</h2>
  <button @click="send">
    send
  </button>
</template>

<script setup lang="ts">
import { useWebSocket } from '../composables/useWebSocket';
// useRuntimeConfig 在 sfc 要用 public
const { finnhubKey } = useRuntimeConfig().public;
console.log('finnhubKey: ', finnhubKey);


const { message, messages, sendMessage } = useWebSocket('wss://ws.finnhub.io/?token=' + finnhubKey);
    // socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'AAPL'}))
    // socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'BINANCE:BTCUSDT'}))
    // socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'IC MARKETS:1'}))

const send = () => {
  message.value = JSON.stringify({'type':'subscribe', 'symbol': 'BINANCE:BTCUSDT'});
  sendMessage();
}

</script>

<style lang="scss" scoped>

</style>