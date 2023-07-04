"use client"

import { useRouter } from "next/navigation"

import {
  useEditTasksAsync,
  useTaskByIdAsync,
} from "@/lib/api/hooks/useTasksAsync"
import { Icons } from "@/components/icons"

import TasksForm, { TasksFormValues } from "../../task-form"

interface TaskEditPageProps {
  params: { id: string }
}

export default function TasksEditPage({ params }: TaskEditPageProps) {
  const { data: task, isLoading } = useTaskByIdAsync(params.id)
  const { mutateAsync } = useEditTasksAsync(params.id)
  const router = useRouter()

  const onSubmit = async (values: TasksFormValues) => {
    await mutateAsync({
      title: values.title,
      description: values.description,
      attachedUserId: values.responsible,
      frequency: values.frequency,
      expiresOn: values.expireOn.toISOString(),
    })

    router.push("/tarefas")
  }

  if (isLoading) return <Icons.spinner className="mr-2 animate-spin" />

  return (
    <TasksForm
      onSubmit={onSubmit}
      defaultValues={{
        title: task?.title ?? "",
        description: task?.description ?? "",
        responsible: task?.attachedUserId ?? "",
        frequency: task?.frequency ?? "NONE",
        expireOn: new Date(task?.expiresOn ?? ""),
      }}
    />
  )
}
