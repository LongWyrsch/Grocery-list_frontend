import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

import { Provider } from 'react-redux';
import store from './state/store';

import './features/languages/components/i18n';

// This takes care of the error " ReferenceError: SVGPathElement is not defined"
// https://stackoverflow.com/questions/74470467/jest-referenceerror-svgpathelement-is-not-defined
class SVGPathElement extends HTMLElement {}
window.SVGPathElement = SVGPathElement;


// Define renderApp here to use multiple times in below tests.
const renderApp = () => {
	return render(
		<Provider store={store}>
				<App />
		</Provider>
	);
};


test('renders the Homepage initially', async () => {
	let { container } = renderApp();

	const englishText = await screen.findByText('Check out the');
	expect(englishText).toBeInTheDocument();

	const languageButton = await screen.findByRole('button', { name: /EN/ });
	userEvent.click(languageButton);

	const germanOption = await screen.findByText(/DE/);
	userEvent.click(germanOption);

	const germanText = screen.getByText(/Probier es aus/);
	expect(germanText).toBeInTheDocument();
});
