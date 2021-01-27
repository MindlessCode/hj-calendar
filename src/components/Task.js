import {FaTimes} from 'react-icons/fa'
const Task = ({task, startDate, onDelete}) => {
    return (
        <div className='task'>
           
            <h3>{task.text} <FaTimes style={{ color: 'red', justifyItems: 'right'}} onClick={()=>onDelete(task.id)}/></h3>
        </div>
    )
}
export default Task
