// AddDeviceDialog.js
import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Box from "@mui/material/Box";
const AddMultipleDeviceDialog = ({ open, handleClose }: any) => {
  // Add your dialog content and functionality here
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add Multiple Device</DialogTitle>
      <DialogContent>
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="CIDR" value="1" />
                <Tab label="IP Range" value="2" />
                <Tab label="CSV" value="3" />
              </TabList>
            </Box>
            <TabPanel value="1">CIDR</TabPanel>
            <TabPanel value="2">IP Range</TabPanel>
            <TabPanel value="3">CSV</TabPanel>
          </TabContext>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose}>Add</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddMultipleDeviceDialog;
