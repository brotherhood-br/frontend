import { useMutation, useQuery } from "@tanstack/react-query"

import { protectedFetch } from "../api"

export type UserMembersResponse = Array<{
  id: string
  name: string
  image: string
  type: "ADMIN" | "MEMBER"
}>

export interface UserResponse {
  id: string
  name: string
  picture: string
  birthdate: string
  phone: string
  email: string
  type: string
}

export const useMembersAsync = () =>
  useQuery(["brotherhood-members"], async () =>
    protectedFetch().get("/users").json<UserMembersResponse>()
  )

export const useUserProfileAsync = (id: string) =>
  useQuery(["user"], async () =>
    protectedFetch().get(`/users/${id}`).json<UserResponse>()
  )

export const useRemoveMemberAsync = () =>
  useMutation<unknown, Error, string>(["brotherhood-members"], (id) =>
    protectedFetch().delete(`/users/${id}`).res()
  )
