import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { protectedFetch } from "../api"

export type TaskStatus = "FINISHED" | "LATE" | "AVAILABLE"

export interface TaskResponse {
  id: string
  title: string
  responsibleName: string
  responsibleImg: string
  description: string
  expiresOn: string
  status: TaskStatus
  frequency: "WEEKLY" | "MONTHLY" | "NONE"
}

export interface TaskListResponse {
  counterCarousel: {
    late: number
    available: number
    finished: number
  }
  tasks: TaskResponse[]
}

export interface TaskCreateParams {
  title: string
  description: string
  expiresOn: string
  attachedUserId: string
  frequency: "WEEKLY" | "MONTHLY" | "NONE"
}

export const useTasksAsync = () =>
  useQuery(["tasks"], () =>
    protectedFetch().get("/tasks").json<TaskListResponse>()
  )

export const useTaskByIdAsync = (id: string) =>
  useQuery(["tasks", id], () =>
    protectedFetch().url(`/tasks/${id}`).get().json<TaskResponse>()
  )

export const useCreateTasksAsync = () => {
  const queryClient = useQueryClient()

  return useMutation<unknown, Error, TaskCreateParams>(
    ["createTask"],
    (values) => protectedFetch().url("/tasks").post(values).res(),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["tasks", "home"])
      },
    }
  )
}
