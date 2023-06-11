"use client"

import Link from "next/link"

import { useAuth } from "@/hooks/useAuth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Icons } from "@/components/icons"

const BrotherhoodHomeAdmin = () => {
  const handleShareProfile = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    console.log("share profile")

    // TODO: get link
  }

  const handleShareInvite = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    console.log("share invite")

    // TODO: get link
  }

  return (
    <div>
      <h1>Brotherhood Home</h1>

      <section className="space-y-8">
        <Card>
          <Link href="/republica/editar">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-md font-medium">Perfil</CardTitle>

              <Icons.share className="h-6 w-6" onClick={handleShareProfile} />
            </CardHeader>
            <CardContent>
              <p className="text-6xl">55</p>
              <span>
                visualizações
                <br /> (últimos 30 dias)
              </span>
            </CardContent>
          </Link>
        </Card>

        <Card>
          <Link href="/republica/membros">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-md font-medium">Membros</CardTitle>

              <Icons.userPlus className="h-6 w-6" onClick={handleShareInvite} />
            </CardHeader>
            <CardContent>
              <p className="text-6xl">
                5<span className="text-xl text-gray-700">/12</span>
              </p>
              <span>cadastrados</span>
            </CardContent>
          </Link>
        </Card>
      </section>
    </div>
  )
}

const BrotherhoodHomeMember = () => {
  return <div>Member</div>
}

export default function BrotherhoodHome() {
  const { user } = useAuth()

  if (user?.isAdmin) {
    return <BrotherhoodHomeAdmin />
  }

  return <BrotherhoodHomeMember />
}
