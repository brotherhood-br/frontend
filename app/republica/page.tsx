"use client"

import Link from "next/link"

import { useAuth } from "@/hooks/useAuth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Icons } from "@/components/icons"


import Image from "next/image"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

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
  const { user } = useAuth();

  return <>
  <div className="relative h-48 w-full md:h-64">
    <div className="absolute inset-0">
      <Image
        src="/cover.jpg"
        alt="Cover"
        fill
        objectFit="cover"
        objectPosition="center"
        className="rounded-t-lg"
      />
    </div>
    <div className="absolute inset-0 rounded-t-lg bg-black/30" />
    <div className="absolute inset-0 flex items-end justify-start pb-4">
      <div className="relative">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>{user?.initials}</AvatarFallback>
        </Avatar>

        <div className="absolute inset-0 rounded-full shadow-inner" />
      </div>
    </div>
  </div>

  <Separator className="my-4" />

  <div>
    <h1 className="text-2xl font-semibold tracking-tight">
      Principais Características
    </h1>

    <ul className="mt-4 space-y-2">
      <li>
        <span className="font-semibold">Vagas:</span> 14
      </li>
      <li>
        <span className="font-semibold">Gênero:</span> Masculina
      </li>
      <li>
        <span className="font-semibold">Casa:</span> Grande
      </li>
      <li>
        <span className="font-semibold">Endereço:</span> Rua dos Bobos, nº0
      </li>
      <li>
        <span className="font-semibold">Telefone:</span> (00) 00000-0000
      </li>
    </ul>
  </div>

  <Separator className="my-4" />

  <div>
    <h1 className="text-2xl font-semibold tracking-tight">
      Sobre a República
    </h1>

    <p className="mt-4">
      Velit cupidatat ipsum et duis anim. Non officia deserunt id ullamco
      id. Cillum ullamco adipisicing ut cillum dolore.
    </p>
  </div>

  <Separator className="my-4" />

  {/* Location */}
  <div>
    <h1 className="text-2xl font-semibold tracking-tight">Localização</h1>

    <div className="mt-4"></div>
    {/* TODO: use react-google-maps and GCP console to handle maps */}
  </div>
</>
}

export default function BrotherhoodHome() {
  const { user } = useAuth()

  if (user?.isAdmin) {
    return <BrotherhoodHomeAdmin />
  }

  return <BrotherhoodHomeMember />
}
