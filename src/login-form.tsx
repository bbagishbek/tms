import * as React from 'react';
import {
  useLoaderData,
  redirect,
  Form,
  ActionFunction,
  LoaderFunction
} from 'react-router-dom';
import { EyeIcon, LockClosedIcon } from '@heroicons/react/20/solid';

export const loader: LoaderFunction = () => {
  const token = localStorage.getItem('token');
  if (token === 'fake-jwt-token') {
    console.log('redirect');
    return redirect('/dashboard');
  }
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get('email');
  const password = formData.get('password');

  try {
    const response = await fetch('/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
    if (response.status === 200) {
      const data = await response.json();
      localStorage.setItem('token', data.token);
      // return redirect('/dashboard')
    }

    console.log({ response });
    throw new Error(response.statusText);
  } catch (error) {
    console.error('Error: ', error);
  }
};

export const LoginForm = () => {
  useLoaderData();

  const onPasswordInvalid: React.DOMAttributes<HTMLInputElement>['onInvalid'] =
    (e) => {
      (e.target as HTMLInputElement).setCustomValidity(
        'Password must be at least 4 characters'
      );
    };

  return (
    <div className="flex h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="/expero-logo.png"
            alt="Your Company"
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Log in to your account
          </h2>
        </div>
        <Form className="mt-8 space-y-6" method="post">
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
                placeholder="Password"
                pattern=".{4,}"
                onInvalid={onPasswordInvalid}
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-orange-600 py-2 px-4 text-sm font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <LockClosedIcon
                  className="h-5 w-5 text-orange-500 group-hover:text-orange-400"
                  aria-hidden="true"
                />
              </span>
              Log in
            </button>
          </div>
        </Form>
        <a
          href="/invalid-url"
          className="group relative flex w-full justify-center rounded-md border border-transparent bg-slate-200 py-2 px-4 text-sm font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
        >
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <EyeIcon
              className="h-5 w-5 text-slate-500 group-hover:text-slate-400"
              aria-hidden="true"
            />
          </span>
          Or take a look
        </a>
      </div>
    </div>
  );
};
