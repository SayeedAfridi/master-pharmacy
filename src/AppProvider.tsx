import { FC } from 'react';
import App from '@src/App';
import { Provider } from 'react-redux';
import store, { persistor } from '@src/lib/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { HashRouter } from 'react-router-dom';
import { MainNavLayout } from '@src/lib/layout';

const AppProvider: FC = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <HashRouter>
          <MainNavLayout>
            <App />
          </MainNavLayout>
        </HashRouter>
      </PersistGate>
    </Provider>
  );
};

export default AppProvider;
