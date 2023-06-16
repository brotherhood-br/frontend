"use client"

import { useState } from "react"
import Link from "next/link"
import { format } from "date-fns"
import ptBR from "date-fns/locale/pt-BR"

import { TaskStatus, useTasksAsync } from "@/lib/api/hooks/useTasksAsync"
import { getNameInitials } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Icons } from "@/components/icons"

export interface TileProps {
  children: string
  count: number
  value: string
}

const Tile = ({ children, count, value }: TileProps) => (
  <Label
    htmlFor={value}
    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
  >
    <RadioGroupItem value={value} id={value} className="sr-only" />
    <p className="text-3xl">{count}</p>
    <p className="text-slate-500">{children}</p>
  </Label>
)

export default function TasksPages() {
  const [filter, setFilter] = useState<TaskStatus | null>(null)
  const { data } = useTasksAsync()

  if (!data) {
    return null
  }

  const tasks = data.tasks
    .filter((t) => filter === null || t.status === filter)
    .sort((a, b) => {
      const dateA = new Date(a.expiresOn)
      const dateB = new Date(b.expiresOn)

      return dateA.getTime() - dateB.getTime()
    })

  return (
    <div>
      <h1>Tasks</h1>

      <section className="mb-8 space-x-4">
        <RadioGroup
          defaultValue="card"
          className="flex gap-4 overflow-x-auto"
          onValueChange={(e) => setFilter(e as TaskStatus)}
        >
          <Tile count={data.counterCarousel.late} value="LATE">
            Atrasado
          </Tile>
          <Tile count={data.counterCarousel.available} value="AVAILABLE">
            Disponível
          </Tile>
          <Tile count={data.counterCarousel.finished} value="FINISHED">
            Finalizado
          </Tile>
        </RadioGroup>
      </section>

      <section className="space-y-8">
        {tasks.map((item) => {
          const expiresOn = new Date(item.expiresOn)
          const day = format(expiresOn, "dd")
          const month = format(expiresOn, "MMM", { locale: ptBR })

          return (
            <Card key={item.id}>
              <Link href={`/tarefas/${item.id}`}>
                <CardContent className="flex flex-row items-center gap-4 p-4">
                  <div className="text-center">
                    <p className="text-sm first-letter:capitalize">{month}</p>
                    <p className="text-3xl">{day}</p>
                  </div>
                  <div className="mr-auto">
                    <h3 className="text-lg font-bold">{item.title}</h3>
                    <p className="text-base text-slate-600">
                      {item.description}
                    </p>
                  </div>
                  <Avatar className="h-14 w-14">
                    <AvatarImage src={item.responsibleImg} />
                    <AvatarFallback>
                      {getNameInitials(item.responsibleName)}
                    </AvatarFallback>
                  </Avatar>
                </CardContent>
                <CardFooter>
                  {item.status === "LATE" && (
                    <Badge variant="destructive">Atrasado</Badge>
                  )}
                  {item.status === "AVAILABLE" && (
                    <Badge variant="secondary">Disponível</Badge>
                  )}
                  {item.status === "FINISHED" && (
                    <Badge variant="outline">Finalizado</Badge>
                  )}
                </CardFooter>
              </Link>
            </Card>
          )
        })}
      </section>

      <Link href="/tarefas/criar">
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
