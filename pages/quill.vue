<template>
  <h2>
    Quill 客製化實作
  </h2>
  <hr>
  <p class="description">將 Ｐixabay 的圖片放入編輯器中</p>
  <hr>

  <div class="quill-edit-content" v-html="quillContent"></div>

  <QuillEditor 
    ref="quillEditorRef"
    v-model:content="quillContent"
    contentType="html"
    :options='options'
    toolbar="#my-toolbar"
    scrollingContainer
  >
    <template #toolbar>
      <div id="my-toolbar">
        <!-- Add buttons as you would before -->
        <button class="ql-bold"></button>
        <button class="ql-italic"></button>

        <!-- But you can also add your own -->
        <button id="custom-button" @click="switchImgBox">
          <span class="material-symbols-outlined">
            photo_library
          </span>
        </button>
      </div>
    </template>
  </QuillEditor>

  <div v-if="isOpen" class="box-mask">
    <div class="images-container">
      <div class="title">
        搜尋圖片
        <button class="close-btn">
          <span class="material-symbols-outlined" @click="switchImgBox">
            cancel
          </span>
        </button>
      </div>
      <div class="search">
        <input
          v-model="searchText"
          placeholder="搜尋 Pixabay"
          aria-label="input-search"
          type="text"
          name="search"
          @keyup.enter="searchInputEnter"
        >
        <button class="search-btn" aria-label="submit-search" @click="searchInputEnter">
          <span class="material-symbols-outlined">search</span>
        </button>
      </div>
      <div class="images-content">
        <div class="images-box">
          <div
            v-for="(image, idx) in images"
            :key="idx"
            class="images-items"
            @click="imagesChoiseClick"
          >
            <img :src="image.previewURL" :alt="image.tags" :title="image.tags" :data-largeImageURL="image.largeImageURL">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import '@vueup/vue-quill/dist/vue-quill.snow.css';

  const quillEditorRef = ref(null);

  const quillContent = ref('');

  watch(() => quillContent.value, () => {
    console.log('quillContent.value', quillContent.value);
  });

  const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    // ['blockquote', 'code-block'],
    // ['link', 'image', 'video', 'formula'],

    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    // [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
    // [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    // [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    // [{ 'direction': 'rtl' }],                         // text direction

    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    // [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    // [{ 'align': [] }],

    ['clean']                                         // remove formatting button
  ];

  const options = {
    debug: 'info',
    modules: {
    },
    placeholder: '輸入一些內容吧',
    // readOnly: true,
    theme: 'snow'
  };


  const isOpen = ref(false);
  const switchImgBox = () => {
    console.log('switch');
    isOpen.value = !isOpen.value;
  };

  const searchText = ref('');
  const images = ref([]);
  const searchInputEnter = async () => {
    const { data } = await useFetch('/api/pixabay/' + searchText.value);
    console.log('data: ', data.value);
    images.value = data.value.hits;
    console.log('images.value: ', images.value);
  };

  const imagesChoiseClick = ($e) => {
    console.log('選擇圖');
    const url = $e.srcElement.currentSrc;
    const oldHTML = quillEditorRef.value.getHTML();
    const html = `${oldHTML}<img class="lazyload" data-src="${url}" src="${url}" alt="pixabay" title="pixabay"><p class="figcaption">pixabay</p>`;
    
    quillEditorRef.value.setHTML(html);

    switchImgBox();
  };

  watch(() => searchText.value, () => {
    if (!searchText.value) {
      images.value = [];
    }
  });


</script>

<style lang="scss" scoped>
:deep .figcaption {
  color: #986d6d;
  font-size: 12px;
}

.box-mask {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  top: 0;
  left: 0;
  position: fixed;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.images-container {
  position: relative;
  width: 70%;
  height: 80vh;
  padding: 80px var(--m-space) var(--m-space);
  background: #ffffff;
  box-shadow: 1px 2px #ddd;
  border-radius: var(--s-space);
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

  .title {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background: #9badff;
    box-shadow: 1px 2px #ddd;
    color: #f6f6f6;
    text-align: center;

    .close-btn {
      position: absolute;
      right: 10px;
    }
  }

  .search {
    position: absolute;
    top: 40px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: var(--s-space);
    border: 1px solid #ddd;
    display: flex;
    justify-content: center;
    align-items: center;

    .search-btn {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .images-content {
    width: 100%;
    height: 100%;
    border: 1px solid #ddd;
    overflow: hidden;
    overflow-y: auto;
  }

  .images-box {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 5px;

    .images-items {
      background: #000;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
}

.quill-edit-content {
  border: 1px dashed #e3a1ff;
  border-radius: var(--s-space);
  margin: var(--m-space);
  padding: var(--s-space);
  text-align: center;
  max-height: 40vh;
  overflow-y: auto;

  :deep img {
    margin: auto;
  }
}
</style>
<style>
.ql-editor {
  height: 500px;
  overflow-y: auto;
}
</style>