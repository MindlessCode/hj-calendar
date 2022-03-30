import React, { useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { Box, Menu, MenuItem, TextField, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import PropTypes from "prop-types";
import Select from "@mui/material/Select";
import { DataGrid, useGridApiContext } from "@mui/x-data-grid";
import theme from "../theme";
const Story = ({ story, stories, onChange }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleClick = () => {
    setIsEditing(true);
  };
  const handleClickO = () => {
    setIsEditing(true);
  };

  useEffect(() => {
    console.log(stories);
  }, []);
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      setIsEditing(false);
    } else if (e.key === "!") {
      setAnchorEl(e.currentTarget);
    }
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClose = (e) => {
    const value = e.target.getAttribute("value");
    story.priority = value;
    setAnchorEl(null);
  };

  function SelectEditInputCell(props) {
    const { id, value, field } = props;
    const apiRef = useGridApiContext();

    const handleChange = async (event) => {
      await apiRef.current.setEditCellValue({
        id,
        field,
        value: event.target.value,
      });
      apiRef.current.stopCellEditMode({ id, field });
    };

    return (
      <Select
        value={value}
        onChange={handleChange}
        size="small"
        sx={{ height: 1 }}
        native
        autoFocus
      >
        <option>Back-end Developer</option>
        <option>Front-end Developer</option>
        <option>UX Designer</option>
      </Select>
    );
  }

  SelectEditInputCell.propTypes = {
    /**
     * The column field of the cell that triggered the event.
     */
    field: PropTypes.string.isRequired,
    /**
     * The grid row id.
     */
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    /**
     * The cell value, but if the column has valueGetter, use getValue.
     */
    value: PropTypes.any.isRequired,
  };

  function renderSelectEditInputCell(params) {
    return <SelectEditInputCell {...params} />;
  }
  const columns = [
    { field: "portion", headerName: "Portion", width: 180, editable: true },

    {
      field: "priority",
      headerName: "Priority",
      renderEditCell: renderSelectEditInputCell,
      editable: true,
      width: 180,
    },
    {
      field: "storyPoints",
      headerName: "Story Points",
      type: "number",
      editable: true,
    },
  ];
  return (
    <ThemeProvider theme={theme}>
      <Box>
        {isEditing ? (
          <Box>
            <div style={{ height: 300, width: "100%" }}>
              <DataGrid
                rows={stories}
                columns={columns}
                experimentalFeatures={{ newEditingApi: true }}
              />
            </div>
            <IconButton onClick={handleClick} aria-label="search">
              <EditIcon style={{ color: "salmon" }} />
            </IconButton>
          </Box>
        ) : (
          <Box>
            <TextField
              color="secondary"
              disabled
              variant="standard"
              value={story.portion}
            ></TextField>
            <IconButton onClick={handleClick} aria-label="search">
              <EditIcon style={{ color: "salmon" }} />
            </IconButton>
          </Box>
        )}
      </Box>
    </ThemeProvider>
  );
};
export default Story;
