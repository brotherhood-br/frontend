"use client"

import Link from "next/link"

import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Icons } from "@/components/icons"

export interface TileProps {
  children: string
  count: number
  value: string
}

const Tile = ({ children, count, value }: TileProps) => (
  <Label
    htmlFor={value}
    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
  >
    <RadioGroupItem value={value} id={value} className="sr-only" />
    <p className="text-3xl">{count}</p>
    <p className="text-slate-500">{children}</p>
  </Label>
)

export default function TasksPages() {
  return (
    <div>
      <h1>Tasks</h1>

      <section className="mb-8 space-x-4">
        <RadioGroup defaultValue="card" className="flex gap-4 overflow-x-auto ">
          <Tile count={5} value="late">
            Atrasado
          </Tile>
          <Tile count={7} value="available">
            Disponível
          </Tile>
          <Tile count={2} value="done">
            Finalizado
          </Tile>
        </RadioGroup>
      </section>

      <section className="space-y-8">
        <Card>
          <CardContent className="flex flex-row items-center gap-4 p-4">
            <div className="text-center">
              <p className="text-sm">Jun</p>
              <p className="text-3xl">10</p>
            </div>
            <div className="mr-auto">
              <h3 className="text-lg font-bold">Lavar Banheiro</h3>
              <p className="text-base text-slate-600">
                Culpa laboris commodo eiusmod do ex officia culpa.
              </p>
            </div>
            <Avatar className="h-14 w-14">
              <AvatarImage src="https://github.com/shadcn.png" />
              {/* TODO: fix fallback */}
              {/* <AvatarFallback>{getInitials(name)}</AvatarFallback> */}
            </Avatar>
          </CardContent>
          <CardFooter>
            <Badge variant="destructive">Atrasado</Badge>
          </CardFooter>
        </Card>

        <Card>
          <CardContent className="flex flex-row items-center gap-4 p-4">
            <div className="text-center">
              <p className="text-sm">Jun</p>
              <p className="text-3xl">10</p>
            </div>
            <div className="mr-auto">
              <h3 className="text-lg font-bold">Lavar Banheiro</h3>
              <p className="text-base text-slate-600">
                Culpa laboris commodo eiusmod do ex officia culpa.
              </p>
            </div>
            <Avatar className="h-14 w-14">
              <AvatarImage src="https://github.com/shadcn.png" />
              {/* TODO: fix fallback */}
              {/* <AvatarFallback>{getInitials(name)}</AvatarFallback> */}
            </Avatar>
          </CardContent>
          <CardFooter>
            <Badge variant="secondary">Disponível</Badge>
          </CardFooter>
        </Card>

        <Card>
          <CardContent className="flex flex-row items-center gap-4 p-4">
            <div className="text-center">
              <p className="text-sm">Jun</p>
              <p className="text-3xl">10</p>
            </div>
            <div className="mr-auto">
              <h3 className="text-lg font-bold">Lavar Banheiro</h3>
              <p className="text-base text-slate-600">
                Culpa laboris commodo eiusmod do ex officia culpa.
              </p>
            </div>
            <Avatar className="h-14 w-14">
              <AvatarImage src="https://github.com/shadcn.png" />
              {/* TODO: fix fallback */}
              {/* <AvatarFallback>{getInitials(name)}</AvatarFallback> */}
            </Avatar>
          </CardContent>
          <CardFooter>
            <Badge variant="outline">Finalizado</Badge>
          </CardFooter>
        </Card>

        <Card>
          <CardContent className="flex flex-row items-center gap-4 p-4">
            <div className="text-center">
              <p className="text-sm">Jun</p>
              <p className="text-3xl">10</p>
            </div>
            <div className="mr-auto">
              <h3 className="text-lg font-bold">Lavar Banheiro</h3>
              <p className="text-base text-slate-600">
                Culpa laboris commodo eiusmod do ex officia culpa.
              </p>
            </div>
            <Avatar className="h-14 w-14">
              <AvatarImage src="https://github.com/shadcn.png" />
              {/* TODO: fix fallback */}
              {/* <AvatarFallback>{getInitials(name)}</AvatarFallback> */}
            </Avatar>
          </CardContent>
          <CardFooter>
            <Badge variant="outline">Finalizado</Badge>
          </CardFooter>
        </Card>
      </section>

      <Link href="/tarefas/criar">
        <Button
          variant="outline"
          color="primary"
          className="fixed bottom-4 right-4 z-50 h-14 w-14 rounded-full bg-black text-white shadow-lg"
        >
          <Icons.plus />
        </Button>
      </Link>
    </div>
  )
}
