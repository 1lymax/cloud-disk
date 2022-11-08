import userEvent from "@testing-library/user-event";
import {screen, waitFor} from '@testing-library/react';
import Auth from "./Auth";
import {renderTestApp} from "../../tests/helpers/renderTestApp";



describe('Auth', () => {
	test('Page snapshot', async () => {
		renderTestApp(null, {route: '/login'});
		const authPage = screen.getByTestId('auth-page')
		await expect(authPage).toMatchSnapshot()

		await userEvent.type(screen.getByTestId('login-input'), 'temp@gmail.com')
		await userEvent.type(screen.getByTestId('password-input'), 'qwerty')
		await userEvent.click(screen.getByTestId('login-btn'))

		//expect redirecting to disk page
		await waitFor(() => {
			// snackbar message
			expect(screen.getByText('Successfully logged in')).toBeInTheDocument()
			expect(screen.getByTestId('disk-page')).toBeInTheDocument()
		})

	});
});
