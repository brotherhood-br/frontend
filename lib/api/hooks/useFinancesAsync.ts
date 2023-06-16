import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { protectedFetch } from "../api"

export interface GoalResponse {
  id: string
  title: string
  description: string
  currentValue: number
  targetValue: number
}

export interface FinancesResponse {
  totalValue: number
  goals: GoalResponse[]
}

export interface GoalCreateParams {
  name: string
  description: string
  value: number
}

export const useFinancesAsync = () => {
  return useQuery(["finances"], () =>
    protectedFetch().get("/budgets").json<FinancesResponse>()
  )
}

export const useFinanceByIdAsync = (id: string) =>
  useQuery(["finances", id], () =>
    protectedFetch().url(`/budgets/goals/${id}`).get().json<GoalResponse>()
  )

export const useCreateGoalAsync = () => {
  const queryClient = useQueryClient()

  return useMutation<unknown, Error, GoalCreateParams>(
    ["createGoal"],
    (values) => protectedFetch().url("/budgets/goals").post(values).res(),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["finances"])
      },
    }
  )
}
