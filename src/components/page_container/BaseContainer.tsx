import { FC, Fragment, ReactNode } from 'react';
import { HTMLMotionProps, motion } from 'framer-motion';

export interface BaseContainerProps extends HTMLMotionProps<'div'> {
  animate?: boolean;
  children?: ReactNode | ReactNode[];
}

export const BaseContainer: FC<BaseContainerProps> = ({
  children,
  animate,
  ...props
}) => {
  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }

  return <Fragment>{children}</Fragment>;
};
