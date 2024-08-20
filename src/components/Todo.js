import React, { useState } from 'react'

const Todo = () => {
  const [todoList, setTodoList] = useState([
    { id: 1, name: 'Shopping', status: 'Open' },
    { id: 2, name: 'Cleaning', status: 'Close' },
    { id: 3, name: 'Rent Bill', status: 'Open' },
    { id: 4, name: 'Credit Card Bill', status: 'Open' },
  ])

  const [editingId, setEditingId] = useState(null)

  const toggleStatus = (id) => {
    setTodoList(todoList.map(item =>
      item.id === id ? { ...item, status: item.status === 'Open' ? 'Close' : 'Open' } : item
    ))
  }

  const handleTextClick = (id) => {
    setEditingId(id)
  }

  const handleChange = (id, newValue) => {
    setTodoList(todoList.map(item =>
      item.id === id ? { ...item, name: newValue } : item
    ))
  }

  const handleBlur = () => {
    setEditingId(null)
  }

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>List of Todo</h1>
      {todoList.map((item) => (
        <div key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '20px' }}>
          <input type='checkbox' checked={item.status === 'Close'} onChange={() => toggleStatus(item.id)} style={{ fontSize: '30px' }} />
          <input 
            type='text' 
            value={item.name} 
            readOnly={editingId !== item.id} 
            onClick={() => handleTextClick(item.id)} 
            onChange={(e) => handleChange(item.id, e.target.value)} 
            onBlur={handleBlur}
            style={{ border: 'none', fontSize: '30px' }} 
          />
          <button>Delete</button>
        </div>
      ))}
    </div>
  )
}

export default Todo
