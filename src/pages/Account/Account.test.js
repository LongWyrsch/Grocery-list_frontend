// React
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// libs
import i18n from '../../features/languages/components/i18n';

// Redux
import { Provider } from 'react-redux';
import store from '../../state/store';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/user/state/userSlice';

// components
import App from '../../App';

// Mocking API requests
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { testuser } from '../../features/user/state/testUser';
import { DemoRecipes } from '../../features/recipes/state/DemoRecipes';
import { DemoLists } from '../../features/lists/state/DemoLists';

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
	
    // Mocking fetch request at /recipes
	rest.get(`http://localhost:3000/recipes`, (req, res, ctx) => {
        if (auth===true)	{
            return res(ctx.status(200), ctx.json(DemoRecipes), ctx.delay(150));
        }
	}),
    
    // Mocking fetch request at /lists
	rest.get(`http://localhost:3000/lists`, (req, res, ctx) => {
        if (auth===true)	{
            return res(ctx.status(200), ctx.json(DemoLists), ctx.delay(150));
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

// Since it is not possible to query the store based on actions in the test,
// this component will print out the store's value to the DOM so they can be
//  queried by RTL.
const StoreDisplay = () => {
    const user = useSelector(selectUser)
    console.log(user.email)
    return (
        <div>
            <div>test output {user.language}</div>
            <div>test output {user.avatar_variant}</div>
            <div>test output {user.email}</div>
        </div>
    )
}

// Define renderApp here to use multiple times in below tests.
const renderApp = () => {
	return render(
		<Provider store={store}>
			<App />
            <StoreDisplay/>
		</Provider>
	);
};


it('renders the account page and updates changes to userSlice', async () => {
    renderApp();

    // Jest will find multiple buttons with the text "Sign in"
	const signinPageButton = await screen.findAllByRole('button', { name: /Sign in/ });
	userEvent.click(signinPageButton[0]);

    // Assert we are on signin page
	const signinText = await screen.findByText(/New user/);
	expect(signinText).toBeInTheDocument();

    // Enter creds
	const inputs = await screen.findAllByTestId('input');
	userEvent.type(inputs[0], 'testRightEmail');
	userEvent.type(inputs[1], 'testRightPassword');

    // Sign in
	const signinButton = await screen.findAllByRole('button', { name: /Sign in/ });
	userEvent.click(signinButton[0]);

    // Assert we are on lists page
	const newListText = await screen.findByText(/New list/i);
	expect(newListText).toBeInTheDocument();

    // Click on avatar
    const avatar = await screen.findAllByTestId('avatar')
	userEvent.click(avatar[1]);

    // Click on Account
    const accountButton = screen.getAllByText('Account')
    userEvent.click(accountButton[1])

    // ~ ~ ~ ~ ~ ~  MODIFY ~ ~ ~ ~ ~ ~ 

    userEvent.click(screen.getByText(/pixel/))

    userEvent.click(screen.getAllByText(/^EN$/)[0])
    userEvent.click(screen.getByText(/^DE$/))

    const fields = screen.getAllByRole('textbox')
    userEvent.type(fields[0], '{selectall}testNewEmail')

    const saveChange = screen.getAllByText(/Änderungen speichern/)
    expect(saveChange[0]).toBeInTheDocument()
    userEvent.click(saveChange[0])

	// assertion
    expect(screen.getByText('test output pixel')).toBeInTheDocument()
    expect(screen.getByText('test output de')).toBeInTheDocument()
    expect(screen.getByText('test output testNewEmail')).toBeInTheDocument()
});
