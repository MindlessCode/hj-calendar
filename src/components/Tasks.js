import Task from './Task'
import NewTask from './NewTask.js';
import moment from 'moment'

import './Task.css';

const Tasks =({tasks, startDate, onDelete, onToggle})=> {
    return (
        <div className="task-container">
          <h2> Date: {startDate.sDate===undefined? moment().format("YYYY-MM-DD") : startDate.sDate} </h2>
          <NewTask tasks={tasks} startDate={startDate}/>
          <div>{tasks.length > 0 ? tasks.map((task)=> (
                <Task key={task.id} taskL={task} startDate={startDate} onDelete={onDelete} onToggle={onToggle}/>
            )
          ) : "No Tasks!"}</div>
        </div>
    )
}
export default Tasks
