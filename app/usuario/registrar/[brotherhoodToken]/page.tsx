"use client"

import { useRouter } from "next/navigation"

import { api } from "@/lib/api"

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
    await api
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

  return <UserRegistrationForm onSubmit={onSubmit} />
}
