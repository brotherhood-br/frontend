import { useMutation, useQueryClient } from "@tanstack/react-query"

import { BrotherhoodRegistrationFormValues } from "@/app/republica/brotherhood-form"
import { UserRegistrationFormValues } from "@/app/usuario/registrar/user-form"

import { protectedFetch } from "../api"

export interface RegistrationBody {
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

  admin: {
    name: string
    birthDate: string
    phone: string
  }

  logo?: string
  banner?: string
}

export interface RegistrationParams {
  user: UserRegistrationFormValues & { token: string }
  brotherhood: BrotherhoodRegistrationFormValues
}

export const useRegistrationAsync = () => {
  const queryClient = useQueryClient()

  return useMutation<unknown, Error, RegistrationParams>(
    ["registration"],
    (values) => {
      const body: RegistrationBody = {
        name: values.brotherhood.name,
        description: values.brotherhood.description,
        phone: values.brotherhood.phone,
        type: values.brotherhood.type,
        capacity: values.brotherhood.capacity,
        characteristics: [],
        // logo: null,
        // banner: null,
        address: {
          street: values.brotherhood.street,
          number: values.brotherhood.number,
          city: values.brotherhood.city,
          state: values.brotherhood.state,
          zipCode: values.brotherhood.zipCode,
          country: values.brotherhood.country,
        },
        admin: {
          name: values.user.name,
          birthDate: values.user.birthDate,
          phone: values.user.phone,
        },
      }

      return protectedFetch()
        .url("/brotherhoods")
        .headers({ sso_token: values.user.token })
        .post(body)
        .res()
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["brotherhoods"])
      },
    }
  )
}
