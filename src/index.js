import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './normalize.css';
import './designSystem.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux';
import store from './state/store';

// import i18n (needs to be bundled ;))
import './features/languages/components/i18n';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	// <React.StrictMode>
		<Provider store={store}>
			<Suspense fallback={<div>Loading...</div>}>
				<App />
			</Suspense>
		</Provider>
	// </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
