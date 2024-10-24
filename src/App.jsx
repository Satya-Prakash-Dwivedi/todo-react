import { useEffect, useState } from 'react'
import { Trash2, Edit, Check, X } from 'lucide-react';
// import './App.css'
// import CreateTodo from './components/TodoApp'

function App() {

  // create , delete, update the todo
  // Mark the todo as completed
  // Filter tasks as (active, all , completed)
  // local storage integration
  // simple animations of list

  const[todos, setTodos] = useState( () => {
    // Initialize from local storage if availabe
    const savedTodos = localStorage.getItem('todos')
    return savedTodos ? JSON.parse(savedTodos) : [];
  })

  const [newTodo, setNewTodo] = useState('')
  const [filter, setFilter] = useState('all')
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('')

  // save todos to localStorage whenever they change

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  },[todos])
  

  const addTodo = (e) =>{
    e.preventDefault();
    if(!newTodo.trim()) return;

    setTodos([...todos,{
      id : Date.now(),
      text: newTodo.trim(),
      completed: false,
      createdAt : new Date().toISOString()
    }
  ]);
    setNewTodo('')
  }

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => todo.id === id? {
      ...todo, completed: !todo.completed }: todo))
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  }

  const startEdit = (todo) => {
    setEditingId(todo.id)
    setEditText(todo.text)
  };

  const saveEdit = (id) => {
    setTodos(todos.map(todo => todo.id === id ? {
      ...todo, text: editText } : todo
    ))
    setEditingId(null)
    setEditText('')
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditText('')
  }

  const filteredTodos = todos.filter(todo => {
    if(filter === 'active') return !todo.completed
    if(filter === 'completed') return todo.completed
    return true
  })

  return (
    <div className='max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg'>
      {/* <CreateTodo /> */}
    <h1 className='text-3xl font-bold mb-6 text-center text-gray-800'>Todo List</h1>

    {/* // Add Todo form */}
    <form onSubmit={addTodo} className='mb-6'>
      <div className='flex gap-2'>
        <input type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)} 
        placeholder='What needs to be done ?'
        className='flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 '
        />
        <button
          type='submit'
          className='px-6 py-2 bg-blue-500
          text-white rounded-lg hover:bg-blue-600 focus: outline-none'
        >Add</button>
      </div>
    </form>

    {/* Filter buttons */}

    <div className='flex gap-2 mb-4'>
      <button
        onClick={() => setFilter('all')}
        className={`px-4 py-2 rounded-lg ${filter ==='all' ? 'bg-blue-500 text-white' : 'bg-gray-200'} `}
      >
        All
      </button>
      <button
          onClick={() => setFilter('active')}
          className={`px-4 py-2 rounded-lg ${filter === 'active' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Active
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`px-4 py-2 rounded-lg ${filter === 'completed' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Completed
        </button>
    </div>

    {/* Todo List */}
    <div className='space-y-2'>
      {filteredTodos.map(todo => (
        <div
        key={todo.id}
        className={`flex items-center gap-2 p-3 border rounded-lg ${
          todo.completed ?'bg-gray-50' : 'bg-white'
        }`}
        >
          {editingId === todo.id ? (
            <div className='flex-1 flex gap-2'>
              <input type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className='flex-1 px-2 py-1 border-rounded' />
              <button
              onClick={() => saveEdit(todo.id)}
              className='p-1 text-green-600 hover:text-green-700'
              >
                <Check size={20} />
              </button>
              <button
                onClick={cancelEdit}
                className='p-1 text-red-600 hover:text-red-700'
              >
              <X size={20} />
              </button>
            </div>
          ):( <>

            <input
              type='checkbox'
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              className='w-5 h-5'
            ></input>
            <span className={`flex-1 ${todo.completed ? 'line-through text-gray-500' : ''}`}>
            {todo.text}
            </span>
            <button
            onClick={() => startEdit(todo)}
            className='p-1 text-blue-600 hover:text-blue-700'
            >
              <Edit size={20} />
            </button>
            <button
            onClick={() => deleteTodo(todo.id)}
            className='p-1 text-red-600 hover:text-red-700'
            >
            <Trash2 size={20} />
            </button>
          </>
        )}
        </div>
      ))}
    </div>

      {/* Todo Count */}
      <div className='mt-4 text-sm text-gray-600'>{todos.filter(todo => !todo.completed).length} items left</div>

    </div>
  )
}

export default App
