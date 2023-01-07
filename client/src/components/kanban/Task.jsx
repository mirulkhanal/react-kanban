import { useDrag } from 'react-dnd';

const Task = (props) => {
  const [{ isDragging }, drag] = useDrag({
    item: { id: props.id, listId: props.listId },
    type: 'task',
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className='Task'
      onDrop={props.onMoveTask}>
      {props.text}
    </div>
  );
};

export default Task;
