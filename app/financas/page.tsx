"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"

import { useAuth } from "@/hooks/useAuth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Icons } from "@/components/icons"

const BrotherhoodFinanceAdmin = () => {
  const router = useRouter()

  return (
    <div>
      <h1>Brotherhood Finance</h1>

      <div className="mb-2 rounded-md shadow-lg">
        <h2 className="flex justify-center text-xl font-semibold text-gray-500">
          Balanço
        </h2>
        <div className="flex justify-center shadow-lg">
          <p className="font-bold text-gray-500">R$</p>
          <p className="text-5xl font-bold text-primary">1.234,56</p>
        </div>
      </div>

      <h2>Metas</h2>

      <section className="space-y-8">
        <Card
          className="cursor-pointer"
          onClick={() => router.push("/financas/1")}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-md font-semibold">Título</CardTitle>

            <Icons.moreVertical className="h-6 w-6" onClick={"dsd"} />
          </CardHeader>
          <CardContent className="text-left"></CardContent>
          <CardContent className="text-right">
            <span>R$900,00</span>
            <Progress value={33} className="w-[100%]" />
          </CardContent>
        </Card>
      </section>

      <Link href="/financas/criar">
        <Button
          variant="outline"
          color="primary"
          className="fixed bottom-[5rem] right-4 z-50 h-14 w-14 rounded-full bg-black text-white shadow-lg"
        >
          <Icons.plus />
        </Button>
      </Link>
    </div>
  )
}

const BrotherhoodFinanceMember = () => {
  return <div>Member</div>
}

export default function BrotherhoodFinance() {
  const { user } = useAuth()

  if (user?.isAdmin) {
    return <BrotherhoodFinanceAdmin />
  }

  return <BrotherhoodFinanceMember />
}
