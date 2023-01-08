import { useState } from 'react';
import TaskList from './TaskList';
import taskListsData from '../../taskLists.json';

function KanbanBoard(props) {
  const [taskLists, setTaskLists] = useState(taskListsData);
  const [newTaskListTitle, setNewTaskListTitle] = useState('');

  const addTaskList = () => {
    if (newTaskListTitle === '') return;
    const newTaskList = { id: Date.now(), title: newTaskListTitle, tasks: [] };
    setTaskLists([...taskLists, newTaskList]);
    setNewTaskListTitle('');
  };

  const moveTask = (sourceListId, targetListId, taskId) => {
    const sourceList = taskLists.find((list) => list.id === sourceListId);
    const targetList = taskLists.find((list) => list.id === targetListId);
    const task = sourceList.tasks.find((task) => task.id === taskId);

    sourceList.tasks = sourceList.tasks.filter((task) => task.id !== taskId);
    targetList.tasks.push(task);

    setTaskLists([...taskLists]);
  };
  return (
    <div className='KanbanBoard flex gap-4 overflow-scroll p-4'>
      {taskLists.map((taskList) => (
        <TaskList
          key={taskList.id}
          id={taskList.id}
          title={taskList.title}
          tasks={taskList.tasks}
          onMoveTask={moveTask}
          taskLists={taskLists}
          setTaskLists={setTaskLists}
        />
      ))}
      <div className='flex flex-col bg-white shadow-lg rounded-lg h-fit min-w-max'>
        <div className=' bg-primary-dark-main p-3 rounded-t-lg'>
          <h2 className='text-xl font-bold text-white'>Add Another List</h2>
        </div>
        <div className='p-2 flex gap-3'>
          <input
            type='text'
            value={newTaskListTitle}
            className='border rounded-md px-3 py-2'
            onChange={(e) => setNewTaskListTitle(e.target.value)}
            placeholder='Enter list title...'
          />
          <button
            onClick={addTaskList}
            className='mt-2 bg-primary-dark-main rounded-md px-3 py-2 text-white font-bold hover:bg-primary-dark_sub'>
            Add List
          </button>
        </div>
      </div>
    </div>
  );
}

export default KanbanBoard;
