"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"

import { useFinancesAsync } from "@/lib/api/hooks/useFinancesAsync"
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

const brlCurrency = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
})

export default function FinancesPage() {
  const { data } = useFinancesAsync()
  const router = useRouter()
  const { user } = useAuth()

  const isAdmin = user?.isAdmin ?? false

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Finanças</h1>

      <div className="mt-6">
        <h2 className="text-md flex justify-center uppercase text-gray-500">
          Balanço
        </h2>
        <div className="flex items-center justify-center gap-4">
          <p className="text-gray-500">R$</p>
          <p className="text-5xl font-bold text-primary">
            {brlCurrency.format(data?.totalValue ?? 0).slice(3)}
          </p>
        </div>
      </div>

      <Separator className="my-8" />

      <h2 className="text-md my-4 font-bold">Metas</h2>

      <section className="space-y-8">
        {data?.goals.map((item) => (
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
              <span>{brlCurrency.format(item.currentValue)}</span>
              <span>{brlCurrency.format(item.targetValue)}</span>
              <Progress
                value={(item.currentValue / item.targetValue) * 100}
                className="w-[100%]"
              />
            </CardContent>
          </Card>
        ))}
      </section>

      {isAdmin && (
        <Link href="/financas/criar">
          <Button
            variant="outline"
            color="primary"
            className="fixed bottom-[6rem] right-4 z-50 h-14 w-14 rounded-full bg-black text-white shadow-lg"
          >
            <Icons.plus />
          </Button>
        </Link>
      )}
    </div>
  )
}
