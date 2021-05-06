import React from 'react';
import MainContainer from './MainContainer';
import { Typography } from '@material-ui/core';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { PrimaryButton } from './PrimaryButton';
import * as Yup from 'yup';
import TextError from './TextError';

const initialValues = {
	name: '',
	email: '',
	channel: '',
	comments: '',
	social: {
		facebook: '',
		instagram: '',
	},
	phoneNumbers:['','']
};
const onSubmit = (values) => {
	console.log('Form data', values);
};

const validationSchema = Yup.object({
	name: Yup.string()
		.matches(/^([^0-9]*)$/, 'First name should not contain numbers')
		.required('First name is a required field'),
	email: Yup.string()
		.email('Invalid email format')
		.required('This field is required'),
	channel: Yup.string().required('This field is required'),
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
						<ErrorMessage name='name' component={TextError} />
					</div>
					<div className='form-control'>
						<label htmlFor='email'>Email</label>
						<Field type='email' id='email' name='email' label='Email' />
						<ErrorMessage name='email' component={TextError} />
					</div>
					<div className='form-control'>
						<label htmlFor='channel'>Channel</label>
						<Field type='text' id='channel' name='channel' label='Channel' />
						<ErrorMessage name='channel'>
							{(errorMsg) => <div className='error'>{errorMsg}</div>}
						</ErrorMessage>
					</div>
					<div className='form-control'>
						<label htmlFor='address'>Address</label>
						<Field name='address'>
							{(props) => {
								const { field, form, meta } = props;
								return (
									<div>
										<input type='text' id='address' {...field} />
										{meta.touched && meta.error ? (
											<div>{meta.error}</div>
										) : null}
									</div>
								);
							}}
						</Field>
					</div>
					<div className='form-control'>
						<label htmlFor='facebook'>Facebook profile</label>
						<Field type='text' id='facebook' name='social.facebook' />
					</div>
					<div className='form-control'>
						<label htmlFor='instagram'>Instagram profile</label>
						<Field type='text' id='instagram' name='social.instagram' />
					</div>
					<div className='form-control'>
						<label htmlFor='primaryPh'>Primary Phone number</label>
						<Field type='text' id='primaryPh' name='phoneNumbers[0]' />
					</div>
					<div className='form-control'>
						<label htmlFor='secondaryPh'>Secondary Phone number</label>
						<Field type='text' id='secondaryPh' name='phoneNumbers[1]' />
					</div>
					<div className='form-control'>
						<label htmlFor='comments'>Comments</label>
						<Field
							as='textarea'
							id='comments'
							name='comments'
							label='Comments'
						/>
					</div>
					<PrimaryButton type='submit'>Submit</PrimaryButton>
				</Form>
			</Formik>
		</MainContainer>
	);
};

export default YoutubeForm;
