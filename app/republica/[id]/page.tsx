"use client"

import Image from "next/image"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface BrotherhoodProfilePageProps {
  params: { id: string }
}

export default function BrotherhoodProfilePage({
  params,
}: BrotherhoodProfilePageProps) {
  // TODO: fetch brotherhood data
  // TODO: remove header and bottom menu

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
        <div className="absolute inset-0 rounded-t-lg bg-black opacity-30" />
        <div className="absolute inset-0 flex items-end justify-center pb-4">
          <div className="relative">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>{"LA"}</AvatarFallback>
            </Avatar>

            <div className="absolute inset-0 rounded-full shadow-inner" />
          </div>
        </div>
      </div>

      <div className="m-4 space-x-4">
        <Badge>14 vagas</Badge>
        <Badge>Masculina</Badge>
        <Badge>Casa grande</Badge>
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
  )
}
