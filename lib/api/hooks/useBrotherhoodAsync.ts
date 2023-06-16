import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { BrotherhoodRegistrationFormValues } from "@/app/republica/brotherhood-form"

import { protectedFetch } from "../api"

export interface BrotherhoodHomeAdminResponse {
  brotherhoodId: string
  brotherhoodInviteToken: string
  occupation: number
  capacity: number
  viewCount: number
}

export interface BrotherhoodDataResponse {
  brotherhoodToken: string
  name: string
  description: string
  phone: string
  logo: string
  type: "JUST_MEN" | "JUST_WOMEN" | "NO_RESTRICTIONS"
  banner: string
  capacity: number
  membersCount: number
  address: {
    country: string
    city: string
    street: string
    number: string
    zipCode: string
    state: string
  }
}

export type BrotherhoodChangeParams = BrotherhoodRegistrationFormValues

export type BrotherhoodChangeBody = {
  name: string
  description: string
  phone: string
  type: string
  capacity: string
  characteristics: string[]

  address: {
    street: string
    number: string
    city: string
    state: string
    zipCode: string
    country: string
  }

  logo?: string
  banner?: string
}

export const useBrotherhoodHomeAdminAsync = () =>
  useQuery(["brotherhood", "admin"], () =>
    protectedFetch()
      .get("/brotherhoods/admin")
      .json<BrotherhoodHomeAdminResponse>()
  )

export const useBrotherhoodDataAsync = (id: string) =>
  useQuery(["brotherhood", id], () =>
    protectedFetch().get(`/brotherhoods/${id}`).json<BrotherhoodDataResponse>()
  )

export const useChangeBrotherhoodAsync = (id: string) => {
  const queryClient = useQueryClient()
  return useMutation<unknown, Error, BrotherhoodChangeParams>(
    ["mutateBrotherhoods", id],
    (values) => {
      const body: BrotherhoodChangeBody = {
        name: values.name,
        description: values.description,
        phone: values.phone,
        type: values.type,
        capacity: values.capacity,
        characteristics: [],
        // logo: null,
        // banner: null,
        address: {
          street: values.street,
          number: values.number,
          city: values.city,
          state: values.state,
          zipCode: values.zipCode,
          country: values.country,
        },
      }

      return protectedFetch().url(`/brotherhoods/${id}`).put(body).res()
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["brotherhood"])
      },
    }
  )
}
