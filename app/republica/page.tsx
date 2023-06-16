"use client"

import { useRouter } from "next/navigation"

import { useBrotherhoodHomeAdminAsync } from "@/lib/api/hooks/useBrotherhoodAsync"
import { useAuth } from "@/hooks/useAuth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"

const BrotherhoodHomeAdmin = () => {
  const { data, isLoading } = useBrotherhoodHomeAdminAsync()
  const router = useRouter()

  const handleShareProfile = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()

    const url = `${window.location.origin}/republica/${data?.brotherhoodId}`
    navigator.clipboard.writeText(url)

    toast({
      title: "Link copiado",
      description: "O link para o perfil da república foi copiado",
    })
  }

  const handleShareInvite = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()

    const link = `${window.location.origin}/login/${data?.brotherhoodInviteToken}`

    navigator.clipboard.writeText(link)

    toast({
      title: "Link copiado",
      description: "O link para adicionar um novo membro foi copiado",
    })
  }

  return (
    <div>
      <h1>Brotherhood Home</h1>

      <section className="space-y-8">
        <Card
          className="cursor-pointer"
          onClick={() =>
            router.push(`/republica/${data?.brotherhoodId}/editar`)
          }
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-md font-medium">Perfil</CardTitle>

            <Icons.share className="h-6 w-6" onClick={handleShareProfile} />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-[60px] w-[80px]" />
            ) : (
              <p className="text-6xl">{data?.viewCount}</p>
            )}
            <span>
              visualizações
              <br /> (últimos 30 dias)
            </span>
          </CardContent>
        </Card>

        <Card
          className="cursor-pointer"
          onClick={() => router.push("/republica/membros")}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-md font-medium">Membros</CardTitle>

            <Icons.userPlus className="h-6 w-6" onClick={handleShareInvite} />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-[60px] w-[80px]" />
            ) : (
              <p className="text-6xl">
                {data?.occupation}
                <span className="text-xl text-gray-700">/{data?.capacity}</span>
              </p>
            )}

            <span>cadastrados</span>
          </CardContent>
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
