import { routes } from '@src/config/routes';
import { StartupPage } from '@src/pages';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path={routes.startup} element={<StartupPage />} />
    </Routes>
  );
}

export default App;
