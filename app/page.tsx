"use client"

import Link from "next/link"
import { format } from "date-fns"

import { useHomeAsync } from "@/lib/api/hooks/useHomeAsync"
import { getNameInitials } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Icons } from "@/components/icons"

// TODO: create a log out button

export interface HomeResponse {
  brotherhoodLogo: string
  brotherhoodBanner: string
  userId: string
  userName: string
  userType: "ADMIN" | "RESIDENT"
  tasks: {
    id: string
    title: string
    expireDate: string
  }[]
}

export default function IndexPage() {
  const { data, isLoading } = useHomeAsync()

  if (data === undefined) return null
  // <div className="flex items-center justify-center h-screen">
  //   <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
  // </div>

  return (
    <>
      <Link href="/usuario/editar">
        {data !== undefined && (
          <header className="flex gap-6">
            <Avatar className="h-16 w-16">
              <AvatarImage src={data.brotherhoodLogo} />
              <AvatarFallback>{getNameInitials(data.userName)}</AvatarFallback>
            </Avatar>

            <div className="mr-auto">
              <h1 className="text-2xl font-bold">República X</h1>
              <span>Olá, {data.userName}</span>
            </div>
          </header>
        )}
      </Link>

      <Separator className="my-4" />

      <h1 className="mb-4 text-xl font-bold">Minhas Tarefas</h1>
      <section className="space-y-4">
        {isLoading && (
          <div className="flex h-screen items-center justify-center">
            <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-gray-900"></div>
          </div>
        )}
        {data?.tasks.map((item) => {
          const date = new Date(item.expireDate)
          const formattedDate = format(date, "dd/MM")

          return (
            <Card key={item.id}>
              <Link href={`/tarefas/${item.id}`}>
                <CardContent className="flex items-center p-6">
                  <div className="mr-auto">
                    <h3 className="text-lg font-bold">{item.title}</h3>
                    <p className="text-slate-600">
                      Vencimento: {formattedDate}
                    </p>
                  </div>
                  <Icons.moreVertical className="h-6 w-6" />
                </CardContent>
              </Link>
            </Card>
          )
        })}
      </section>
    </>
  )
}
