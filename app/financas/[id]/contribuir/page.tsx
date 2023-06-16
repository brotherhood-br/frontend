"use client"

import Link from "next/link"

import { useFinanceByIdAsync } from "@/lib/api/hooks/useFinancesAsync"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Icons } from "@/components/icons"

const brlCurrency = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
})

export interface Goal {
  id: string
  title: string
  description: string
  currentValue: number
  targetValue: number
}

interface FinancePageProps {
  params: { id: string }
}

const isSubmitting = false

export default function BrotherhoodContributeFinance({
  params,
}: FinancePageProps) {
  const { data: finance } = useFinanceByIdAsync(params.id)

  const missingAmount =
    (finance?.targetValue ?? 0) - (finance?.currentValue ?? 0)

  return (
    <div>
      <div className="mt-12">
        <h2 className="text-md flex justify-center uppercase text-gray-500">
          Doação
        </h2>
        <div className="flex items-center justify-center gap-4">
          <p className="text-gray-500">R$</p>
          <p className="text-6xl font-bold text-primary">
            {brlCurrency.format(0).slice(3)}
          </p>
        </div>
        <h2 className="mt-12 flex justify-center text-xs uppercase text-gray-500">
          Restam
        </h2>
        <div className="flex items-center justify-center gap-4">
          <div></div>
          <p className="text-gray-500">R$</p>
          <p className="text-2xl font-bold text-primary">
            {brlCurrency.format(missingAmount).slice(3)}
          </p>
        </div>
      </div>

      <Separator className="my-8" />

      <div className="mb-9 space-y-2 pb-8">
        <Link href="/financas">
          <Button className="mt-auto w-full" variant="secondary">
            Cancelar
          </Button>
        </Link>
        <Button className="w-full" type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <Icons.spinner className="mr-2 animate-spin" />
          ) : null}
          Contribuir
        </Button>
      </div>
    </div>
  )
}
