import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';

/**
 * Defines the accepted button variants.
 */
type Props = {
  variant?: 'outline' | 'primary' | 'default' | 'ghost';
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  type?: 'submit' | 'reset' | 'button';
};

/**
 * A highly customizable Button component with predefined variants.
 * @param {Props} props - The component props.
 * @returns {JSX.Element} The Button component.
 */
export const Button: React.FC<Props> = ({
  variant = 'default',
  children,
  className = '',
  onClick,
  disabled = false,
  isLoading = false,
  type = 'button',
}) => {
  // Define base and conditional classes
  const baseClasses =
    'inline-flex outline-none h-[52px] items-center rounded-[14px] justify-center !px-6 !py-4 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.98]';
  const disabledClasses = 'opacity-50 cursor-not-allowed';

  let variantClasses = '';

  switch (variant) {
    case 'primary':
      variantClasses = 'bg-[#005AF4] text-white';
      break;
    case 'outline':
      variantClasses = 'bg-white border font-medium border-[#005AF4] hover:bg-[#005AF4]-50/50';
      break;
    case 'ghost':
      variantClasses = 'hover:bg-indigo-100/50';
      break;
    case 'default':
    default:
      variantClasses = 'bg-gray-100 text-gray-800 hover:bg-gray-200';
      break;
  }

  // Combine classes based on state and props
  const finalClasses = `${baseClasses} ${variantClasses} ${
    disabled || isLoading ? disabledClasses : ''
  } ${className}`;

  const handleClick = () => {
    if (!disabled && !isLoading && onClick) {
      onClick();
    }
  };

  return (
    <button
      type={type}
      className={finalClasses}
      onClick={handleClick}
      disabled={disabled || isLoading}
    >
      {isLoading && <LoadingOutlined />}
      {children}
    </button>
  );
};
