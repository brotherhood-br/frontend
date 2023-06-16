"use client"

import { useRouter } from "next/navigation"

import {
  useBrotherhoodDataAsync,
  useChangeBrotherhoodAsync,
} from "@/lib/api/hooks/useBrotherhoodAsync"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"

import BrotherhoodForm, {
  BrotherhoodRegistrationFormValues,
} from "../../brotherhood-form"

interface BrotherhoodRegistrationPageProps {
  params: { id: string }
}

export default function BrotherhoodRegistrationPage({
  params,
}: BrotherhoodRegistrationPageProps) {
  const router = useRouter()
  const { data, isLoading } = useBrotherhoodDataAsync(params.id)
  const { mutateAsync: changeBrotherhoodAsync } = useChangeBrotherhoodAsync(
    params.id
  )

  const onSubmit = async (data: BrotherhoodRegistrationFormValues) => {
    await changeBrotherhoodAsync(data)

    toast({
      title: "República atualizada",
      description: "A república foi atualizada com sucesso",
    })

    router.push(`/republica`)
  }

  if (isLoading) return <Icons.spinner className="h-6 w-6 animate-spin" />

  return (
    <BrotherhoodForm
      onSubmit={onSubmit}
      defaultValues={{
        name: data?.name ?? "",
        street: data?.address.street ?? "",
        number: data?.address.number ?? "",
        city: data?.address.city ?? "",
        state: data?.address.state ?? "",
        zipCode: data?.address.zipCode ?? "",
        country: data?.address.country ?? "",
        phone: data?.phone ?? "",
        description: data?.description ?? "",
        capacity: data?.capacity.toString() ?? "0",
        type: data?.type ?? "NO_RESTRICTIONS",
      }}
    />
  )
}
