import React from 'react';
import { Typography } from 'antd';
import Layout from '../components/layout';
import { BookCarousel } from '../components/carousel';

export const HomePage: React.FC = () => {
	return (
		<Layout>
			<Typography>Home</Typography>
			<BookCarousel/>
		</Layout>
	);
};
