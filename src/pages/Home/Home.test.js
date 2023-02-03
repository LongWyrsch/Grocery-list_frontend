// React
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// libs
import i18n from '../../features/languages/components/i18n';

// Redux
import { Provider } from 'react-redux';
import store from '../../state/store';

// components
import App from '../../App';

// Mocking API requests
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { testuser } from '../../features/user/state/testUser';
import { DemoRecipes } from '../../features/recipes/state/DemoRecipes';
import { DemoLists } from '../../features/lists/state/DemoLists';
import { testJoinRecipe } from '../../features/recipes/state/testJoinRecipe';

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
    
    // Mocking fetch request at /recipes/join
	rest.post(`http://localhost:3000/recipes/join`, (req, res, ctx) => {
        if (auth===true)	{
            return res(ctx.status(200), ctx.json(testJoinRecipe), ctx.delay(150));
        }
	})
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

it('navigates from homepage to the lists page', async () => {
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
	const italianText = await screen.findByText(/Italian/);
	expect(italianText).toBeInTheDocument();
    
    // Navigate to the recipes page
	const recipesTab = await screen.findAllByText(/Recipes/);
	userEvent.click(recipesTab[0])
    
    // Assert we are on recipes page
	const lasagnaText = await screen.findByText(/Lasagna/);
	expect(lasagnaText).toBeInTheDocument();
});

it('modifies and deletes a recipe ingredient', async () => {
	renderApp();

	// Check that "lasagna seasonings" exists, and "fieldModText" doesn't exist
	expect(screen.getByText(/lasagna seasonings/)).toBeInTheDocument();
	expect(screen.queryByText(/fieldModText/)).not.toBeInTheDocument();

	const lasagnaCard = screen.getByText(/Lasagna/);
	userEvent.click(lasagnaCard);

	const fieldMod = screen.getByDisplayValue(/ground beef/);
	userEvent.type(fieldMod, '{selectall}fieldModText');

	userEvent.click(screen.getAllByTestId('deleteRecipeIngredient')[2]);

	userEvent.click(screen.getByTestId('blur'));

	// Check that "lasagna seasonings" was delete, and "fieldModText" now exists
	expect(screen.getByText(/fieldModText/)).toBeInTheDocument();
	expect(screen.queryByText(/lasagna seasonings/)).not.toBeInTheDocument();
});

it('deletes a recipe', async () => {
	renderApp();

	// Check that Lasagna card exists
	expect(screen.getByText(/Lasagna/)).toBeInTheDocument();

	const lasagnaCard = screen.getByText(/Lasagna/);
	userEvent.click(lasagnaCard);

	const deleteButton = screen.getAllByRole('button', { name: /Delete/ });
	userEvent.click(deleteButton[0]);

	const confirmDeleteButton = screen.getAllByRole('button', { name: /Delete/ });
	userEvent.click(confirmDeleteButton[0]);

	// Check that Lasagna card no longer exists
	expect(screen.queryByText(/Lasagna/)).not.toBeInTheDocument();
});

it('creates a recipe', async () => {
	renderApp();

	// Check that createdRecipe doesn't yet exist
	expect(screen.queryByText(/createdRecipe/)).not.toBeInTheDocument();

	const newRecipeButton = screen.getByRole('button', { name: /New recipe/ });
	userEvent.click(newRecipeButton);

	const ingredientField = screen.getAllByRole('textbox');
	userEvent.type(ingredientField[1], 'newIngredient');

	userEvent.click(screen.getByTestId('blur'));

	expect(screen.getByText(/New recipe \(/)).toBeInTheDocument();
	expect(screen.getByText(/newIngredient/)).toBeInTheDocument();
});

it('creates a list', async () => {
	renderApp();

	const listsTab = screen.getAllByText(/Grocery lists/);
	userEvent.click(listsTab[0]);

	// Check that "bitter beer" doesn't yet exist
	expect(screen.queryByText(/bitter beer/)).not.toBeInTheDocument();

	const newListButton = screen.getByText(/New list/);
	userEvent.click(newListButton);

	expect(screen.getByText(/Choose some recipes/)).toBeInTheDocument();

	const beefPie = screen.getByText(/Beef pie/);
	userEvent.click(beefPie);

	const createListButton = screen.getByRole('button', { name: /Create/ });
	userEvent.click(createListButton);

	userEvent.click(screen.getByTestId('blur'));

    await waitFor(() => { 
        expect(screen.getByText(/New list \(/)).toBeInTheDocument();
    })
    expect(screen.getByText(/bitter beer/)).toBeInTheDocument();
});

it('modifies, deletes and checks a list ingredient', async () => {
	renderApp();

	// Router already points to demo/lists because of the last test

	// Check that "beansprouts" exists, and "fieldModText" doesn't exist
	expect(screen.getByText(/beansprouts/)).toBeInTheDocument();
	expect(screen.queryByText(/fieldModText/)).not.toBeInTheDocument();

	const thaiList = screen.getByText(/Thai/);
	userEvent.click(thaiList);

	const fieldMod = screen.getByDisplayValue(/beansprouts/);
	userEvent.type(fieldMod, '{selectall}fieldModText');

	expect(fieldMod).toHaveValue('fieldModText');
	expect(screen.getByDisplayValue(/fieldModText/)).toBeInTheDocument();

	userEvent.click(screen.getAllByTestId('deleteListIngredient')[1]);

    const checks = screen.getAllByTestId('checkListIngredient')
	userEvent.click(checks[checks.length-4]);

	userEvent.click(screen.getByTestId('blur'));

	// Check that "fieldModText" was delete
    expect(screen.queryByText(/beansprouts/)).not.toBeInTheDocument(); 
	expect(screen.queryByText(/fieldModText/)).not.toBeInTheDocument();
});

