import { IconProps } from '@/interface/common';

export const HomeIcon = ({
  width = 20,
  height = 20,
  className = '',
  fill = 'currentColor',
}: IconProps) => (
  <svg
    width={width}
    height={height}
    className={className}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15 17.4994H12.3334C12.195 17.4994 12.0833 17.3877 12.0833 17.2494V13.7494C12.0833 12.5986 11.1508 11.6661 10 11.6661C8.84917 11.6661 7.91667 12.5986 7.91667 13.7494V17.2494C7.91667 17.3877 7.80496 17.4994 7.66663 17.4994H5C3.33333 17.4994 2.5 16.6661 2.5 14.9994V9.70858C2.5 8.04358 2.93588 7.78779 3.69171 7.15446L8.6617 2.98687C9.43587 2.33771 10.565 2.33771 11.3392 2.98687L16.3092 7.15446C17.0642 7.78779 17.5008 8.04358 17.5008 9.70858V14.9994C17.5 16.6661 16.6667 17.4994 15 17.4994Z"
      fill={fill}
    />
  </svg>
);
