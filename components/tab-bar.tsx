import React from "react"
import { usePathname, useRouter } from "next/navigation"

import { Icons } from "@/components/icons"

const paths = {
  brotherhood: "/republica",
  finance: "/financas",
  task: "/tarefas",
  home: "/",
}

export function TabBar() {
  const router = useRouter()
  const pathname = usePathname()

  const currentPath = Object.entries(paths).find(([, path]) =>
    pathname.startsWith(path)
  )?.[0]

  const isHome = currentPath === "home"
  const isBrotherhood = currentPath === "brotherhood"
  const isFinance = currentPath === "finance"
  const isTask = currentPath === "task"

  return (
    <div className="sticky inset-x-0 bottom-0 flex h-[4.2rem] w-screen items-center justify-between rounded-t-lg border-t border-gray-200 bg-background px-4 pb-2 shadow-2xl">
      <button
        className={`flex flex-col items-center justify-center text-gray-500 hover:text-accent ${
          isHome ? "text-accent" : ""
        }`}
        onClick={() => router.push("/")}
      >
        <Icons.home className="mb-1 h-6 w-6" />
        <span className="text-xs">Home</span>
      </button>
      <button
        className={`flex flex-col items-center justify-center text-gray-500 hover:text-accent ${
          isBrotherhood ? "text-accent" : ""
        }`}
        onClick={() => router.push("/republica")}
      >
        <Icons.users className="mb-1 h-6 w-6" />
        <span className="text-xs">República</span>
      </button>
      <button
        className={`flex flex-col items-center justify-center text-gray-500 hover:text-accent ${
          isFinance ? "text-accent" : ""
        }`}
        onClick={() => router.push("/financas")}
      >
        <Icons.creditCard className="mb-1 h-6 w-6" />
        <span className="text-xs">Finanças</span>
      </button>
      <button
        className={`flex flex-col items-center justify-center text-gray-500 hover:text-accent ${
          isTask ? "text-accent" : ""
        }`}
        onClick={() => router.push("/tarefas")}
      >
        <Icons.clipBoard className="mb-1 h-6 w-6" />
        <span className="text-xs">Tarefas</span>
      </button>
    </div>
  )
}
