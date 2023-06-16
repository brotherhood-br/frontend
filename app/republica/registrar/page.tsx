"use client"

import { useRouter } from "next/navigation"

import { protectedFetch } from "@/lib/api"
import { useRegistrationAsync } from "@/lib/api/hooks/useRegistrationAsync"
import { useAuth } from "@/hooks/useAuth"
import { useRegistration } from "@/hooks/useRegistration"
import { toast } from "@/components/ui/use-toast"
import { HomeResponse } from "@/app/page"

import BrotherhoodForm, {
  BrotherhoodRegistrationFormValues,
} from "../brotherhood-form"

export default function BrotherhoodRegistrationPage() {
  const { mutateAsync: createBrotherhoodAsync } = useRegistrationAsync()
  const { user } = useRegistration()
  const { externalToken, login } = useAuth()
  const router = useRouter()

  const onSubmit = async (data: BrotherhoodRegistrationFormValues) => {
    if (!externalToken) {
      throw new Error("No external token found")
    }

    if (!user) {
      throw new Error("No user found")
    }

    await createBrotherhoodAsync({
      user: {
        ...user,
        token: externalToken,
      },
      brotherhood: data,
    })

    const userData = await protectedFetch()
      .url("/home")
      .headers({ sso_token: externalToken })
      .get()
      .fetchError(() => {
        toast({
          title: "Erro",
          description: "Não foi possível fazer login",
          variant: "destructive",
        })
      })
      .json<HomeResponse>()

    login({
      user: {
        id: userData.userId,
        name: userData.userName,
        role: userData.userType,
        avatar: userData.brotherhoodLogo,
      },
      brotherhoodId: "", // userData.brotherhoodId,
    })

    // Redirect user to home after registration
    router.push("/")
  }

  return <BrotherhoodForm onSubmit={onSubmit} />
}
