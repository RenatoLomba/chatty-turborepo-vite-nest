import create from 'zustand'

type User = {
  id: number
  userName: string
  avatarUrl?: string
}

type UserStoreData = {
  user?: User | null
  login: (user: User) => void
  logout: () => void
}

export const useUserStore = create<UserStoreData>((set) => ({
  user: null,

  login: (user: User) => set({ user }),
  logout: () => set({ user: null }),
}))
