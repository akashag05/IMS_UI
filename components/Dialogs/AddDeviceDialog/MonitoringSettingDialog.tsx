// AddDeviceDialog.js
import React, { useState } from "react";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import CheckIcon from "@mui/icons-material/Check";
import { useAppContext } from "@/context/AppContext";
import {
  getMonitoringDetailsByDeviced,
  updateAvailabilityMonitorinngByDeviced,
  updateMonitoringDetailsByDeviced,
} from "@/app/api/DeviceManagementAPI";
import {
  replacePeriodsWithUnderscoresArrayOfObjects,
  replaceUnderscoresWithDots,
} from "@/functions/genericFunction";
import CustomeInput from "@/components/Inputs";
import { Checkbox } from "@mui/material";
const MonitoringSettingDialog = ({ open, handleClose, id }: any) => {
  const { themeSwitch, togglegetTableApiState } = useAppContext();
  const [maxWidth, setMaxWidth] = React.useState<DialogProps["maxWidth"]>("sm");
  const [apiData, setApiData] = React.useState({});

  const [data, setData] = useState<any>([]);
  React.useEffect(() => {
    try {
      const getData = async () => {
        let response = await getMonitoringDetailsByDeviced(id);

        const modifiedData: any = replacePeriodsWithUnderscoresArrayOfObjects(
          response.result
        );
        console.log("==========", response.result);
        setApiData(modifiedData);
        setData(modifiedData);
      };
      getData();
    } catch (error) {
      console.log(error);
    }
  }, []);
  // Add your dialog content and functionality here
  const dialogBackgroundColor = themeSwitch ? "#24303F" : "";
  const dialogTextColor = themeSwitch ? "white" : "";

  const handleUpdate = (id: number) => {
    const updatedData = data.map((row: any) =>
      row._id === id ? { ...row, _isDirty: false } : row
    );
    setData(updatedData);
    HandleSave(updatedData.find((row: any) => row._id === id));
  };

  const HandleSave = async (modifiedRow: any) => {
    try {
      const dataToSend = {
        bodyData: replaceUnderscoresWithDots(modifiedRow),
      };
      // console.log("data to send", dataToSend);
      if (modifiedRow && modifiedRow.object_type !== "Availability") {
        let response = await updateMonitoringDetailsByDeviced(dataToSend);
        handleApiResponse(response);
      } else {
        let response = await updateAvailabilityMonitorinngByDeviced(
          dataToSend,
          id
        );
        handleApiResponse(response);
      }
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  const handleApiResponse = (response: any) => {
    if (response.status === "success") {
      togglegetTableApiState();
      toast.success(response.status, {
        position: "bottom-right",
        autoClose: 1000,
      });
    } else {
      toast.error(response.message, {
        position: "bottom-right",
        autoClose: 2000,
      });
    }
  };

  const handleInputChange = (id: number, field: string, value: any) => {
    const updatedData =
      data &&
      data.map((row: any) =>
        row._id === id ? { ...row, [field]: value, _isDirty: true } : row
      );
    setData(updatedData);
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
          <p>Monitoring Settings</p>
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
        <div>
          <table>
            <thead>
              <tr>
                {/* <th>ID</th> */}
                <th className="p-2 px-4">Object Type</th>
                <th className="p-2 px-4">Polling Interval</th>
                <th className="p-2 px-4">Object Enabled</th>
                <th className="p-2 px-4">Update</th>
              </tr>
            </thead>
            <tbody>
              {data ? (
                [].concat(
                  data
                    .filter((row: any) => row.object_type === "Availability")
                    .map((row: any) => (
                      <tr key={row._id}>
                        <td className="px-4">{row.object_type}</td>
                        <td className="px-4">
                          <CustomeInput
                            label=""
                            name=""
                            value={row.polling_interval}
                            onChange={(e: any) =>
                              handleInputChange(
                                row._id,
                                "polling_interval",
                                +e.target.value
                              )
                            }
                          />
                        </td>
                        <td className="px-4 text-center">
                          <Checkbox
                            style={{ color: themeSwitch ? "#DEE4EE" : "" }}
                            checked={row.object_enabled}
                            onChange={() =>
                              handleInputChange(
                                row._id,
                                "object_enabled",
                                !row.object_enabled
                              )
                            }
                          />
                        </td>
                        <td className="px-4 text-center">
                          {row._isDirty && (
                            <CheckIcon
                              style={{ cursor: "pointer" }}
                              onClick={() => handleUpdate(row._id)}
                            />
                          )}
                        </td>
                      </tr>
                    )),

                  // Rows without object_type 'Availability'
                  data
                    .filter((row: any) => row.object_type !== "Availability")
                    .map((row: any) => (
                      <tr key={row._id}>
                        <td className="px-4">{row.object_type}</td>
                        <td className="px-4">
                          <CustomeInput
                            label=""
                            name=""
                            value={row.polling_interval}
                            onChange={(e: any) =>
                              handleInputChange(
                                row._id,
                                "polling_interval",
                                +e.target.value
                              )
                            }
                          />
                        </td>
                        <td className="px-4 text-center">
                          <Checkbox
                            style={{ color: themeSwitch ? "#DEE4EE" : "" }}
                            checked={row.object_enabled}
                            onChange={() =>
                              handleInputChange(
                                row._id,
                                "object_enabled",
                                !row.object_enabled
                              )
                            }
                          />
                        </td>
                        <td className="px-4 text-center">
                          {row._isDirty && (
                            <CheckIcon
                              style={{ cursor: "pointer" }}
                              onClick={() => handleUpdate(row._id)}
                            />
                          )}
                        </td>
                      </tr>
                    ))
                )
              ) : (
                <p>No Data</p>
              )}
            </tbody>
          </table>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MonitoringSettingDialog;
