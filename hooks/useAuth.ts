"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

import { getNameInitials } from "@/lib/utils"

interface User {
  id: string
  name: string
  avatar: string
  initials: string
  role: "ADMIN" | "RESIDENT"
  isAdmin: boolean
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  /**
   * Used in protectedFetch to authenticate requests
   */
  externalToken: string | null

  setExternalToken: (token: string) => void
  logout: () => void
  login: ({
    user,
    token,
  }: {
    user: Omit<User, "isAdmin" | "initials">
    token?: string
  }) => void
}

export const storageKey = "auth" as const

export const useAuth = create(
  persist<AuthState>(
    (set) => ({
      user: null,
      isAuthenticated: false,
      externalToken: null,
      setExternalToken: (token) => set({ externalToken: token }),
      logout: () =>
        set({ user: null, isAuthenticated: false, externalToken: null }),
      login: ({ token, user }) =>
        set({
          externalToken: token,
          user: {
            ...user,
            initials: getNameInitials(user.name),
            isAdmin: user.role === "ADMIN",
          },
          isAuthenticated: true,
        }),
    }),
    {
      name: storageKey,
    }
  )
)
