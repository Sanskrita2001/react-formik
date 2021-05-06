import React from 'react';
import Form from './Form';
import MainContainer from './MainContainer';
import { Typography } from '@material-ui/core';
import { Input } from './Input';
import { useFormik } from 'formik';
import { PrimaryButton } from './PrimaryButton';

const initialValues = {
	name: '',
	email: '',
	channel: '',
};
const onSubmit = (values) => {
	console.log('Form data', values);
};

const validate = (values) => {
	//values.name values.email values.channel
	//errors.name errors.email errors.channel
	let errors = {};

	if (!values.name) errors.name = 'This field is required';
	else if (!/^([^0-9]*)$/.test(values.name))
		errors.name = 'Name should not contain numbers';

	if (!values.email) {
		errors.email = 'This field is required';
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
		errors.email = 'Invalid email format';
	}

	if (!values.channel) {
		errors.channel = 'This field is required';
	}
	return errors;
};

const YoutubeForm = () => {
	const formik = useFormik({
		initialValues,
		onSubmit,
		validate,
	});
	console.log('Visited fields', formik.touched);
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
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.name}
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
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.email}
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
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.channel}
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
