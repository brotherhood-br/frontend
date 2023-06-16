import { useQuery } from "@tanstack/react-query"

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

export const useFinancesAsync = () => {
  return useQuery(["finances"], () =>
    protectedFetch().get("/budgets").json<FinancesResponse>()
  )
}
