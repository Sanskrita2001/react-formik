import React from 'react';
import MainContainer from './MainContainer';
import { Button, Typography } from '@material-ui/core';
import {
	Formik,
	Form,
	Field,
	ErrorMessage,
	FieldArray,
	FastField,
} from 'formik';
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
	phoneNumbers: ['', ''],
	phNumbers: [''],
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
	address: Yup.string().required('This field is required'),
});

const validatePrimaryPhone = (value) => {
	let error;
	if (!value) error = 'This field is Required';
	return error;
};

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
				validateOnMount
			>
				{(formik) => {
					console.log('formik', formik);
					return (
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
								<Field
									type='text'
									id='channel'
									name='channel'
									label='Channel'
								/>
								<ErrorMessage name='channel'>
									{(errorMsg) => <div className='error'>{errorMsg}</div>}
								</ErrorMessage>
							</div>

							<div className='form-control'>
								<label htmlFor='address'>Address</label>
								<FastField name='address'>
									{(props) => {
										console.log('Render prop');
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
								</FastField>
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
								<Field
									type='text'
									id='primaryPh'
									name='phoneNumbers[0]'
									validate={validatePrimaryPhone}
								/>
								<ErrorMessage name='phoneNumbers[0]' component={TextError} />
							</div>
							<div className='form-control'>
								<label htmlFor='secondaryPh'>Secondary Phone number</label>
								<Field type='text' id='secondaryPh' name='phoneNumbers[1]' />
							</div>

							<div className='form-control'>
								<label>List of Phone number</label>
								<FieldArray name='phNumbers'>
									{(fieldArrayProps) => {
										const { push, remove, form } = fieldArrayProps;
										const { values } = form;
										const { phNumbers } = values;
										return (
											<div>
												{phNumbers.map((phNumber, index) => (
													<div key={index}>
														<Field
															type='text'
															name={`phNumber${index}`}
														></Field>
														<Button
															variant='outlined'
															color='primary'
															onClick={() => push('')}
														>
															+
														</Button>
														{index > 0 && (
															<Button
																variant='outlined'
																color='secondary'
																onClick={() => remove(index)}
															>
																-
															</Button>
														)}
													</div>
												))}
											</div>
										);
									}}
								</FieldArray>
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
							<Button
								color='primary'
								onClick={() => {
									formik.setFieldTouched('phoneNumbers[0]');
								}}
							>
								Visit Primary Phone Number
							</Button>
							<Button
								color='primary'
								onClick={() => {
									formik.setTouched({
										name: true,
										email: true,
										channel: true,
										phoneNumbers: true,
									});
								}}
							>
								Visit All
							</Button>
							<Button
								color='primary'
								onClick={() => {
									formik.validateField('phoneNumbers[0]');
								}}
							>
								Validate Phone Numbers
							</Button>
							<Button
								color='primary'
								onClick={() => {
									formik.validateForm();
								}}
							>
								Validate All
							</Button>
							<PrimaryButton type='submit' disabled={!(formik.dirty && formik.isValid)}>
								Submit
							</PrimaryButton>
						</Form>
					);
				}}
			</Formik>
		</MainContainer>
	);
};

export default YoutubeForm;
