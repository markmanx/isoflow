import React from 'react';

type Props = React.SVGProps<SVGSVGElement> & {
  children: React.ReactNode;
};

export const Svg = ({ children, ...rest }: Props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" {...rest}>
      {children}
    </svg>
  );
};
