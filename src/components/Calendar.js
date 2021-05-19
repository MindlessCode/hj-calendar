import React, { useState, useEffect } from 'react'
import moment from 'moment'
import buildCalendar from "./buildCal";
import Tasks from './Tasks.js';
import ExpBar from './ExpBar.js';
import Sunny from './Sunny.js';

import './Calendar.css'
import FooterNav from './FooterNav';

const Calendar = ({ value, onXChange }) => {
    // Tasks Set-up
    const [tasks, setTasks] = useState([])
    useEffect(() => {
        const getTasks = async () => {
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
    const deleteTask = async (id) => {
        await fetch(`http://localhost:5000/tasks/${id}`, {
            method: 'DELETE',
        })

        setTasks(tasks.filter((task) => task.id !== id))
    }
    const toggleReminder = async (id) => {
        const taskToToggle = await fetchTask(id)
        const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }
        const res = await fetch(`http://localhost:5000/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(updTask)
        })
        const data = await res.json()
        setTasks(tasks.map((task) => task.id === id ? { ...task, reminder: data.reminder } : task))
    }
    // Calendar Set-up
    const [selectedDate, setSelectedDate] = useState(moment().format("YYYY-MM-DD"))
    const [calendar, setCalendar] = useState([])
    const [miniCalendar, setMiniCalendar] = useState([])
    const [val, setVal] = useState(moment())
    const mon = [];
    const firstMonth = value.clone().startOf("year").month();
    const lastMonth = value.clone().endOf("year").month();
    useEffect(() => {
        setCalendar(buildCalendar(value));
    }, [value])
    useEffect(() => {
        setMiniCalendar(buildCalendar(val));
    }, [val])
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
    // mini Calendar
    function currSMonthName() {
        return val.format("MMM");
    }
    function currSYear() {
        return val.format("YYYY");
    }
    function nextSMonth() {
        return val.clone().add(1, "month")
    }
    function prevSMonth() {
        return val.clone().subtract(1, "month")
    }
    function nextSYear() {
        return val.clone().add(1, "year")
    }
    function prevSYear() {
        return val.clone().subtract(1, "year")
    }
    function setDate(year, month, date) {
        return moment([year, month, date]).clone()
    }
    // Others
    const showDate = (year, month, date) => {
        setSelectedDate(moment([year, month, date]).clone().format("YYYY-MM-DD"));
    }
    function isDayAfterStart(nameKey, myArray) {
        for (var i = 0; i < myArray.length; i++) {
            if (myArray[i].sDate <= nameKey && myArray[i].eDate >= nameKey) {
                return true;
            }
        }
    }
    function getTaskName(nameKey, myArray) {
        for (var i = 0; i < myArray.length; i++) {
            if (myArray[i].sDate <= nameKey && myArray[i].eDate >= nameKey)
                return <ul className="task-list"><li>{myArray[i].text}</li></ul>
        }
    }
    function countTasks(nameKey, myArray) {
        let taskCount = -1;
        for (var i = 0; i < myArray.length; i++) {
            if (myArray[i].sDate <= nameKey && myArray[i].eDate >= nameKey)
                taskCount++;
        }
        if (taskCount < 1)
            return "";
        else
            return "+ " + taskCount + " more";
    }

    const svgVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { duration: 1 }
        }
    }
    return (
        <div className="wrapper">
            <div className="side-pan">
                <div className="date-select">
                    <div className="custom-element-bg s-current-month">
                        <h1>{currSMonthName()} {currSYear()} </h1>
                        <i className="fa fa-angle-double-left" aria-hidden="true" onClick={() => setVal(prevSYear())}></i>
                        <i className="fas fa-angle-left s-prev" onClick={() => setVal(prevSMonth())}></i>
                        <i className="fas fa-angle-right s-next" onClick={() => setVal(nextSMonth())}></i>
                        <i className="fa fa-angle-double-right" aria-hidden="true" onClick={() => setVal(nextSYear())}></i>
                    </div>
                    <div className="s-weekdays custom-element-bg">
                        <div>S</div>
                        <div>M</div>
                        <div>T</div>
                        <div>W</div>
                        <div>T</div>
                        <div>F</div>
                        <div>S</div>
                    </div>
                    {miniCalendar.map(week2 => <div key={week2} className="s-weeks">{
                        week2.map(day2 =>
                            <div key={day2} className={selectedDate === day2.clone().format("YYYY-MM-DD") ?
                                (((day2.year() === moment().format("YYYY")) && (day2.date() === moment().date()) && (day2.clone().month() === moment().month()))) ?
                                    "s-dates s-today s-selected-date" : 's-dates s-selected-date' : (day2.year() === moment().year() && day2.date() === moment().date()) && (day2.clone().month() === moment().month()) ?
                                    "s-dates s-today" : "s-dates"} onClick={() => { onXChange(setDate(day2.year(), day2.month(), day2.date())); showDate(day2.year(), day2.month(), day2.date()) }}>
                                <div >{day2.clone().format("D").toString()} </div>
                            </div>)
                    }
                    </div>)}
                </div>

                <Tasks tasks={tasks} setTasks={setTasks} selectedDate={selectedDate} onDelete={deleteTask} onToggle={toggleReminder} /> 
            </div>
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
                                    "fill-days" : selectedDate === day.clone().format("YYYY-MM-DD") ? 'dates selected-date' : (day.year() === moment().year() && day.date() === moment().date()) && (day.clone().month() === moment().month()) ?
                                            "dates today custom-element-bg" : "dates"}
                                onClick={(() => (((day.clone().month() === value.clone().month())) ? (showDate(day.year(), day.month(), day.date())) : ""))}>
                                <div >
                                    {day.clone().format("D").toString()}
                                    &nbsp;&nbsp;
                                    <Sunny variants={svgVariants} visibility={isDayAfterStart(day.format("YYYY-MM-DD").toString(), tasks) ? 'true' : 'hidden'} height={'14px'} />
                                </div>
                                {getTaskName(day.format("YYYY-MM-DD").toString(), tasks)}{countTasks(day.format("YYYY-MM-DD").toString(), tasks)}
                            </div>)
                    }
                    </div>)}
                </div>
            </div>
            <FooterNav onSwitch={setVal} onXChange={onXChange} select={selectedDate} onSelect={setSelectedDate}/>
            <ExpBar />
        </div>
    )
}
export default Calendar
