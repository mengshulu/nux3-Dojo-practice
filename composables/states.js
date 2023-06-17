export const useCount = () => useState(() => 0)

export const useAuth = () => useState(() => ({
  isAuthenticate: false
}))