// composables/useWebSocket.ts
import { ref, onMounted, onUnmounted } from 'vue';

export function useWebSocket(url: string, text: string) {
  const messages = ref<any[]>([]);
  let socket: WebSocket | null = null;

  const sendMessage = () => {
    if (socket && text) {
      socket.send(text);
    }
  };

  const closeWS = () => {
    console.log('close ws');
    if (socket) {
      socket.close();
    }
  };

  onMounted(() => {
    socket = new WebSocket(url);

    socket.onopen = () => {
      console.log('open');
      // socket.send(JSON.stringify({
      //   "op": "ping"
      // }));
      sendMessage();
    };

    socket.onmessage = (msg) => {
      const res = JSON.parse(msg.data);
      messages.value = res.data;
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
    messages,
    sendMessage,
    closeWS
  };
}
