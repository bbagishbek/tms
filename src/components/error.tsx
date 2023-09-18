import { Link } from 'react-router-dom';

export const Error = () => {
  return (
    <div className="flex flex-col min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-4 sm:px-6 lg:px-8">
        <div className="flex flex-shrink-0 justify-center">
          <a href="/" className="inline-flex">
            <span className="sr-only">Your Company</span>
            <img className="h-12 w-auto" src="/expero-logo.png" alt="" />
          </a>
        </div>
        <div className="py-16">
          <div className="text-center">
            <p className="text-base font-semibold text-orange-600">404</p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Oops that did not worked
            </h1>
            <div className="mt-6">
              <Link
                to="/"
                className="text-base font-medium text-orange-600 hover:text-orange-500"
              >
                Go back home
                <span aria-hidden="true"> &rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
