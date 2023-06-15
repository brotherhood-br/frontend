import { create } from "zustand"

import { getNameInitials } from "@/lib/utils"

type User = {
  id: string
  name: string
  email: string
  avatar: string
  initials: string
  role: "admin" | "member"
  isAdmin: boolean
}

type AuthState = {
  user: User | null
  isAuthenticated: boolean
  login: (user: User) => void
  logout: () => void

  externalToken: string | null
  externalLogin: (token: string) => void
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  externalToken: null,
  login: (user) =>
    set({
      user: {
        ...user,
        initials: getNameInitials(user.name),
        isAdmin: user.role === "admin",
      },
      isAuthenticated: true,
    }),
  logout: () => set({ user: null }),
  externalLogin: (token) => set({ externalToken: token }),
}))
