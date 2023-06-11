import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Icons } from "@/components/icons"

// TODO: create button plus to add new member (like material design)

export default function BrotherhoodMemberPage() {
  return (
    <div>
      <h1>Republica X - Membros</h1>

      <section className="space-y-8">
        <Card>
          <CardContent className="flex flex-row items-center gap-4 p-4">
            <Avatar className="h-14 w-14">
              <AvatarImage src="https://github.com/shadcn.png" />
              {/* TODO: fix fallback */}
              {/* <AvatarFallback>{getInitials(name)}</AvatarFallback> */}
            </Avatar>
            <div className="mr-auto">
              <h3 className="text-xl font-bold">Vanderli</h3>
              <span className="text-slate-600">Administrador</span>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger>
                <Icons.moreVertical className="h-6 w-6" />
              </DropdownMenuTrigger>

              <DropdownMenuContent>
                {/* TODO: get link  */}
                <DropdownMenuItem>Remover usuário</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
