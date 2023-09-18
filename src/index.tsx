import * as React from 'react';
import ReactDOM from 'react-dom/client';
// import { App } from './app';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, Outlet, createBrowserRouter } from 'react-router-dom';
import {
  LoginForm,
  loader as loginFormLoader,
  action as loginFormAction
} from './login-form';
import { Error } from './components/error';
import { Dashboard, loader as dashboardLoader } from './dashboard';
import {
  TaskDetails,
  loader as taskDetailsLoader
} from './components/task-details';
import { GlobalMessagesProvider } from './context/notifications.context';
import {
  TaskList,
  loader as taskListLoader,
  deleteAction
} from './components/task-list';
import {
  TaskForm,
  action as taskFormAction,
  updateAction,
  loader as taskFormLoader
} from './components/task-form';

const { worker } = require('./mocks/browser');
worker.start();

const Root = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: '*',
    element: <Error />
  },
  {
    path: '/',
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <LoginForm />,
        loader: loginFormLoader,
        action: loginFormAction
      },
      {
        path: '*',
        element: <Error />
      },
      {
        path: 'dashboard',
        errorElement: <Error />,
        element: <Dashboard />,
        loader: dashboardLoader,
        children: [
          {
            index: true,
            loader: taskListLoader,
            element: <TaskList />
          },

          {
            path: 'new',
            action: taskFormAction,
            element: <TaskForm />
          },
          {
            path: 'edit/:id',
            loader: taskFormLoader,
            element: <TaskForm />,
            children: [
              {
                path: 'update',
                action: updateAction
              }
            ]
          },
          {
            path: ':id',
            loader: taskDetailsLoader,
            element: <TaskDetails />
          },
          {
            path: ':id/delete',
            action: deleteAction
          }
        ]
      },

      {
        path: 'error',
        errorElement: <Error />
      }
    ]
  }
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <GlobalMessagesProvider>
      <RouterProvider router={router} />
    </GlobalMessagesProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
