// React
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import i18n from '../../features/languages/components/i18n';

// Redux
import { Provider } from 'react-redux';
import store from '../../state/store';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/user/state/userSlice';

// components
import App from '../../App';

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
	// arrange

	// act
	renderApp();

    const signupButton = await screen.findAllByRole('button', { name: /Demo account/ });
	userEvent.click(signupButton[0]);

    const demoBackground = await screen.findByTestId('tour')
    userEvent.click(demoBackground);
    userEvent.click(demoBackground);
    userEvent.click(demoBackground);
    userEvent.click(demoBackground);
    userEvent.click(demoBackground);

    const avatar = await screen.findAllByTestId('avatar')
	userEvent.click(avatar[1]);

    const accountButton = screen.getAllByText('Account')
    userEvent.click(accountButton[1])

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