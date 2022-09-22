import React, { ReactNode } from 'react';

export const MainNavLayout: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return <div>{children}</div>;
};
