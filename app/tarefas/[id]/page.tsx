"use client"

import Link from "next/link"
import { format, parseISO } from "date-fns"

import {
  useCompleteTaskAsync,
  useTaskByIdAsync,
} from "@/lib/api/hooks/useTasksAsync"
import { getNameInitials } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"

export interface Task {
  id: string
  title: string
  responsibleName: string
  responsibleImg: string
  description: string
  expiresOn: string
  frequency: "WEEKLY" | "MONTHLY" | "NONE"
}

const translateFrequency = (frequency: string | undefined) => {
  if (!frequency) return

  const frequencyTypes = {
    WEEKLY: "Semanal",
    MONTHLY: "Mensal",
    NONE: "Nenhuma",
  }

  return frequencyTypes[frequency as keyof typeof frequencyTypes]
}

interface TaskPageProps {
  params: { id: string }
}

export default function TaskPage({ params }: TaskPageProps) {
  const { data: task, isLoading } = useTaskByIdAsync(params.id)
  const { mutateAsync: completeTaskAsync, isLoading: completeIsLoading } =
    useCompleteTaskAsync()

  if (!task || isLoading) return null

  return (
    <div>
      <h1 className="text-2xl font-bold">{task.title}</h1>

      <section className="my-4 flex gap-4">
        <Avatar className="h-14 w-14">
          <AvatarImage src={task.responsibleImg} />
          <AvatarFallback>
            {getNameInitials(task.responsibleName)}
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col">
          <p className="text-sm text-slate-500">Responsável</p>
          <p className="text-xl font-bold">{task.responsibleName}</p>
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <p className="text-sm text-slate-500">Descrição</p>
          <p className="text-md">{task.description}</p>
        </div>

        <div>
          <p className="text-sm text-slate-500">Vencimento</p>
          <p className="text-md">
            {task?.expiresOn !== undefined &&
              format(parseISO(task.expiresOn), "dd/MM/yyyy")}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">Frequência</p>
          <p className="text-md">{translateFrequency(task.frequency)}</p>
        </div>
      </section>

      <Link href={`/tarefas/${task.id}/editar`}>
        <Button className="mt-12 w-full" variant="outline">
          Editar
        </Button>
      </Link>
      {task.status === "FINISHED" ? (
        <Button className="mt-2 w-full" variant="secondary" disabled>
          Tarefa completada
        </Button>
      ) : (
        <Button
          className="mt-2 w-full"
          variant="secondary"
          disabled={completeIsLoading}
          onClick={() => completeTaskAsync(task.id)}
        >
          {completeIsLoading ? (
            <Icons.spinner className="mr-2 animate-spin" />
          ) : null}
          Completar tarefa
        </Button>
      )}
    </div>
  )
}
