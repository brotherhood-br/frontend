"use client"

import { useRouter } from "next/navigation"

import { useCreateTasksAsync } from "@/lib/api/hooks/useTasksAsync"

import TasksForm, { TasksFormValues } from "../task-form"

export default function TasksCreatePage() {
  const router = useRouter()
  const { mutateAsync: createTaskAsync } = useCreateTasksAsync()

  const onSubmit = async (values: TasksFormValues) => {
    await createTaskAsync({
      title: values.title,
      description: values.description,
      attachedUserId: values.responsible,
      expiresOn: values.expireOn.toISOString(),
      frequency: values.frequency,
    })

    router.push("/tarefas")
  }

  return <TasksForm onSubmit={onSubmit} />
}
