'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Eye, EyeOff } from 'lucide-react';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'prefix'> {
  prefix?: React.ReactNode;
}

const InputWithPrefix = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, prefix, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const isPasswordInput = type === 'password';
    const inputType = isPasswordInput && showPassword ? 'text' : type;

    return (
      <div className="relative flex items-center">
        {prefix && (
          <span className="text-muted-foreground pointer-events-none absolute left-3">
            {prefix}
          </span>
        )}
        <input
          ref={ref}
          type={inputType}
          className={cn(
            'border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-base focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
            prefix && 'pl-8',
            isPasswordInput && 'pr-10',
            className,
          )}
          {...props}
        />
        {isPasswordInput && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-muted-foreground hover:text-foreground absolute right-3 transition-colors"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
    );
  },
);
InputWithPrefix.displayName = 'InputWithPrefix';

export { InputWithPrefix };
