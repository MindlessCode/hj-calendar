import React, { useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { Box, Card, CardContent, Paper } from "@mui/material";

import moment from "moment";
import buildCalendar from "./buildCal";
import "./Calendar.css";
import theme from "../theme";

import Tasks from "./Tasks.js";
const Calendar = () => {
  // Tasks Set-up
  const [miniCalendar, setMiniCalendar] = useState([]);
  const [val, setVal] = useState(moment());
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    console.log(tasks);

    let resArr = [];
    //fetch tasks
    const fetchTasks = async () => {
      try {
        let res = await fetch("http://localhost:5000/project");
        let json = await res.json();
        resArr = json.projects;
        setTasks(resArr);
      } catch (error) {
        console.log(`Problem loading projects - ${error.message}`);
      }
    };
    fetchTasks();
  }, []);

  // Calendar Set-up
  const [selectedDate, setSelectedDate] = useState(
    moment().format("YYYY-MM-DD")
  );

  // mini Calendar
  function currSMonthName() {
    return val.format("MMM");
  }
  function currSYear() {
    return val.format("YYYY");
  }
  function nextSMonth() {
    return val.clone().add(1, "month");
  }
  function prevSMonth() {
    return val.clone().subtract(1, "month");
  }
  function nextSYear() {
    return val.clone().add(1, "year");
  }
  function prevSYear() {
    return val.clone().subtract(1, "year");
  }
  // Others
  const showDate = (year, month, date) => {
    setSelectedDate(moment([year, month, date]).clone().format("YYYY-MM-DD"));
  };
  useEffect(() => {
    setMiniCalendar(buildCalendar(val));
  }, [val]);

  return (
    <ThemeProvider theme={theme}>
      <div className="side-pan">
        <Card style={{ display: "flex" }}>
          <Paper sx={{ bgcolor: theme.palette.secondary.dark }} elevation={3}>
            <Box p={2}>
              <div className=" s-current-month">
                <h1>
                  {currSMonthName()} {currSYear()}{" "}
                </h1>
                <i
                  className="fa fa-angle-double-left"
                  aria-hidden="true"
                  onClick={() => setVal(prevSYear())}
                ></i>
                <i
                  className="fas fa-angle-left s-prev"
                  onClick={() => setVal(prevSMonth())}
                ></i>
                <i
                  className="fas fa-angle-right s-next"
                  onClick={() => setVal(nextSMonth())}
                ></i>
                <i
                  className="fa fa-angle-double-right"
                  aria-hidden="true"
                  onClick={() => setVal(nextSYear())}
                ></i>
              </div>
              <div className="s-weekdays ">
                <div>S</div>
                <div>M</div>
                <div>T</div>
                <div>W</div>
                <div>T</div>
                <div>F</div>
                <div>S</div>
              </div>
              {miniCalendar.map((week2) => (
                <div key={week2} className="s-weeks">
                  {week2.map((day2) => (
                    <div
                      key={day2}
                      className={
                        selectedDate === day2.clone().format("YYYY-MM-DD")
                          ? day2.year() === moment().format("YYYY") &&
                            day2.date() === moment().date() &&
                            day2.clone().month() === moment().month()
                            ? "s-dates s-today s-selected-date"
                            : "s-dates s-selected-date"
                          : day2.year() === moment().year() &&
                            day2.date() === moment().date() &&
                            day2.clone().month() === moment().month()
                          ? "s-dates s-today"
                          : "s-dates"
                      }
                      onClick={() => {
                        showDate(day2.year(), day2.month(), day2.date());
                      }}
                    >
                      <div>{day2.clone().format("D").toString()} </div>
                    </div>
                  ))}
                </div>
              ))}
            </Box>
          </Paper>
          <CardContent>
            <Tasks tasks={tasks} setTasks={setTasks} />
          </CardContent>
        </Card>
      </div>
    </ThemeProvider>
  );
};
export default Calendar;
