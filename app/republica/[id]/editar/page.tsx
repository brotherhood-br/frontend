"use client"

import BrotherhoodForm from "../../brotherhood-form"

interface BrotherhoodRegistrationPageProps {
  params: { id: string }
}

export default function BrotherhoodRegistrationPage({
  params,
}: BrotherhoodRegistrationPageProps) {
  return (
    <BrotherhoodForm
      defaultValues={{
        name: "República do Shad",
        street: "Rua dos Bobos",
        number: "0",
        city: "São Paulo",
        state: "SP",
        zipCode: "00000-000",
        country: "Brasil",
        phone: "(11) 99999-9999",
        description: "República do Shad",
        capacity: "5",
        type: "NO_RESTRICTIONS",
      }}
    />
  )
}