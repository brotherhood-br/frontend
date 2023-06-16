import { useQuery } from "@tanstack/react-query"

import { protectedFetch } from "../api"

export interface BrotherHoodHomeAdminResponse {
  brotherhoodId: string
  brotherhoodInviteToken: string
  occupation: number
  capacity: number
  viewCount: number
}

export const useBrotherhoodHomeAdminAsync = () => {
  return useQuery(["brotherhood"], () =>
    protectedFetch()
      .get("/brotherhoods/admin")
      .json<BrotherHoodHomeAdminResponse>()
  )
}
