"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { GoogleLogin } from "@react-oauth/google"

import { useAuth } from "@/hooks/useAuth"

export default function SignInPage() {
  const { externalLogin } = useAuth()
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
            onSuccess={(response) => {
              if (!response.credential) throw new Error("No credential found")
              externalLogin(response.credential)

              // Check if the user is already registered

              router.push("/usuario/registrar")
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
