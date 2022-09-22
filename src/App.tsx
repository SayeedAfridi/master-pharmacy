import { routes } from '@src/config/routes';
import { DashboardPage, StartupPage } from '@src/pages';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path={routes.startup} element={<StartupPage />} />
      <Route path={routes.dashboard} element={<DashboardPage />} />
    </Routes>
  );
}

export default App;
