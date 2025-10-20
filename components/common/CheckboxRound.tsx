'use client';

import Image from 'next/image';
import type React from 'react';
import { useState } from 'react';

interface CheckboxFullProps {
  id?: string;
  label?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
}

export function CheckboxRound({
  id,
  label,
  checked = false,
  onChange,
  className = '',
}: CheckboxFullProps) {
  const [isChecked, setIsChecked] = useState(checked);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = e.target.checked;
    setIsChecked(newChecked);
    onChange?.(newChecked);
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative cursor-pointer">
        <input
          type="checkbox"
          id={id}
          checked={isChecked}
          onChange={handleChange}
          className="sr-only"
        />
        <Image
          width={20}
          height={20}
          src={checked ? '/icons/tick-circle.svg' : '/icons/ticked-circle.svg'}
          alt={''}
        />
      </div>
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-foreground cursor-pointer">
          {label}
        </label>
      )}
    </div>
  );
}
