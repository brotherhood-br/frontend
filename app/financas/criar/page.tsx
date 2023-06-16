"use client"

import { useRouter } from "next/navigation"

import { useCreateGoalAsync } from "@/lib/api/hooks/useFinancesAsync"

import FinanceForm, { FinanceFormValues } from "../finance-form"

export default function BrotherhoodCreateFinance() {
  const { mutateAsync: createGoalAsync } = useCreateGoalAsync()
  const router = useRouter()

  const onSubmit = async (data: FinanceFormValues) => {
    await createGoalAsync({
      name: data.name,
      description: data.description,
      value: parseFloat(data.value),
    })

    router.push("/financas")
  }

  return <FinanceForm onSubmit={onSubmit} />
}
