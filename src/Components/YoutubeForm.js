import React from 'react';
import MainContainer from './MainContainer';
import { Typography } from '@material-ui/core';
import { Formik,Form,Field,ErrorMessage } from 'formik';
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
	return (
		<MainContainer>
			<Typography component='h2' variant='h5'>
				YouTube Form
			</Typography>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={onSubmit}
			>
				<Form>
					<div className='form-control'>
						<label htmlFor='name'>Name</label>
						<Field type='text' id='name' name='name' label='Name' />
						<ErrorMessage name='name' />
					</div>
					<div className='form-control'>
						<label htmlFor='email'>Email</label>
						<Field type='email' id='email' name='email' label='Email' />
						<ErrorMessage name='email' />
					</div>
					<div className='form-control'>
						<label htmlFor='channel'>Channel</label>
						<Field type='text' id='channel' name='channel' label='Channel' />
						<ErrorMessage name='channel' />
					</div>
					<PrimaryButton type='submit'>Submit</PrimaryButton>
				</Form>
			</Formik>
		</MainContainer>
	);
};

export default YoutubeForm;
