import { useState } from 'react';
import KanbanBoard from '../components/kanban/KanbanBoard';

const Home = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Card 1' },
    { id: 2, text: 'Card 2' },
    { id: 3, text: 'Card 3' },
  ]);

  return (
    <div className='App'>
      <KanbanBoard />
    </div>
  );
};

export default Home;
