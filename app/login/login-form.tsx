"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { CredentialResponse, GoogleLogin } from "@react-oauth/google"

import { protectedFetch } from "@/lib/api"
import { useAuth } from "@/hooks/useAuth"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"

import { HomeResponse } from "../page"

export interface SignInFormProps {
  inviteId?: string
}

export default function SignInForm({ inviteId }: SignInFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { login, setExternalToken } = useAuth()
  const router = useRouter()

  const handleLoginSuccess = async (response: CredentialResponse) => {
    if (!response.credential) throw new Error("No credential found")

    setIsLoading(true)
    const userData: HomeResponse = await protectedFetch()
      .url("/home")
      .headers({ sso_token: response.credential })
      .get()
      .forbidden(() => {
        if (inviteId) {
          // User is a member not registered
          setExternalToken(response.credential!)
          router.push(`/usuario/registrar/${inviteId}`)
        } else {
          // User is an admin not registered
          setExternalToken(response.credential!)
          router.push("/usuario/registrar")
        }
      })
      .fetchError(() => {
        toast({
          title: "Erro",
          description: "Não foi possível fazer login",
          variant: "destructive",
        })
      })
      .json()

    if (!userData) {
      setIsLoading(false)
      return
    }

    // User is already registered
    login({
      user: {
        id: userData.userId,
        name: userData.userName,
        role: userData.userType,
        avatar: userData.brotherhoodLogo,
      },
      brotherhoodId: "", // TODO
      token: response.credential,
    })

    router.push("/")
    setIsLoading(false)
  }

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
          {isLoading ? (
            <div>
              <Icons.spinner className="h-6 w-6 animate-spin" />
            </div>
          ) : (
            <GoogleLogin
              onSuccess={handleLoginSuccess}
              onError={() => {
                console.error("Login Failed")
              }}
            />
          )}
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
