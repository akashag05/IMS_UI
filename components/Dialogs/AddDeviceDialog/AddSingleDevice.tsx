// AddDeviceDialog.js
import React, { useEffect } from "react";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import CustomeInput, {
  CheckboxTwo,
  CustomeTextArea,
} from "@/components/Inputs";
import SingleSelect from "@/components/Dropdowns/SingleSelect";
import countries from "country-list";
import timezones from "timezones-list";
import CustomeButton from "@/components/Buttons";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import { addSingleDevice } from "@/app/api/DeviceManagementAPI";
import { getAllCredsProfile } from "@/app/api/CredentialProfileAPI";
import { getAllGropus } from "@/app/api/GroupsAPI";
import { getAllDiscoverySch } from "@/app/api/DiscoveryScheduleAPI";
import { replaceUnderscoresWithDots } from "@/functions/genericFunction";
import { useAppContext } from "@/context/AppContext";
import MultiSelect from "@/components/Dropdowns/MultiSelect";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
const AddSingleDeviceDialog = ({ open, handleClose, themeSwitch }: any) => {
  const initialState = {
    plugin_type: "SNMP",
    profile_type: "ip.address",
    hostname: "",
    ip_address: null,
    port: "161",
    credential_profiles: [],
    discovery_schedulers: [],
    groups: [],
    // device_name: "",
    description: "",
    alias: "",
    country: "",
    location: "",
    site: "",
    site_code: 0,
    service: "",
    latitude: 0,
    longitude: 0,
    timezone: "",
    device_status: "new",
    availability_interval: 60,
    auto_provision: "discovery",
    // check_without_save: "yes",
  };

  const { togglegetTableApiState } = useAppContext();
  const [data, setData] = React.useState<any>(initialState);
  const [protocol, setProtocol] = React.useState("10");
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState<DialogProps["maxWidth"]>("md");
  const [allCredsPrfile, setAllCredsProfil] = React.useState([]);
  const [allGroups, setAllGroups] = React.useState([]);
  const [errorKeys, setErrorKeys] = React.useState<any>([]);
  const [errors, setErrors] = React.useState<any>({});
  const [allDiscoverySch, setAllDiscoverySch] = React.useState([]);

  // Add your dialog content and functionality here
  const dialogBackgroundColor = themeSwitch ? "#24303F" : "";
  const dialogTextColor = themeSwitch ? "white" : "";

  const countryNames = countries.getNames();
  const tzCodes = timezones.map((timezone) => timezone.tzCode);

  React.useEffect(() => {
    const getCredsProfile = async () => {
      let response = await getAllCredsProfile();
      setAllCredsProfil(response.result);
    };
    getCredsProfile();
    const getGroups = async () => {
      let response = await getAllGropus();
      setAllGroups(response.result);
    };
    getGroups();
    const getDiscoveryScheduler = async () => {
      let response = await getAllDiscoverySch();
      setAllDiscoverySch(response.result);
    };
    getDiscoveryScheduler();
  }, []);

  const credsProfileValues =
    allCredsPrfile &&
    allCredsPrfile.map((item: any) => ({
      name: item.name,
      id: item._id,
    }));
  const groupValues =
    allGroups &&
    allGroups.map((item: any) => ({
      name: item.name,
      id: item._id,
    }));

  //Functions to set value into the state

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  const handleChange = (event: any) => {
    const proto: any = event.target.value as string;
    console.log(proto);
    // setFormValue(true);
    setProtocol(proto);
    // setData({ ...data, port: proto == "10" ? "161" : "22" });
  };

  const handleRadioChange = (event: any) => {
    const { name, value } = event.target;
    setData({
      ...data,
      [name]: value,
    });
  };
  const handleAutoProvisionCheck = (event: any) => {
    setData({
      ...data,
      auto_provision: event.target.checked == true ? "yes" : "no",
    });
  };

  const handleCheckWithoudSaveCheck = (event: any) => {
    setData({
      ...data,
      check_without_save: event.target.checked == true ? "yes" : "no",
    });
  };

  const handleTimeZoneDropdown = (value: any) => {
    setData({
      ...data,
      timezone: value,
    });
  };
  const handleCountryDropdown = (value: any) => {
    setData({
      ...data,
      country: value,
    });
  };

  const handleCredProfile = (values: any) => {
    const val = parseInt(values);
    setData({
      ...data,
      credential_profiles: [val],
    });
  };
  const handleGroupDropdown = (value: any) => {
    setData({
      ...data,
      groups: value,
    });
  };

  useEffect(() => {
    const errorKey = errors && Object.keys(errors);
    setErrorKeys(errorKey);
  }, [errors]);
  // console.log("errorkey", errorKeys && errorKeys.includes("ip.address"));

  // const handleSave = () => {
  //   console.log("device data", data);
  //   const modifiedData = replaceUnderscoresWithDots(data);
  //   console.log("modified data", modifiedData);
  // };

  const handleSave = async () => {
    let response;
    data.port = parseInt(data.port);
    const modifiedData = replaceUnderscoresWithDots(data);
    response = await addSingleDevice(modifiedData);
    response && console.log(response);
    if (response) {
      if (response.status == "success") {
        toast.success(response && response.message, {
          position: "bottom-right",
          autoClose: 2000,
        });
        togglegetTableApiState();
        handleClose();
      } else {
        setErrors(response.errors);
        toast.error(response.message, {
          position: "bottom-right",
          autoClose: 2000,
        });
      }
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth={fullWidth}
      maxWidth={maxWidth}
    >
      <DialogTitle
        className="dark:bg-bodydark dark:text-white"
        sx={{ padding: "0px 10px" }}
      >
        <div className="m-2 flex justify-between">
          <p>Add Single Device</p>
          <CloseIcon className="cursor-pointer" onClick={handleClose} />
        </div>
      </DialogTitle>
      <DialogContent
        style={{
          height: "100%",
          backgroundColor: dialogBackgroundColor,
          color: dialogTextColor,
        }}
      >
        <form className=" rounded-lg m-2 p-2">
          <SingleSelect
            label="Protocol"
            selectData={["SNMP"]}
            onChange={handleChange}
          />
          {data.plugin_type == "SNMP" && (
            <>
              <div className="flex flex-wrap">
                <div className="flex flex-col">
                  <CustomeInput
                    label="Host Name"
                    name="hostname"
                    value={data.hostname}
                    onChange={handleInputChange}
                    type="text"
                    require={true}
                  />
                  {errorKeys && errorKeys.includes("hostname") && (
                    <p className="text-danger text-sm ml-2">
                      HostName is {errors["hostname"]}*
                    </p>
                  )}
                </div>
                <div className="flex flex-col">
                  <CustomeInput
                    label="IP Address"
                    name="ip_address"
                    value={data.ip_address}
                    onChange={handleInputChange}
                    type="text"
                    require={true}
                  />
                  {errorKeys && errorKeys.includes("ip.address") && (
                    <p className="text-danger text-sm ml-2">
                      IP Address is {errors["ip.address"]}*
                    </p>
                  )}
                </div>

                <CustomeInput
                  label="Port"
                  name="port"
                  value={data.port}
                  onChange={handleInputChange}
                  type="text"
                  require={true}
                />
                {/* <div className="flex"> */}
                <div className="flex flex-col">
                  <SingleSelect
                    label="Select Credential Profile"
                    selectData={credsProfileValues}
                    onChange={handleCredProfile}
                    require={true}
                  />
                  {errorKeys && errorKeys.includes("credential.profiles") && (
                    <p className="text-danger text-sm ml-2">
                      Credential Profiles is {errors["credential.profiles"]}*
                    </p>
                  )}
                </div>
                <div className="flex flex-col">
                  <MultiSelect
                    label="Select Group"
                    selectData={groupValues}
                    onChange={handleGroupDropdown}
                    require={true}
                    values={[]}
                  />
                  {errorKeys && errorKeys.includes("groups") && (
                    <p className="text-danger text-sm ml-2">
                      Groups is {errors["groups"]}*
                    </p>
                  )}
                </div>
                {/* </div> */}
                {/* <CustomeInput
                  label="Device Name"
                  name="device_name"
                  value={data.device_name}
                  onChange={handleInputChange}
                  type="text"
                  require={true}
                /> */}
                <CustomeInput
                  label="Alias"
                  name="alias"
                  value={data.alias}
                  onChange={handleInputChange}
                  type="text"
                  require={false}
                />
                <CustomeTextArea
                  label="Device Description"
                  name="description"
                  value={data.description}
                  onChange={handleInputChange}
                  rows="1"
                  require={true}
                />
                <SingleSelect
                  label="Select Country"
                  selectData={countryNames}
                  onChange={handleCountryDropdown}
                />
                <CustomeInput
                  label="Location"
                  name="location"
                  value={data.location}
                  onChange={handleInputChange}
                  type="text"
                  require={false}
                />
                <CustomeInput
                  label="Site"
                  name="site"
                  value={data.site}
                  onChange={handleInputChange}
                  type="text"
                  require={false}
                />
                <CustomeInput
                  label="Site Code"
                  name="site_code"
                  value={data.site_code}
                  onChange={handleInputChange}
                  type="text"
                  require={false}
                />
                <CustomeInput
                  label="Service"
                  name="service"
                  value={data.service}
                  onChange={handleInputChange}
                  type="text"
                  require={false}
                />
                <CustomeInput
                  label="Latitudes"
                  name="latitude"
                  value={data.latitude}
                  onChange={handleInputChange}
                  type="text"
                  require={false}
                />
                <CustomeInput
                  label="Longitudes"
                  name="longitude"
                  value={data.longitude}
                  onChange={handleInputChange}
                  type="text"
                  require={false}
                />
                <SingleSelect
                  label="Select TimeZone"
                  selectData={tzCodes}
                  onChange={handleTimeZoneDropdown}
                />
                <FormControl style={{ margin: ".5rem" }}>
                  {/* <FormLabel id="demo-controlled-radio-buttons-group">
                    Gender
                  </FormLabel> */}
                  <RadioGroup
                    style={{ display: "flex", flexDirection: "row" }}
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="auto_provision"
                    value={data.auto_provision}
                    onChange={handleRadioChange}
                  >
                    <FormControlLabel
                      value="monitoring"
                      control={<Radio size="small" />}
                      label="Auto Provision"
                    />
                    <FormControlLabel
                      value="discovery"
                      control={<Radio size="small" />}
                      label="Discovery Only"
                    />
                  </RadioGroup>
                </FormControl>
                {/* <div className="flex ml-2 mt-6">
                  <CheckboxTwo
                    label="Auto Provision"
                    checked={data.auto_provision}
                    onChange={handleAutoProvisionCheck}
                  />
                  <CheckboxTwo
                    label="Discover Only"
                    checked={data.check_without_save}
                    onChange={handleCheckWithoudSaveCheck}
                  />
                </div> */}
              </div>
            </>
          )}
        </form>
      </DialogContent>
      <DialogActions
        style={{
          backgroundColor: dialogBackgroundColor,
          color: dialogTextColor,
        }}
      >
        <div onClick={handleSave}>
          <CustomeButton title="Add" />
        </div>
        <div onClick={handleClose}>
          <CustomeButton title="Cancel" />
        </div>
        {/* <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose}>Add</Button> */}
      </DialogActions>
    </Dialog>
  );
};

export default AddSingleDeviceDialog;
