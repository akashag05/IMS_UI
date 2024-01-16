// AddDeviceDialog.js
import React, { useEffect } from "react";
import CustomeInput, {
  CheckboxTwo,
  CustomeTextArea,
} from "@/components/Inputs";
import SingleSelect from "@/components/Dropdowns/SingleSelect";
import countries from "country-list";
import timezones from "timezones-list";
import CustomeButton from "@/components/Buttons";
import { toast } from "react-toastify";
import { addDeviceManager } from "@/app/api/DeviceManagementAPI";
import { getAllCredsProfile } from "@/app/api/CredentialProfileAPI";
import { getAllGropus } from "@/app/api/GroupsAPI";
import { getAllDiscoverySch } from "@/app/api/DiscoveryScheduleAPI";
import { replaceUnderscoresWithDots } from "@/functions/genericFunction";
import { useAppContext } from "@/context/AppContext";
import MultiSelect from "@/components/Dropdowns/MultiSelect";
const AddDeviceIPRange = ({ handleClose }: any) => {
  const initialState = {
    plugin_type: "SNMP",
    profile_type: "ip.address",
    hostname: "",
    start_ip: null,
    end_ip: null,
    port: "161",
    credential_profiles: [],
    discovery_schedulers: [],
    groups: [],
    device_name: "",
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
    auto_provision: "yes",
    check_without_save: "yes",
  };

  const { togglegetTableApiState } = useAppContext();
  const [data, setData] = React.useState<any>(initialState);
  const [protocol, setProtocol] = React.useState("10");
  const [allCredsPrfile, setAllCredsProfil] = React.useState([]);
  const [allGroups, setAllGroups] = React.useState([]);
  const [errorKeys, setErrorKeys] = React.useState<any>([]);
  const [errors, setErrors] = React.useState<any>({});
  const [allDiscoverySch, setAllDiscoverySch] = React.useState([]);

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
    setData({
      ...data,
      credential_profiles: [values],
    });
  };
  const handleGroupDropdown = (value: any) => {
    setData({
      ...data,
      groups: [value],
    });
  };

  useEffect(() => {
    const errorKey = errors && Object.keys(errors);
    setErrorKeys(errorKey);
  }, [errors]);
  // console.log("errorkey", errorKeys && errorKeys.includes("ip.address"));

  const handleSave = async () => {
    let response;
    data.port = parseInt(data.port);
    const modifiedData = replaceUnderscoresWithDots(data);
    response = await addDeviceManager(modifiedData);
    response && console.log(response);
    if (response) {
      if (response.status == "success") {
        toast.success(response && "Device Created Successfully", {
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
    // <Dialog
    //   open={open}
    //   onClose={handleClose}
    //   fullWidth={fullWidth}
    //   maxWidth={maxWidth}
    // >
    //   <DialogTitle
    //     className="dark:bg-bodydark dark:text-white"
    //     style={{
    //       backgroundColor: dialogBackgroundColor,
    //       color: dialogTextColor,
    //     }}
    //   >
    //     Add Single Device
    //   </DialogTitle>
    //   <DialogContent
    //     style={{
    //       height: "100%",
    //       backgroundColor: dialogBackgroundColor,
    //       color: dialogTextColor,
    //     }}
    //   >
    <>
      <form>
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
                  label="Start IP"
                  name="start_ip"
                  value={data.start_ip}
                  onChange={handleInputChange}
                  type="text"
                  require={true}
                />
                {errorKeys && errorKeys.includes("start.ip") && (
                  <p className="text-danger text-sm ml-2">
                    Start IP is {errors["start.ip"]}*
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <CustomeInput
                  label="End IP"
                  name="end_ip"
                  value={data.end_ip}
                  onChange={handleInputChange}
                  type="text"
                  require={true}
                />
                {errorKeys && errorKeys.includes("end.ip") && (
                  <p className="text-danger text-sm ml-2">
                    End IP is {errors["end.ip"]}*
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
              <CustomeTextArea
                label="Device Description"
                name="description"
                value={data.description}
                onChange={handleInputChange}
                rows="1"
                require={true}
              />
              <CustomeInput
                label="Alias"
                name="alias"
                value={data.alias}
                onChange={handleInputChange}
                type="text"
                require={false}
              />
              <SingleSelect
                label="Select Country"
                selectData={countryNames}
                onChange={handleCountryDropdown}
                require={true}
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
              <div className="flex ml-2 mt-6">
                <CheckboxTwo
                  label="Auto Provision"
                  checked={data.auto_provision}
                  onChange={handleAutoProvisionCheck}
                />
                <CheckboxTwo
                  label="Check Without Save"
                  checked={data.check_without_save}
                  onChange={handleCheckWithoudSaveCheck}
                />
              </div>
            </div>
          </>
        )}
      </form>
      <div className="flex justify-end">
        <div onClick={handleSave}>
          <CustomeButton title="Add" />
        </div>
        <div onClick={handleClose}>
          <CustomeButton title="Cancel" />
        </div>
      </div>
    </>
    //   </DialogContent>
    //   <DialogActions
    //     style={{
    //       backgroundColor: dialogBackgroundColor,
    //       color: dialogTextColor,
    //     }}
    //   >
    //     <div onClick={handleSave}>
    //       <CustomeButton title="Add" />
    //     </div>
    //     <div onClick={handleClose}>
    //       <CustomeButton title="Cancel" />
    //     </div>
    //     <Button onClick={handleClose}>Cancel</Button>
    //     <Button onClick={handleClose}>Add</Button>
    //   </DialogActions>
    // </Dialog>
  );
};

export default AddDeviceIPRange;
