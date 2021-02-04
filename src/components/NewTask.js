// import React, { useState } from 'react'
import moment from 'moment'
import './Task.css';


const NewTask = ({startDate}) => {
    // const [text, setText] = useState('')
    // const [day, setDay] = useState('')
    // const [reminder, setReminder] = useState(false)
    
    //month drop down
    const startMonth = moment().clone().startOf("year")
    const endMonth = moment().clone().endOf("year")
    const mon = startMonth.subtract(1, "month")
    const months = [];
    while(startMonth.isBefore(endMonth, "month")) {
        months.push(mon.add(1,"month").clone())
    }
    //date drop down

    return (
        <form className='new-task-form'>
            <div className='form-control'>
                <label>Task</label>
                <input type='text' placeholder='Add New Task' />
            </div>
            <div className='form-control'>
                <label>Day & Time (MM/DD/YYYY)</label>
                <select className='select-month'>
                    {months.map(month => (<option key={month}>{month.format("MM")}</option>))}
                </select>
                <select className='select-day'> 
                </select>
            </div>
            <div className='form-control form-control-check'>
                <label>Set Reminder</label>
                <input type='checkbox' />
            </div>
            {startDate.sDate >= moment().format("YYYY-MM-DD") ? <input type="submit" value="Submit" className="sub-btn btn-block"></input> : <input type="submit" value="Submit" className="sub-btn btn-disabled" disabled></input>}
        </form>
    )
}
export default NewTask
