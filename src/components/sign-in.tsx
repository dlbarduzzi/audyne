import NextLink from "next/link"
import { Button } from "@/components/ui/button"

export function SignIn() {
  return (
    <div>
      <div className="space-x-3">
        <Button type="button" asChild>
          <NextLink href="/api/auth/sign-up/email" prefetch={false}>
            Email
          </NextLink>
        </Button>
        <Button type="button" variant="neutral" asChild>
          <NextLink href="/api/oauth/sign-up?provider=github" prefetch={false}>
            GitHub
          </NextLink>
        </Button>
        <Button type="button" variant="neutral" asChild>
          <NextLink href="/api/oauth/sign-up?provider=google" prefetch={false}>
            Google
          </NextLink>
        </Button>
      </div>
    </div>
  )
}
