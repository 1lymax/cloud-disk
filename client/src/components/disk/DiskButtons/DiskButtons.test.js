import {renderTestApp} from "../../../tests/helpers/renderTestApp";
import {screen, waitFor} from "@testing-library/react";
import DiskButtons from "./DiskButtons";
import {renderWithRedux} from "../../../tests/helpers/renderWithRedux";
import userEvent from "@testing-library/user-event";
import {useAppSelector} from "../../../hooks/hooks";

describe('DiskButtons', () => {
	test('match snapshot', async () => {
		renderWithRedux(<DiskButtons/>)
		expect(await screen.getByTestId('diskButtons')).toMatchSnapshot()

	})

	test('backDir button is present', async () => {
		renderWithRedux(<DiskButtons/>, {
			initialState: {
				fileState: {
					currentDir: '1231223'
				}
			}
		})
		expect(await screen.getByTestId('backDir-button')).toBeInTheDocument()

	})

	test('backDir button is present and pops dirStack state', async () => {
		renderWithRedux(<DiskButtons/>, {
			initialState: {
				fileState: {
					currentDir: '1231223',
					dirStack: ['123123']
				}
			}
		})
		const {dirStack} = useAppSelector(state => state.fileState)
		expect(dirStack).toHaveLength(1)
		const backDirButton = await screen.getByTestId('backDir-button')
		expect(backDirButton).toBeInTheDocument()
		await userEvent.click(backDirButton)
		expect(dirStack).toHaveLength(0)

	})

	test('createDir with modal open and close', async () => {
		renderWithRedux(<DiskButtons/>)
		screen.debug()
		const createDirButton = await screen.getByTestId('createDir-button')
		expect(createDirButton).toBeInTheDocument()

		// modal is closed
		expect(await screen.queryByTestId('modalCreateDir-dialog')).not.toBeInTheDocument()

		await userEvent.click(createDirButton)
		expect(await screen.getByTestId('modalCreateDir-dialog')).toBeInTheDocument()
		const createDirInput = await screen.getByTestId('createDir-input')
		const createDirSubmitButton = await screen.getByTestId('createDir-submit-button')

		expect(createDirInput).toBeInTheDocument()
		expect(createDirSubmitButton).toBeInTheDocument()
		await userEvent.type(createDirInput, '123')
		await userEvent.click(createDirSubmitButton)
		expect(createDirSubmitButton).toBeDisabled()

		await waitFor(() => {
			expect(screen.queryByTestId('modalCreateDir-dialog')).not.toBeInTheDocument()
		})
	})

	test('createDir with modal open and press cancel', async () => {
		renderWithRedux(<DiskButtons/>)
		screen.debug()
		const createDirButton = await screen.getByTestId('createDir-button')
		expect(createDirButton).toBeInTheDocument()

		// modal is closed
		expect(await screen.queryByTestId('modalCreateDir-dialog')).not.toBeInTheDocument()

		await userEvent.click(createDirButton)
		expect(await screen.getByTestId('modalCreateDir-dialog')).toBeInTheDocument()
		const createDirCancelButton = await screen.getByTestId('createDir-submit-button')

		expect(createDirCancelButton).toBeInTheDocument()
		await userEvent.click(createDirCancelButton)

		await waitFor(() => {
			expect(screen.queryByTestId('modalCreateDir-dialog')).not.toBeInTheDocument()
		})
	})

});
