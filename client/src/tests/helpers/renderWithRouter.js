import {MemoryRouter} from "react-router-dom";
import {render} from "@testing-library/react";
import AppRouter from "../../components/AppRouter";


export const renderWithRouter = (component=null, initialRoute='/') => {
	return render(
		<MemoryRouter initialEntries={[initialRoute]}>
			<AppRouter/>
			{component}
		</MemoryRouter>
	)
};