import React from "react"
import { usePathname, useRouter } from "next/navigation"

import { Icons } from "@/components/icons"

const paths = {
  brotherhood: "/republica",
  finance: "/financas",
  task: "/tarefas",
  home: "/",
}

export function BottomNav() {
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
    <div className="sticky inset-x-0 bottom-0 flex h-[5rem] w-screen items-center justify-between rounded-t-lg border-t border-gray-200 bg-background px-4 pb-4 shadow-2xl">
      <button
        className={`flex flex-col items-center justify-center ${
          isHome ? "text-gray-900" : "text-slate-400"
        }`}
        onClick={() => router.push("/")}
      >
        {isHome ? (
          <Icons.homeFill className="mb-1 h-6 w-6" />
        ) : (
          <Icons.home className="mb-1 h-6 w-6" />
        )}

        <span className="text-xs">Home</span>
      </button>
      <button
        className={`flex flex-col items-center justify-center ${
          isBrotherhood ? "text-gray-900" : "text-slate-400"
        }`}
        onClick={() => router.push("/republica")}
      >
        {isBrotherhood ? (
          <Icons.hotelFill className="mb-1 h-6 w-6" />
        ) : (
          <Icons.hotel className="mb-1 h-6 w-6" />
        )}

        <span className="text-xs">República</span>
      </button>
      <button
        className={`flex flex-col items-center justify-center ${
          isFinance ? "text-gray-900" : "text-slate-400"
        }`}
        onClick={() => router.push("/financas")}
      >
        {isFinance ? (
          <Icons.creditCardFill className="mb-1 h-6 w-6" />
        ) : (
          <Icons.creditCard className="mb-1 h-6 w-6" />
        )}

        <span className="text-xs">Finanças</span>
      </button>
      <button
        className={`flex flex-col items-center justify-center ${
          isTask ? "text-gray-900" : "text-slate-400"
        }`}
        onClick={() => router.push("/tarefas")}
      >
        {isTask ? (
          <Icons.todoFill className="mb-1 h-6 w-6" />
        ) : (
          <Icons.todo className="mb-1 h-6 w-6" />
        )}

        <span className="text-xs">Tarefas</span>
      </button>
    </div>
  )
}
