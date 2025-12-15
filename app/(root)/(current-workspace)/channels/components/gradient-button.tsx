import type React from 'react';
import { cn } from '@/lib/utils';
import { type ButtonHTMLAttributes, forwardRef } from 'react';

interface GradientButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const GradientButton = forwardRef<HTMLButtonElement, GradientButtonProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'group relative inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-base font-medium',
          className,
        )}
        {...props}
      >
        <div
          className="absolute inset-0 rounded-full p-0.5"
          style={{
            background:
              'linear-gradient(263.4deg, #FF9100 2.15%, #FF0055 34.93%, #E300E7 62.04%, #5900FF 95.72%)',
          }}
        >
          <div className="h-full w-full rounded-full bg-white" />
        </div>
        <span
          className="relative z-10 flex items-center gap-3 bg-clip-text text-transparent"
          style={{
            backgroundImage:
              'linear-gradient(263.4deg, #FF9100 2.15%, #FF0055 34.93%, #E300E7 62.04%, #5900FF 95.72%)',
          }}
        >
          {children}
        </span>
      </button>
    );
  },
);

GradientButton.displayName = 'GradientButton';
