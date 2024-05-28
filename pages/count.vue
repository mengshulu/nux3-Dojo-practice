<template>
  <Head>
    <Title>state 練習</Title>
  </Head>
  
  <div class="mx-auto">
    <LazyCountDescription v-if="lock" />
    <LazyCountCounter v-else />
    <component :is="MyComponent" />
    <button class="btn my-7" @click="toggle">Toggle</button>
    <p>v-if ,v-else 以及 component 標籤切換</p>

    <p class="font-bold my-5">Now at {{ route.name }} page!</p>
  </div>
</template>

<script setup>
  const MyComponent = shallowRef(resolveComponent("CountCounter"));
  let lock = ref(true);
  const toggle = () => {
    console.log('hi');
    // MyComponent.value = resolveComponent("CountDescription")

    lock.value ? MyComponent.value = resolveComponent("CountDescription") : MyComponent.value = resolveComponent("CountCounter");
    // let name = "CountDescription";
    // 下面這種寫法會出錯 resolveComponent can only be used in render() or setup(). 
    // lock ? name = "CountDescription" : name = "CountCounter";
    // MyComponent.value = resolveComponent(`${name}`);
    lock.value = !lock.value;
  }


  const route = useRoute();
  console.log('route: ', route.name);


  // 測試後 template 的優先級比較高
  useHead({
    title: 'count something in this page.',
    description: 'hello this is count'
  });

</script>

<style scoped>

</style>