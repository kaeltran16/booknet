import React, { useState } from 'react';
import { Form, Icon, Input } from 'antd';
import { WrappedFormUtils } from 'antd/es/form/Form';
import { useMutation } from 'react-apollo-hooks';
import { CHECK_EMAIL_EXIST } from '../components/auth/auth.queries';
import { IMutation } from '../graphql';


declare const ValidateStatuses: ['success', 'warning', 'error', 'validating', ''];


const EmailInput: React.FC<{ form: WrappedFormUtils<any>, needValidating?: boolean }> = ({ form, needValidating = false }) => {
	const [checkEmail] = useMutation<IMutation, { email: string }>(CHECK_EMAIL_EXIST);
	const [validateStatus, setValidateStatus] = useState<(typeof ValidateStatuses)[number]>('');
	const [help, setHelp] = useState<string | null>(null);
	const onInputFocus = () => {
		if (needValidating) {
			setValidateStatus('validating');
			setHelp('The email is being validated..');
		}
	};
	const validator = async (rule, value, callback) => {
		if (value && form.isFieldTouched('email')) {
			const reg = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
			const isValid = reg.test(value.toLowerCase());
			if (!isValid) {
				callback();
				setHelp('Email is not valid!');
				setValidateStatus('error');
				return;
			}
			if (needValidating) {
				const { data } = await checkEmail({
					variables: {
						email: value
					},
					errorPolicy: 'ignore'
				});
				if (!data) {
					callback();
					setValidateStatus('success');
					setHelp(null);
					return;
				}
				callback();
				setHelp('User with this email already existed!');
				setValidateStatus('error');
			} else {
				callback();
				setValidateStatus('success');
				setHelp(null);
				return;
			}
		} else {
			callback();
			setHelp('Please enter your Email!');
			setValidateStatus('error');
		}
	};
	return (
		<Form.Item hasFeedback={validateStatus !== ''} validateStatus={validateStatus} help={help}>
			{form.getFieldDecorator('email', {
				rules: [{ validator: validator }],
				validateTrigger: 'onBlur'
			})(
				<Input
					onFocus={() => onInputFocus()}
					prefix={<Icon type="mail"/>}
					placeholder="Email"
				/>
			)}
		</Form.Item>
	);
};

export default EmailInput;
