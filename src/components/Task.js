import {FaTimes} from 'react-icons/fa'
const Task = ({taskL, selectedDate, onDelete, onToggle}) => {
    return (
        (taskL.sDate<=selectedDate && taskL.eDate>=selectedDate)?
        <div className={`task ${taskL.reminder ? 'reminder' : ''}`} onDoubleClick={()=> onToggle(taskL.id)}>
            <h3>{taskL.text}  <FaTimes style={{ color: 'red', justifyItems: 'right', cursor: 'pointer'}} onClick={()=>onDelete(taskL.id)}/></h3>
            <p>Starts: {taskL.sDate}</p>
            <p>Ends: {taskL.eDate}</p>
        </div>: ""
    )
}
export default Task
