import React from 'react';
import styled from 'styled-components';
import { Col, Row } from 'antd';
import { AuthForm, AuthInfo } from '../components/auth';
import { IMutation, RegisterInput } from '../graphql';
import { useMutation } from 'react-apollo-hooks';
import { REGISTER } from '../components/auth/auth.queries';
import { RouteComponentProps } from 'react-router';

const Wrapper = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	flex-direction: column;
`;

const FullHeightRow = styled(Row)`
	flex: 1;
`;

export const RegisterPage: React.FC<RouteComponentProps> = ({ history }) => {
	const [register, { loading }] = useMutation<IMutation, { input: RegisterInput }>(REGISTER);
	const handleLogin = async (input: RegisterInput) => {
		const { data } = await register({
			variables: {
				input
			},
			errorPolicy: 'all'
		});
		if (data && data.login) {
			localStorage.setItem('token', String(data.login));
		}
	};
	return (
		<Wrapper>
			<FullHeightRow type='flex'>
				<Col order={0} span={10}>
					<AuthInfo history={history} type='login'/>
				</Col>
				<Col order={1} span={14}>
					<AuthForm loading={loading} submitAction={handleLogin} type='register'/>
				</Col>
			</FullHeightRow>
		</Wrapper>
	);
};

