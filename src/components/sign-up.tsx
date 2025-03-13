"use client"

import type { SignUpSchema } from "@/tools/auth/schemas/sign-up"

import NextLink from "next/link"
import NextImage from "next/image"

import { useForm } from "react-hook-form"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff } from "lucide-react"

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

import { GoogleButton } from "./google-button"
import { GitHubButton } from "./github-button"
import { ButtonSpinner } from "./button-spinner"

import { cn, delay } from "@/lib/utils"
import { signUpSchema } from "@/tools/auth/schemas/sign-up"

export function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const [isTermsChecked, setIsTermsChecked] = useState(true)

  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const { errors, isSubmitting } = form.formState

  async function onSubmit(data: SignUpSchema) {
    if (!isTermsChecked) {
      // TODO: Display a toast error.
      console.log("[Error] You must accept terms and conditions")
      return
    }
    setShowPassword(() => false)
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
              <p className="text-sm font-medium text-gray-500">
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
                      <div className="relative mt-0.5">
                        <FormControl>
                          <Input
                            {...field}
                            type={showPassword ? "text" : "password"}
                            variant={!!errors.password ? "danger" : "default"}
                            disabled={isSubmitting}
                            placeholder="Enter your password..."
                            className="pr-12"
                          />
                        </FormControl>
                        <div
                          className={cn(
                            "absolute inset-y-0 right-0 flex items-center pr-3"
                          )}
                        >
                          <div
                            role="button"
                            onClick={() => setShowPassword(() => !showPassword)}
                            className={cn(
                              isSubmitting
                                ? "pointer-events-none text-gray-300"
                                : "text-gray-400"
                            )}
                          >
                            {showPassword ? (
                              <Eye className="size-6" />
                            ) : (
                              <EyeOff className="size-6" />
                            )}
                          </div>
                        </div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="sign-up-terms-and-conditions"
                    disabled={isSubmitting}
                    checked={isTermsChecked}
                    onCheckedChange={() => setIsTermsChecked(() => !isTermsChecked)}
                  />
                  <Label
                    htmlFor="sign-up-terms-and-conditions"
                    className={cn(
                      "text-[13px] font-medium peer-disabled:cursor-not-allowed",
                      isSubmitting && "text-gray-400"
                    )}
                  >
                    Accept{" "}
                    <NextLink
                      href="/info/terms"
                      className={cn(
                        "font-semibold hover:underline hover:underline-offset-4",
                        isSubmitting
                          ? "pointer-events-none text-gray-400"
                          : "text-gray-900"
                      )}
                    >
                      terms
                    </NextLink>
                    {" and "}
                    <NextLink
                      href="/info/conditions"
                      className={cn(
                        "font-semibold hover:underline hover:underline-offset-4",
                        isSubmitting
                          ? "pointer-events-none text-gray-400"
                          : "text-gray-900"
                      )}
                    >
                      conditions
                    </NextLink>
                  </Label>
                </div>
                <div>
                  <ButtonSpinner
                    type="submit"
                    size="md"
                    title="Create Account"
                    className="w-full"
                    disabled={isSubmitting || !isTermsChecked}
                    isSubmitting={isSubmitting}
                  />
                </div>
              </form>
            </FormProvider>
          </div>
          <div className="relative">
            <div aria-hidden="true" className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-t-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm/8 font-medium">
              <span className="bg-white px-6 text-gray-500">Or continue with</span>
            </div>
          </div>
          <div className="flex flex-col gap-y-3.5">
            <GoogleButton
              action="sign-up"
              isDisabled={isSubmitting || !isTermsChecked}
            />
            <GitHubButton
              action="sign-up"
              isDisabled={isSubmitting || !isTermsChecked}
            />
          </div>
          <div className="space-x-1 text-center text-sm font-medium text-gray-500">
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
