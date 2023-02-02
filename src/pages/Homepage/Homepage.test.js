import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import { Provider } from 'react-redux';
import store from '../../state/store';
import i18n from '../../features/languages/components/i18n';


beforeEach(() => {
	// jest.resetModules()
	// jest.resetAllMocks()

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

it('renders the Homepage in English', async () => {
	// arrange
	
	// act
	renderApp();

	const englishText = await screen.findByText('Check out the');

	// assertion
	expect(englishText).toBeInTheDocument();
});

it('updates homepage language to German when selected', async () => {
	// arrange
	
	// act
	renderApp();

	const languageButton = await screen.findByRole('button', { name: /EN/ });
	userEvent.click(languageButton);

	const germanOption = await screen.findByText(/DE/);
	userEvent.click(germanOption);

	const germanText = screen.getByText(/Probier es aus/);

	// assertion
	expect(germanText).toBeInTheDocument();
});

it('updates homepage language to French when selected', async () => {
	// arrange
	renderApp();

	// act
	const languageButton = await screen.findByRole('button', { name: /EN/ });
	userEvent.click(languageButton);

	const germanOption = await screen.findByText(/FR/);
	userEvent.click(germanOption);

	const frenchText = screen.getByText(/rendue facile/);

	// assertion
	expect(frenchText).toBeInTheDocument();
});

it('navigates from homepage to signin page', async () => {
	// arrange

	// act
	renderApp();

	// Jest will find multiple buttons with the text "Sign in"
	const signinButton = await screen.findAllByRole('button', { name: /Sign in/ });
	userEvent.click(signinButton[0]);
	
	const signinText = await screen.findByText(/New user/);
	
	// assertion
	expect(signinText).toBeInTheDocument();
});

it('navigates from signin to signup page', async () => {
	// arrange
	
	// act
	renderApp();

	const signupButton = await screen.findByRole('link', { name: /Create an account/ });
	userEvent.click(signupButton);

	const signupText = await screen.findByText(/Already have an account/);
	
	// assertion
	expect(signupText).toBeInTheDocument();
});


it('navigates from signup to homepage', async () => {
	// arrange

	// act
	renderApp();

	const logo = await screen.findByTestId('logo');
	userEvent.click(logo);

	const homepageText = await screen.findByText(/made easy/);
	
	// assertion
	expect(homepageText).toBeInTheDocument();
});


it('navigates from homepage to signup page', async () => {
	// arrange

	// act
	renderApp();

	// Jest will find multiple buttons with the text "Sign in"
	const signupButton = await screen.findAllByRole('button', { name: /Sign up/ });
	userEvent.click(signupButton[0]);
	
	const signupText = await screen.findByText(/Already have an account/);
	
	// assertion
	expect(signupText).toBeInTheDocument();
});

it('navigates from signup to signin page', async () => {
	// arrange
	
	// act
	renderApp();

	const signinButton = await screen.findByRole('link', { name: /Sign in/ });
	userEvent.click(signinButton);

	const signinText = await screen.findByText(/New user/);
	
	// assertion
	expect(signinText).toBeInTheDocument();
});


it('navigates from sigin to homepage', async () => {
	// arrange

	// act
	renderApp();

	const logo = await screen.findByTestId('logo');
	userEvent.click(logo);
	

	const homepageText = await screen.findByText(/made easy/);
	
	// assertion
	expect(homepageText).toBeInTheDocument();
});


it('navigates from homepage to process page', async () => {
	// arrange

	// act
	renderApp();

	// Jest will find multiple buttons with the text "design process"
	const processButton = await screen.findAllByRole('button', { name: /design process/ });
	userEvent.click(processButton[0]);
	
	const processText = await screen.findByText(/Welcome to my first/);
	
	// assertion
	expect(processText).toBeInTheDocument();
});

it('navigates from process to homepage', async () => {
	// arrange

	// act
	renderApp();

	const backButton = await screen.findAllByText(/Back/); 
	userEvent.click(backButton[0]);

	const homepageText = await screen.findByText(/made easy/);
	
	// assertion
	expect(homepageText).toBeInTheDocument();
});