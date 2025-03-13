"use client"

import NextLink from "next/link"
import NextImage from "next/image"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormProvider,
} from "@/components/ui/form"

import { cn, delay } from "@/lib/utils"
import { ButtonSpinner } from "./button-spinner"

const signUpSchema = z.object({
  email: z.string().min(1, "Email is required").email("Not a valid email"),
  password: z.string().min(1, "Password is required").min(8, {
    message: "Password must be at least 8 characters long",
  }),
})

type SignUpSchema = z.infer<typeof signUpSchema>

export function SignUp() {
  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const { errors, isSubmitting } = form.formState

  async function onSubmit(data: SignUpSchema) {
    // TODO:
    // 1. Check if terms and conditions are checked
    // 2. Add link to terms and conditions
    await delay(2000)
    console.log(data)
  }

  return (
    <div className="flex h-full flex-col justify-start sm:justify-center">
      <div className="w-full max-w-[432px] bg-white px-8 py-10">
        <div className="grid grid-cols-1 gap-y-6">
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
            <div className="mt-4 space-y-0.5 text-center">
              <h2 className={cn("text-lg font-bold tracking-tight text-gray-900")}>
                Welcome to Audyne
              </h2>
              <p className="text-sm text-gray-700">
                Create an account to start exploring
              </p>
            </div>
          </div>
          <div>
            <FormProvider {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid grid-cols-1 gap-y-5"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <div className="mt-0.5">
                        <FormControl>
                          <Input
                            {...field}
                            type="text"
                            variant={!!errors.email ? "danger" : "default"}
                            disabled={isSubmitting}
                            placeholder="you@email.com"
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <div className="mt-0.5">
                        <FormControl>
                          <Input
                            {...field}
                            type="text"
                            variant={!!errors.password ? "danger" : "default"}
                            disabled={isSubmitting}
                            placeholder="Enter your password..."
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="sign-up-terms-and-conditions"
                    disabled={isSubmitting}
                    defaultChecked
                  />
                  <Label
                    htmlFor="sign-up-terms-and-conditions"
                    className="text-[13px] font-medium peer-disabled:cursor-not-allowed"
                  >
                    Accept terms and conditions
                  </Label>
                </div>
                <div>
                  <ButtonSpinner
                    type="submit"
                    size="md"
                    title="Create Account"
                    className="w-full"
                    isSubmitting={isSubmitting}
                  />
                </div>
              </form>
            </FormProvider>
          </div>
          <div className="space-x-1 text-center text-sm text-gray-700">
            <span>Already have an account?</span>
            <NextLink
              href="/sign-in"
              className={cn(
                "font-semibold hover:underline hover:underline-offset-4",
                isSubmitting ? "pointer-events-none text-blue-400" : "text-blue-600"
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
