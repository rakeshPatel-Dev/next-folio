import React from 'react';

interface UpArrowProps extends React.SVGProps<SVGSVGElement> {
  color?: string;
  /** The thickness of the line (stroke-width) */
  strokeWidth?: number;
}

const UpArrow: React.FC<UpArrowProps> = ({ 
  color = 'currentColor', 
  strokeWidth = 7,
  className = '',
  ...props 
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      fill="none"
      className={className}
      {...props}
    >
      <path
        d="M15 75 C 25 75, 30 60, 40 50 C 50 40, 55 25, 45 25 C 35 25, 35 45, 50 45 C 65 45, 80 35, 85 20"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 73 28 L 85 20 L 90 34"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default UpArrow;