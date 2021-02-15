import React, { useState } from 'react'
import moment from 'moment'
import './Task.css';

const NewTask = ({ onAdd }) => {
    const [text, setText] = useState('')
    const [monthSelect, setMonthSelect] = useState(moment().clone().format("M"))
    const [daySelect, setDaySelect] = useState(moment().clone().format("DD"))
    const [yearSelect, setYearSelect] = useState(moment().clone().format("YYYY"))
    const [endMonthSelect, setEndMonthSelect] = useState('')
    const [endDaySelect, setEndDaySelect] = useState('')
    const [endYearSelect, setEndYearSelect] = useState('')
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
    //day drop down
    const dates = [];
    for (let i = 1; i <= 31; i++) {
        dates.push(i)
    }
    const onSubmit =(e)=> {
        e.preventDefault()
        
        if(!text) {
            alert('Please add a task name')
            return
        }
        
        onAdd({text, sDate:monthSelect + '-' + daySelect + "-" + yearSelect, eDate: endMonthSelect + '-' + endDaySelect + '-' + endYearSelect, reminder})

        setText('')
        setMonthSelect('')
        setDaySelect('')
        setYearSelect('')
        setEndMonthSelect('')
        setEndDaySelect('')
        setEndYearSelect('')
        setReminder(false)
    }
    return (
            <form className='new-task-form' onSubmit={onSubmit}>
                <div className='form-control' >
                    <label>Task</label>
                    <input type='text' value={text} placeholder='Add New Task' onChange={(e)=>setText(e.target.value)}/>
                </div>
                <div className='form-control'>
                    <label>
                        <span>Start</span>
                    </label>
                    <select className='select-month' value={monthSelect? monthSelect: 'none'} onChange={(e)=> setMonthSelect(e.target.value)}>
                        <option value="none"defaultValue="true" >MONTH</option>
                        {months.map(month => (<option key={month} value={month.format("M")}>{month.clone().format("MM")}</option>))}
                    </select>
                    <select className='select-day' value={daySelect? daySelect: 'none'} onChange={(e)=> setDaySelect(e.target.value)}>
                    <option value="none" defaultValue="true" >DAY</option>

                        {dates.map(day => (<option key={day} value={day}>{day}</option>))}
                    </select>
                    <select className='select-year' value={yearSelect? yearSelect: 'none'} onChange={(e)=> setYearSelect(e.target.value)}>
                    <option value="none"  defaultValue="true" >YEAR</option>
                       {selectYears.map(year => (<option key={year} value={year}>{year}</option>))}
                    </select>
                    <label>
                        <span>End</span>
                    </label>
                    <select className='select-month' value={endMonthSelect? endMonthSelect: 'none'} onChange={(e)=> setEndMonthSelect(e.target.value)}>
                    <option value="none"  defaultValue="true" >MONTH</option>
                        {months.map(month => (<option key={month} value={month.format("M")}>{month.format("MM")}</option>))}
                    </select>
                    <select className='select-day' value={endDaySelect? endDaySelect: 'none'} onChange={(e)=> setEndDaySelect(e.target.value)}>
                    <option value="none"  defaultValue="true" >DAY</option>
                        {dates.map(day => (<option key={day}>{day}</option>))}
                    </select>
                    <select className='select-year' value={endYearSelect? endYearSelect: 'none'}  onChange={(e)=> setEndYearSelect(e.target.value)}>
                    <option value="none"  defaultValue="true" >YEAR</option>
                       {selectYears.map(year => (<option key={year}>{year}</option>))}
                    </select>
                </div>
                <div className='form-control form-control-check'>
                    <label>Set Reminder</label>
                    <input type='checkbox' checked={reminder} value={reminder} onChange={(e)=> setReminder(e.currentTarget.checked)}/>
                </div>
                <input type="submit" value="Submit" className="btn-block sub-btn"></input>
            </form>
    )
}
export default NewTask
