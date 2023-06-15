import { create } from "zustand"

import { getNameInitials } from "@/lib/utils"

type User = {
  id: string
  name: string
  // email: string TODO: check this
  avatar: string
  initials: string
  role: "ADMIN" | "RESIDENT"
  isAdmin: boolean
}

type AuthState = {
  user: User | null
  isAuthenticated: boolean
  externalToken: string | null

  setExternalToken: (token: string) => void
  logout: () => void
  login: ({
    user,
    token,
  }: {
    user: Omit<User, "isAdmin" | "initials">
    token: string
  }) => void
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  externalToken: null,
  setExternalToken: (token) => {
    localStorage.setItem("token", token)
    set({ externalToken: token })
  },
  logout: () => {
    localStorage.setItem("token", "")

    set({ user: null, isAuthenticated: false, externalToken: null })
  },
  login: ({ token, user }) => {
    localStorage.setItem("token", token)

    set({
      externalToken: token,
      user: {
        ...user,
        initials: getNameInitials(user.name),
        isAdmin: user.role === "ADMIN",
      },
      isAuthenticated: true,
    })
  },
}))
