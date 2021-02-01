import {FaTimes} from 'react-icons/fa'
const Task = ({taskL, onDelete}) => {
    return (
        <div className='task'>
            <h3>{taskL.text} <FaTimes style={{ color: 'red', justifyItems: 'right', cursor: 'pointer'}} onClick={()=>onDelete(taskL.id)}/></h3>
        </div>
    )
}
export default Task
