import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../routes';
import apiAuth from '../api/auth'

const AuthForm = ({ type }) => {
  const isSignup = type === 'signup';

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  const handleSubmit = async (values) => {
    try {
      console.log('Form data', values);
      if (isSignup) {
        const response = await apiAuth.register(values);
        console.log('Register Response:', response);
      } else {
        const response = await apiAuth.login(values);
        console.log('Login Response:', response);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex min-h-screen flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
          {isSignup ? 'Sign Up' : 'Sign in to your account'}
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          <Form className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-md font-medium text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <Field
                  id="email"
                  name="email"
                  type="email"
                  className="block w-full bg-white px-3 py-2.5 text-lg text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-teal-600"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-md font-medium text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <Field
                  id="password"
                  name="password"
                  type="password"
                  className="block w-full bg-white px-3 py-2.5 text-lg text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-teal-600"
                />
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center bg-teal-600 px-3 py-2.5 text-lg font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
              >
                {isSignup ? 'Sign Up' : 'Sign in'}
              </button>
            </div>
          </Form>
        </Formik>

        <p className="mt-10 text-center text-sm text-gray-500">
          {isSignup ? 'Already have an account? ' : `Don't have an account? `}
          <Link to={isSignup ? `/${ROUTES.LOGIN}` : `/${ROUTES.REGISTER}`} className="font-semibold text-teal-600 hover:text-teal-500">
            {isSignup ? 'Sign in' : 'Sign Up'}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
