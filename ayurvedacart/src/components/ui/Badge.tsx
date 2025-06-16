import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-emerald-100 text-emerald-800 hover:bg-emerald-200',
        secondary: 'border-transparent bg-sage-light text-charcoal hover:bg-sage-dark',
        success: 'border-transparent bg-emerald-100 text-emerald-800',
        warning: 'border-transparent bg-saffron-100 text-saffron-800',
        error: 'border-transparent bg-red-100 text-red-800',
        golden: 'border-transparent bg-saffron-100 text-saffron-800',
        emerald: 'border-transparent bg-emerald-100 text-emerald-800',
        maroon: 'border-transparent bg-maroon-100 text-maroon-800',
        outline: 'text-charcoal border border-sage-dark',
        premium: 'border-transparent bg-gradient-to-r from-maroon-800 to-maroon-600 text-white'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants } 