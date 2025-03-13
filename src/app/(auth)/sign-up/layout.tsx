import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div
      className={cn(
        "flex min-h-screen flex-col items-center justify-center",
        "bg-gradient-to-t from-violet-400 to-violet-50"
      )}
    >
      <main className="grid w-full max-w-[432px] flex-1">{children}</main>
    </div>
  )
}
