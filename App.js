import * as React from "react";
import store from "./ducks/store";
import { Provider } from "react-redux";
import Stacks from "./routes/Stacks";

function App() {
	return (
		<Provider store={store}>
			<Stacks />
		</Provider>
	);
}

export default App;
