"use client"

import { useRouter } from "next/navigation"

import { useRegistration } from "@/hooks/useRegistration"

import UserRegistrationForm, { UserRegistrationFormValues } from "./user-form"

export default function AdminRegistrationPage() {
  const router = useRouter()
  const { setUser } = useRegistration()

  const onSubmit = (values: UserRegistrationFormValues) => {
    setUser(values)
    router.push("/republica/registrar")
  }

  return <UserRegistrationForm onSubmit={onSubmit} />
}
