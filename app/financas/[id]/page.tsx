"use client"

import Link from "next/link"

import { useFinanceByIdAsync } from "@/lib/api/hooks/useFinancesAsync"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

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

export default function FinancePage({ params }: FinancePageProps) {
  const { data: finance } = useFinanceByIdAsync(params.id)

  const percentage =
    ((finance?.currentValue ?? 0) / (finance?.targetValue ?? 0)) * 100 || 0

  return (
    <div>
      <h1 className="text-2xl font-bold">{finance?.title}</h1>

      <section className="space-y-4">
        <div>
          <p className="text-slate-500">Descrição</p>
          <p className="text-md">{finance?.description}</p>
        </div>

        <p className="text-left text-slate-500">Valores</p>
        <Progress value={percentage} className="w-[100%]" />
        <div className="grid grid-cols-2 items-center">
          <div />
          <div />
          <span>{brlCurrency.format(finance?.currentValue ?? 0)}</span>
          <div className="flex justify-end">
            <span>{brlCurrency.format(finance?.targetValue ?? 0)}</span>
          </div>
        </div>

        <div className="space-y-2 pb-8 pt-6">
          <Link href="/financas">
            <Button className="mt-auto w-full" variant="secondary">
              Cancelar
            </Button>
          </Link>
          <Link href="/financas/{id}/contribuir">
            <Button className="mt-2 w-full">Contribuir</Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
