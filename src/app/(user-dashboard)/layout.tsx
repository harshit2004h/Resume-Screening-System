import { Inter } from "next/font/google"
import { SidebarProvider } from "@/src/components/ui/sidebar"
import { AppSidebar } from "@/src/components/app-sidebar"
import { Header } from "@/src/components/header"
import type React from "react"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-background text-foreground`}>
        <SidebarProvider defaultOpen={true}>
          <div className="flex h-screen">
            <div className="bg-background/80 backdrop-blur-sm">
              <AppSidebar />
            </div>
            <div className="flex flex-col flex-1 overflow-hidden">
              <div className="bg-background/80 backdrop-blur-sm">
                <Header />
              </div>
              <main className="flex-1 overflow-y-auto p-6 transition-all duration-300 ease-in-out">{children}</main>
            </div>
          </div>
        </SidebarProvider>
      </body>
    </html>
  )
}
