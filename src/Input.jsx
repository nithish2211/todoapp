import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './index.css';

function Input() {
  const [input, setInput] = useState('');
  const [task, setTask] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTask(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(task));
  }, [task]);

  const addTask = () => {
    if (input.trim() === '') return;
    const newTask = { Id: Date.now(), title: input, completed: false };
    setTask([...task, newTask]);
    setInput('');
  };

  const togglestatus = (id) => {
    setTask(task.map((item) =>
      item.Id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const deleteTask = (id) => {
    setTask(task.filter((item) => item.Id !== id));
  };

  const startEdit = (id, title) => {
    setEditId(id);
    setEditText(title);
  };

  const saveEdit = (id) => {
    if (editText.trim() === '') return;
    setTask(task.map((item) =>
      item.Id === id ? { ...item, title: editText } : item
    ));
    setEditId(null);
    setEditText('');
  };

  return (
    <div className="min-h-screen bg-[#FFF9F2] text-[#3B2A1A] flex flex-col items-center py-16 px-6 poppins-font">
      <h1 className="text-4xl font-bold mb-10">Task Manager</h1>

      <div className="w-full max-w-xl bg-[#faf6f1] border-2 border-[#2c1810] rounded-3xl shadow-[4px_4px_0px_0px_#2c1810] p-6 space-y-4 transition-colors duration-300">
        <input
          className="w-full px-4 py-3 border border-[#C9A381] rounded-md focus:outline-none focus:ring-2 focus:ring-[#6A3E2B] placeholder:text-[#A57E65]"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new task"
        />
        <button
          className="w-full bg-[#2c1810] cursor-pointer hover:bg-[#2c1810]/90 text-[#faf6f1] rounded-lg border-2 border-[#2c1810] shadow-[2px_2px_0px_0px_#6b4d3c] hover:translate-y-[1px] hover:translate-x-[1px] hover:shadow-[1px_1px_0px_0px_#6b4d3c] transition-all duration-200 font-semibold py-2"
          onClick={addTask}
        >
          Add Task
        </button>
      </div>

      <div className="w-full max-w-xl mt-10 bg-[#faf6f1] border-2 border-[#2c1810] rounded-3xl shadow-[4px_4px_0px_0px_#2c1810] p-6 space-y-3 transition-colors duration-300">
        <h2 className="text-2xl font-semibold mb-4 text-[#6A3E2B]">Tasks</h2>

        <ul className="space-y-3">
          <AnimatePresence>
            {task.map((item) => (
              <motion.li
                key={item.Id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                onClick={() => togglestatus(item.Id)}
                style={{ textDecoration: item.completed ? 'line-through' : 'none' }}
                className="bg-white flex items-center justify-between border border-[#ECD8C8] text-[#6A3E2B] px-4 py-3 rounded-md shadow-sm cursor-pointer"
              >
                {editId === item.Id ? (
                  <input
                    className="w-full mr-2 px-2 py-1 rounded cursor-pointer border border-gray-300"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                  />
                ) : (
                  <span className={`flex-1 pr-2 ${item.completed ? 'line-through' : ''}`}>{item.title}</span>
                )}

                <div className="flex gap-2 ml-2" onClick={(e) => e.stopPropagation()}>
                  {editId === item.Id ? (
                    <button onClick={() => saveEdit(item.Id)} className="p-1">✅</button>
                  ) : (
                    <button onClick={() => startEdit(item.Id, item.title)} className="p-1 cursor-pointer hover:scale-110 transition">
                      <img
                        src="https://img.icons8.com/ios-glyphs/30/000000/edit--v1.png"
                        alt="Edit"
                        className="w-5 h-5"
                      />
                    </button>
                  )}
                  <button onClick={() => deleteTask(item.Id)} className="p-1 cursor-pointer hover:scale-110 transition">
                    <img
                      src="https://img.icons8.com/ios-glyphs/30/000000/trash--v1.png"
                      alt="Delete"
                      className="w-5 h-5"
                    />
                  </button>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>
    </div>
  );
}

export default Input;
