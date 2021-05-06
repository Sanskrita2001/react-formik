import React from 'react';
import Form from './Form';
import MainContainer from './MainContainer';
import { Typography } from '@material-ui/core';
import { Input } from './Input';
import { useFormik } from 'formik';
import { PrimaryButton } from './PrimaryButton';
import * as Yup from 'yup';

const initialValues = {
	name: '',
	email: '',
	channel: '',
};
const onSubmit = (values) => {
	console.log('Form data', values);
};

const validationSchema = Yup.object({
	name: Yup
		.string()
		.matches(/^([^0-9]*)$/, 'First name should not contain numbers')
		.required('First name is a required field'),
	email: Yup
		.string()
		.email('Invalid email format')
		.required('This field is required'),
	channel: Yup
		.string()
		.required('This field is required'),
});

const YoutubeForm = () => {
	const formik = useFormik({
		initialValues,
		onSubmit,
		validationSchema,
	});
	return (
		<MainContainer>
			<Typography component='h2' variant='h5'>
				YouTube Form
			</Typography>
			<Form onSubmit={formik.handleSubmit}>
				<div>
					<Input
						type='text'
						id='name'
						name='name'
						label='Name'
						{...formik.getFieldProps('name')}
						helperText={
							formik.touched.name && formik.errors.name ? (
								<div style={{ color: '#f44336' }}>{formik.errors.name}</div>
							) : null
						}
					/>
				</div>
				<div>
					<Input
						type='email'
						id='email'
						name='email'
						label='Email'
						{...formik.getFieldProps('email')}
						helperText={
							formik.touched.email && formik.errors.email ? (
								<div style={{ color: '#f44336' }}>{formik.errors.email}</div>
							) : null
						}
					/>
				</div>
				<div>
					<Input
						type='text'
						id='channel'
						name='channel'
						label='Channel'
						{...formik.getFieldProps('channel')}
						helperText={
							formik.touched.channel && formik.errors.channel ? (
								<div style={{ color: '#f44336' }}>{formik.errors.channel}</div>
							) : null
						}
					/>
				</div>
				<PrimaryButton type='submit'>Submit</PrimaryButton>
			</Form>
		</MainContainer>
	);
};

export default YoutubeForm;
