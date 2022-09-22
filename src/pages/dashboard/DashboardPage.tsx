import { FC } from 'react';
import { Dashboard } from '@src/features';

interface DashboardPageProps {}

export const DashboardPage: FC<DashboardPageProps> = () => {
  return (
    <div>
      <Dashboard />
    </div>
  );
};
