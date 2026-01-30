import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const badgeVariants = cva(
  'inline-flex items-center justify-center font-semibold rounded-full px-3 py-1 text-sm',
  {
    variants: {
      variant: {
        default: 'bg-neutral-200 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100',
        primary: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400',
        secondary: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
        accent: 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400',
        success: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400',
        warning: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400',
        destructive: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
      },
      size: {
        sm: 'text-xs px-2 py-0.5',
        md: 'text-sm px-3 py-1',
        lg: 'text-base px-4 py-1.5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, size, ...props }, ref) => (
    <div ref={ref} className={badgeVariants({ variant, size, className })} {...props} />
  )
);

Badge.displayName = 'Badge';
