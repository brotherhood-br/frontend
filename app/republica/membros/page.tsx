"use client"

import {
  useMembersAsync,
  useRemoveMemberAsync,
} from "@/lib/api/hooks/useUsersAsync"
import { getNameInitials } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Icons } from "@/components/icons"

export default function BrotherhoodMemberPage() {
  const { data } = useMembersAsync()
  const { mutateAsync: removeMemberAsync } = useRemoveMemberAsync()

  return (
    <div>
      <h1>Membros</h1>

      <section className="space-y-8">
        {data?.map((item) => (
          <Card>
            <CardContent className="flex flex-row items-center gap-4 p-4">
              <Avatar className="h-14 w-14">
                <AvatarImage src={item.image} />
                <AvatarFallback>{getNameInitials(item.name)}</AvatarFallback>
              </Avatar>
              <div className="mr-auto">
                <h3 className="text-xl font-bold">{item.name}</h3>
                <span className="text-slate-600">Administrador</span>
              </div>

              {/* TODO: add condition based on the user role */}
              {true && (
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Icons.moreVertical className="h-6 w-6" />
                  </DropdownMenuTrigger>

                  <DropdownMenuContent>
                    <DropdownMenuItem
                      onClick={() => removeMemberAsync(item.id)}
                    >
                      Remover usuário
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  )
}
