import { FC } from 'react';
import App from '@src/App';
import { Provider } from 'react-redux';
import store, { persistor } from '@src/lib/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';

const AppProvider: FC = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
};

export default AppProvider;
