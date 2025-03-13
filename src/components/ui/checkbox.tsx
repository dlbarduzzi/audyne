"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

const Checkbox = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <input
    type="checkbox"
    className={cn(
      "peer size-5 shrink-0 cursor-pointer rounded",
      "disabled:cursor-not-allowed",
      "checked:bg-red-500 checked:hover:bg-red-500",
      "checked:focus-visible:bg-green-500",
      "focus-visible:outline-none focus-visible:ring-2",
      "focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      props.checked
        ? "border-blue-500 bg-red-500 text-red-500 focus:ring-blue-500"
        : "border-gray-300 bg-gray-100 focus:ring-gray-300",
      className
    )}
    ref={ref}
    {...props}
  />
))

Checkbox.displayName = "Checkbox"

export { Checkbox }
