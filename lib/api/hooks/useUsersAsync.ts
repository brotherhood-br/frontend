import { useMutation, useQuery } from "@tanstack/react-query"

import { protectedFetch } from "../api"

export type UserResponse = Array<{
  id: string
  name: string
  image: string
}>

export const useMembersAsync = () =>
  useQuery(["brotherhood-members"], async () =>
    protectedFetch().get("/users").json<UserResponse>()
  )

export const useRemoveMemberAsync = () =>
  useMutation<unknown, Error, string>(["brotherhood-members"], (id) =>
    protectedFetch().delete(`/users/${id}`).res()
  )
