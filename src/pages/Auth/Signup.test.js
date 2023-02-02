import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import { Provider } from 'react-redux';
import store from '../../state/store';
import i18n from '../../features/languages/components/i18n';

import { rest } from 'msw';
import { setupServer } from 'msw/node';

export const handlers = [
	// Mocking fetch request at /auth/local/signup
	rest.post(`http://localhost:3000/auth/local/signup`, async (req, res, ctx) => {
        let body = await req.json() 
        console.log('******************** request intercepted')
        if (body.email === 'testRightEmail' && body.password === 'testRightPassword') {
            console.log('********************201')
            return res(ctx.status(201), ctx.delay(150));
		} else {
			return res(ctx.status(403), ctx.delay(150));
		}
	}),
];
const server = setupServer(...handlers);
// Enable API mocking before tests.
beforeAll(() => server.listen());
// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());
// Disable API mocking after the tests are done.
afterAll(() => server.close());

beforeEach(() => {
	// Reset language otherwise it uses language at the end of last test
	i18n.changeLanguage('en');
});

// Define renderApp here to use multiple times in below tests.
const renderApp = () => {
	return render(
		<Provider store={store}>
			<App />
		</Provider>
	);
};

it('registers the user input', async () => {
	renderApp();

	// Jest will find multiple buttons with the text "Sign up"
	const signupButton = await screen.findAllByRole('button', { name: /Sign up/ });
	userEvent.click(signupButton[0]);

	const signupText = await screen.findByText(/Already have an account/);
	expect(signupText).toBeInTheDocument();

	const inputs = await screen.findAllByTestId('input');
	userEvent.type(inputs[0], 'testEmail');
	userEvent.type(inputs[1], 'testPassword');
	userEvent.type(inputs[2], 'testPasswordConfirm');

	expect(inputs[0]).toHaveValue('testEmail');
	expect(inputs[1]).toHaveValue('testPassword');
	expect(inputs[2]).toHaveValue('testPasswordConfirm');
});

it('warns the user of invalid input while typing', async () => {
	renderApp();

    // Aleady on signup page from the last test
	// Jest will find multiple buttons with the text "Sign up"
	// const signupPageButton = await screen.findAllByRole('button', { name: /Sign up/ });
	// userEvent.click(signupPageButton[0]);

	const signupText = await screen.findByText(/Already have an account/);
	expect(signupText).toBeInTheDocument();

	const inputs = await screen.findAllByTestId('input');
	userEvent.type(inputs[0], 'a');
	userEvent.type(inputs[1], '\\');
	userEvent.type(inputs[2], '123456');

	const warningLength = await screen.findByText(/Minimum length is 6/);
	expect(warningLength).toBeInTheDocument();
	const warningChar = await screen.findByText(/except \\/);
	expect(warningChar).toBeInTheDocument();
	const warningmatch = await screen.findByText(/Passwords don't match/);
	expect(warningmatch).toBeInTheDocument();
});

it('redirects user to signin page after signing up', async () => {
    renderApp();

	// Aleady on signup page from the last test
    // Jest will find multiple buttons with the text "Sign up"
	// const signupPageButton = await screen.findAllByRole('button', { name: /Sign up/ });
	// userEvent.click(signupPageButton[0]);

	const signupText = await screen.findByText(/Already have an account/);
	expect(signupText).toBeInTheDocument();

	const inputs = await screen.findAllByTestId('input');
	userEvent.type(inputs[0], 'testRightEmail');
	userEvent.type(inputs[1], 'testRightPassword');
	userEvent.type(inputs[2], 'testRightPassword');

	const signupButton = await screen.findAllByRole('button', { name: /Sign up/ });
	userEvent.click(signupButton[0]);

	const signinText = await screen.findByText(/New user/i);
	expect(signinText).toBeInTheDocument();
});
