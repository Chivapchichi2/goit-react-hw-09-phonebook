import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import store from './redux/store';

import App from './components/App';
import MyLoader from './components/MyLoader';

import 'modern-normalize/modern-normalize.css';
import './index.css';

/* eslint no-undef: "error" */
/* eslint-env browser */

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store.store}>
      <PersistGate loading={<MyLoader />} persistor={store.persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
