<template>
  <div class="grid grid-cols-2 gap-7">
    <div class="card">
      <h2 class="font-bold text-center text-xl">Hello There!! Welcome to Login page!!</h2>

    </div>
    <div class="card p-14">
      <div v-if="_error">
        <p class="bg-red-500 text-red-300 text-sm p-3">{{ _error }}</p>
      </div>
      <input v-model="form.email" class="input" type="text" placeholder="Email adddress">
      <input v-model="form.password" class="input" type="password" placeholder="Password">
      <button class="btn my-7 w-full" @click="submit">{{ isLoading ? 'Loading . . .' : 'Sign in' }}</button>
    </div>
  </div>
</template>

<script setup>
  // 使用此線上 API https://reqres.in/
  const form = reactive({
    "email": "eve.holt@reqres.in",
    "password": "cityslicka"
  })

  const isLoading = ref(false)
  const _error = ref(null)

  async function submit() {
    if (isLoading.value) return
    isLoading.value = true
    _error.value = null
    const { data, error } = await useFetch('https://reqres.in/api/login',{
      method: 'post',
      body: form
    })
    isLoading.value = false

    if (error.value) {
      _error.value = error.value.data.error
      return
    }

    const auth = useAuth()
    auth.value.isAuthenticate = true

    navigateTo('/')
  }

</script>

<style scoped>

</style>