"use client"

import { useRouter } from "next/navigation"

import { protectedFetch } from "@/lib/api"

import UserRegistrationForm, { UserRegistrationFormValues } from "../user-form"

interface MemberRegistrationPageProps {
  params: { brotherhoodToken: string }
}

export default function MemberRegistrationPage({
  params,
}: MemberRegistrationPageProps) {
  const router = useRouter()

  const onSubmit = async (values: UserRegistrationFormValues) => {
    // TODO: create mutation on reactQuery
    await protectedFetch()
      .url("/users")
      .post({
        brotherhoodToken: params.brotherhoodToken,
        name: values.name,
        birthDate: values.birthDate,
        phone: values.phone,
      })
      .res()

    router.push("/")
  }

  return (
    <>
      <div className="mb-6 space-y-1">
        <h3 className="text-lg font-medium">Entrar em uma república</h3>
        <p className="text-sm text-muted-foreground">
          Faltam só alguns dados para você ter acesso a sua república!
        </p>
      </div>
      <UserRegistrationForm onSubmit={onSubmit} />
    </>
  )
}
