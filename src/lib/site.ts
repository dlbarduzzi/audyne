import { env } from "@/env/client"

type SiteConfig = {
  name: string
  description: string
  url: string
}

export const siteConfig: SiteConfig = {
  name: "Audyne",
  description:
    "A custom auth application with support for credentials and social providers.",
  url: env.NEXT_PUBLIC_APP_URL,
}
