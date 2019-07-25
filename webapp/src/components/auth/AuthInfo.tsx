import React from 'react';
import { Button, Typography } from 'antd';
import styled from 'styled-components';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { History } from 'history';

const Text = styled(Typography.Text)`
	&& {
		color: white;
	}
`;
const Column = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	height: 100%;
	align-items: center;
	background: #11998e; 
  background: -webkit-linear-gradient(to right, #11998e, #38ef7d); 
  background: linear-gradient(to right, #11998e, #38ef7d);
`;

const Title = styled(Typography.Title)`
	&& {
		color: white;
	}
`;

const ActionButton = styled(Button)`
	margin-top: 2rem;
	width: 20rem;
	text-transform: uppercase;
`;

export const AuthInfo: React.FC<{ type: string, history: History }> = ({ type, history }) => {
	const onActionClick = () => {
		history.push(type === 'login' ? '/login' : '/register');
	};
	return (
		<Column>
			<Title>{type === 'login' ? `Welcome Back` : 'Hello, Welcome'}!</Title>
			<Text>{type === 'login' ? `To keep connecting with us please login using your credential.` : `Enter your credential and start journey with us!.`}</Text>
			<ActionButton onClick={() => onActionClick()} size='large' ghost shape='round'>
				{type === 'login' ? 'Sign in' : 'Sign up'}
			</ActionButton>
		</Column>
	);
};

