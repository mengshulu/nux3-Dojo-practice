// composables/useWebSocket.ts
import { ref, onMounted, onUnmounted } from 'vue';

export function useWebSocket(url: string) {
  const message = ref('');
  const messages = ref<string[]>([]);
  let socket: WebSocket | null = null;

  const sendMessage = () => {
    if (socket && message.value) {
      socket.send(message.value);
      message.value = '';
    }
  };

  onMounted(() => {
    socket = new WebSocket(url);

    socket.onopen = () => {
      console.log('open');
      // socket.send(JSON.stringify({
      //   "op": "ping"
      // }));
    };

    socket.onmessage = (msg) => {
      console.log('onmessage', msg);
    };

    socket.onclose = (error) => {
      console.log('onclose', error);
    };

    socket.onclose = () => {
      console.log('onclose');
    };

  });

  onUnmounted(() => {
    if (socket) {
      socket.close();
    }
  });

  return {
    message,
    messages,
    sendMessage,
  };
}
