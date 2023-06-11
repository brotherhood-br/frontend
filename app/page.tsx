"use client"

import Link from "next/link"

import { useAuth } from "@/hooks/useAuth"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Icons } from "@/components/icons"

export default function IndexPage() {
  const { user } = useAuth()

  return (
    <>
      <Link href="/usuario/editar">
        <header className="flex gap-6">
          <Avatar className="h-16 w-16">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>{user?.initials}</AvatarFallback>
          </Avatar>

          <div className="mr-auto">
            <h1 className="text-2xl font-bold">República X</h1>
            <span>Olá, {user?.name}</span>
          </div>
        </header>
      </Link>

      <Separator className="my-4" />

      <h1 className="mb-4 text-xl font-bold">Minhas Tarefas</h1>
      <section className="space-y-4">
        {/* TODO: task clickable */}
        <Card>
          <CardContent className="flex items-center p-6">
            <div className="mr-auto">
              <h3 className="text-lg font-bold">Lavar banheiro</h3>
              <p className="text-slate-600">Vencimento: 04/11</p>
            </div>
            <Icons.moreVertical className="h-6 w-6" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center p-6">
            <div className="mr-auto">
              <h3 className="text-lg font-bold">Trocar Lâmpada</h3>
              <p className="text-slate-600">Vencimento: 04/11</p>
            </div>
            <Icons.moreVertical className="h-6 w-6" />
          </CardContent>
        </Card>
      </section>
    </>
  )
}
