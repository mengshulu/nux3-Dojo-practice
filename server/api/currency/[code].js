export default defineEventHandler(async (event) => {

  const { code } = event.context.params
  console.log('code: ', code);

  const { currencyKey } = useRuntimeConfig()

  const uri = `https://api.currencyapi.com/v3/latest?currencies=${code}&apikey=${currencyKey}`

  const { data } = await $fetch(uri)

  return data 
})