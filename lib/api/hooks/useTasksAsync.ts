import { useQuery } from "@tanstack/react-query"

import { api } from "../api"

export type TaskStatus = "FINISHED" | "LATE" | "PENDING"

export interface TaskResponse {
  counterCarousel: {
    late: number
    available: number
    finished: number
  }
  tasks: {
    id: string
    title: string
    responsibleName: string
    responsibleImg: string
    description: string
    expiresOn: string
    status: TaskStatus
    frequency: "WEEKLY" | "MONTHLY" | "NONE"
  }[]
}

export const useTasksAsync = () => {
  return useQuery(["tasks"], () => api.get("/tasks").json<TaskResponse>())
}
