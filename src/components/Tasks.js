import Task from './Task'
import moment from 'moment'
import './Task.css';

const Tasks =({tasks, startDate, onDelete, onToggle})=> {
    return (
        <div className="task-container">
          <h2> Date: {startDate.sDate} </h2>
          <div>{tasks.length > 0 ? tasks.map((task)=> (
                <Task key={task.id} taskL={task} startDate={startDate} onDelete={onDelete} onToggle={onToggle}/>
            )
          ) : "No Tasks!"}</div>
          {(startDate.sDate >= moment().clone().format("YYYY-MM-DD")) ? <input type="button" value="Submit"className="sub-btn"></input> : <input type="button" value="Submit" className="sub-btn" disabled></input>}
        </div>
    )
}
export default Tasks
