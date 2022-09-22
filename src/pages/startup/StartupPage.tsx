import { FC } from 'react';
import { Startup } from '@src/features';
import { BaseContainer } from '@src/components';

export const StartupPage: FC = () => {
  return (
    <BaseContainer animate>
      <Startup />
    </BaseContainer>
  );
};
