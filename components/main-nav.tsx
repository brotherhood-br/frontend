import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

import { NavItem } from "@/types/nav"
import { siteConfig } from "@/config/site"

import { Icons } from "./icons"
import { Button } from "./ui/button"

interface MainNavProps {
  title?: string
  items?: NavItem[]
}

export function MainNav({ title }: MainNavProps) {
  const router = useRouter()
  const pathname = usePathname()

  const showButton = !["/login"].some((value) => pathname.includes(value))

  return (
    <div className="flex gap-6 md:gap-10">
      {showButton && (
        <Button
          variant="ghost"
          className="absolute left-1 top-[0.60rem] p-2"
          onClick={() => router.back()}
        >
          <Icons.chevronLeft className="h-6 w-6" />
        </Button>
      )}
      <Link href="/" className="mx-auto flex items-center space-x-2">
        <Image
          src="/assets/icons/icon-48x48.png"
          alt="Logo"
          width={48}
          height={48}
        />
        <span className="inline-block font-bold">
          {title ?? siteConfig.name}
        </span>
      </Link>
    </div>
  )
}
