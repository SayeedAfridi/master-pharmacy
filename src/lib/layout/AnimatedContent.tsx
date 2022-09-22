import { FC, ReactNode } from 'react';
import { HTMLMotionProps, motion } from 'framer-motion';

export interface AnimatedContentProps extends HTMLMotionProps<'div'> {
  children?: ReactNode | ReactNode[];
}

export const AnimatedContent: FC<AnimatedContentProps> = ({
  children,
  ...props
}) => {
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
};
