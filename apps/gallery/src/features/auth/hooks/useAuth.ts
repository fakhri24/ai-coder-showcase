import { useAuthContext } from '@/app/providers/AuthProvider.context'

export function useAuth() {
  return useAuthContext()
}
