import { create } from "zustand"

import { BrotherhoodRegistrationFormValues } from "@/app/republica/brotherhood-form"
import { UserRegistrationFormValues } from "@/app/usuario/registrar/page"

type RegistrationState = {
  user: UserRegistrationFormValues | null
  brotherhood: BrotherhoodRegistrationFormValues | null

  setUser: (user: UserRegistrationFormValues) => void
  setBrotherhood: (brotherhood: BrotherhoodRegistrationFormValues) => void
}

export const useRegistration = create<RegistrationState>((set) => ({
  user: null,
  brotherhood: null,

  setUser: (user) => set({ user }),
  setBrotherhood: (brotherhood) => set({ brotherhood }),
}))
