import React, { useState } from 'react'
import moment from 'moment'
import './Task.css';

const NewTask = ({ onAdd }) => {
    const [text, setText] = useState('')
    const [monthSelect, setMonthSelect] = useState(moment().clone().format("MM"))
    const [daySelect, setDaySelect] = useState(moment().clone().format("DD"))
    const [yearSelect, setYearSelect] = useState(moment().clone().format("YYYY"))
    const [endMonthSelect, setEndMonthSelect] = useState(moment().clone().format("MM"))
    const [endDaySelect, setEndDaySelect] = useState(moment().clone().format("DD"))
    const [endYearSelect, setEndYearSelect] = useState(moment().clone().format("YYYY"))
    const [reminder, setReminder] = useState(false)
    //year drop down
    var startYear = moment().clone().year()
    const endYear = moment().clone().year() + 10
    const selectYears = [];
    const selectEYears = [];

    while (startYear <= endYear) {
        selectYears.push(startYear)

        startYear++;
    }
    var startEYear = moment().clone().year()
    const endEYear = moment().clone().year() + 10
    while (startEYear <= endEYear) {
        selectEYears.push(startEYear)

        startEYear++;
    }
    //month drop down
    const startMonth = moment().clone().startOf("year")
    const endMonth = moment().clone().endOf("year")
    const startEMonth = moment().clone().startOf("year")
    const endEMonth = moment().clone().endOf("year")
    const mon = startMonth.subtract(1, "month")
    const monE = startEMonth.subtract(1, "month")
    const months = [];
    const emonths = [];
    while (startMonth.isBefore(endMonth, "month")) {
        months.push(mon.add(1, "month").clone())
    }
    while (startEMonth.isBefore(endEMonth, "month")) {
        emonths.push(monE.add(1, "month").clone())
    }
    //day drop down
    const lastDay = moment(yearSelect + '-' + monthSelect, "YYYY-MM").clone().daysInMonth();
    const dates = [];
    const edates = [];

    for(var i = 1; i <= lastDay; i++) {
        dates.push(i)

    }
    console.log(lastDay)
    const lastEDay = moment(endYearSelect + '-' + endMonthSelect, "YYYY-MM").clone().daysInMonth();
    for(var j = 1; j <= lastEDay; j++) {
        edates.push(j)

    }
    const onSubmit =(e)=> {
        e.preventDefault()
        
        if(!text) {
            alert('Please add a task name')
            return
        }
        
        onAdd({text, sDate: yearSelect + '-' + monthSelect + '-' + moment().date(daySelect).format("DD"),  eDate: endYearSelect + '-' + endMonthSelect + '-' + moment().date(endDaySelect).format("DD"), reminder})

        setText('')
        setMonthSelect('')
        setDaySelect('')
        setYearSelect(moment().year())
        setEndMonthSelect('')
        setEndDaySelect('')
        setEndYearSelect(moment().year())
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
                        {months.map(month => (<option key={month} value={month.format("MM")}>{month.clone().format("MM")}</option>))}
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
                        {emonths.map(month => (<option key={month} value={month.format("MM")}>{month.format("MM")}</option>))}
                    </select>
                    <select className='select-day' value={endDaySelect? endDaySelect: 'none'} onChange={(e)=> setEndDaySelect(e.target.value)}>
                    <option value="none"  defaultValue="true" >DAY</option>
                        {edates.map(day => (<option key={day} value={day}>{day}</option>))}
                    </select>
                    <select className='select-year' value={endYearSelect? endYearSelect: 'none'}  onChange={(e)=> setEndYearSelect(e.target.value)}>
                    <option value="none"  defaultValue="true" >YEAR</option>
                       {selectEYears.map(year => (<option key={year} value={year}>{year}</option>))}
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
