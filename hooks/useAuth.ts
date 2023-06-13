import { create } from "zustand"
import { persist } from "zustand/middleware"

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

function getInitials(name: string) {
  const words = name.split(" ")
  const initials = words
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase()
    .substring(0, 2)
  return initials
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  externalToken: null,
  login: (user) =>
    set({
      user: {
        ...user,
        initials: getInitials(user.name),
        isAdmin: user.role === "admin",
      },
      isAuthenticated: true,
    }),
  logout: () => set({ user: null }),
  externalLogin: (token) => set({ externalToken: token }),
}))
