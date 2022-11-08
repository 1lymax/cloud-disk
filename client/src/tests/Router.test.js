import {screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {rest} from "msw";
import {renderTestApp} from "./helpers/renderTestApp";
import {setupServer} from "msw/node";
import {API_URL} from "../config";


export const handlers = [
	rest.get(API_URL + 'api/files/stats', (req, res, ctx) => {
		return res(ctx.json({
			files: 331,
			users: 9,
			usedSpace: 796878025
		}), ctx.delay(150))
	})
]


describe('Router', () => {
	const server = setupServer(...handlers)

	beforeAll(() => server.listen())

	afterEach(() => server.resetHandlers())

	afterAll(() => server.close())

	test('login route', async () => {
		renderTestApp(null, {
			route: '/login'
		})
		await userEvent.click(screen.getByTestId('auth-page'))
	});

	test('register route', async () => {
		renderTestApp(null, {
			route: '/registration'
		})
		await userEvent.click(screen.getByTestId('auth-page'))
	});

	test('main route', async () => {
		renderTestApp(null, {
			route: '/'
		})
		await userEvent.click(screen.getByTestId('main-page'))
	});

	test('disk route', async () => {
		renderTestApp(null, {
			route: '/disk',
			initialState: {
				userState: {
					isAuth: true,
					currentUser: {
						usedSpace: 0
					}
				},

			}

		})
		await userEvent.click(screen.getByTestId('disk-page'))
	});

	test('profile route', async () => {
		renderTestApp(null, {
			route: '/profile',
			initialState: {
				userState: {
					isAuth: true,
					currentUser: {
						email: ''
					}
				},

			}

		})
		await userEvent.click(screen.getByTestId('profile-page'))
	});


});
