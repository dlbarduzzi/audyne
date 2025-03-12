import NextLink from "next/link"
import { Button } from "@/components/ui/button"

export function SignUp() {
  return (
    <div>
      <div className="space-x-3">
        <Button type="button" asChild>
          <NextLink href="/api/auth/sign-up/email" prefetch={false}>
            Email
          </NextLink>
        </Button>
        <Button type="button" variant="neutral" asChild>
          <NextLink href="/api/auth/sign-up/github" prefetch={false}>
            GitHub
          </NextLink>
        </Button>
        <Button type="button" variant="neutral" asChild>
          <NextLink href="/api/auth/sign-up/google" prefetch={false}>
            Google
          </NextLink>
        </Button>
      </div>
    </div>
  )
}
