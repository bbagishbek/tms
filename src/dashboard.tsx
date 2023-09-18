import { HomeIcon } from '@heroicons/react/20/solid';
import * as React from 'react';
import { Link, Outlet, redirect, useSearchParams } from 'react-router-dom';
import { useGlobalMessage } from './context/notifications.context';

export const loader = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    return redirect('/');
  }
};
const onLogout = () => localStorage.removeItem('token');

export const Dashboard = () => {
  const { setMessage } = useGlobalMessage();
  const [searchparams, setSearchParams] = useSearchParams();

  React.useEffect(() => {
    const createdTask = searchparams.get('created');
    if (createdTask !== null) {
      setMessage({ type: 'SUCCESS', value: `Task created` });
      searchparams.delete('created');
      setSearchParams(searchparams);
    }

    const deletedTask = searchparams.get('deleted');
    if (deletedTask !== null) {
      setMessage({ type: 'SUCCESS', value: `Task deleted` });
      searchparams.delete('deleted');
      setSearchParams(searchparams);
    }

    const updatedTask = searchparams.get('updated');
    if (updatedTask !== null) {
      setMessage({ type: 'SUCCESS', value: `Task updated` });
      searchparams.delete('updated');
      setSearchParams(searchparams);
    }
  }, [searchparams, setMessage, setSearchParams]);

  return (
    <>
      <div className="min-h-full">
        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col lg:border-r lg:border-gray-200 lg:bg-gray-100 lg:pt-5 lg:pb-4">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="mt-6 flex h-0 flex-1 flex-col overflow-y-auto">
            {/* User account dropdown */}
            <div className="flex w-full px-3">
              <span className="flex min-w-0 items-center justify-between space-x-3">
                <img
                  className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300"
                  data-testid="profileImage"
                  src="/expero-circle.png"
                  alt=""
                />
                <span className="flex min-w-0 flex-1 flex-col">
                  <span
                    data-testid="username"
                    className="truncate text-sm font-medium text-gray-900"
                  >
                    Expero test
                  </span>
                  <span
                    data-testid="twitterName"
                    className="truncate text-sm text-gray-500"
                  >
                    @experoinc
                  </span>
                </span>
              </span>
            </div>
          </div>
        </div>
        {/* Main column */}
        <div className="flex flex-col lg:pl-64">
          {/* Mobile section */}
          <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 border-b border-gray-200 bg-white lg:hidden">
            <div className="flex flex-1 justify-between px-4 sm:px-6 lg:px-8">
              <div className="flex items-center  w-full">
                {/* Profile  */}
                <div className="w-full">
                  <div className="flex w-full items-center  justify-between rounded-full  text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
                    <div data-testid="twitterName">Expero </div>{' '}
                    <div data-testid="twitterName">@experoinc</div>
                    <img
                      className="h-8 w-8 rounded-full"
                      data-testid="profileImage"
                      src="/expero-circle.png"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <main className="flex-1">
            {/* Page title & actions */}
            <div className="px-4 pt-10 pb-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
              <div className="min-w-0 flex-1">
                <nav className="flex" aria-label="Breadcrumb">
                  <Link to="/dashboard" className=" flex ">
                    <ol className="flex space-x-4 rounded-md py-2 bg-white text-gray-400 cursor-pointer hover:text-white hover:bg-orange-500 px-6 shadow">
                      <li className="flex">
                        <div className="flex items-center">
                          <HomeIcon
                            className="h-5 w-5 flex-shrink-0 "
                            aria-hidden="true"
                          />
                          <span className="ml-2 ">Dashboard</span>
                        </div>
                      </li>
                    </ol>
                  </Link>
                </nav>
              </div>
              <div className="mt-4 flex  sm:ml-4">
                <Link
                  to="/"
                  onClick={onLogout}
                  className="order-0 inline-flex items-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-rede-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:order-1 sm:ml-3"
                >
                  Logout
                </Link>
              </div>
            </div>
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};
