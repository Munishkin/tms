import React from 'react';
import ReactDOM from 'react-dom';
import {
  Router
} from 'react-router-dom';
import { Provider } from 'react-redux';
import history from './routing/history';
import store from './store';
import App from './scenes/App';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
