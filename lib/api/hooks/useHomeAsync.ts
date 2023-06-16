import { useQuery } from "@tanstack/react-query"

import { HomeResponse } from "@/app/page"

import { protectedFetch } from "../api"

export const useHomeAsync = () => {
  return useQuery(["home"], () =>
    protectedFetch().get("/home").json<HomeResponse>()
  )
}
