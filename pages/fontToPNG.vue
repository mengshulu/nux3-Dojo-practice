<template>
  <div class="card">
    <p>選擇你想使用的字型</p>
    <button
      v-for="item in fontList"
      :key="item.value"
      :class="[item.value, 'btn']"
      @click="selectFont(item.value)"
    >
      {{ item.name }}
    </button>
  </div>
  <p class="mt-4 ml-4">寫點什麼:</p>
  <input 
    v-model="typeText"
    class="card"
    placeholder="寫點什麼......"
  ></input>
  <p class="m-4">確認想產生圖片的文字：</p>
  <div class="card">
    <div 
      :class="[seletedFont, 'font-node text-7xl']"
      id="font-node"
      ref="fontNode"
    >{{ typeText }}</div>
  </div>
  
  <template v-if="typeText">
    <p class="m-4">按下 To PNG 按鈕</p>
    <div class="card">
      <button :disabled="isLoading" class="btn" @click="toPNG">
        <template v-if="!isLoading">To PNG</template>
        <span v-else class="material-symbols-outlined">
        hourglass_bottom
        </span>
      </button>
      <a 
        v-if="imgUrl"
        class="download-link btn"
        :href="imgUrl"
        :download="fileName"
        @click="handleDownloadCount"
      >
        Download
      </a>
    </div>
  </template>

  <div v-show="imgUrl">
    <p class="m-4">圖片產生在下方</p>
    <div id="png-node" ref="pngNode" class="png-node card p-4"></div>
  </div>
</template>

<script setup>
import * as htmlToImage from 'html-to-image';
// import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';
const fontList = [
  {
    name: '#麥當勞薯條體',
    value: 'font-mc'
  },
  {
    name: '芫荽 / iansui',
    value: 'font-iansui'
  },
  {
    name: '851テガキカクット',
    value: 'font-tegaki'
  }
];
const seletedFont = ref('');
const fontNode = ref(null);
const pngNode = ref(null);
const imgUrl = ref('');
const typeText = ref('');
const fileName = ref('');
const isLoading = ref(false);
let downloadCount = 0;

const toPNG = () => {
  isLoading.value = true;
  if (pngNode.value.firstElementChild) {
    console.log(pngNode.value.firstElementChild);
    pngNode.value.removeChild(pngNode.value.firstElementChild);
  }
  fileName.value = `newPng${downloadCount ? '(' + downloadCount + ')': ''}.png`;

  htmlToImage.toPng(fontNode.value)
    .then(function (dataUrl) {
      var img = new Image();
      img.src = dataUrl;
      imgUrl.value = dataUrl;
      pngNode.value.appendChild(img);
      isLoading.value = false;
    })
    .catch(function (error) {
      console.error('oops, something went wrong!', error);
      alert('oops, something went wrong!');
    });
};

const selectFont = (font) => {
  seletedFont.value = font;
};

const handleDownloadCount = () => {
  downloadCount += 1;
};

</script>

<style lang="scss" scoped>
.font-node {
  background: transparent;
  display: inline-block;
}

.download-link {
  display: inline-block;
}
</style>