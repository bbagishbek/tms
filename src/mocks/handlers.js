import { rest } from 'msw';
import { DEFAULT_TASKS } from './data';

const validAccount = {
  email: 'expero@test.com',
  password: 'test'
};
export const handlers = [
  // Handles a POST /login request
  rest.post('/login', (req, res, ctx) => {
    const { email, password } = JSON.parse(req.body);
    localStorage.setItem('tasks', JSON.stringify(DEFAULT_TASKS));
    if (email === validAccount.email && password === validAccount.password) {
      return res(ctx.status(200), ctx.json({ token: 'fake-jwt-token' }));
    }
    return res(ctx.status(400, 'Invalid credentials'));
  }),

  // Handles a GET /tasks
  rest.get('/tasks', (req, res, ctx) => {
    const id = req.url.searchParams.get('id');
    const LSTasks = localStorage.getItem('tasks');
    const tasks = JSON.parse(LSTasks);
    console.log({ id, tasks });
    if (id) {
      if (tasks.find((task) => task.id === Number(id))) {
        const task = tasks.find((task) => task.id === Number(id));
        return res(ctx.status(200), ctx.json(task));
      }
      return res(ctx.status(400, 'Task not found '));
    }
    return res(ctx.status(200), ctx.json({ tasks: tasks }));
  }),

  rest.post('/tasks', (req, res, ctx) => {
    const { task } = JSON.parse(req.body);

    const LSTasks = localStorage.getItem('tasks');
    const tasks = JSON.parse(LSTasks);
    const nextTasks = [...tasks, { id: tasks.length + 1, title: task }];

    if (!task || task === '') {
      return res(ctx.status(400, 'Invalid task'));
    }
    localStorage.setItem('tasks', JSON.stringify(nextTasks));
    return res(ctx.status(200));
  }),

  rest.put('/tasks', (req, res, ctx) => {
    const id = req.url.searchParams.get('id');
    const { task } = JSON.parse(req.body);

    if (!task || task === '' || !id) {
      return res(ctx.status(400, 'Invalid task'));
    }

    const LSTasks = localStorage.getItem('tasks');
    const tasks = JSON.parse(LSTasks);

    const nextTasks = [
      ...tasks.filter((task) => task.id !== Number(id)),
      { id: Number(id), title: task }
    ];

    localStorage.setItem('tasks', JSON.stringify(nextTasks));
    return res(ctx.status(200));
  }),

  rest.delete('/tasks', (req, res, ctx) => {
    const id = req.url.searchParams.get('id');

    const LSTasks = localStorage.getItem('tasks');
    const tasks = JSON.parse(LSTasks);
    if (id && tasks.find((task) => task.id === Number(id))) {
      const nextTasks = tasks.filter((task) => task.id !== Number(id));
      localStorage.setItem('tasks', JSON.stringify(nextTasks));
      return res(ctx.status(200), ctx.json(nextTasks));
    }
    return res(ctx.status(400), `Tasks ID ${id} not found`);
  })
];
