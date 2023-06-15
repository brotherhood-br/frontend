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
    <div className="sticky bottom-0 w-screen mb-0 flex justify-between inset-x-0 items-center h-16 px-4 border-t rounded-t-lg shadow-2xl border-gray-200 bg-background">
      <button
        className={`flex flex-col items-center justify-center text-gray-500 hover:text-accent ${
          isHome ? "text-accent" : ""
        }`}
        onClick={() => router.push("")}
      >
        <Icons.home className="w-6 h-6 mb-1">
          </Icons.home>
        <span className="text-xs">Home</span>
      </button>
      <button
        className={`flex flex-col items-center justify-center text-gray-500 hover:text-accent ${
          isBrotherhood ? "text-accent" : ""
        }`}
        onClick={() => router.push("/republica")}
      >
        <Icons.users className="w-6 h-6 mb-1">
        </Icons.users>
        <span className="text-xs">República</span>
      </button>
      <button
        className={`flex flex-col items-center justify-center text-gray-500 hover:text-accent ${
          isFinance ? "text-accent" : ""
        }`}
        onClick={() => router.push("")}
      >
        <Icons.creditCard className="w-6 h-6 mb-1">
        </Icons.creditCard>
        <span className="text-xs">Finanças</span>
      </button>
      <button
        className={`flex flex-col items-center justify-center text-gray-500 hover:text-accent ${
          isTask ? "text-accent" : ""
        }`}
        onClick={() => router.push("/tarefas")}
      >
       <Icons.clipBoard className="w-6 h-6 mb-1">
       </Icons.clipBoard>
        <span className="text-xs">Tarefas</span>
      </button>
    </div>
  )
}
