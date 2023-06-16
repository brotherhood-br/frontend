import { siteConfig } from "@/config/site"
import { Separator } from "@/components/ui/separator"
import { MainNav } from "@/components/main-nav"

export interface SiteHeaderProps {
  title?: string
}

export function SiteHeader({ title }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full rounded-b-lg bg-background">
      <div className="container flex h-16 items-center justify-center">
        <MainNav items={siteConfig.mainNav} title={title} />
      </div>
      <Separator />
    </header>
  )
}
