<template>
  <div>
    <Head>
      <Title>Nuxt Dojo | {{ product.title }}</Title>
      <Meta name="description" :content="product.description" />
    </Head>

    <ProductDetails :product="product" />
  </div>
</template>

<script setup>
  const { id } = useRoute().params
  const uri = 'https://fakestoreapi.com/products/' + id

  // fetch the product
  const { data: product } = await useFetch(uri)

  if (!product.value) {
    throw createError({ statusCode: 404, statusMessage: 'Product not found', fatal: true })
  }
  // fatal 屬性設置為 true，並添加了一個名為 additionalProperty 的額外屬性，其值為客製參數。這樣您就可以附加自定義的資訊到錯誤物件中。
  // 在 dev 模式下， 從其他頁面點擊路由進入錯誤頁面，會有 bug
  // 直接進入錯誤頁面，會正確地進去 error page
  // https://github.com/nuxt/nuxt/issues/15432
  // 參考此篇 nuxt issue ，開發者回應說 production 不會有問題，如有問題請回報
  //  this issue exists to track a problem in dev mode but not in production. 

	definePageMeta({
		layout: 'products'
	})
</script>

<style scoped>

</style>