"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Icons } from "@/components/icons"

export default function BrotherhoodHome() {
  return (
    <div>
      <h1>Brotherhood Home</h1>

      <section className="space-y-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-md font-medium">Perfil</CardTitle>

            <DropdownMenu>
              <DropdownMenuTrigger>
                <Icons.moreVertical className="h-6 w-6" />
              </DropdownMenuTrigger>

              <DropdownMenuContent>
                {/* TODO: get link  */}
                <DropdownMenuItem>Compartilhar link de perfil</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardHeader>
          <CardContent>
            <p className="text-6xl">55</p>
            <span>
              visualizações
              <br /> (últimos 30 dias)
            </span>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-md font-medium">Membros</CardTitle>

            <DropdownMenu>
              <DropdownMenuTrigger>
                <Icons.moreVertical className="h-6 w-6" />
              </DropdownMenuTrigger>

              <DropdownMenuContent>
                {/* TODO: get link */}
                <DropdownMenuItem>
                  Compartilhar link de convite para entrar na república
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardHeader>
          <CardContent>
            <p className="text-6xl">
              5<span className="text-xl text-gray-700">/12</span>
            </p>
            <span>cadastrados</span>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
