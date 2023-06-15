"use client"

import TasksForm, { TasksFormValues } from "../task-form"

const taskMock = {
  title: "Limpar a casa",
  description: "Limpar a casa direitinho",
  responsible: "Rafael Marotta",
  frequency: "WEEKLY",
  expireOn: new Date("2021-06-22T00:05:48.755Z"),
} satisfies TasksFormValues

export default function TasksEditPage() {
  const onSubmit = async (values: TasksFormValues) => {
    console.log(values)
  }

  return <TasksForm onSubmit={onSubmit} defaultValues={taskMock} />
}
