import { ThemeProvider } from "@mui/material/styles";
import { Box, Paper } from "@mui/material";

import theme from "../theme";
const Task = ({ taskL }) => {
  return (
    <ThemeProvider theme={theme}>
      <Paper
        className="task"
        elevation={3}
        style={{
          backgroundColor: theme.palette.secondary.dark,
          color: theme.palette.secondary.light,
        }}
      >
        <Box>
          <div className="task-title">{taskL.name}</div>
          <div>Starts: {taskL.startDate}</div>
        </Box>
      </Paper>
    </ThemeProvider>
  );
};
export default Task;
