"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"

import { useAuth } from "@/hooks/useAuth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Icons } from "@/components/icons"

const financeMock = {
  totalValue: 1234.56,
  goals: [
    {
      id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      title: "Comprar um novo fogão",
      description: "string",
      currentValue: 0,
      targetValue: 0,
    },
  ],
}

const brlCurrency = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
})

export default function FinancesPage() {
  const router = useRouter()
  const { user } = useAuth()
  const isAdmin = user?.isAdmin ?? false

  return (
    <div>
      <h1>Finanças</h1>

      <div className="mt-6">
        <h2 className="text-md flex justify-center uppercase text-gray-500">
          Balanço
        </h2>
        <div className="flex items-center justify-center gap-4">
          <p className="text-gray-500">R$</p>
          <p className="text-5xl font-bold text-primary">
            {brlCurrency.format(financeMock.totalValue).slice(3)}
          </p>
        </div>
      </div>

      <Separator className="my-8" />

      <h2 className="text-md my-4 font-bold">Metas</h2>

      <section className="space-y-8">
        {financeMock.goals.map((item) => (
          <Card
            className="cursor-pointer"
            onClick={() => router.push(`/financas/${item.id}`)}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-md font-semibold">
                {item.title}
              </CardTitle>

              {isAdmin && (
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Icons.moreVertical className="h-6 w-6" />
                  </DropdownMenuTrigger>

                  <DropdownMenuContent>
                    <DropdownMenuItem>Concluir Meta</DropdownMenuItem>
                    <DropdownMenuItem>Editar Meta</DropdownMenuItem>
                    <DropdownMenuItem>Excluir Meta</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </CardHeader>
            <CardContent className="my-4 text-right">
              <span>{brlCurrency.format(item.targetValue)}</span>
              <Progress value={33} className="w-[100%]" />
            </CardContent>
          </Card>
        ))}
      </section>

      {isAdmin && (
        <Link href="/financas/criar">
          <Button
            variant="outline"
            color="primary"
            className="fixed bottom-[5rem] right-4 z-50 h-14 w-14 rounded-full bg-black text-white shadow-lg"
          >
            <Icons.plus />
          </Button>
        </Link>
      )}
    </div>
  )
}
