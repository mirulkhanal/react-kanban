import { useState } from 'react';
import { useDrop } from 'react-dnd';
import Task from './Task';

function TaskList({ id, onMoveTask, tasks, title, setTaskLists, taskLists }) {
  const [newTaskText, setNewTaskText] = useState('');

  const [, drop] = useDrop({
    accept: 'task',
    drop: (item) => {
      if (item.listId !== id) {
        onMoveTask(item.listId, id, item.id);
      }
    },
  });

  const addTask = () => {
    if (newTaskText === '') return;

    const newTask = { id: Date.now(), text: newTaskText };
    const newTaskLists = taskLists.map((taskList) => {
      if (taskList.id === id) {
        return { ...taskList, tasks: [...taskList.tasks, newTask] };
      }
      return taskList;
    });

    setTaskLists(newTaskLists);
    setNewTaskText('');
  };

  return (
    <div className='flex flex-col bg-white shadow-lg rounded-lg '>
      <div className='bg-primary-dark-main p-3 rounded-t-lg '>
        <h2 className='text-xl font-bold text-white'>{title}</h2>
      </div>
      <div className='px-2 flex flex-col gap-3'>
        {tasks?.map((task) => (
          <Task
            key={task.id}
            id={task.id}
            listId={id}
            text={task.text}
            onMoveTask={onMoveTask}
          />
        ))}
        <div className='mt-4 flex gap-2 min-w-max'>
          <input
            type='text'
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            placeholder='Add a task...'
            className='py-2 px-3 rounded-lg shadow-md text-white '
          />
          <button
            onClick={addTask}
            className='px-3 py-2 rounded-lg bg-primary-dark-main text-white hover:bg-primary-dark_sub '>
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskList;
