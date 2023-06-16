"use client"

import { useAuth } from "@/hooks/useAuth"

const BrotherhoodContributeFinanceAdmin = () => {
  return (
    <div>
      <h1>Contribuir com a Finança</h1>
    </div>
  )
}

const BrotherhoodContributeFinanceMember = () => {
  return <div>Member</div>
}

export default function BrotherhoodContributeFinance() {
  const { user } = useAuth()

  if (user?.isAdmin) {
    return <BrotherhoodContributeFinanceAdmin />
  }

  return <BrotherhoodContributeFinanceMember />
}
