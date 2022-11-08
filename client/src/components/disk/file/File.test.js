import {renderWithRedux} from "../../../tests/helpers/renderWithRedux";
import DiskButtons from "../DiskButtons/DiskButtons";
import {screen} from "@testing-library/react";
import File from "./File";
import userEvent from "@testing-library/user-event";

describe('DiskButtons', () => {
	const file = {
		_id: "636a83931703b3c87bb4e834",
		name: "123.txt",
		type: "txt",
		size: 546,
		path: "123",
		user: "6345c4d37f5b72d7cde90dc4",
		childs: [],
		date: "Tue Nov 08 2022 18:28:03 GMT+0200 (Восточная Европа, стандартное время)", "__v": 0
	}
	const refetch = () => {
	}

	test('match snapshot', async () => {
		renderWithRedux(<File file={file} refetch={refetch}/>)
		const fileElem = await screen.getByTestId('file-elem')
		expect(fileElem).toBeInTheDocument()
		await userEvent.hover(fileElem)

		const downloadIcon = await screen.getByTestId('download-icon')
		const deleteIcon = await screen.getByTestId('delete-icon')
		const shareIcon = await screen.getByTestId('share-icon')
		expect(downloadIcon).toBeInTheDocument()
		expect(deleteIcon).toBeInTheDocument()
		expect(shareIcon).toBeInTheDocument()
		expect(fileElem).toMatchSnapshot()

	})

});