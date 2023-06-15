"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { GoogleLogin } from "@react-oauth/google"

import { api } from "@/lib/api"
import { useAuth } from "@/hooks/useAuth"
import { toast } from "@/components/ui/use-toast"

import { HomeResponse } from "../page"

export default function SignInPage() {
  const { login, setExternalToken } = useAuth()
  const router = useRouter()

  return (
    <div>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">Bem vindo!</h1>
          <p className="text-sm text-muted-foreground">
            Você está a um passo de se juntar a família universitária que mais
            cresce no Brasil.
          </p>
        </div>

        <div className="grid w-full place-items-center">
          <GoogleLogin
            onSuccess={async (response) => {
              if (!response.credential) throw new Error("No credential found")

              const userData: HomeResponse = await api
                .url("/home")
                .headers({ sso_token: response.credential })
                .get()
                .forbidden(() => {
                  // User is not registered
                  setExternalToken(response.credential!)
                  router.push("/usuario/registrar")
                })
                .fetchError(() => {
                  toast({
                    title: "Erro",
                    description: "Não foi possível fazer login",
                    variant: "destructive",
                  })
                })
                .json()

              if (!userData) return

              login({
                user: {
                  id: userData.userId,
                  name: userData.userName,
                  role: userData.userType,
                  avatar: userData.brotherhoodLogo,
                },
                token: response.credential,
              })

              router.push("/")
            }}
            onError={() => {
              console.error("Login Failed")
            }}
          />
        </div>
        <footer className="mt-60">
          <p className="text-sm text-muted-foreground">
            Ao continuar você concorda com nossos{" "}
            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Termos de Serviço
            </Link>
            .
          </p>
        </footer>
      </div>
    </div>
  )
}
