"use client"

import { useAuth } from "@/hooks/useAuth"

const BrotherhoodViewFinanceAdmin = () => {
  return (
    <div>
      <h1>Visualizar Finança</h1>
    </div>
  )
}

const BrotherhoodViewFinanceMember = () => {
  return <div>Member</div>
}

export default function BrotherhoodViewFinance() {
  const { user } = useAuth()

  if (user?.isAdmin) {
    return <BrotherhoodViewFinanceAdmin />
  }

  return <BrotherhoodViewFinanceMember />
}
