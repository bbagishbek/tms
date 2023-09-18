import {
  ActionFunction,
  Form,
  LoaderFunction,
  redirect,
  useLoaderData
} from 'react-router-dom';
import { Task } from '../../types/task';

export const loader: LoaderFunction = async ({ params }) => {
  if (params.id) {
    const response = await fetch(`/tasks?id=${params.id}`);
    const data = await response.json();
    return data;
  }
  return null;
};

export const updateAction: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData();
  const task = formData.get('title');
  try {
    const response = await fetch(`/tasks?id=${params.id}`, {
      method: 'PUT',
      body: JSON.stringify({ task })
    });
    if (response.status === 200) {
      return redirect(`/dashboard?updated=${params.id}`);
    }
    throw new Error(response.statusText);
  } catch (error) {
    console.error('Error: ', error);
  }
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const task = formData.get('title');

  try {
    const response = await fetch('/tasks', {
      method: 'POST',
      body: JSON.stringify({ task })
    });
    if (response.status === 200) {
      return redirect(`/dashboard?created=true`);
    }
    throw new Error(response.statusText);
  } catch (error) {
    console.error('Error: ', error);
  }
};

export const TaskForm = () => {
  const task = useLoaderData() as Task | null;

  return (
    <div>
      <Form
        className="mt-8 space-y-6 px-4 lg:px-8"
        method="post"
        action={task ? `update` : undefined}
      >
        <input type="hidden" name="remember" defaultValue="true" />
        <div className="-space-y-px rounded-md shadow-sm">
          <div>
            <label htmlFor="task" className="sr-only">
              Task task
            </label>
            <input
              id="task"
              name="title"
              type="text"
              defaultValue={task?.title}
              required
              className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:z-10 focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
              placeholder="Task"
            />
          </div>
        </div>
        <button
          type="submit"
          className=" inline-flex items-center rounded-md border border-transparent bg-purple-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          {task ? 'Save' : 'Create'}
        </button>
      </Form>
    </div>
  );
};
