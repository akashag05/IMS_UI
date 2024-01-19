import React, { useState, useEffect } from "react";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  styled,
} from "@mui/material";
import replacePeriodsWithUnderscoresArrayOfObjects, {
  replacePeriodsWithUnderscores,
  replaceUnderscoresWithDots,
} from "@/functions/genericFunction";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { baseURL } from "@/constants";
import { toast } from "react-toastify";
import { onBoardDeviceCsv } from "@/app/api/DeviceManagementAPI";

const AddDeviceCSV = ({ handleClose }: any) => {
  const [selectedFileName, setSelectedFileName] = useState("");
  const [message, setMessage] = useState("");
  const [errorData, setErrorData] = useState<any>([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [show, setShow] = useState(false);
  const [uuid, setuuid] = useState("");
  const [fileName, setFileName] = useState("");

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];

    if (file) {
      setSelectedFileName(file.name);
      setSelectedFile(file);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      fetch(baseURL + "/upload", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status == "success") {
            if (data.status === "success") {
              toast.success(data.status, {
                position: "bottom-right",
                autoClose: 1000,
              });
            } else {
              toast.error(data.message, {
                position: "bottom-right",
                autoClose: 2000,
              });
            }
            const file_name = Object.keys(data.result)[0];
            const value = data.result[file_name];
            setFileName(file_name);
            setuuid(value);
          }
        })
        .catch((error) => console.error("Error:", error));

      // console.log("FormData:", formData);
    }
  };
  const onBoard = async () => {
    const data = {
      file_name: fileName,
      file_uuid: uuid,
      profile_type: "csv",
    };
    const modifiedData = replaceUnderscoresWithDots(data);
    // console.log(modifiedData);
    try {
      let response = await onBoardDeviceCsv(modifiedData);
      if (response.status === "success") {
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
      const data = replacePeriodsWithUnderscores(response);
      // console.log("=============", data.device_list);
      const arrayOfObjects = Object.values(data.device_list);
      const modData =
        replacePeriodsWithUnderscoresArrayOfObjects(arrayOfObjects);
      // console.log("-------------",modData);
      setErrorData(modData);
      setShow(true);
      setMessage(response.message);
    } catch (error) {
      console.log(error);
    }
  };
  const downloadFile = () => {
    const content =
      "plugin.type~ip.address~hostname~port~device.name~alias~discovery.schedulers~credential.profiles~groups~auto.provision~timezone~country~location~site~site.code~latitude~longitude~service";
    const fileName = "sample-device-upload.csv";
    const blob = new Blob([content], { type: "text/csv" });
    const link = document.createElement("a");
    link.download = fileName;
    link.href = window.URL.createObjectURL(blob);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const keys = Object.keys(errorData[0] || []);
  return (
    <>
      <div className="mt-4 flex">
        {/* <div className="flex flex-col"> */}
        <Button
          component="label"
          variant="contained"
          size="small"
          sx={{ height: "2rem", margin: "1rem" }}
          startIcon={<CloudUploadIcon />}
        >
          {selectedFileName ? selectedFileName : "Select file"}
          <VisuallyHiddenInput
            type="file"
            accept=".csv"
            onChange={handleFileChange}
          />
        </Button>
        {/* </div> */}
        <Button
          disabled={selectedFile ? false : true}
          variant="contained"
          color="success"
          size="small"
          style={{
            margin: "1rem",
            height: "2rem",
            backgroundColor: `${selectedFile ? "blueviolet" : "#808080"}`,
            color: `${selectedFile ? "#ffffff" : "#ffffff"}`,
          }}
          onClick={handleUpload}
        >
          Upload File
        </Button>
        <Button
          disabled={uuid != "" ? false : true}
          variant="contained"
          color="success"
          size="small"
          style={{
            margin: "1rem",
            height: "2rem",
            backgroundColor: `${uuid ? "blueviolet" : "#808080"}`,
            color: `${uuid ? "#ffffff" : "#ffffff"}`,
          }}
          onClick={onBoard}
        >
          Onboard Device
        </Button>
      </div>
      <div>
        <Button
          component="label"
          variant="contained"
          className="my-2"
          sx={{ height: "2rem", margin: "1rem" }}
          startIcon={<CloudDownloadIcon />}
        >
          Download Sample File
          <VisuallyHiddenInput
            type="file"
            accept=".csv"
            onClick={downloadFile}
          />
        </Button>
      </div>
      <div className="mb-10">
        {show && (
          <>
            <h5 className="text-red-500 m-2">{message}</h5>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    {keys.map((key) => (
                      <TableCell key={key}>{key}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {errorData.map((data: any, index: any) => (
                    <TableRow key={index}>
                      {keys.map((key) => (
                        <TableCell key={key}>
                          {JSON.stringify(data[key])}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
      </div>
    </>
  );
};

export default AddDeviceCSV;
