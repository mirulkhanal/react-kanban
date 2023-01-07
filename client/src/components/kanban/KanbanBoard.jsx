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
    <div className='KanbanBoard'>
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
      <div className='AddTaskList'>
        <h2 className='text-xl font-bold mb-2'>Add a Task List</h2>
        <input
          type='text'
          value={newTaskListTitle}
          onChange={(e) => setNewTaskListTitle(e.target.value)}
          placeholder='Enter task list title...'
        />
        <button onClick={addTaskList}>Add Task List</button>
      </div>
    </div>
  );
}

export default KanbanBoard;
