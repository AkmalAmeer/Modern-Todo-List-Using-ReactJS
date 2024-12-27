import React from 'react';
import './index.css';

const TodoItem = ({ todo, onDelete, onToggle }) => {
  const { id, title, isCompleted, priority } = todo;

  const handleDelete = () => onDelete(id);
  const handleToggle = () => onToggle(id);

  return (
    <li className={`todo-item ${isCompleted ? 'completed' : ''}`}>
      <div
        className="todo-info"
        onClick={handleToggle}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && handleToggle()}
      >
        <input
          type="checkbox"
          className="todo-checkbox"
          checked={isCompleted}
          readOnly
        />
        <p className="todo-title">{title}</p>
      </div>
      <span className={`priority-badge ${priority.toLowerCase()}`}>
        {priority}
      </span>
      <button className="delete-button" onClick={handleDelete}>
        Delete
      </button>
    </li>
  );
};

export default TodoItem;
