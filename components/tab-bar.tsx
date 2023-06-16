import React from "react";
import { useRouter } from "next/navigation"
import { usePathname } from "next/navigation";
import { Icons } from "@/components/icons";


export function TabBar() {

  const router = useRouter();
  const pathname = usePathname();

  let isHome = false;
  let isBrotherhood = false;
  let isFinance = false;
  let isTask = false;

  if(pathname.endsWith("/republica"))
  isBrotherhood = true;
  else if(pathname.endsWith("/financas"))
  isFinance = true;
  else if(pathname.endsWith("/tarefas"))
  isTask = true;
  else
  isHome = true;

  return (
    <div className="sticky inset-x-0 bottom-0 mb-0 flex h-16 w-screen items-center justify-between rounded-t-lg border-t border-gray-200 bg-background px-4 shadow-2xl">
      <button
        className={`flex flex-col items-center justify-center text-gray-500 hover:text-accent ${
          isHome ? "text-accent" : ""
        }`}
        onClick={() => router.push("")}
      >
        <Icons.home className="mb-1 h-6 w-6">
          </Icons.home>
        <span className="text-xs">Home</span>
      </button>
      <button
        className={`flex flex-col items-center justify-center text-gray-500 hover:text-accent ${
          isBrotherhood ? "text-accent" : ""
        }`}
        onClick={() => router.push("/republica")}
      >
        <Icons.users className="mb-1 h-6 w-6">
        </Icons.users>
        <span className="text-xs">República</span>
      </button>
      <button
        className={`flex flex-col items-center justify-center text-gray-500 hover:text-accent ${
          isFinance ? "text-accent" : ""
        }`}
        onClick={() => router.push("/financas")}
      >
        <Icons.creditCard className="mb-1 h-6 w-6">
        </Icons.creditCard>
        <span className="text-xs">Finanças</span>
      </button>
      <button
        className={`flex flex-col items-center justify-center text-gray-500 hover:text-accent ${
          isTask ? "text-accent" : ""
        }`}
        onClick={() => router.push("/tarefas")}
      >
        <Icons.clipBoard className="mb-1 h-6 w-6">
        </Icons.clipBoard>
        <span className="text-xs">Tarefas</span>
      </button>
    </div>
  )
}
