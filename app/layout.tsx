"use client"

import "@/styles/globals.css"
import { useEffect } from "react"
import { Metadata } from "next"
import { GoogleOAuthProvider } from "@react-oauth/google"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import { siteConfig } from "@/config/site"
import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { useAuth } from "@/hooks/useAuth"
import { SiteHeader } from "@/components/site-header"
import { TailwindIndicator } from "@/components/tailwind-indicator"
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

const queryClient = new QueryClient()

export default function RootLayout({ children }: RootLayoutProps) {
  const { login } = useAuth()

  // TODO: validate if user is logged in
  useEffect(() => {
    login({
      id: "1",
      name: "John Doe",
      email: "test@gmail.com",
      avatar: "https://i.pravatar.cc/150?img=3",
      initials: "JD",
      role: "member",
      isAdmin: false,
    })
  }, [login])

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
                <TailwindIndicator />
              </ThemeProvider>
            </GoogleOAuthProvider>
          </QueryClientProvider>
        </body>
      </html>
    </>
  )
}
