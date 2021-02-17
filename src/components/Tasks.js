import {useState} from 'react'
import Task from './Task'
import NewTask from './NewTask.js';
import './Task.css';

const Tasks =({tasks, setTasks, startDate, onDelete, onToggle})=> {
  const [showAddTask, setShowAddTask] = useState(false)
    //add new task
  const newTask = async (task)=> {
    const res = await fetch(`http://localhost:5000/tasks`, {
      method: 'POST',
      headers: {
        'Content-type' : 'application/json'        
      },
      body: JSON.stringify(task)
    })
    const data= await res.json()
    setTasks([...tasks, data])
  } 
  return (
        <div className="task-container">
          <h2>Tasks</h2>
          <button className="btn-add-task" onClick={()=> setShowAddTask(!showAddTask)}>{showAddTask ? 'CLOSE': 'ADD'}</button>
           {showAddTask && <NewTask tasks={tasks} startDate={startDate} onAdd={newTask} />}
       
          <div>{tasks.length > 0 ? tasks.map((task)=> (
                <Task key={task.id} taskL={task} startDate={startDate} onDelete={onDelete} onToggle={onToggle}/>
            )
          ) : "No Tasks!"}</div>
        </div>
    )
}
export default Tasks