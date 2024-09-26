<template>
  <div>
    <h1>目錄</h1>
    <hr>
    <div class="catalog">
      <ul>
        <li
          v-for="(item, index) in list"
          :key="`catalog_${index}`"
          class="title"
        >
          <NuxtLink :to="`/${item.id}`">
            <h2>{{ item.name }}</h2>
            <ul>
                <li class="description"><p>{{ item.description }}</p></li>
            </ul>
          </NuxtLink>
        </li>

      </ul>
    </div>
    <!-- <p>電視台演唱會年輕人，真實苗栗開展，開通一是，製品十二處於各地陷入只要商務，夫妻註冊時間告訴我頁面光碟筆記本，上路重量普通還能你自己專區破解圖片學生就像，浙江簡歷剛才學會分析花園資源，美容航空事業，很。</p>
    <p>要商務，夫妻註冊時間告訴我頁面光碟筆記本，上路重量普通還能你自己專區破解圖片學生就像，浙江簡歷剛才學會分析花園資源，美容航空事業，很。
  招生認證的是證件戰爭採用管理系統是因為和他利益收到，禁止工藝種類不願意英文億元說出設定模糊，不停答案調節說過領先我會，個性實用刪除消失喜愛手術死了網際快車顯然，擔心運動版面新人要是住房，同意遇到留言板您可以基礎上來電舉辦世界盃目錄尺寸旅遊，榮譽因素必須一條加拿大綜合筆者，受到需要一隻嘉義都會規律對外到了學科狀態阿摩斯，維持及時必然吃了一臉思考加盟工程，世界上電腦一身就是，要是是這樣健康天使，工程。</p>
  <p>控制損失有很多內容魯蛇萬元取消電信，群眾連載情節楠雅花園加強電子能在對於更多重要執行環境，老婆一家台北會議商品，阿宅人民共和國顯得部分本月本書也可總體名稱故障每天將軍留下，我把接近成果我想警察，報價。</p> -->
  <!-- <p>Q: Error: Cannot find name 'xxx' ts 2304</p>
  <p>A: My tsconfig.json:
    <pre>
    <code>
      {

        "extends": "./.nuxt/tsconfig.json",
        "include": [
          "env.d.ts",
          ".nuxt/nuxt.d.ts",
          "**/*"
        ]
      }
    </code>
    </pre>
  </p> -->
  </div>
</template>

<script lang="ts" setup>
  interface LIST {
    id: string;
    name: string;
    description: string;
  };
  const list = ref([
    {
      id: 'map',
      name: 'Leaflet',
      description: '使用 Leaflet 繪製台灣地圖'
    },
    {
      id: 'quill',
      name: 'Quill',
      description: '使用 Quill 客製化編輯器功能'
    },
    {
      id: 'ws',
      name: 'Websocket',
      description: '與 FREE realtime API for stocks Websocket 連線'
    }
  ] as LIST[]);
</script>

<style scoped lang="scss">
  .catalog {
    margin-top: var(--m-space);
    
    .title {
      margin: var(--l-space);
      padding: var(--m-space);
      border-radius: var(--s-space);
      border: 1px solid var(--bg-hover);
      background: var(--bg);
      box-shadow: 1px 1px 5px #000;
      transition: background .4s, color .2s;
      
      &:hover {
        color: #fff;
        background: var(--bg-hover);
      }
    }

    .description {
      margin-left: var(--s-space);
    }
  }
</style>