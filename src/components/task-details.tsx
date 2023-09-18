import { LoaderFunction, useLoaderData } from 'react-router-dom';
import { Task } from '../../types/task';

export const loader: LoaderFunction = async ({ params }) => {
  const response = await fetch(`/tasks?id=${params.id}`);
  const data = await response.json();
  return data;
};

export const TaskDetails = () => {
  const task = useLoaderData() as Task;

  return (
    <div className="px-8">
      <h1 className="text-xl bold">ID: {task.id}</h1>
      <p className="text-orange-500 mt-4"> {task.title}</p>
    </div>
  );
};
