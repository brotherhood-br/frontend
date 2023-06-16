import { useQuery } from "@tanstack/react-query"

import { HomeResponse } from "@/app/page"

import { protectedFetch } from "../api"

export const useHomeAsync = () => {
  return useQuery(["home", "brotherhood"], () =>
    protectedFetch().get("/home").json<HomeResponse>()
  )
}
