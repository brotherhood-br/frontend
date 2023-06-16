"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"

import {
  useBrotherhoodDataAsync,
  useBrotherhoodHomeAdminAsync,
} from "@/lib/api/hooks/useBrotherhoodAsync"
import { getNameInitials } from "@/lib/utils"
import { useAuth } from "@/hooks/useAuth"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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

            {!!data && (
              <Icons.share className="h-6 w-6" onClick={handleShareProfile} />
            )}
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

            {!!data && (
              <Icons.userPlus className="h-6 w-6" onClick={handleShareInvite} />
            )}
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

const translateType = (type: string | undefined) => {
  switch (type) {
    case "JUST_MEN":
      return "Somente homens"

    case "JUST_WOMEN":
      return "Somente mulheres"

    case "NO_RESTRICTIONS":
      return "Sem restrições"
  }
}

const BrotherhoodHomeMember = () => {
  const { brotherhoodId } = useAuth()
  const { data } = useBrotherhoodDataAsync(brotherhoodId ?? "")

  return (
    <div>
      <div className="relative h-48 w-full md:h-64">
        <div className="absolute inset-0">
          <Image
            src="/cover.jpg"
            alt="Cover"
            fill
            objectFit="cover"
            objectPosition="center"
          />
        </div>
        <div className="absolute inset-0 rounded-t-lg bg-black opacity-30" />
        <div className="absolute inset-0 flex items-end justify-center pb-4">
          <div className="relative">
            <Avatar className="h-[80px] w-[80px]">
              <AvatarImage src={data?.logo} />
              <AvatarFallback>{getNameInitials(data?.name)}</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>

      <h1 className="my-4 text-2xl font-bold">{data?.name}</h1>

      <section className="space-y-4">
        <div>
          <p className="text-sm text-slate-500">Telefone</p>
          <p className="text-md">{data?.phone}</p>
        </div>

        <div>
          <p className="text-sm text-slate-500">Endereço</p>
          <p className="text-md">
            {data?.address.street}, {data?.address.number} -{" "}
            {data?.address.city} {data?.address.state}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">Tipo</p>
          <p className="text-md">{data?.type}</p>
        </div>

        <div>
          <p className="text-sm text-slate-500">Tipo</p>
          <p className="text-md">{translateType(data?.type)}</p>
        </div>

        <div>
          <p className="text-sm text-slate-500">Lotação</p>
          <p className="text-md">{data?.capacity}</p>
        </div>

        <div>
          <p className="text-sm text-slate-500">Descrição</p>
          <p className="text-md">{data?.description}</p>
        </div>
      </section>
    </div>
  )
}

export default function BrotherhoodHome() {
  const { user } = useAuth()

  if (user?.isAdmin) {
    return <BrotherhoodHomeAdmin />
  }

  return <BrotherhoodHomeMember />
}
