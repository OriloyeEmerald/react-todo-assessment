import { useState } from 'react';
import './App.css';
import { Backspace, Check } from 'phosphor-react';
import { useEffect } from 'react';


function App() {

  const [newTask, setNewtask] = useState('')
  const [description, setDescription] = useState('')
  const [todo, setTodo] = useState([])
  
  const handleInput = (event) => {
    setNewtask(event.target.value)
  }

  const handleDescription = (event) => {
      setDescription(event.target.value)
  }
  const addTask = () => {
     const task = {
      id: todo.length === 0 ? 1 : todo[todo.length -1].id + 1,
      title: newTask,
      description: description,
      completed: false
     }
      setTodo([...todo, task]);
      setNewtask('');
      setDescription('')
  }

  const delTask = (id) => {
       const newTodo = todo.filter((task) => 
         task.id !== id
       )
       setTodo(newTodo)
  }

  const completeTask = (id) => {
    const styleTodo = [...todo].map((task) =>
        {
          if(task.id === id) {
            return {...task, completed:true}
          } else {
            return {...task, completed:false}
          }
        }
    )
    setTodo(styleTodo)
  }
   
    useEffect(() => {
       localStorage.setItem("todolist", JSON.stringify(todo))
    }, [todo])
     
  
  return (

    <div className="App">
      <div className='form'>
        <div>
        <form>
          <input type='text' value={newTask} onChange={handleInput} placeholder='enter title..'/>
         </form>
         <form>
          <input type='text' value={description} onChange= {handleDescription} placeholder='enter description..'/>
         </form>
        </div>
        <button onClick={addTask}>ADD TASK</button>
      </div> 
      <div className='todo-con'>{todo.map((task, id) => {
       return <div key={id} className='todolist'>
                <div className='task'> 
                 <div style={{color: task.completed ? "green" : "white"}}>
                  <h4 >{task.title}</h4>
                  <p>{task.description}</p>
                 </div>
                 <div className='icons'>
                  <Check size={28} onClick={() => {
                    completeTask(task.id)
                  }}/>
                  <Backspace size={28} onClick={() => delTask(task.id)} color='red'/>
                 </div>

                </div>
              </div>
      })}</div>
    </div>

  );
}

export default App;
