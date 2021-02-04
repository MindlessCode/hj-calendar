import {FaTimes} from 'react-icons/fa'
const Task = ({taskL, onDelete, onToggle}) => {
    return (
        <div className={`task ${taskL.reminder ? 'reminder' : ''}`} onDoubleClick={()=> onToggle(taskL.id)}>
            <h3>{taskL.text} <FaTimes style={{ color: 'red', justifyItems: 'right', cursor: 'pointer'}} onClick={()=>onDelete(taskL.id)}/></h3>
        </div>
    )
}
export default Task
