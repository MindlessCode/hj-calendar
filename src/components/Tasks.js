import Task from './Task'
import moment from 'moment'
import './Task.css';

const Tasks =({tasks, startDate, onDelete})=> {
    return (
        <div className="taskContainer">
          <h2> Date: {startDate.sDate} </h2>
          <div>{tasks.length > 0 ? tasks.map((task)=> (
                <Task key={task.id} taskL={task} startDate={startDate} onDelete={onDelete}/>
            )
          ) : "No Tasks Today!"}</div>
          {(startDate.sDate >= moment().clone().format("YYYY-MM-DD")) ? <input type="button" value="Submit"className="subBtn"></input> : <input type="button" value="Submit" className="subBtn" disabled></input>}
        </div>
    )
}
export default Tasks
