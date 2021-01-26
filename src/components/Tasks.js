import Task from './Task'
import './Task.css';

const Tasks =({tasks, startDate, onDelete})=> {

    return (
        <div className="taskContainer">
          <h2> Date: {startDate.sDate}</h2>
          {tasks.map((task)=> (
                <Task key={task.id} task={task} startDate={startDate} onDelete={onDelete}/>
            )
          )}
        </div>
    )
}
export default Tasks
