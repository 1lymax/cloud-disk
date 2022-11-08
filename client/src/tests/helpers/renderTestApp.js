import {Provider} from "react-redux";
import {SnackbarProvider} from "notistack";
import {render} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import {QueryClient, QueryClientProvider} from 'react-query';

import {setupStore} from "../../store/store";
import AppRouter from "../../components/AppRouter";


export const renderTestApp = (component, options) => {
	const queryClient = new QueryClient()
	const store = setupStore(options?.initialState)

	return render(
		<SnackbarProvider maxSnack={3} preventDuplicate>
			<QueryClientProvider client={queryClient}>
				<Provider store={store}>
					<MemoryRouter initialEntries={[options?.route]}>
						<AppRouter/>
						{component}
					</MemoryRouter>
				</Provider>
			</QueryClientProvider>
		</SnackbarProvider>
	)
};