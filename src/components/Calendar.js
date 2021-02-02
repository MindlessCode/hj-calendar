import React, { useState, useEffect } from 'react'
import moment from 'moment'
import buildCalendar from "./buildCal";
import Tasks from './Tasks.js';
import './Calendar.css'

const Calendar = ({ value, onChange }) => {
    const [tasks, setTasks] = useState([
        {
            id: 1,
            text: 'Doctors Appointment',
            priority: 5,
            exp: 10,
            sDate: 'test',
            reminder: true,
        },
        {
            id: 2,
            text: 'Homework',
            priority: 4,
            exp: 8,
            sDate: 'test',
            reminder: true,
        },
        {
            id: 3,
            text: 'Cook',
            priority: 3,
            exp: 6,
            sDate: 'test',
            reminder: true,
        }
    ])
    const [startDate, setStartDate] = useState( [
        {   id: 1,
            sDate: '',
            eDate: '',
        },
        {   id: 2,
            sDate: '',
            eDate: '',
        },
        {   id: 3,
            sDate: '',
            eDate: '',
        }

    ])
    const [calendar, setCalendar] = useState([]);

    useEffect(() => {
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
        const currDate = [startDate];
        var day = moment([year, month, selectedDate]).format("YYYY-MM-DD")
        currDate.sDate = day.toString()

        tasks.map((task)=> task.sDate = currDate.sDate)


        setStartDate(currDate);
    }
    const deleteTask = (id) => {
        setTasks(tasks.filter((task) => task.id !== id))
    }

    const toggleReminder = (id) => {
        setTasks(tasks.map((task)=> task.id === id ? {...task, reminder: !task.reminder} : task) )
    }
    return (
        
        <div className="wrapper">
            <div className="calendar">
                <div className="month-select">
                    {getMonthName().map(mons =>
                        <div key={mons} className={value.isSame(value.clone().month(mons), "month") ? "selected-month" : "unselected-months"} onClick={() => onChange(setMonthName(mons))}>
                            {moment().month(mons).format("MMM")}
                        </div>)}
                </div>
                <div className="month">
                    <div className="custom-element-bg current-month">
                        <i className="fas fa-angle-left prev" onClick={() => onChange(prevMonth())}></i>
                            <h1>{currMonthName()} {currYear()} </h1>
                        <i className="fas fa-angle-right next" onClick={() => onChange(nextMonth())}></i>
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
                        {calendar.map(week => <div key={week.toString()} className="weeks">{
                            week.map(day => <div key={day} className={(!(day.clone().month() === value.clone().month())) ? "fill-days " : (((day.year()=== moment().year())&&(day.date()=== moment().date()) && (value.clone().month() === moment().month()))) ? "dates today custom-element-bg" : "dates"} onClick={() => showDate(day.year(), day.month(), day.date())}>
                                <div> {day.clone().format("D").toString()} </div>
                            </div>)
                        }
                        </div>)}
                </div>
            </div>
          <Tasks tasks={tasks} startDate={startDate} onDelete={deleteTask} onToggle={toggleReminder}/> 
        </div>
    )
}
export default Calendar
