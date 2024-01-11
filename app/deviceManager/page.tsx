"use client";
import React, { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useAppContext } from "@/context/AppContext";
import PageHeading from "@/components/PageHeading";
import { IconButton, Menu, MenuItem } from "@mui/material";
import AddSingleDeviceDialog from "@/components/Dialogs/AddDeviceDialog/AddSingleDevice";
import AddMultipleDeviceDialog from "@/components/Dialogs/AddDeviceDialog/AddMultipleDeviceDialog";
import AllDeviceTable from "@/components/Tables/AllDeviceTable";
import { ToastContainer } from "react-toastify";

const DeviceManager = () => {
  const { sidebarOpen, themeSwitch } = useAppContext();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isAddSingleDialogOpen, setIsAddSingleDialogOpen] = useState(false);
  const [isAddMultipleDialogOpen, setIsAddMultipleDialogOpen] = useState(false);
  const open = Boolean(anchorEl);
  const ITEM_HEIGHT = 48;

  const handleAddMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleAddMenuClose = () => {
    setAnchorEl(null);
  };

  const handleAddSingleOpenDialog = () => {
    setIsAddSingleDialogOpen(true);
  };

  const handleAddSingleCloseDialog = () => {
    setIsAddSingleDialogOpen(false);
    handleAddMenuClose();
  };

  const handleAddMultipleOpenDialog = () => {
    setIsAddMultipleDialogOpen(true);
  };

  const handleAddMultipleCloseDialog = () => {
    setIsAddMultipleDialogOpen(false);
    handleAddMenuClose();
  };

  return (
    <div className={` ${sidebarOpen ? "ml-72" : "ml-20"}`}>
      <ToastContainer />
      <PageHeading heading="Device Manager" />
      <div className="flex justify-end">
        <div className="border rounded-lg m-2">
          <IconButton
            size="small"
            aria-label="more"
            id="long-button"
            aria-controls={open ? "long-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleAddMenuClick}
          >
            <AddIcon fontSize="medium" />
          </IconButton>
          <Menu
            id="long-menu"
            MenuListProps={{
              "aria-labelledby": "long-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleAddMenuClose}
            PaperProps={{
              style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                width: "16ch",
                backgroundColor: themeSwitch ? "#24303F" : "",
                color: themeSwitch ? "#DEE4EE" : "",
              },
            }}
          >
            <MenuItem onClick={handleAddSingleOpenDialog}>
              Add Single Device
            </MenuItem>
            <AddSingleDeviceDialog
              themeSwitch={themeSwitch}
              open={isAddSingleDialogOpen}
              handleClose={handleAddSingleCloseDialog}
            />
            <MenuItem onClick={handleAddMultipleOpenDialog}>
              Add Multiple Device
            </MenuItem>
            <AddMultipleDeviceDialog
              themeSwitch={themeSwitch}
              open={isAddMultipleDialogOpen}
              handleClose={handleAddMultipleCloseDialog}
            />
          </Menu>
        </div>
      </div>
      <AllDeviceTable />
    </div>
  );
};

export default DeviceManager;
