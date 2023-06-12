import { useMutation, useQueryClient } from "@tanstack/react-query"

import { BrotherhoodRegistrationFormValues } from "@/app/republica/form"
import { UserRegistrationFormValues } from "@/app/usuario/registrar/page"

import { api } from "../api"

export interface RegistrationBody {
  name: string
  description: string
  phone: string
  type: string
  capacity: number
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
    brotherhoodToken: string
    name: string
    birthDate: string
    phone: string
  }

  logo: string
  banner: string
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
        capacity: parseInt(values.brotherhood.capacity),
        characteristics: [],
        logo: "",
        banner: "",
        address: {
          street: values.brotherhood.street,
          number: values.brotherhood.number,
          city: values.brotherhood.city,
          state: values.brotherhood.state,
          zipCode: values.brotherhood.zipCode,
          country: values.brotherhood.country,
        },
        admin: {
          brotherhoodToken: values.user.token,
          name: values.user.name,
          birthDate: values.user.birthDate,
          phone: values.user.phone,
        },
      }

      return api.url("/brotherhoods").post(body)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["brotherhoods"])
      },
    }
  )
}
