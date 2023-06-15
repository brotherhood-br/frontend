"use client"

import TasksForm, { TasksFormValues } from "../task-form"

export default function TasksCreatePage() {
  const onSubmit = async (values: TasksFormValues) => {
    console.log(values)
  }

  return <TasksForm onSubmit={onSubmit} />
}
