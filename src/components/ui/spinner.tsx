import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/cn';

const spinnerVariants = cva('animate-spin', {
  variants: {
    size: {
      default: 'h-4 w-4',
      sm: 'h-3 w-3',
      lg: 'h-6 w-6',
      xl: 'h-8 w-8',
    },
    variant: {
      default: 'text-current',
      primary: 'text-primary',
      secondary: 'text-secondary',
    },
  },
  defaultVariants: {
    size: 'default',
    variant: 'default',
  },
});

interface SpinnerProps
  extends React.SVGProps<SVGSVGElement>,
    VariantProps<typeof spinnerVariants> {}

const Spinner = React.forwardRef<SVGSVGElement, SpinnerProps>(
  ({ className, size, variant, ...props }, ref) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        ref={ref}
        className={cn(spinnerVariants({ size, variant }), className)}
        {...props}
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    );
  },
);

Spinner.displayName = 'Spinner';

export { Spinner, type SpinnerProps };
