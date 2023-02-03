import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

import { Provider } from 'react-redux';
import store from './state/store';

import './features/languages/components/i18n';

// Define renderApp here to use multiple times in below tests.
const renderApp = () => {
	return render(
		<Provider store={store}>
				<App />
		</Provider>
	);
};

test('renders the app', async () => {
  // arrange
  let { container } = renderApp();

  // assertion
  expect(container).not.toBeEmptyDOMElement()

});

