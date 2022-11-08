import {Provider} from "react-redux";
import {SnackbarProvider} from "notistack";
import {render} from "@testing-library/react";
import {QueryClient, QueryClientProvider} from 'react-query';

import {setupStore} from "../../store/store";


export const renderWithRedux = (component, options) => {
	const queryClient = new QueryClient()
	const store = setupStore(options?.initialState)

	return render(
		<SnackbarProvider maxSnack={3} preventDuplicate>
			<QueryClientProvider client={queryClient}>
				<Provider store={store}>
					{component}
				</Provider>
			</QueryClientProvider>
		</SnackbarProvider>
	)
};