import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

import 'primereact/resources/themes/arya-orange/theme.css';
// import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import { Provider } from 'react-redux';
import { AppConnected } from './App.connected';
import { setCanInstall, setHasUpdate } from './state/actions';
import { store } from './state/store';

// setTimeout(() => {
//   store.dispatch(setHasUpdate(true))
// }, 3000);

// setTimeout(() => {
//   store.dispatch(setCanInstall(true))
// }, 3000);

ReactDOM.render(
  // <React.StrictMode>
  <React.Fragment>
    <Provider store={store}>
      <AppConnected />
    </Provider>
  </React.Fragment>,
  // </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register({
  onUpdate: () => {
    store.dispatch(setHasUpdate(true))
  }
})

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
