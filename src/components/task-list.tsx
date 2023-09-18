import {
  ActionFunction,
  Form,
  Link,
  LoaderFunction,
  redirect,
  useLoaderData
} from 'react-router-dom';
import type { Tasks } from '../../types/task';

export const loader: LoaderFunction = async () => {
  const response = await fetch('/tasks');
  const data = await response.json();
  return data;
};

export const deleteAction: ActionFunction = async ({ request, params }) => {
  await fetch(`/tasks?id=${params.id}`, {
    method: 'delete'
  });
  return redirect(`/dashboard?deleted=${params.id}`);
};

type TaskListComponent = React.FC;
export const TaskList: TaskListComponent = () => {
  const data = useLoaderData() as { tasks: Tasks };

  return (
    <div>
      <Link
        to="/dashboard/new"
        className=" inline-flex items-center rounded-md border border-transparent bg-purple-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:order-1 sm:ml-8"
      >
        New task
      </Link>

      {/* Projects list (only on smallest breakpoint) */}
      {/* <div className="mt-10 sm:hidden">
        <div className="px-4 sm:px-6">
          <h2 className="text-sm font-medium text-gray-900">Projects</h2>
        </div>
        <ul className="mt-3 divide-y divide-gray-100 border-t border-gray-200">
          {data.tasks.map((task) => (
            <li key={task.id} data-testid={task.id}>
              <div className="group flex items-center justify-between px-4 py-4 hover:bg-gray-50 sm:px-6">
                <Link to="/dasboard/1" className="flex-1 ">
                  <span className="flex items-center space-x-3 truncate">
                    <span
                      className={'w-2.5 h-2.5 flex-shrink-0 rounded-full'}
                      aria-hidden="true"
                    />
                    <span className="truncate text-sm font-medium leading-6">
                      {task.title}
                    </span>
                  </span>
                </Link>
                <div>
                  <Link
                    to={`/dashboard/edit/${task.id}`}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Edit
                  </Link>

                  <Form method="post" action={`${task.id}/delete`}>
                    <button
                      type="submit"
                      className="ml-6 text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </Form>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div> */}

      {/* Projects table (small breakpoint and up) */}
      <div className="mt-8 hidden sm:block">
        <div className="inline-block min-w-full border-b border-gray-200 align-middle">
          <table className="min-w-full">
            <thead>
              <tr className="border-t border-gray-200">
                <th
                  className="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900"
                  scope="col"
                >
                  <span className="lg:pl-2">Project</span>
                </th>
                <th
                  className="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900"
                  scope="col"
                >
                  Actions
                </th>

                <th
                  className="border-b border-gray-200 bg-gray-50 py-3 pr-6 text-right text-sm font-semibold text-gray-900"
                  scope="col"
                />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 ">
              {data.tasks.map((task) => (
                <tr key={task.id} data-testid={task.id}>
                  <td className="w-full max-w-0 cursor-pointer whitespace-nowrap px-6  text-sm font-medium  hover:bg-gray-300 text-gray-900">
                    <Link to="/dashboard/1">
                      <div className="flex items-center py-3 space-x-3 lg:pl-2">
                        <div
                          className={'flex-shrink-0 w-2.5 h-2.5 rounded-full'}
                          aria-hidden="true"
                        />

                        <span>{task.title}</span>
                      </div>
                    </Link>
                  </td>
                  <td className="whitespace-nowrap px-6 py-3 flex flex-row text-right text-sm font-medium">
                    <Link
                      to={`/dashboard/edit/${task.id}`}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Edit
                    </Link>

                    <Form method="post" action={`${task.id}/delete`}>
                      <button
                        type="submit"
                        className="ml-6 text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </Form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
