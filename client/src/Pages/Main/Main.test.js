import {screen, waitFor} from '@testing-library/react';
import {renderTestApp} from "../../tests/helpers/renderTestApp";


describe('Main page', () => {
	test('match snapshot', async () => {
		renderTestApp(null, {
			route: '/'
		})

		expect(await screen.getByTestId('main-page')).toBeInTheDocument()
		const skeletonElem = await screen.getAllByTestId('skeleton-elem')
		expect(skeletonElem.length).toBe(3)
		await waitFor(() => {
			const countElem = screen.getAllByTestId('count-elem')
			expect(countElem[0]).toContainHTML('6')
			expect(countElem[1]).toContainHTML('4')
			expect(countElem[2]).toContainHTML('2')
			expect(screen.getByTestId('main-page')).toMatchSnapshot()
		})
	})
});
