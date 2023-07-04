"use client"

import Link from "next/link"
import { format } from "date-fns"

import { useHomeAsync } from "@/lib/api/hooks/useHomeAsync"
import {
  useCompleteTaskAsync,
  useDeleteTaskAsync,
} from "@/lib/api/hooks/useTasksAsync"
import { getNameInitials } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Icons } from "@/components/icons"

export interface HomeResponse {
  brotherhoodName: string
  brotherhoodLogo: string
  brotherhoodBanner: string
  userId: string
  userName: string
  userPicture: string
  userType: "ADMIN" | "RESIDENT"
  tasks: {
    id: string
    title: string
    expireDate: string
  }[]
}

export default function IndexPage() {
  const { data, isLoading } = useHomeAsync()
  const { mutateAsync: deleteTaskAsync } = useDeleteTaskAsync()
  const { mutateAsync: completeTaskAsync } = useCompleteTaskAsync()

  return (
    <>
      <Link href="/usuario/editar">
        {!!data && (
          <header className="flex gap-6">
            <Avatar className="h-16 w-16">
              <AvatarImage src={data.userPicture} />
              <AvatarFallback>{getNameInitials(data.userName)}</AvatarFallback>
            </Avatar>

            <div className="mr-auto">
              <h1 className="text-2xl font-bold">{data.brotherhoodName}</h1>
              <span>Olá, {data.userName}!</span>
            </div>
          </header>
        )}
        {isLoading && (
          <header className="flex gap-6">
            <Skeleton className="h-[64px] w-[64px] rounded-full" />

            <div className="mr-auto space-y-1">
              <Skeleton className="h-[32px] w-[200px]" />
              <Skeleton className="h-[20px] w-[120px]" />
            </div>
          </header>
        )}
      </Link>

      <Separator className="my-4" />

      <h1 className="mb-4 text-xl font-bold">Minhas Tarefas</h1>
      <section className="space-y-4">
        {isLoading && (
          <>
            <Card>
              <CardContent className="flex items-center p-6">
                <div className="mr-auto space-y-1">
                  <Skeleton className="h-[32px] w-[120px]" />
                  <Skeleton className="h-[32px] w-[250px]" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center p-6">
                <div className="mr-auto space-y-1">
                  <Skeleton className="h-[32px] w-[120px]" />
                  <Skeleton className="h-[32px] w-[250px]" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center p-6">
                <div className="mr-auto space-y-1">
                  <Skeleton className="h-[32px] w-[120px]" />
                  <Skeleton className="h-[32px] w-[250px]" />
                </div>
              </CardContent>
            </Card>
          </>
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

                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Icons.moreVertical className="h-6 w-6" />
                    </DropdownMenuTrigger>

                    <DropdownMenuContent>
                      <DropdownMenuItem
                        onClick={async (e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          await completeTaskAsync(item.id)
                        }}
                      >
                        Completar tarefa
                      </DropdownMenuItem>

                      <DropdownMenuItem>
                        <Link href={`/tarefas/${item.id}/editar`}>
                          Editar tarefa
                        </Link>
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onClick={async (e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          await deleteTaskAsync(item.id)
                        }}
                      >
                        Excluir tarefa
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardContent>
              </Link>
            </Card>
          )
        })}
        {!isLoading && data?.tasks.length === 0 && (
          <Card>
            <Link href={`/tarefas/criar`}>
              <CardContent className="flex items-center gap-4 px-6 py-12">
                <Icons.bird className="h-10 w-10 text-slate-400" />
                <div className="mr-auto">
                  <h3 className="text-lg font-bold">
                    Você não possui tarefas!
                  </h3>
                  <p className="text-slate-600">
                    Clique aqui para criar agora mesmo
                  </p>
                </div>
              </CardContent>
            </Link>
          </Card>
        )}
      </section>
    </>
  )
}
