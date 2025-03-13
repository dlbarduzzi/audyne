import NextLink from "next/link"

import { Button } from "@/components/ui/button"
import { GoogleLogo } from "./google-logo"

import { cn } from "@/lib/utils"

type GoogleButtonProps = {
  action: "sign-in" | "sign-up"
  isDisabled: boolean
}

export function GoogleButton({ action, isDisabled }: GoogleButtonProps) {
  return (
    <Button
      type="button"
      variant="clear"
      className={cn("py-5", isDisabled && "text-gray-400")}
      asChild
    >
      <NextLink
        href={`/api/auth/${action}/google`}
        prefetch={false}
        className={cn(isDisabled && "pointer-events-none")}
      >
        <GoogleLogo />
        Sign {action === "sign-in" ? "in" : "up"} with Google
      </NextLink>
    </Button>
  )
}
