import NextLink from "next/link"
import NextImage from "next/image"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

import { cn } from "@/lib/utils"

export function SignUp() {
  const isSubmitting = false
  return (
    <div className="flex h-full flex-col justify-start sm:justify-center">
      <div className="w-full max-w-[432px] bg-white p-9">
        <div>
          <div className="flex items-center justify-center">
            <NextLink
              href="/"
              className={cn(
                "rounded-full focus-visible:outline-none focus-visible:ring-2",
                "focus-visible:ring-black focus-visible:ring-offset-2",
                isSubmitting && "pointer-events-none"
              )}
            >
              <NextImage
                src="/images/audyne-logo.png"
                alt="Audyne"
                width={500}
                height={500}
                className="h-12 w-auto"
              />
              <span className="sr-only">Link to home page.</span>
            </NextLink>
          </div>
          <h2
            className={cn(
              "pt-4 text-center text-lg font-bold tracking-tight text-gray-900"
            )}
          >
            Welcome to Audyne
          </h2>
          <p className="pt-0.5 text-center text-sm text-gray-700">
            Create an account to start exploring
          </p>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-y-4">
          <div className="space-y-0.5">
            <Label>Email</Label>
            <Input name="email" type="text" placeholder="example@acme.com" />
          </div>
          <div className="space-y-0.5">
            <Label>Password</Label>
            <Input name="password" type="text" placeholder="A strong password..." />
          </div>
          <div className="my-2 flex items-center space-x-2">
            <Checkbox id="terms" />
            <Label htmlFor="terms" className="peer-disabled:cursor-not-allowed">
              Accept terms and conditions
            </Label>
          </div>
          <div>
            <Button type="button" className="w-full">
              Create Account
            </Button>
          </div>
          <div className="relative my-2">
            <div aria-hidden="true" className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-t-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm/6 font-medium">
              <span className="bg-white px-6 text-gray-500">Or continue with</span>
            </div>
          </div>
          <Button type="button" variant="neutral" asChild>
            <NextLink href="/api/auth/sign-up/google" prefetch={false}>
              Google
            </NextLink>
          </Button>
          <Button type="button" variant="neutral" asChild>
            <NextLink href="/api/auth/sign-up/github" prefetch={false}>
              GitHub
            </NextLink>
          </Button>
          <div
            className={cn(
              "mb-1 mt-5 space-x-1 text-center text-sm/6 font-medium",
              isSubmitting ? "pointer-events-none text-gray-400" : "text-gray-500"
            )}
          >
            <span>Already have an account?</span>
            <NextLink
              href="/sign-in"
              className={cn(
                "font-semibold text-blue-600 hover:underline hover:underline-offset-4",
                isSubmitting && "pointer-events-none"
              )}
            >
              Sign in
            </NextLink>
          </div>
        </div>
      </div>
    </div>
  )
}
