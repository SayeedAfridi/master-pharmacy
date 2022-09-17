import { FC, Fragment, ReactNode } from 'react';

interface VisibilityProps {
  on?: boolean;
  children?: ReactNode;
}

export const Visibility: FC<VisibilityProps> = ({ on, children }) => {
  if (!on) {
    return null;
  }
  return <Fragment>{children}</Fragment>;
};
