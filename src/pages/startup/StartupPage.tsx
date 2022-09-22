import { FC } from 'react';
import { Startup } from '@src/features';
import { AnimatedContent } from '@src/lib/layout';

export const StartupPage: FC = () => {
  return (
    <AnimatedContent>
      <Startup />
    </AnimatedContent>
  );
};
