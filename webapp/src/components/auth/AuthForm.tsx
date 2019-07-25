import React, { FormEvent } from 'react';
import { Button, Checkbox, Col, Form as AntForm, Icon, Input, Row, Typography } from 'antd';
import styled from 'styled-components';
import { WrappedFormUtils } from 'antd/es/form/Form';
import EmailInput from '../../elements/emailInput';

const Column = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	height: 100%;
	align-items: center;
`;

const Form = styled(AntForm)`
	display: flex;
	flex-direction: column;
	width: 80%;
`;

const FormItem = styled(AntForm.Item)`

`;

const Text = styled(Typography.Text)`
	margin-top: 2rem;
	margin-bottom: 1rem;
`;

const Title = styled(Typography.Title)`
	&& {
		color: #1DA57A;
	}
`;

const ForgotPasswordRow = styled(Row)`
`;

const ActionButton = styled(Button)`
	width: 20rem;
	margin-top: 2rem;
	text-transform: uppercase;
`;
const AuthFormComponent: React.FC<{ type: string, form: WrappedFormUtils<any>, submitAction: Function, loading: boolean }> = ({ type, form, submitAction, loading = false }) => {
	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		form.validateFields((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values);
				submitAction(values);
			}
		});
	};
	const { getFieldDecorator } = form;
	return (
		<Column>
			<Title>{type === 'login' ? 'Sign in to Booknet!' : `Create Account!`}</Title>
			<Row type='flex' gutter={16}>
				<Col>
					<Button shape='circle' icon='google' size='large'/>
				</Col>
				<Col>
					<Button shape='circle' icon='facebook' size='large'/>
				</Col>
				<Col>
					<Button shape='circle' icon='twitter' size='large'/>
				</Col>
			</Row>
			<Text strong>Or use your email to {type === 'login' ? 'sign in' : 'sign up'}</Text>
			<Form onSubmit={(e: FormEvent<HTMLFormElement>) => handleSubmit(e)}>
				{type !== 'login' && <FormItem hasFeedback>
					{getFieldDecorator('name', {
						rules: [{ required: true, message: 'Please enter your Name!' }],
						validateTrigger: 'onBlur'
					})(
						<Input
							prefix={<Icon type="user"/>}
							placeholder="Name"
						/>
					)}
				</FormItem>}
				<EmailInput needValidating={type !== 'login'} form={form}/>
				<FormItem hasFeedback>
					{getFieldDecorator('password', {
						rules: [{ required: true, message: 'Please enter your Password!' }],
						validateTrigger: 'onBlur'
					})(
						<Input
							prefix={<Icon type="lock"/>}
							type="password"
							placeholder="Password"
						/>
					)}
				</FormItem>

				{type === 'login' &&
				<FormItem>
					<ForgotPasswordRow type='flex' justify={type === 'login' ? 'space-between' : 'end'} align='middle'>
						{type === 'login' && getFieldDecorator('remember', {
							valuePropName: 'checked',
							initialValue: true
						})(<Checkbox>Remember me</Checkbox>)}
						<Button size='large' type='link'>Forgot your password?</Button>
					</ForgotPasswordRow>
				</FormItem>}
				<Row type='flex' justify='center' align='middle'>
					<ActionButton loading={loading} shape='round' size='large'
												htmlType='submit'
												type='primary'>{type === 'login' ? 'Sign in' : 'Sign up'}</ActionButton>
				</Row>
				<Row style={{ marginTop: '1rem' }} type='flex' justify='center' align='middle'>
					<Button
						type='link'>Don't have an account? &nbsp;
						<Typography.Text strong underline>Sign up now</Typography.Text>
					</Button>
				</Row>
			</Form>
		</Column>
	);
};

export const AuthForm = AntForm.create<{ type: string, form: WrappedFormUtils<any>, submitAction: Function, loading: boolean }>({ name: 'auth_form' })(AuthFormComponent);
