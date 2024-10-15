<template>
  <div class="card">
    <p class="m-4">QRcode 掃描內容</p>
    <!-- barcode 相機初始化 -->
    <div id="barcode-reader" class="component-barcode-reader"></div>
      <!-- click 後開啟相機 -->
    <button class="btn center m-4" @click="scanBarcode">
      <span class="material-symbols-outlined">
        qr_code_scanner
      </span>
    </button>
    <div class="p-4 m-4 border-2 border-slate-50 rounded-sm">{{ searchProductName || '掃描內容展現於此' }}</div>

    <!-- <input
      v-model="searchProductName"
      type="text"
      placeholder="掃描內容"
      readonly
    /> -->
    <p class="m-4">原本想要做成電子發票掃描功能， <a class="link" href="https://www.einvoice.nat.gov.tw/static/ptl/ein_upload/attachments/1479449792874_0.6(20161115).pdf" target="_blank">加解密電子發票</a> 的ＱＲcode內容，但研究一陣子發現需要申請營業用的金鑰，加解密是營業人在製作發票轉電子發票時所需要的功能，跟我想要實現的單純展現電子發票明細的功能不一樣．</p>
    <p class="m-4">之後使用chatGPT得知財政部有提供ＡＰＩ，讀取電子發票的發票號碼和隨機碼，使用財政部提供的 <a class="link" href="https://www.einvoice.nat.gov.tw/static/ptl/ein_upload/attachments/1693297176294_0.pdf" target="_blank">發票明細ＡＰＩ</a> 就可以得到此發票明細，來展現掃描出的發票明細；但在研究了文件以後發現還需要去申請營業人用的ＡＰＩ ＫＥＹ，最後作罷</p>
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
  console.log('decodedText: ', decodedText);
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

</style>