"use client"

import type { SignUpSchema } from "@/tools/auth/schemas/sign-up"

import NextLink from "next/link"
import NextImage from "next/image"

import { useForm } from "react-hook-form"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Check, Circle, Eye, EyeOff, Info, X as IconX } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

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

import {
  signUpSchema,
  PASSWORD_MIN_CHARS,
  PASSWORD_MAX_CHARS,
} from "@/tools/auth/schemas/sign-up"

import {
  hasNumber,
  hasSpecialChar,
  hasLowercaseChar,
  hasUppercaseChar,
} from "@/tools/auth/schemas/utils"

export function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const [isTermsChecked, setIsTermsChecked] = useState(true)
  const [showPasswordCriteria, setShowPasswordCriteria] = useState(false)

  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const { errors, isSubmitting } = form.formState
  const passwordInput = form.watch("password")

  async function onSubmit(data: SignUpSchema) {
    if (!isTermsChecked) {
      // TODO: Display a toast error.
      console.log("[Error] You must accept terms and conditions")
      return
    }
    setShowPassword(() => false)
    setShowPasswordCriteria(() => false)
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
                      <div className="flex">
                        <div className="flex-1">
                          <FormLabel>Password</FormLabel>
                        </div>
                        <Popover
                          open={showPasswordCriteria}
                          onOpenChange={setShowPasswordCriteria}
                        >
                          <PopoverTrigger
                            className={cn(
                              "mr-1 flex items-center gap-x-1 text-sm font-medium",
                              isSubmitting
                                ? "pointer-events-none text-gray-400"
                                : "text-gray-500 hover:text-gray-700"
                            )}
                          >
                            Password criteria
                            <Info className="size-4" />
                          </PopoverTrigger>
                          <PopoverContent
                            side="top"
                            align="end"
                            className="w-80"
                            onFocusOutside={e => e.preventDefault()}
                            onPointerDownOutside={e => e.preventDefault()}
                          >
                            <PasswordCriteria
                              isError={!!errors.password}
                              password={passwordInput}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
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

type PasswordCriteriaProps = {
  isError: boolean
  password: string
}

function PasswordCriteria({ isError, password }: PasswordCriteriaProps) {
  return (
    <div>
      <div className="text-sm font-semibold text-gray-800">Password Requirements</div>
      <div className="pt-1 text-xs text-gray-600">
        Your password must meet the following criteria:
      </div>
      <div className="pt-5">
        <ul className="space-y-1">
          <PasswordCheck
            isValid={hasNumber(password)}
            isError={isError}
            description="Contain a number"
          />
          <PasswordCheck
            isValid={hasSpecialChar(password)}
            isError={isError}
            description="Contain a special character"
          />
          <PasswordCheck
            isValid={hasLowercaseChar(password)}
            isError={isError}
            description="Contain a lowercase character"
          />
          <PasswordCheck
            isValid={hasUppercaseChar(password)}
            isError={isError}
            description="Contain an uppercase character"
          />
          <PasswordCheck
            isValid={
              password.length >= PASSWORD_MIN_CHARS &&
              password.length <= PASSWORD_MAX_CHARS
            }
            isError={isError}
            // eslint-disable-next-line max-len
            description={`Between ${PASSWORD_MIN_CHARS} and ${PASSWORD_MAX_CHARS} characters long`}
          />
        </ul>
      </div>
    </div>
  )
}

type PasswordCheckProps = {
  isValid: boolean
  isError: boolean
  description: string
}

function PasswordCheck({ isValid, isError, description }: PasswordCheckProps) {
  return (
    <li
      className={cn(
        "inline-flex items-center gap-x-2 text-sm",
        isValid ? "text-green-600" : isError ? "text-red-500" : "text-gray-900"
      )}
    >
      <span className="flex size-5 items-center justify-center">
        {isValid ? (
          <Check className="size-5 text-green-500" />
        ) : isError ? (
          <IconX className="size-5 h-full text-red-500" />
        ) : (
          <Circle className="size-3 h-full fill-gray-300 stroke-none" />
        )}
      </span>
      {description}
    </li>
  )
}
