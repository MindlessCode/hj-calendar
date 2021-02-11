import React, { useState, useEffect } from 'react'
import moment from 'moment'
import './Task.css';

const NewTask = ({ startDate }) => {
    const [text, setText] = useState('')
    const [monthSelect, setMonthSelect] = useState('')
    const [daySelect, setDaySelect] = useState('')
    const [yearSelect, setYearSelect] = useState('')
    const [reminder, setReminder] = useState(false)
    //year drop down
    var startYear = moment().clone().year()
    const endYear = moment().clone().year() + 10
    const selectYears = [];
    while (startYear <= endYear) {
        selectYears.push(startYear)
        startYear++;
    }
    //month drop down
    const startMonth = moment().clone().startOf("year")
    const endMonth = moment().clone().endOf("year")
    const mon = startMonth.subtract(1, "month")
    const months = [];
    while (startMonth.isBefore(endMonth, "month")) {
        months.push(mon.add(1, "month").clone())
    }

    function isLeap () {
        if (moment([yearSelect]).isLeapYear())
            return true;
        else
            return false;
    }
    //day drop down
    function returnMonthDays (monthSelect) {
        if(isLeap() && monthSelect===2)
            setDaySelect(29)
        else
            setDaySelect(28)
    }
    const dates = [];
    for (let i = 1; i <= daySelect; i++) {
        dates.push(i)
    }
    useEffect(() => {
        setDaySelect(returnMonthDays(monthSelect-1));
    }, [monthSelect])
    return (

            <form className='new-task-form' >
                <div className='form-control' >
                    <label>Task</label>
                    <input type='text' value={text} placeholder='Add New Task' onChange={(e)=>setText(e.target.value)}/>
                </div>
                <div className='form-control'>
                    <label>Day & Time (MM/DD/YYYY)</label>
                    <select className='select-month' onChange={(e)=> setMonthSelect(e.target.value)}>
                        {months.map(month => (<option key={month}>{month.format("MM")}</option>))}
                    </select>
                    <select className='select-day' onChange={(e)=> setDaySelect(e.target.value)}>
                        {dates.map(day => (<option key={day}>{day}</option>))}
                    </select>
                    <select className='select-year' onChange={(e)=> setYearSelect(e.target.value)}>
                       {selectYears.map(year => (<option key={year}>{year}</option>))}
                    </select>
                </div>
                <div className='form-control form-control-check'>
                    <label>Set Reminder</label>
                    <input type='checkbox' value={reminder} onChange={(e)=> setReminder(e.currentTarget.checked)}/>
                </div>
                {startDate.sDate >= moment().format("YYYY-MM-DD") ? <input type="submit" value="Submit" className="sub-btn btn-block"></input> : <input type="submit" value="Submit" className="btn-block btn-disabled" disabled></input>}
            </form>
    )
}
export default NewTask
