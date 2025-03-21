import type { VariantProps } from "class-variance-authority"

import * as React from "react"

import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  `inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm
  font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2
  focus-visible:ring-offset-2 disabled:pointer-events-none`,
  {
    variants: {
      variant: {
        default: `bg-violet-500 text-white hover:bg-violet-600
          focus-visible:ring-violet-500 disabled:bg-violet-400
          disabled:text-violet-100`,
        neutral: `bg-gray-200 text-gray-600 hover:bg-gray-300
          focus-visible:ring-gray-300 disabled:text-gray-400`,
        clear: `border border-gray-300 bg-white text-gray-700 hover:bg-gray-100
          focus-visible:ring-gray-300 disabled:text-gray-400`,
        danger: `bg-red-500 text-white hover:bg-red-600
          focus-visible:ring-red-500 disabled:bg-red-400 disabled:text-red-100`,
      },
      size: {
        default: "h-10 px-4 py-2",
        md: "h-11 px-4 py-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)

Button.displayName = "Button"

export { Button, buttonVariants }
