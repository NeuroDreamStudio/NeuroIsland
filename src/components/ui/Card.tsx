import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'elevated' | 'flat' | 'outlined';
  hover?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', variant = 'elevated', hover = false, children, ...props }, ref) => {
    const baseStyles = 'rounded-lg transition-all duration-200';
    
    const variantStyles = {
      elevated: 'bg-white dark:bg-neutral-800 shadow-md dark:shadow-lg hover:shadow-lg dark:hover:shadow-xl',
      flat: 'bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700',
      outlined: 'border-2 border-neutral-300 dark:border-neutral-600 bg-transparent',
    };

    const hoverStyles = hover ? 'hover:scale-105 hover:shadow-xl' : '';

    return (
      <div
        ref={ref}
        className={`${baseStyles} ${variantStyles[variant]} ${hoverStyles} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
