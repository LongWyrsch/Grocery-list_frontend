import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import { Provider } from 'react-redux';
import store from '../../state/store';
import i18n from '../../features/languages/components/i18n';

import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { testuser } from '../../features/user/state/testUser';

// route '/home/list' will only render when user.email is not null and getUser thunk resolves the promise.
let auth = false 

export const handlers = [
	// Mocking fetch request at /auth/local/signin
	rest.post(`http://localhost:3000/auth/local/signin`, async (req, res, ctx) => {
        let body = await req.json() 
        if (body.email === 'testRightEmail' && body.password === 'testRightPassword') {
            auth = true
            return res(ctx.status(200), ctx.delay(150));
		} else {
			return res(ctx.status(403), ctx.delay(150));
		}
	}),

	// Mocking fetch request at /users
	rest.get(`http://localhost:3000/users`, (req, res, ctx) => {
        if (auth===true)	{
            return res(ctx.status(200), ctx.json(testuser), ctx.delay(150));
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

	// Jest will find multiple buttons with the text "Sign in"
	const signinButton = await screen.findAllByRole('button', { name: /Sign in/ });
	userEvent.click(signinButton[0]);

	const signinText = await screen.findByText(/New user/);
	expect(signinText).toBeInTheDocument();

	const inputs = await screen.findAllByTestId('input');
	userEvent.type(inputs[0], 'testEmail');
	userEvent.type(inputs[1], 'testPassword');

	expect(inputs[0]).toHaveValue('testEmail');
	expect(inputs[1]).toHaveValue('testPassword');
});

it('warns the user of invalid input', async () => {
	renderApp();

    // Aleady on signin page from the last test
	// Jest will find multiple buttons with the text "Sign in"
	// const signinPageButton = await screen.findAllByRole('button', { name: /Sign in/ });
	// userEvent.click(signinPageButton[0]);

	const signinText = await screen.findByText(/New user/);
	expect(signinText).toBeInTheDocument();

	const inputs = await screen.findAllByTestId('input');
	userEvent.type(inputs[0], 'testWrongEmail');
	userEvent.type(inputs[1], 'testWrongPassword');

	const signinButton = await screen.findAllByRole('button', { name: /Sign in/ });
	userEvent.click(signinButton[0]);

	const warningText = await screen.findByText(/Invalid username or password/);
	expect(warningText).toBeInTheDocument();
});

it('signs the user in', async () => {
    renderApp();

	// Aleady on signin page from the last test
    // Jest will find multiple buttons with the text "Sign in"
	// const signinPageButton = await screen.findAllByRole('button', { name: /Sign in/ });
	// userEvent.click(signinPageButton[0]);

	const signinText = await screen.findByText(/New user/);
	expect(signinText).toBeInTheDocument();

	const inputs = await screen.findAllByTestId('input');
	userEvent.type(inputs[0], 'testRightEmail');
	userEvent.type(inputs[1], 'testRightPassword');

	const signinButton = await screen.findAllByRole('button', { name: /Sign in/ });
	userEvent.click(signinButton[0]);

	const newListText = await screen.findByText(/New list/i);
	expect(newListText).toBeInTheDocument();
});
