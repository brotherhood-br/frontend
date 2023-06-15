"use client"

import "@/styles/globals.css"
import { Metadata } from "next"
import { GoogleOAuthProvider } from "@react-oauth/google"
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query"

import { siteConfig } from "@/config/site"
import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/toaster"
import { toast } from "@/components/ui/use-toast"
import { SiteHeader } from "@/components/site-header"
import { TabBar } from "@/components/tab-bar"
import { ThemeProvider } from "@/components/theme-provider"

// export const metadata: Metadata = {
//   title: {
//     default: siteConfig.name,
//     template: `%s - ${siteConfig.name}`,
//   },
//   description: siteConfig.description,
//   themeColor: [
//     { media: "(prefers-color-scheme: light)", color: "white" },
//     { media: "(prefers-color-scheme: dark)", color: "black" },
//   ],
//   icons: {
//     icon: "/favicon.ico",
//     shortcut: "/favicon-16x16.png",
//     apple: "/apple-touch-icon.png",
//   },
// }

interface RootLayoutProps {
  children: React.ReactNode
}

const googleClientId =
  "43960775230-1o1aqgh85sn56nr1ai1kjktp62gf9ihc.apps.googleusercontent.com"

const handleGlobalErrors = (error: any) =>
  toast({
    title: "Um erro aconteceu durante uma requisição 😥",
    description: error.message ?? "",
    variant: "destructive",
  })

const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onError: handleGlobalErrors,
  }),
  queryCache: new QueryCache({
    onError: handleGlobalErrors,
  }),
})

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
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
                <div className="relative flex min-h-screen flex-col">
                  <SiteHeader />
                  <div className="mx-4 flex-1">{children}</div>
                </div>
                <Toaster />
              </ThemeProvider>
            </GoogleOAuthProvider>
          </QueryClientProvider>

          <TabBar />
        </body>
      </html>
    </>
  )
}
