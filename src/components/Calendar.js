import React, { useState, useEffect } from 'react'
import moment from 'moment'
import buildCalendar from "./buildCal";
import Tasks from './Tasks.js';
import ExpBar from './ExpBar.js';
import Sunny from './Sunny.js';
import './Calendar.css'

const Calendar = ({ value, onXChange }) => {
    // Tasks Set-up
    const [tasks, setTasks] = useState([])
    const [exp, setExp] = useState(10)
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
    const [startDate, setStartDate] = useState(moment().format("YYYY-MM-DD"))
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
    // Calendar Set-up
    const [calendar, setCalendar] = useState([])
    const mon = [];
    const firstMonth = value.clone().startOf("year").month();
    const lastMonth = value.clone().endOf("year").month();
    useEffect(() => {
        setStartDate(moment().format("YYYY-MM-DD"))
        setCalendar(buildCalendar(value));
    }, [value])
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
    const testExp=()=> {
        setExp(moment().clone().date())
    }
    function prevMonth() {
        return value.clone().subtract(1, "month")
    }
    function setMonthName(arg) {
        return value.clone().month(arg)
    }
    const showDate = (year, month, date) => {
        setStartDate(moment([year, month, date]).format("YYYY-MM-DD").toString());
    }
    function isDayAfterStart(nameKey, myArray) {
        for (var i = 0; i < myArray.length; i++) {
            if(myArray[i].sDate <= nameKey && myArray[i].eDate >= nameKey)
                return true;
        }
    }
    function getTaskIndex(nameKey, myArray) {
        for (var i = 0; i < myArray.length; i++) {
            if(myArray[i].sDate <= nameKey && myArray[i].eDate >= nameKey)
                return <ul className="task-list"><li>{myArray[i].text}</li></ul>
        }
    }
    function countTaskIndex(nameKey, myArray) {
        let taskCount =-1;
        for (var i = 0; i < myArray.length; i++) {
            if(myArray[i].sDate <= nameKey && myArray[i].eDate >= nameKey)
                taskCount++;
        }
        if (taskCount < 1)
            return "";
        else
            return "+ " + taskCount + " more";
    }
    const svgVariants = {
        hidden: {opacity: 0},
        visible:  {
            opacity: 1,
            transition: { duration: 1}
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
                        <div onClick={()=>testExp()}>SUN</div>
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
                                    "fill-days" : startDate === day.clone().format("YYYY-MM-DD") ? 
                                    (((day.year() === moment().format("YYYY"))&&(day.date()=== moment().date()) && (day.clone().month() === moment().month()))) ? 
                                    "dates today custom-element-bg selected-date " : 'dates selected-date' : (day.year() === moment().year() && day.date()=== moment().date()) && (day.clone().month() === moment().month()) ?
                                    "dates today custom-element-bg" : "dates" } 
                                    onClick={(() => ((day.clone().month() === value.clone().month())) ? showDate(day.year(), day.month(), day.date()): "")}>
                                <div>{day.clone().format("D").toString()} <Sunny variants ={svgVariants} visibility={isDayAfterStart(day.format("YYYY-MM-DD").toString(), tasks)? 'true' : 'hidden'} height={'14px'} /></div>{getTaskIndex(day.format("YYYY-MM-DD").toString(), tasks)}{countTaskIndex(day.format("YYYY-MM-DD").toString(), tasks)}
                            </div>)
                        }
                        </div>)}
                </div>
            </div>
          <Tasks tasks={tasks} setTasks={setTasks} startDate={startDate} onDelete={deleteTask} onToggle={toggleReminder}/> 
          <ExpBar exp1={exp}/>
        </div>
        
    )
}
export default Calendar
