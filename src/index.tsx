import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
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
import { Globals } from './globals';
import { Localization } from './Localization/Localization';
import { dom, library } from '@fortawesome/fontawesome-svg-core';
import { faBan, faBolt, faBookOpen, faCog, faFingerprint, faGenderless, faPhoneVolume, faThermometerEmpty } from '@fortawesome/free-solid-svg-icons';

dom.watch()
library.add(faCog, faBan, faBolt, faFingerprint, faThermometerEmpty, faGenderless, faBookOpen, faPhoneVolume)

// setTimeout(() => {
//   store.dispatch(setHasUpdate(true))
// }, 2000);

// setTimeout(() => {
//   store.dispatch(setCanInstall(true))
// }, 2000);

ReactDOM.render(
  // <React.StrictMode>
  <Provider store={store}>
    <Localization>
      <AppConnected />
    </Localization>
  </Provider>,
  // </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register({
  onUpdate: (registration) => {
    Globals.registration = registration
    store.dispatch(setHasUpdate(true))
  }
})

window.addEventListener('beforeinstallprompt', (e: any) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  Globals.beforeinstallprompt = e;
  store.dispatch(setCanInstall(true))
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
