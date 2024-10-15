<template>
  <div>
    <p class="m-4">電子發票判讀</p>
    <!-- barcode 相機初始化 -->
    <div id="barcode-reader" class="component-barcode-reader"></div>

    <input
      v-model="searchProductName"
      type="text"
      placeholder="搜尋產品名稱或SKU"
    />
        <!-- click 後開啟相機 -->
      <span class="material-symbols-outlined" @click="scanBarcode">
        qr_code_scanner
      </span>
  </div>
</template>

<script setup>
import { useHtml5QrCode } from '@/hooks/html5-qr-code.ts';
let html5QrCode;

const searchProductName = ref('');

// 初始化要在 onMounted 中 （要在virtual dom render之後才抓得到 dom）
onMounted(() => {
    html5QrCode = useHtml5QrCode('barcode-reader');
});

// 掃描成功後會得到 decodedText
const qrCodeSuccessCallback = (decodedText) => {
    // 傳入 searchProductName 去做後續處理
    searchProductName.value = decodedText;
    // 停止相機
    handleStop();
};

// 啟動相機
const scanBarcode = () => {
    html5QrCode.start(qrCodeSuccessCallback);
};

// 停止相機
const handleStop = () => {
    html5QrCode.handleStop();
};

</script>

<style lang="scss" scoped>

</style>~/hooks/html5-qr-code