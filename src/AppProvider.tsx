import { FC } from 'react';
import App from '@src/App';
import { Provider } from 'react-redux';
import store, { persistor } from '@src/lib/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { HashRouter } from 'react-router-dom';
import { MainNavLayout } from '@src/lib/layout';
import { ErrorBoundary } from '@src/components/ErrorBoundary';
import { ToastContainer } from 'react-toastify';

const AppProvider: FC = () => {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <HashRouter>
            <MainNavLayout>
              <App />
            </MainNavLayout>
          </HashRouter>
        </PersistGate>
      </Provider>
      <ToastContainer />
    </ErrorBoundary>
  );
};

export default AppProvider;
