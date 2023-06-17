export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useAuth()
  return auth.value.isAuthenticate
})