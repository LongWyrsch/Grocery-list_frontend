import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import { Provider } from 'react-redux';
import store from '../../state/store';
import i18n from '../../features/languages/components/i18n';

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

it('navigates from homepage to demo page and cycle through instructions', async () => {
	// arrange

	// act
	renderApp();

	const signupButton = await screen.findAllByRole('button', { name: /Demo account/ });
	userEvent.click(signupButton[0]);

	const demoText = await screen.findByTestId('tourMessage');
	const demoBackground = await screen.findByTestId('tour');

	expect(demoText).toHaveTextContent('Change between your recipes');
	userEvent.click(demoBackground);

	expect(demoText).toHaveTextContent(/Toggle the theme/);
	userEvent.click(demoBackground);

	expect(demoText).toHaveTextContent(/Log out, or access your/);
	userEvent.click(demoBackground);

	expect(demoText).toHaveTextContent(/Drag to move around/);
	userEvent.click(demoBackground);

	expect(demoText).toHaveTextContent(/Add new recipes or/);
	userEvent.click(demoBackground);

	// assertion
	expect(demoBackground).not.toBeInTheDocument();
});

it('modifies and deletes a recipe ingredient', async () => {
	renderApp();

	const demoBackground = await screen.findByTestId('tour');
	userEvent.click(demoBackground);
	userEvent.click(demoBackground);
	userEvent.click(demoBackground);
	userEvent.click(demoBackground);
	userEvent.click(demoBackground);

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

	const demoBackground = await screen.findByTestId('tour');
	userEvent.click(demoBackground);
	userEvent.click(demoBackground);
	userEvent.click(demoBackground);
	userEvent.click(demoBackground);
	userEvent.click(demoBackground);

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

	const demoBackground = await screen.findByTestId('tour');
	userEvent.click(demoBackground);
	userEvent.click(demoBackground);
	userEvent.click(demoBackground);
	userEvent.click(demoBackground);
	userEvent.click(demoBackground);

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

	const demoBackground = await screen.findByTestId('tour');
	userEvent.click(demoBackground);
	userEvent.click(demoBackground);
	userEvent.click(demoBackground);
	userEvent.click(demoBackground);
	userEvent.click(demoBackground);

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

	expect(screen.getByText(/New list \(/)).toBeInTheDocument();
	expect(screen.getByText(/bitter beer/)).toBeInTheDocument();
});

it('modifies, deletes and checks a list ingredient', async () => {
	renderApp();

	const demoBackground = await screen.findByTestId('tour');
	userEvent.click(demoBackground);
	userEvent.click(demoBackground);
	userEvent.click(demoBackground);
	userEvent.click(demoBackground);
	userEvent.click(demoBackground);

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
	await waitFor(() => {
		expect(screen.queryByText(/beansprouts/)).not.toBeInTheDocument(); 
	});
	expect(screen.queryByText(/fieldModText/)).not.toBeInTheDocument();
});

