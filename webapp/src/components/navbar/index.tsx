import React from 'react';
import { Avatar, Button, Col, Row, Typography } from 'antd';
import styled from 'styled-components';

const HeaderText = styled(Typography.Text)`
	font-size: 1.5rem;
`;

const NavBar: React.FC = () => {
	return (
		<Row type='flex' justify='space-between'>
			<Col md={8}>
				BOOKNET
			</Col>
			<Col>
				<Button type='link' size='large' shape='circle' icon='search'/>
				<Button type='link'>
					<HeaderText>
						MY BOOKS
					</HeaderText>
				</Button>
				<Button type='link'>
					<HeaderText>
						DISCOVER
					</HeaderText>
				</Button>
			</Col>
			<Col md={8} xs={16}>
				<Row gutter={40} style={{ height: '100%' }} type='flex' justify='end' align='middle'>
					<Avatar icon='user'/>
				</Row>
			</Col>
		</Row>
	);
};

export default NavBar;
