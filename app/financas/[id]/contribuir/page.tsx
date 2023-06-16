"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import {
  useContributeAsync,
  useFinanceByIdAsync,
} from "@/lib/api/hooks/useFinancesAsync"
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

export default function BrotherhoodContributeFinance({
  params,
}: FinancePageProps) {
  const router = useRouter()
  const [contributionValue, setContributionValue] = useState(0)
  const { data: goal } = useFinanceByIdAsync(params.id)
  const { mutateAsync: contributeAsync, isLoading } = useContributeAsync(
    params.id
  )

  if (!goal) return null

  const missingAmount = goal?.targetValue - goal?.currentValue

  const handleContribute = async () => {
    await contributeAsync({ value: contributionValue })
    router.push("/financas")
  }

  return (
    <div>
      <div className="mt-12">
        <h2 className="text-md flex justify-center uppercase text-gray-500">
          Contribuir
        </h2>
        <div className="flex items-center justify-center gap-4">
          <p className="text-gray-500">R$</p>

          <input
            className="w-[100px] text-center text-3xl font-bold text-primary focus:border-none active:border-none"
            type="text"
            pattern="[0-9]*"
            inputMode="numeric"
            value={contributionValue}
            onChange={(e) => setContributionValue(Number(e.target.value))}
          />
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
        <Button
          className="w-full"
          disabled={isLoading}
          onClick={handleContribute}
        >
          {isLoading ? <Icons.spinner className="mr-2 animate-spin" /> : null}
          Contribuir
        </Button>
      </div>
    </div>
  )
}
