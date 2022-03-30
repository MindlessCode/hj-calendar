import { useState, useEffect } from "react";
import Task from "./Task";
import NewTask from "./NewTask.js";
import "./Task.scss";
import { ThemeProvider } from "@mui/material/styles";
import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MinusIcon from "@mui/icons-material/Remove";
import theme from "../theme";

const Tasks = ({ tasks, setTasks, selectedDate, onDelete, onToggle }) => {
  const [showAddTask, setShowAddTask] = useState(false);
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    console.log(tasks);

    let resArr = [];
    //fetch tasks
    const fetchTasks = async () => {
      try {
        let res = await fetch("http://localhost:5000/project");
        let json = await res.json();
        resArr = json.projects;
        console.log(json);
      } catch (error) {
        console.log(`Problem loading projects - ${error.message}`);
      }
    };
    fetchTasks();
  }, []);
  //add new task
  const newTask = async (project) => {
    try {
      let response = await fetch("http://localhost:5000/project", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
          name: project.name,
          description: project.description,
          startDate:
            project.startYear +
            "-" +
            project.startMonth +
            "-" +
            project.startDay,
          storyPointHours: project.storyPointHours,
          stories: project.stories,
        }),
      });
      let json = await response.json();
      console.log(tasks);
    } catch (error) {}
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="project-container">
        <div className="add-task" style={{ display: "flex" }}>
          <Box mt={10} ml={1}>
            <Button
              className="btn-add-task"
              variant="outlined"
              onClick={() => setShowAddTask(!showAddTask)}
            >
              {showAddTask ? <MinusIcon size={50} /> : <AddIcon size={50} />}
            </Button>
          </Box>
          <div className="new-task">
            {showAddTask && (
              <NewTask
                tasks={tasks}
                selectedDate={selectedDate}
                onAdd={newTask}
                show={showAddTask}
              />
            )}
          </div>
        </div>
        <div className="tasks-box">
          {tasks.map((task) => (
            <Task
              key={task._id}
              taskL={task}
              selectedDate={selectedDate}
              onDelete={onDelete}
              onToggle={onToggle}
            />
          ))}
        </div>
      </div>
    </ThemeProvider>
  );
};
export default Tasks;
