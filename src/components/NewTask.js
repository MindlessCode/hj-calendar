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
        selectEYears.push(startYear)

        startYear++;
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
    const startEDay = moment(yearSelect + '-' + monthSelect, "YYYY-MM").clone().startOf("month");
    const lastEDay = moment(yearSelect + '-' + monthSelect, "YYYY-MM").clone().endOf("month");
    const test = startEDay.subtract(1,"day")
    const dates =[];
    while(startEDay.isBefore(lastEDay, "day"))
    {
        dates.push(test.add(1,"day").clone())
    }
    const startEDay2 = moment(endYearSelect + '-' + endMonthSelect, "YYYY-MM").clone().startOf("month");
    const lastEDay2 = moment(endYearSelect + '-' + endMonthSelect, "YYYY-MM").clone().endOf("month");
    const test2 = startEDay2.subtract(1,"day")
    const edates =[]
    while(startEDay2.isBefore(lastEDay2, "day"))
    {
        edates.push(test2.add(1,"day").clone())
    }
    const onSubmit =(e)=> {
        e.preventDefault()
        
        if(!text) {
            alert('Please add a task name')
            return
        }
        

        if(moment(yearSelect + '-' + monthSelect +'-' + daySelect, "YYYY-MM-DD") > moment(endYearSelect + '-' + endMonthSelect +'-' + endDaySelect, "YYYY-MM-DD"))
        {
            document.getElementById("error-div").innerHTML = "Start date must be before End date"
            return
        }
        else {
            document.getElementById("error-div").innerHTML = ""

        }
        onAdd({text, sDate: yearSelect + '-' + monthSelect + '-' + daySelect,  eDate: endYearSelect + '-' + endMonthSelect + '-' + endDaySelect, reminder})
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
                    <option value="none"defaultValue="true" >DAY</option>
                        {dates.map(day => (<option key={day} value={day.format("DD")}>{day.format("DD")}</option>))}
                    </select>
                    <select className='select-year' value={yearSelect? yearSelect: 'none'} onChange={(e)=> setYearSelect(e.target.value)}>
                    <option value="none"  defaultValue="true" >YEAR</option>
                       {selectYears.map(year => (<option key={year} value={year}>{year}</option>))}
                    </select>
                    <label>
                    <div id="error-div" style={{color: 'red'}}></div>
                        <span>End</span>
                    </label>
                    <select className='select-month' value={endMonthSelect? endMonthSelect: 'none'} onChange={(e)=> setEndMonthSelect(e.target.value)}>
                    <option value="none"  defaultValue="true" >MONTH</option>
                        {emonths.map(month => (<option key={month} value={month.format("MM")}>{month.format("MM")}</option>))}
                    </select>
                    <select className='select-day' value={endDaySelect? endDaySelect: 'none'} onChange={(e)=> setEndDaySelect(e.target.value)}>
                    <option value="none"defaultValue="true" >DAY</option>
                        {edates.map(day => (<option key={day} value={day.format("DD")}>{day.format("DD")}</option>))}
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
