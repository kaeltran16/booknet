import React from 'react';
import { Layout as AntLayout } from 'antd';
import NavBar from '../navbar';

const { Header, Content, Footer } = AntLayout;

export interface ILayoutProp {
	children: JSX.Element[] | JSX.Element
}

const Layout: React.FC<ILayoutProp> = ({ children }) => {
	return (
		<AntLayout>
			<Header color='#fff'>
				<NavBar/>
			</Header>
			<Content>{children}</Content>
			<Footer>Footer</Footer>
		</AntLayout>
	);
};

export default Layout;
