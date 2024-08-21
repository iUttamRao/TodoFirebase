import { db, onValue, ref, set } from '../firebase';
import React, { useEffect, useState } from 'react';

const Todo = () => {
  const [dbData, setDbData] = useState();
  const [todoList, setTodoList] = useState([]);
  const [itemText, setItemText] = useState('');
  console.log(dbData)

  useEffect(() => {
    console.log("Triggered")
    const uid = localStorage.getItem("userId");
    if (uid) {
      const userRef = ref(db, 'users/' + uid);
      
      // Set up real-time listener
      const unsubscribe = onValue(userRef, (snapshot) => {
        if (snapshot.exists()) {
          setDbData(snapshot.val());
          if (snapshot.val().todoList) {
            setTodoList(snapshot.val().todoList);
          }
        } else {
          console.log('No data available');
        }
      }, (error) => {
        console.error('Error fetching real-time data:', error.message);
      });

      // Cleanup listener on component unmount
      return () => unsubscribe();
    } else {
      console.error('UID is missing or invalid');
    }
  }, []);

  const updateIds = (list) => {
    return list.map((item, index) => ({ ...item, id: index + 1 }));
  };

  const handleAddTodo = () => {
    if (itemText) {
      const newTodo = { id: 0, name: itemText, status: 'Open' };
      const updatedList = updateIds([newTodo, ...todoList]);
      setTodoList(updatedList);
      setItemText('');

      // Update Firebase database
      const uid = localStorage.getItem("userId");
      if (uid) {
        set(ref(db, 'users/' + uid + '/todoList'), updatedList);
      }
    } else {
      alert("Please fill the input field...");
    }
  };

  const toggleStatus = (id) => {
    const updatedList = todoList.map(item =>
      item.id === id ? { ...item, status: item.status === 'Open' ? 'Close' : 'Open' } : item
    );
    setTodoList(updatedList);

    // Update Firebase database
    const uid = localStorage.getItem("userId");
    if (uid) {
      set(ref(db, 'users/' + uid + '/todoList'), updatedList);
    }
  };

  const handleChange = (id, newValue) => {
    const updatedList = todoList.map(item =>
      item.id === id ? { ...item, name: newValue } : item
    );
    setTodoList(updatedList);

    // Update Firebase database
    const uid = localStorage.getItem("userId");
    if (uid) {
      set(ref(db, 'users/' + uid + '/todoList'), updatedList);
    }
  };

  const handleDelete = (id) => {
    const updatedList = todoList.filter(item => item.id !== id);
    setTodoList(updateIds(updatedList));

    // Update Firebase database
    const uid = localStorage.getItem("userId");
    if (uid) {
      set(ref(db, 'users/' + uid + '/todoList'), updatedList);
    }
  };

  return (
    <div>
      <div style={{ backgroundColor: '#4a4a4a', width: '100%', height: '50px' }}>
        {/* <img src={dbData?.photoURL}></img> */}
        <p style={{all: 'unset', color: '#f9f9ff', fontSize: '30px', marginLeft: '30px', textShadow: '1px 0px #ffffff'}}>🤵{dbData?.name }</p>
      </div>
      <h1 style={{ textAlign: 'center' }}>List of Todo</h1>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '50px' }}>
        <input
          type='text'
          value={itemText}
          placeholder='Enter the item'
          style={{ fontSize: '20px', borderRadius: '40px', paddingLeft: '10px', margin: '0 15px 0 15px' }}
          onChange={(e) => setItemText(e.target.value)}
        />
        <button
          style={{ fontSize: '20px', borderRadius: '40px' }}
          onClick={handleAddTodo}
        >Add Item</button>
      </div>
      {todoList.map((item) => (
        <div key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '20px' }}>
          <input
            type='checkbox'
            checked={item.status === 'Close'}
            onChange={() => toggleStatus(item.id)}
          />
          <input
            type='text'
            value={item.name}
            onChange={(e) => handleChange(item.id, e.target.value)}
            style={{ border: 'none', fontSize: '30px', borderRadius: '40px', paddingLeft: '15px', margin: '0 15px 0 15px' }}
          />
          <button
            style={{ fontSize: '20px', borderRadius: '40px' }}
            onClick={() => handleDelete(item.id)}
          >Delete</button>
        </div>
      ))}
    </div>
  );
};

export default Todo;
