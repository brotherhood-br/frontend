import { useMutation, useQuery } from "@tanstack/react-query"

import { api } from "../api"

export type UserResponse = Array<{
  id: string
  name: string
  image: string
}>

export const useMembersAsync = () =>
  useQuery(["brotherhood-members"], async () =>
    api.get("/users").json<UserResponse>()
  )

export const useRemoveMemberAsync = () =>
  useMutation<unknown, Error, string>(["brotherhood-members"], (id) =>
    api.delete(`/users/${id}`).res()
  )
