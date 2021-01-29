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
        },
        {
            id: 2,
            text: 'Homework',
            priority: 4,
            exp: 8,
            sDate: 'test',
        },
        {
            id: 3,
            text: 'Cook',
            priority: 3,
            exp: 6,
            sDate: 'test',
        }
    ])

    const [startDate, setStartDate] = useState(
        { sDate: '' }
    )
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
        return value.clone().add(1, "months")
    }
    function prevMonth() {
        return value.clone().subtract(1, "months")
    }
    function setMonthName(arg) {
        return value.clone().month(arg)
    }
    const deleteTask = (id) => {
        setTasks(tasks.filter((task) => task.id !== id))
    }
    const showDate = (year, month, selectedDate) => {
        const currDate = [startDate];
        var day = moment([year, month, selectedDate]).month(month).format("YYYY-MM-DD")
        currDate.sDate = day.toString()
        setStartDate(currDate);
    }
    return (
        <div className="wrapper">
            <div className="conta">
                <div className="Cal">
                    <div className="monthSelect">
                        {getMonthName().map(mons =>
                            <div key={mons.toString()} className={value.isSame(value.clone().month(mons), "month") ? "selectedMonth" : ""} onClick={() => onChange(setMonthName(mons))}>
                                {moment().month(mons).format("MMM")}
                            </div>)}
                    </div>
                </div>
                <div className="Cal2">
                    <div className="Months">
                        <i className="fas fa-angle-left prev" onClick={() => onChange(prevMonth())}></i>
                        <h1>{currMonthName()} {currYear()} </h1>
                        <i className="fas fa-angle-right next" onClick={() => onChange(nextMonth())}></i>
                    </div>
                    <div className="Weeks">
                        <div>SUN</div>
                        <div>MON</div>
                        <div>TUE</div>
                        <div>WED</div>
                        <div>THU</div>
                        <div>FRI</div>
                        <div>SAT</div>
                    </div>
                    <div className="DaysContainer">
                        {calendar.map(week => <div key={week.toString()} className="Days">{
                            week.map(day => <div key={day.toString()} className={(!(day.month() === value.month())) ? "prevDays" : "dy"} onClick={() => showDate(day.year(), day.month(), day.date())}>
                                <div className={(value.isSame(day, "day") && value.isSame(moment().getMonth, "month")) ? "selected" : ""}  > {day.format("D").toString()} </div>
                            </div>)
                        }
                        </div>)}
                    </div>
                </div>
            </div>

            <Tasks tasks={tasks} startDate={startDate} onDelete={deleteTask} />
        </div>
    )
}
export default Calendar
