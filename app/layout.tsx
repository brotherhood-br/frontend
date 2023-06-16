"use client"

import "@/styles/globals.css"
import { usePathname } from "next/navigation"
import { GoogleOAuthProvider } from "@react-oauth/google"
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query"

import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { checkUserSession } from "@/hooks/useAuth"
import { Toaster } from "@/components/ui/toaster"
import { toast } from "@/components/ui/use-toast"
import { BottomNav } from "@/components/bottom-nav"
import { SiteHeader } from "@/components/site-header"
import { ThemeProvider } from "@/components/theme-provider"

interface RootLayoutProps {
  children: React.ReactNode
}

const googleClientId =
  "43960775230-1o1aqgh85sn56nr1ai1kjktp62gf9ihc.apps.googleusercontent.com"

const handleGlobalErrors = (error: any) => {
  toast({
    title: "Um erro aconteceu durante uma requisição 😥",
    description: error.message ?? "",
    variant: "destructive",
  })
}

const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onError: handleGlobalErrors,
  }),
  queryCache: new QueryCache({
    onError: handleGlobalErrors,
  }),
})

export default function RootLayout({ children }: RootLayoutProps) {
  const pathname = usePathname()

  if (!["/login", "/republica/"].some((value) => pathname.includes(value))) {
    checkUserSession()
  }

  const hideHeader = /^\/republica\/[0-9A-z-]{36}$/.test(pathname)

  const hideNav =
    /^\/republica\/[0-9A-z-]{36}$/.test(pathname) || pathname.includes("/login")

  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head>
          <meta name="application-name" content="PWA App" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          <meta name="apple-mobile-web-app-title" content="PWA App" />
          <meta
            name="description"
            content="A melhor plataforma de gerenciamento de república do mundo."
          />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta
            name="msapplication-config"
            content="/icons/browserconfig.xml"
          />
          <meta name="msapplication-TileColor" content="#2B5797" />
          <meta name="msapplication-tap-highlight" content="no" />
          <meta name="theme-color" content="#000000" />

          <link rel="apple-touch-icon" href="/icons/touch-icon-iphone.png" />
          <link
            rel="apple-touch-icon"
            sizes="152x152"
            href="/icons/touch-icon-ipad.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/icons/touch-icon-iphone-retina.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="167x167"
            href="/icons/touch-icon-ipad-retina.png"
          />

          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/icons/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/icons/favicon-16x16.png"
          />
          <link rel="manifest" href="/manifest.json" />
          <link
            rel="mask-icon"
            href="/icons/safari-pinned-tab.svg"
            color="#5bbad5"
          />
          <link rel="shortcut icon" href="/favicon.ico" />

          <meta name="twitter:card" content="summary" />
          <meta name="twitter:url" content="https://yourdomain.com" />
          <meta name="twitter:title" content="PWA App" />
          <meta
            name="twitter:description"
            content="A melhor plataforma de gerenciamento de república do mundo."
          />
          <meta
            name="twitter:image"
            content="https://yourdomain.com/icons/android-chrome-192x192.png"
          />
          <meta name="twitter:creator" content="@DavidWShadow" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="PWA App" />
          <meta
            property="og:description"
            content="A melhor plataforma de gerenciamento de república do mundo."
          />
          <meta property="og:site_name" content="PWA App" />
          <meta property="og:url" content="https://yourdomain.com" />
          <meta
            property="og:image"
            content="https://yourdomain.com/icons/apple-touch-icon.png"
          />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=1"
          />
        </head>
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <QueryClientProvider client={queryClient}>
            <GoogleOAuthProvider clientId={googleClientId}>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
              >
                <div className="relative flex h-screen flex-col overflow-hidden">
                  {!hideHeader && <SiteHeader />}
                  <div className="mt-4 flex-1 overflow-auto">
                    <div className="mx-4 mb-4">{children}</div>
                  </div>
                  {!hideNav && <BottomNav />}
                </div>
                <Toaster />
              </ThemeProvider>
            </GoogleOAuthProvider>
          </QueryClientProvider>
        </body>
      </html>
    </>
  )
}
