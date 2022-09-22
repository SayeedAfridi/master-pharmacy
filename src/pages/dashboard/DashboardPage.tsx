import { FC } from 'react';
import { Dashboard } from '@src/features';
import { BaseContainer } from '@src/components';

interface DashboardPageProps {}

export const DashboardPage: FC<DashboardPageProps> = () => {
  return (
    <BaseContainer animate>
      <Dashboard />
    </BaseContainer>
  );
};
