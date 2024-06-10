<template>
  <h2>
    Quill
  </h2>
  <QuillEditor :options='options' />
</template>

<script setup lang="ts">
  import { QuillEditor } from '@vueup/vue-quill';
  import '@vueup/vue-quill/dist/vue-quill.snow.css';
  import BlotFormatter from 'quill-blot-formatter';

  const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],
    ['link', 'image', 'video', 'formula'],

    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction

    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],

    ['clean']                                         // remove formatting button
  ];

  const options = {
    debug: 'info',
    modules: {
      toolbar: toolbarOptions,
      blotFormatter: {
        name: 'blotFormatter',  
        module: BlotFormatter, 
        options: {/* options */}
      }
    },
    placeholder: '輸入一些內容吧',
    // readOnly: true,
    theme: 'snow'
  };


</script>

<style lang="scss" scoped>

</style>