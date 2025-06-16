import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        // Primary CTA Button (Saffron - Dopamine Trigger)
        default: 'bg-saffron-500 text-white shadow-lg hover:bg-saffron-600 hover:shadow-xl hover:scale-105 active:scale-95',
        
        // Secondary Button (Emerald - Trust & Healing)
        secondary: 'bg-emerald-800 text-white hover:bg-emerald-700 shadow-md hover:shadow-lg',
        
        // Premium Button (Maroon - Luxury & Trust)
        premium: 'bg-maroon-800 text-white hover:bg-maroon-700 shadow-md hover:shadow-lg',
        
        // Outline Button (Charcoal - Information)
        outline: 'border-2 border-charcoal text-charcoal bg-transparent hover:bg-charcoal hover:text-ivory',
        
        // Ghost Button (Sage - Subtle Actions)
        ghost: 'text-charcoal hover:bg-sage-light hover:text-charcoal',
        
        // Destructive Button
        destructive: 'bg-red-600 text-white hover:bg-red-700 shadow-md',
        
        // Link Button
        link: 'text-emerald-800 underline-offset-4 hover:underline'
      },
      size: {
        default: 'h-11 px-6 py-3',
        sm: 'h-9 px-4 py-2 text-xs',
        lg: 'h-12 px-8 py-3 text-base',
        xl: 'h-14 px-10 py-4 text-lg',
        icon: 'h-11 w-11'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {typeof children === 'string' ? 'Loading...' : children}
          </>
        ) : (
          children
        )}
      </Comp>
    )
  }
)

Button.displayName = 'Button'

export { Button, buttonVariants } 