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
    <div ref={drop} className='TaskList'>
      <h2 className='text-xl font-bold mb-2'>{title}</h2>
      {tasks?.map((task) => (
        <Task
          key={task.id}
          id={task.id}
          listId={id}
          text={task.text}
          onMoveTask={onMoveTask}
        />
      ))}
      <div className='AddTask'>
        <input
          type='text'
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          placeholder='Add a task...'
        />
        <button onClick={addTask}>Add Task</button>
      </div>
    </div>
  );
}

export default TaskList;
