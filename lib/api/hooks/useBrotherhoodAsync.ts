import { useQuery } from "@tanstack/react-query"

import { api } from "../api"

export interface BrotherHoodHomeAdminResponse {
  brotherhoodId: string
  brotherhoodInviteToken: string
  occupation: number
  capacity: number
  viewCount: number
}

export const useBrotherhoodHomeAdminAsync = () => {
  return useQuery(["brotherhood"], () =>
    api.get("/brotherhoods/admin").json<BrotherHoodHomeAdminResponse>()
  )
}
