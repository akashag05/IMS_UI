import {
  TableCell,
  IconButton,
  Menu,
  MenuItem,
  Button,
  DialogContent,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import { toast } from "react-toastify";
import React, { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CloseIcon from "@mui/icons-material/Close";
import { useAppContext } from "@/context/AppContext";
import CustomeButton from "../Buttons";
import EditDeviceDialog from "../Dialogs/AddDeviceDialog/EditDeviceDialog";
import { deleteCredsProfile } from "@/app/api/CredentialProfileAPI";
const CredentialProfileMenu = (props: any) => {
  const { themeSwitch, togglegetTableApiState } = useAppContext();
  const { rowData } = props;
  const id = rowData._id;
  const [maxWidth, setMaxWidth] = React.useState<DialogProps["maxWidth"]>("sm");
  const [openDialog, setOpenDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const dialogBackgroundColor = themeSwitch ? "#24303F" : "";
  const dialogTextColor = themeSwitch ? "white" : "";

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
    handleClose();
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleOpenEditDialog = () => {
    setOpenEditDialog(true);
    handleClose();
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };

  const handleConfirmDelete = async () => {
    try {
      let response = await deleteCredsProfile([id]);
      if (response.status == "success") {
        togglegetTableApiState();
        handleCloseDialog();
        toast.success(response.message, {
          position: "bottom-right",
          autoClose: 1000,
        });
      } else {
        toast.error(response.message, {
          position: "bottom-right",
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <IconButton
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon
          fontSize="small"
          sx={{ color: themeSwitch ? "#DEE4EE" : "" }}
        />
      </IconButton>
      <Menu
        PaperProps={{
          style: {
            width: "16ch",
            backgroundColor: themeSwitch ? "#24303F" : "",
            color: themeSwitch ? "#DEE4EE" : "",
          },
        }}
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleOpenEditDialog}>Edit</MenuItem>
        {/* Edit Device Dialog */}
        <EditDeviceDialog
          open={openEditDialog}
          handleClose={handleCloseEditDialog}
          id={id}
        />
        <MenuItem onClick={handleOpenDialog}>Delete</MenuItem>

        {/* Confirmation Dialog */}
        <Dialog
          fullWidth={true}
          maxWidth={maxWidth}
          open={openDialog}
          onClose={handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle className="dark:bg-bodydark dark:text-white">
            <div className="flex justify-between">
              <p className="text-sm">Confirm</p>
              <CloseIcon
                className="cursor-pointer"
                onClick={handleCloseDialog}
              />
            </div>
          </DialogTitle>
          <DialogContent
            style={{
              height: "100%",
              backgroundColor: dialogBackgroundColor,
              color: dialogTextColor,
              padding: "1.5rem 3rem",
            }}
          >
            <h3>Do you really want to delete?</h3>
          </DialogContent>
          <DialogActions
            style={{
              height: "100%",
              backgroundColor: dialogBackgroundColor,
              color: dialogTextColor,
            }}
          >
            <div onClick={handleCloseDialog}>
              <CustomeButton title="Close" />
            </div>
            <div onClick={handleConfirmDelete}>
              <CustomeButton title="Confirm" />
            </div>
          </DialogActions>
        </Dialog>
      </Menu>
    </>
  );
};

export default CredentialProfileMenu;
