import { useQuery } from "@tanstack/react-query"

import { HomeResponse } from "@/app/page"

import { api } from "../api"

export const useHomeAsync = () => {
  return useQuery(["home"], () => api.get("/home").json<HomeResponse>())
}
