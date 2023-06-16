import { siteConfig } from "@/config/site"
import { Separator } from "@/components/ui/separator"
import { MainNav } from "@/components/main-nav"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full rounded-b-lg bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
      </div>
      <Separator />
    </header>
  )
}
