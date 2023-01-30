import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

import { Provider } from 'react-redux';
import store from './state/store';

import i18n from './features/languages/components/i18n';
import { I18nextProvider } from 'react-i18next';

// This takes care of the error " ReferenceError: SVGPathElement is not defined"
// https://stackoverflow.com/questions/74470467/jest-referenceerror-svgpathelement-is-not-defined
class SVGPathElement extends HTMLElement {}
window.SVGPathElement = SVGPathElement


test('renders the Homepage initially', async () => {
  const {container} = render(
    <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <App />
        </I18nextProvider>
    </Provider>
  );

    // Wait for DOM to load?
    await waitFor(() => { 
      expect(container).not.toBeEmptyDOMElement()
     })


  // const linkElement = screen.getByText(/Grocery/i);
  const linkElement = screen.getByText('made easy.');
  expect(linkElement).toBeInTheDocument();
});

