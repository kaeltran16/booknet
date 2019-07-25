import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { HomePage, LoginPage } from './pages';
import { RegisterPage } from './pages/register';


const App: React.FC = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path='/' component={HomePage}/>
				<Route path='/login' component={LoginPage}/>
				<Route path='/register' component={RegisterPage}/>
			</Switch>
		</BrowserRouter>
	);
};

export default App;
