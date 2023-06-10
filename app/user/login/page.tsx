import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Command } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
}

export default function SignInPage() {
  return (
    <>
      <div className="container grid h-full place-items-center">
        <div>
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2">
              <h1 className="text-2xl font-semibold tracking-tight">
                Bem vindo!
              </h1>
              <p className="text-sm text-muted-foreground">
                Você está a um passo de se juntar a família universitária que
                mais cresce no Brasil.
              </p>
            </div>
            <Button variant="outline" type="button">
              <Icons.google className="mr-2 h-4 w-4" /> Entrar com o Google
            </Button>
            <footer className="mt-60">
              <p className="text-sm text-muted-foreground">
                Ao continuar você concorda com nossos{" "}
                <Link
                  href="/terms"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  Termos de Serviço
                </Link>
              </p>
            </footer>
          </div>
        </div>
      </div>
    </>
  )
}
