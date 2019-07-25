import React, { useRef } from 'react';
import styled from 'styled-components';
import { Col, Row } from 'antd';
import { AuthForm, AuthInfo } from '../components/auth';
import { useMutation } from 'react-apollo-hooks';
import { LOGIN } from '../components/auth/auth.queries';
import { IMutation, LoginInput } from '../graphql';
import { RouteComponentProps } from 'react-router';
import { useSprings } from 'react-spring';

const Wrapper = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	flex-direction: column;
`;

const FullHeightRow = styled(Row)`
	flex: 1;
`;

const fn = (order, down?, originalIndex?, curIndex?, y?) => index =>
	down && index === originalIndex
		? { y: curIndex * 100 + y, scale: 1.1, zIndex: '1', shadow: 15, immediate: n => n === 'y' || n === 'zIndex' }
		: { y: order.indexOf(index) * 100, scale: 1, zIndex: '0', shadow: 1, immediate: false };

export const LoginPage: React.FC<RouteComponentProps> = ({ history }) => {
	const items = ['login', 'register'];
	const order = useRef(items.map((_, index) => index));
	// @ts-ignore
	const [springs, setSprings] = useSprings(items.length, fn(order.current));

	const [login, { loading }] = useMutation<IMutation, { input: LoginInput }>(LOGIN);

	const handleLogin = async (input: LoginInput) => {
		const { data } = await login({
			variables: {
				input
			},
			errorPolicy: 'all'
		});
		if (data && data.login) {
			localStorage.setItem('token', String(data.login));
			history.push('/');
		}
	};
	return (
		<Wrapper>
			<FullHeightRow type='flex'>
				<Col order={1} sm={10} xs={0}>
					<AuthInfo history={history} type='register'/>
				</Col>
				<Col order={0} sm={14} xs={24}>
					<AuthForm loading={loading} submitAction={handleLogin} type='login'/>
				</Col>
			</FullHeightRow>
		</Wrapper>
	);
};

