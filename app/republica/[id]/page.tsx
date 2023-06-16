"use client"

import Image from "next/image"

import { useBrotherhoodDataAsync } from "@/lib/api/hooks/useBrotherhoodAsync"
import { getNameInitials } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

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

interface BrotherhoodProfilePageProps {
  params: { id: string }
}

export default function BrotherhoodProfilePage({
  params,
}: BrotherhoodProfilePageProps) {
  const { data } = useBrotherhoodDataAsync(params.id)

  return (
    <>
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
          <p className="text-md">{translateType(data?.type)}</p>
        </div>

        <div>
          <p className="text-sm text-slate-500">Capacidade</p>
          <p className="text-md">
            {data?.membersCount}/{data?.capacity}
          </p>
        </div>
      </section>

      <Separator className="my-4" />

      <div>
        <h1 className="mt-4 text-xl font-semibold tracking-tight">
          Sobre a República
        </h1>

        <p className="mt-4">{data?.description}</p>
      </div>
    </>
  )
}
