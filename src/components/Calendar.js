import React, { useState, useEffect } from 'react'
import moment from 'moment'
import buildCalendar from "./buildCal";
import Tasks from './Tasks.js';
import './Calendar.css'

const Calendar = ({ value, onXChange }) => {
    const [tasks, setTasks] = useState([])
    useEffect(()=>{
        const getTasks = async ()=> {
            const tasksFromServer = await fetchTasks()
            setTasks(tasksFromServer)
        }

        getTasks()

    }, [])
    //fetch tasks
    const fetchTasks = async () => {
        const res = await fetch('http://localhost:5000/tasks')
        const data = await res.json()

        return data
    }
    const fetchTask = async (id) => {
        const res = await fetch(`http://localhost:5000/tasks/${id}`)
        const data = await res.json()

        return data
    }
    const [startDate, setStartDate] = useState( ()=> {
        return 0;
    })
    const [calendar, setCalendar] = useState([]);
    
    useEffect(() => {
        setStartDate(moment().format("YYYY-MM-DD"))

        setCalendar(buildCalendar(value));
    }, [value])
    
    const mon = [];
    const firstMonth = value.clone().startOf("year").month();
    const lastMonth = value.clone().endOf("year").month();
    
    function getMonthName() {
        for (let i = firstMonth; i <= lastMonth; ++i)
            mon.push(i)
        return mon;
    }
    function currMonthName() {
        return value.format("MMM");
    }
    function currYear() {
        return value.format("YYYY");
    }
    function nextMonth() {
        return value.clone().add(1, "month")
    }
    function prevMonth() {
        return value.clone().subtract(1, "month")
    }
    function setMonthName(arg) {
        return value.clone().month(arg)
    }
    const showDate = (year, month, selectedDate) => {
        const currDay = [startDate];
        currDay.sDate = moment([year, month, selectedDate]).format("YYYY-MM-DD").toString()
        setStartDate(currDay);
    }
    const deleteTask = async (id) => {
        await fetch(`http://localhost:5000/tasks/${id}`, {
            method: 'DELETE',
        })

        setTasks(tasks.filter((task) => task.id !== id))
    }
    const toggleReminder = async (id) => {

        const taskToToggle = await fetchTask(id)
        const updTask = {...taskToToggle, reminder: !taskToToggle.reminder}

        const res = await fetch(`http://localhost:5000/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-type' : 'application/json'
            },
            body: JSON.stringify(updTask)
        })
        const data = await res.json()
        setTasks(tasks.map((task)=> task.id === id ? {...task, reminder: data.reminder} : task) )
    }


    function isDayAfterStart(nameKey, myArray) {
        for (var i = 0; i < myArray.length; i++) {
            if(myArray[i].sDate <= nameKey)
                return true;
        }
    }
    function isDayBeforeEnd(nameKey, myArray) {
        for (var i = 0; i < myArray.length; i++) {
            if(myArray[i].eDate >= nameKey)
                return true;
        }
    }
    return (
        <div className="wrapper">
            <div className="calendar">
                <div className="month-select">
                    {getMonthName().map(mons =>
                        <div key={mons} className={value.isSame(value.clone().month(mons), "month") ? "selected-month" : "unselected-months"} onClick={() => onXChange(setMonthName(mons))}>
                            {moment().month(mons).format("MMM")}
                        </div>)}
                </div>
                <div className="month">
                    <div className="custom-element-bg current-month">
                        <i className="fas fa-angle-left prev" onClick={() => onXChange(prevMonth())}></i>
                            <h1>{currMonthName()} {currYear()} </h1>
                        <i className="fas fa-angle-right next" onClick={() => onXChange(nextMonth())}></i>
                    </div>
                    <div className="weekdays custom-element-bg">
                        <div>SUN</div>
                        <div>MON</div>
                        <div>TUE</div>
                        <div>WED</div>
                        <div>THU</div>
                        <div>FRI</div>
                        <div>SAT</div>
                    </div>
                        {calendar.map(week => <div key={week} className="weeks">{
                            week.map(day => 
                            <div key={day} 
                                className={(!(day.clone().month() === value.clone().month())) ? 
                                    "fill-days" : startDate.sDate === day.clone().format("YYYY-MM-DD") ? 
                                    (((day.year() === moment().format("YYYY"))&&(day.date()=== moment().date()) && (day.clone().month() === moment().month()))) ? 
                                    "dates selected-date today custom-element-bg" : 'dates selected-date' : (day.year() === moment().year() && day.date()=== moment().date()) && (day.clone().month() === moment().month()) ?
                                    "dates today custom-element-bg" : "dates" } 
                                    onClick={((day.clone().month() === value.clone().month())) ? () => showDate(day.year(), day.month(), day.date()): ()=> ""}>
                                <div>  {day.clone().format("D").toString()}</div>{isDayAfterStart(day.format("YYYY-MM-DD").toString(), tasks) && isDayBeforeEnd(day.format("YYYY-MM-DD").toString(), tasks)? <span>{"\u2B24"}</span> : ''}
                            </div>)
                        }
                        </div>)}
                </div>
            </div>
          <Tasks tasks={tasks} setTasks={setTasks} startDate={startDate} onDelete={deleteTask} onToggle={toggleReminder}/> 
        </div>
    )
}
export default Calendar
