import * as React from 'react';
import { Button, buttonVariants } from '@/components/ui/button'; // Ensure buttonVariants is imported
import { cn } from '@/lib/utils';
import { VariantProps } from 'class-variance-authority';

type CustomButtonProps = React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

type ButtonHoverProps = CustomButtonProps & {
  isHover?: boolean;
  children: React.ReactNode;
};

const ButtonHover = ({ isHover, children, className, ...rest }: ButtonHoverProps) => (
  <Button {...rest} className={cn(className, isHover && 'relative group')}>
    {children}
    {isHover && (
      <div
        className={cn('absolute w-0.5 hidden group-hover:block bg-blue-4 h-full top-0 left-0')}
      />
    )}
  </Button>
);

export default ButtonHover;
