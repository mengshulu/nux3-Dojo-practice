export default defineEventHandler(async (event) => {

  const { code } = event.context.params;
  const { currencyKey } = useRuntimeConfig();
  console.log('code: ', code);
  let uri = `https://api.currencyapi.com/v3/latest?currencies=${code}&apikey=${currencyKey}`;
  if (code === 'all') {
    uri = `https://api.currencyapi.com/v3/currencies?apikey=${currencyKey}`
  }


  

  const { data } = await $fetch(uri);

  return data;
})