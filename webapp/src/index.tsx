import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';
import GlobalStyle from './styles/globalStyles';
import App from './App';

const client = new ApolloClient({
	uri: 'http://localhost:5000/graphql',
	fetchOptions: {
		credentials: 'include'
	},
	request: async operation => {
		const token = await localStorage.getItem('token');
		operation.setContext({
			headers: {
				authorization: `Bearer ${token}`
			}
		});
	},
	onError: ({ networkError, graphQLErrors }) => {
		if (networkError) {
			// @ts-ignore
			if (networkError.statusCode === 401) {
				localStorage.removeItem('token');
			}
		}
	}
});
const Main: React.FC = () => (
	<>
		<GlobalStyle/>
		<ApolloProvider client={client}>
			<ApolloHooksProvider client={client}>
				<App/>
			</ApolloHooksProvider>
		</ApolloProvider>
	</>
);

ReactDOM.render(<Main/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
