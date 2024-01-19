// AddDeviceDialog.js
import React from "react";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import { useAppContext } from "@/context/AppContext";
import AddDeviceCIRD from "./MultipleDeviceForms/AddDeviceCIDR";
import AddDeviceIPRange from "./MultipleDeviceForms/AddDeviceIPRange";
import AddDeviceCSV from "./MultipleDeviceForms/AddDeviceCSV";
const AddMultipleDeviceDialog = ({ open, handleClose }: any) => {
  const { themeSwitch } = useAppContext();
  const [value, setValue] = React.useState("1");
  const [maxWidth, setMaxWidth] = React.useState<DialogProps["maxWidth"]>("md");

  // Add your dialog content and functionality here
  const dialogBackgroundColor = themeSwitch ? "#24303F" : "";
  const dialogTextColor = themeSwitch ? "white" : "";

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth={true}
      maxWidth={maxWidth}
    >
      <DialogTitle
        className="dark:bg-bodydark dark:text-white border-b"
        sx={{ padding: "0px 10px" }}
      >
        <div className="m-2 flex justify-between">
          <p>Add Multiple Device</p>
          <CloseIcon className="cursor-pointer" onClick={handleClose} />
        </div>
      </DialogTitle>
      <DialogContent
        style={{
          paddingTop: "0",
          height: "100%",
          backgroundColor: dialogBackgroundColor,
          color: dialogTextColor,
        }}
      >
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab
                  style={{ color: dialogTextColor }}
                  label="CIDR"
                  value="1"
                />
                <Tab
                  style={{ color: dialogTextColor }}
                  label="IP Range"
                  value="2"
                />
                <Tab style={{ color: dialogTextColor }} label="CSV" value="3" />
              </TabList>
            </Box>
            <TabPanel value="1" sx={{ padding: "0" }}>
              <AddDeviceCIRD handleClose={handleClose} />
            </TabPanel>
            <TabPanel value="2" sx={{ padding: "0" }}>
              <AddDeviceIPRange handleClose={handleClose} />
            </TabPanel>
            <TabPanel value="3" sx={{ padding: "0" }}>
              <AddDeviceCSV handleClose={handleClose} />
            </TabPanel>
          </TabContext>
        </Box>
      </DialogContent>
      {/* <DialogActions
        style={{
          backgroundColor: dialogBackgroundColor,
          color: dialogTextColor,
        }}
      >
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose}>Add</Button>
      </DialogActions> */}
    </Dialog>
  );
};

export default AddMultipleDeviceDialog;
