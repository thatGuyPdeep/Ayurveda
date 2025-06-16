import * as React from 'react'
import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  icon?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, helperText, icon, id, ...props }, ref) => {
    const inputId = id || props.name
    
    return (
      <div className="space-y-2">
        {label && (
          <label 
            htmlFor={inputId} 
            className="block text-sm font-medium text-charcoal"
          >
            {label}
          </label>
        )}
        
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-charcoal/60">
              {icon}
            </div>
          )}
          
          <input
            type={type}
            id={inputId}
            className={cn(
              'flex h-11 w-full rounded-xl border-2 border-sage-light bg-ivory px-4 py-3 text-sm text-charcoal placeholder:text-charcoal/50 transition-all duration-200',
              'focus:outline-none focus:ring-2 focus:ring-saffron-500 focus:border-saffron-500',
              'disabled:cursor-not-allowed disabled:opacity-50',
              error && 'border-red-500 focus:ring-red-500 focus:border-red-500',
              icon && 'pl-10',
              className
            )}
            ref={ref}
            {...props}
          />
        </div>
        
        {(error || helperText) && (
          <p className={cn(
            'text-sm',
            error ? 'text-red-600' : 'text-charcoal/60'
          )}>
            {error || helperText}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export { Input } 