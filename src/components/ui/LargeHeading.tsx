import { HTMLAttributes, forwardRef } from 'react';

import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const largeHeadingVariants = cva(
  'text-black dark:text-white text-center lg:text-left font-extrabold leading-tight tracking-tighter',
  {
    variants: {
      size: {
        default: 'text-4xl md:text-5xl lg:text-6xl',
        sm: 'text-2xl md:text-3xl lg:text-4xl',
        lg: 'text-5xl md:text-6xl lg:text-7xl'
      }
    },
    defaultVariants: {
      size: 'default'
    }
  }
);

interface ILargeHeadingProps
  extends HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof largeHeadingVariants> {}
const LargeHeading = forwardRef<HTMLHeadingElement, ILargeHeadingProps>(
  ({ className, size, children, ...props }, ref) => {
    return (
      <h1
        ref={ref}
        {...props}
        className={cn(largeHeadingVariants({ size, className }))}>
        {children}
      </h1>
    );
  }
);

LargeHeading.displayName = 'Large Heading';

export default LargeHeading;
