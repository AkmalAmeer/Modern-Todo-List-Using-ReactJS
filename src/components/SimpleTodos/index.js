import React, {useState, useEffect} from 'react'
import './index.css'
import TodoItem from '../TodoItem'

const SimpleTodo = () => {
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState('')
  const [priority, setPriority] = useState('Low')
  const [filter, setFilter] = useState('All')

  // Load todos from local storage on mount
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos')) || []
    setTodos(savedTodos)
  }, [])

  // Save todos to local storage on change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const addTodo = () => {
    if (newTodo.trim() === '') return

    const newTodoItem = {
      id: Date.now(),
      title: newTodo,
      isCompleted: false,
      priority,
    }
    setTodos([...todos, newTodoItem])
    setNewTodo('')
    setPriority('Low')
  }

  const deleteTodo = id => {
    const updatedTodos = todos.filter(todo => todo.id !== id)
    setTodos(updatedTodos)
  }

  const toggleCompletion = id => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? {...todo, isCompleted: !todo.isCompleted} : todo,
    )
    setTodos(updatedTodos)
  }

  const filteredTodos = todos.filter(todo => {
    if (filter === 'All') return true
    if (filter === 'Completed') return todo.isCompleted
    if (filter === 'Pending') return !todo.isCompleted
    return false
  })

  return (
    <div className="simple-todo-container">
      <h1 className="header">Modern Todo-List</h1>

      <div className="input-container">
        <input
          type="text"
          className="todo-input"
          placeholder="Add a new todo..."
          value={newTodo}
          onChange={e => setNewTodo(e.target.value)}
        />
        <select
          className="priority-selector"
          value={priority}
          onChange={e => setPriority(e.target.value)}
        >
          <option value="Low">Low Priority</option>
          <option value="Medium">Medium Priority</option>
          <option value="High">High Priority</option>
        </select>
        <button className="add-button" onClick={addTodo}>
          Add
        </button>
      </div>

      <div className="filter-container">
        <button
          className={`filter-button ${filter === 'All' ? 'active' : ''}`}
          onClick={() => setFilter('All')}
        >
          All
        </button>
        <button
          className={`filter-button ${filter === 'Completed' ? 'active' : ''}`}
          onClick={() => setFilter('Completed')}
        >
          Completed
        </button>
        <button
          className={`filter-button ${filter === 'Pending' ? 'active' : ''}`}
          onClick={() => setFilter('Pending')}
        >
          Pending
        </button>
      </div>

      <ul className="todos-list">
        {filteredTodos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onDelete={deleteTodo}
            onToggle={toggleCompletion}
          />
        ))}
      </ul>
    </div>
  )
}

export default SimpleTodo
