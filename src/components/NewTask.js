import React, { useState, useReducer } from "react";
import moment from "moment";
import { ThemeProvider } from "@mui/material/styles";
import {
  TextField,
  MenuItem,
  Box,
  IconButton,
  InputAdornment,
  Card,
  CardActions,
  CardContent,
} from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import NewStory from "./NewStory.js";
import "./Task.scss";
import theme from "../theme";

const NewTask = ({ onAdd }) => {
  const initialState = {
    name: "",
    description: "",
    startYear: moment().clone().year(),
    startMonth: moment().format("MM"),
    startDay: moment().format("DD"),
    storyPointHours: 0,
    stories: [],
  };
  const reducer = (state, newState) => ({ ...state, ...newState });
  const [state, setState] = useReducer(reducer, initialState);
  const columns = [
    {
      field: "portion",
      headerName: "Portion",
      width: 180,
      preProcessEditCellProps: (params) => {
        const index = state.stories.findIndex((s) => s.id === params.id);
        setState({
          stories: [
            ...state.stories.slice(0, index),
            {
              ...state.stories[index],
              portion: params.props.value,
            },
            ...state.stories.slice(index + 1),
          ],
        });
        const hasError = !params.props.value;
        return { ...params.props, error: hasError };
      },
      editable: true,
      sortable: false,
    },

    {
      field: "priority",
      headerName: "Priority",
      type: "singleSelect",
      valueOptions: ["High", "Medium", "Low"],
      editable: true,
      width: 180,
      preProcessEditCellProps: (params) => {
        const index = state.stories.findIndex((s) => s.id === params.id);
        setState({
          stories: [
            ...state.stories.slice(0, index),
            {
              ...state.stories[index],
              priority: params.props.value,
            },
            ...state.stories.slice(index + 1),
          ],
        });
        const hasError = !params.props.value;
        return { ...params.props, error: hasError };
      },
      sortable: false,
    },
    {
      field: "storyPoints",
      headerName: "Story Points",
      type: "number",
      preProcessEditCellProps: (params) => {
        const index = state.stories.findIndex((s) => s.id === params.id);
        setState({
          stories: [
            ...state.stories.slice(0, index),
            {
              ...state.stories[index],
              storyPoints: params.props.value,
            },
            ...state.stories.slice(index + 1),
          ],
        });
        const hasError = !params.props.value;
        return { ...params.props, error: hasError };
      },
      editable: true,
      sortable: false,
    },
  ];

  //year drop down
  var startYear = moment().clone().year();
  const endYear = moment().clone().year() + 10;
  const SelectYears = [];
  const SelectEYears = [];
  while (startYear <= endYear) {
    SelectYears.push(startYear);
    SelectEYears.push(startYear);
    startYear++;
  }
  //month drop down
  const startMonth = moment().clone().startOf("year");
  const endMonth = moment().clone().endOf("year");
  const mon = startMonth.subtract(1, "month");
  const months = [];
  while (startMonth.isBefore(endMonth, "month")) {
    months.push(mon.add(1, "month").clone());
  }

  //day drop down
  const startEDay = moment(state.startYear + "-" + state.startMonth, "YYYY-MM")
    .clone()
    .startOf("month");
  const lastEDay = moment(state.startYear + "-" + state.startMonth, "YYYY-MM")
    .clone()
    .endOf("month");
  const test = startEDay.subtract(1, "day");
  const dates = [];
  while (startEDay.isBefore(lastEDay, "day")) {
    dates.push(test.add(1, "day").clone());
  }
  const [addStory, setAddStory] = useState(false);
  const handleStories = (s) => {
    setState({ stories: [...state.stories, s] });
  };

  const onAddStory = () => {
    onAdd({
      name: state.name,
      description: state.description,
      startDate:
        state.startYear + "-" + state.startMonth + "-" + state.startDay,
      storyPointHours: state.storyPointHours,
      stories: state.stories,
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Card>
        <CardContent
          component="form"
          style={{
            backgroundColor: theme.palette.secondary.dark,
          }}
        >
          <CardContent
            style={{
              display: "flex",
            }}
            sx={{
              "& .MuiTextField-root": { mt: 1.5, mr: 1 },
            }}
          >
            <Box sx={{ display: "block" }}>
              <TextField
                label="Project Name"
                defaultValue={""}
                onChange={(e) => setState({ name: e.target.value })}
              />
              <div id="task-error" style={{ color: "red" }}></div>

              <TextField
                select
                label="Month"
                value={state.startMonth}
                onChange={(e) => setState({ startMonth: e.target.value })}
              >
                <MenuItem disabled={true} value="">
                  MONTH
                </MenuItem>
                {months.map((month) => (
                  <MenuItem key={month} value={month.format("MM")}>
                    {month.clone().format("MM")}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                select
                label="Day"
                value={state.startDay}
                onChange={(e) => setState({ startDay: e.target.value })}
              >
                <MenuItem value="" disabled={true}>
                  DAY
                </MenuItem>
                {dates.map((day) => (
                  <MenuItem key={day} value={day.format("DD")}>
                    {day.format("DD")}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="Year"
                select
                value={state.startYear}
                onChange={(e) => setState({ startYear: e.target.value })}
              >
                <MenuItem value="" disabled={true}>
                  YEAR
                </MenuItem>
                {SelectYears.map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
            <Box sx={{ display: "block" }}>
              <TextField
                multiline
                rows={4}
                label="Description"
                defaultValue={""}
                onChange={(e) => setState({ description: e.target.value })}
              />
            </Box>
            <Box sx={{ display: "block" }}>
              <TextField
                type="number"
                label="Hours / Story Point"
                defaultValue="0"
                sx={{ width: "25ch" }}
                size="small"
                onChange={(e) => setState({ storyPointHours: e.target.value })}
                InputProps={{
                  inputProps: { min: 0 },
                  endAdornment: (
                    <InputAdornment position="end">Hr</InputAdornment>
                  ),
                }}
                variant="outlined"
              />
            </Box>
          </CardContent>
          <CardContent>
            <Box>
              <CardActions>
                <IconButton
                  color="primary"
                  disableRipple
                  onClick={(el) => setAddStory(!addStory)}
                >
                  <AddIcon
                    className={addStory ? "add-button-rotated" : "add-button"}
                  />
                </IconButton>
              </CardActions>
              {addStory && (
                <NewStory
                  stories={state.stories}
                  newStory={handleStories}
                ></NewStory>
              )}
            </Box>
            {state.stories.length !== 0 ? (
              <Box>
                <div style={{ height: 300, width: "100%" }}>
                  <DataGrid
                    hideFooter={true}
                    disableColumnMenu={true}
                    rows={state.stories}
                    columns={columns}
                    experimentalFeatures={{ newEditingApi: true }}
                  />
                </div>
              </Box>
            ) : (
              ""
            )}
          </CardContent>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <IconButton color="primary" disableRipple onClick={onAddStory}>
              CREATE PROJECT
            </IconButton>
          </Box>
        </CardContent>
      </Card>
    </ThemeProvider>
  );
};
export default NewTask;
