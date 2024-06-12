export default defineEventHandler(async (event) => {

  const { text } = event.context.params;
  console.log('text: ', text);

  const { pixabayKey } = useRuntimeConfig();

  const uri = `https://pixabay.com/api/?key=${pixabayKey}&q=${text}&image_type=photo`;

  const data = await $fetch(uri);

  return data;
})