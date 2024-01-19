import React from "react";
import { createCredsProfile } from "@/app/api/CredentialProfileAPI";
import CustomeInput from "@/components/Inputs";
import { useAppContext } from "@/context/AppContext";
import {
  SelectChangeEvent,
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import CustomeButton from "@/components/Buttons";
import { replaceUnderscoresWithDots } from "@/functions/genericFunction";
import SingleSelect from "@/components/Dropdowns/SingleSelect";

export const AddCredentialProfile = ({
  open,
  handleClose,
  themeSwitch,
}: any) => {
  const [protocol, setProtocol] = React.useState<any>("SNMPv1");
  const [authType, setAuthType] = React.useState("");
  const { getCredProfileApiState, togglegetCredProfileApiState } =
    useAppContext();
  const [encryptType, setEncryptType] = React.useState("");
  const [snmpObject, setSnmpObject] = React.useState({
    name: "",
    protocol: "SNMP",
    credential_context: {
      snmp_version: "",
      snmp_community: "",
    },
  });
  const [snmpv3Object, setSnmpv3Object] = React.useState({
    name: "",
    protocol: "SNMP",
    credential_context: {
      username: "",
      password: "",
      authentication_type: "",
      encryption_type: "",
      encryption_key: "",
    },
  });
  const [sshObject, setSSHObject] = React.useState({
    name: "",
    protocol: "SSH",
    credential_context: {
      username: "",
      password: "",
    },
    public_key: "",
    paraphase: "",
  });

  React.useEffect(() => {
    if (open == false) {
      setSnmpObject({
        name: "",
        protocol: "SNMP",
        credential_context: {
          snmp_version: "",
          snmp_community: "",
        },
      });
      setSnmpv3Object({
        name: "",
        protocol: "SNMP",
        credential_context: {
          username: "",
          password: "",
          authentication_type: "",
          encryption_type: "",
          encryption_key: "",
        },
      });
      setSSHObject({
        name: "",
        protocol: "SSH",
        credential_context: {
          username: "",
          password: "",
        },
        public_key: "",
        paraphase: "",
      });
      setProtocol("SNMPv1");
    }
  }, [open]);

  // Add your dialog content and functionality here
  const dialogBackgroundColor = themeSwitch ? "#24303F" : "";
  const dialogTextColor = themeSwitch ? "white" : "";

  const handleChange = (values: any) => {
    setProtocol(values);
    console.log(values);
    let value = "";
    if (values == "SNMPv1") {
      value = "V1";
    } else {
      value = "V2C";
    }
    setSnmpObject((prevSnmpObject) => ({
      ...prevSnmpObject,
      credential_context: {
        ...prevSnmpObject.credential_context,
        snmp_version: value,
      },
    }));
  };
  const handleAuthChange = (values: any) => {
    setAuthType(values);
  };
  const handleEncryptChange = (values: any) => {
    setEncryptType(values);
  };

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setSnmpObject((prevSnmpObject) => ({
      ...prevSnmpObject,
      credential_context: {
        ...prevSnmpObject.credential_context,
        [name]: value,
      },
    }));
  };

  const handleInputSSHChange = (event: any) => {
    const { name, value } = event.target;
    setSSHObject((prevSnmpObject) => ({
      ...prevSnmpObject,
      credential_context: {
        ...prevSnmpObject.credential_context,
        [name]: value,
      },
    }));
  };

  const handleFieldChange = (event: any) => {
    const { name, value } = event.target;
    setSSHObject({ ...sshObject, [name]: value });
  };

  const handleNameChange = (event: any) => {
    const { name, value } = event.target;
    setSSHObject({ ...sshObject, [name]: value });
    setSnmpObject({ ...snmpObject, [name]: value });
  };

  const handleSSHSave = () => {
    const modifiedData = replaceUnderscoresWithDots(sshObject);
    console.log("snmp object", modifiedData);
    try {
      const createprofile = async () => {
        let response = await createCredsProfile(modifiedData);
        console.log(response);
        if (response.status == "success") {
          togglegetCredProfileApiState();
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
      createprofile();
      setProtocol(null);
      // setSSHObject({
      //   name: "",
      //   protocol: "SSH",
      //   credential_context: {
      //     username: "",
      //     password: "",
      //   },
      //   public_key: "",
      //   paraphase: "",
      // });
    } catch (error) {
      console.log(error);
    }
    handleClose();
  };
  // console.log("open in cred prof", open);

  const handlesnmpSave = () => {
    // console.log("snmp object", snmpObject);
    const modifiedData = replaceUnderscoresWithDots(snmpObject);
    console.log("snmp object", modifiedData);
    try {
      const createprofile = async () => {
        let response = await createCredsProfile(modifiedData);
        console.log(response);
        if (response.status == "success") {
          togglegetCredProfileApiState();
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
      createprofile();
      setProtocol(null);
      // setSnmpObject({
      //   name: "",
      //   protocol: "SNMP",
      //   credential_context: {
      //     snmp_version: "",
      //     snmp_community: "",
      //   },
      // });
    } catch (error) {
      console.log(error);
    }
    handleClose();
  };
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={true}
        // maxWidth={maxWidth}
      >
        <DialogTitle
          className="dark:bg-bodydark dark:text-white border-b"
          sx={{ padding: "0px 10px" }}
        >
          <div className="m-2 flex justify-between">
            <p>Add Credential Profile</p>
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
          <div className="flex ">
            <CustomeInput
              label="Profile Name"
              name="name"
              value={snmpObject.name}
              onChange={handleNameChange}
              type="text"
              disable={false}
              require={true}
            />
            <SingleSelect
              label="Protocol"
              selectData={["SNMPv1", "SNMPv2c", "SNMPv3", "SSH"]}
              onChange={handleChange}
              require={true}
            />
          </div>
          {protocol == "SNMPv2c" || protocol == "SNMPv1" ? (
            <div className="">
              <CustomeInput
                label="Community String"
                name="snmp_community"
                value={snmpObject.credential_context.snmp_community}
                onChange={handleInputChange}
                type="text"
                disable={false}
                require={true}
              />
              <div className="flex justify-end mt-6">
                <div onClick={handlesnmpSave}>
                  <CustomeButton title="Save" />
                </div>
                {/* <CustomeButtons title="Save & Discover" /> */}
                <div onClick={handleClose}>
                  <CustomeButton title="Cancel" />
                </div>
              </div>
            </div>
          ) : protocol == "SNMPv3" ? (
            <div className="">
              <div className="flex flex-wrap">
                <CustomeInput
                  label="UserName"
                  name="username"
                  value={snmpv3Object.credential_context.username}
                  onChange={handleInputSSHChange}
                  type="text"
                  disable={false}
                  require={true}
                />
                <CustomeInput
                  label="Password"
                  name="password"
                  value={sshObject.credential_context.password}
                  onChange={handleInputSSHChange}
                  type="password"
                  disable={false}
                  require={true}
                />
                <SingleSelect
                  label="Authentication Type"
                  selectData={["None", "MD5", "SHA"]}
                  onChange={handleAuthChange}
                  require={true}
                />
                <SingleSelect
                  label="Encryption Type"
                  selectData={["None", "AES", "DES"]}
                  onChange={handleEncryptChange}
                  require={true}
                />
                <CustomeInput
                  label="Encryption Key"
                  name="encryption_key"
                  value={snmpv3Object.credential_context.encryption_key}
                  onChange={handleInputSSHChange}
                  type="password"
                  disable={false}
                  require={true}
                />
              </div>
              <div className="flex justify-end mt-6">
                <CustomeButton title="Save" />
                <div onClick={handleClose}>
                  <CustomeButton title="Cancel" />
                </div>
              </div>
            </div>
          ) : protocol == "SSH" ? (
            <div>
              <div className="flex flex-wrap">
                <CustomeInput
                  label="UserName"
                  name="username"
                  value={sshObject.credential_context.username}
                  onChange={handleInputSSHChange}
                  type="text"
                  disable={false}
                  require={true}
                />
                <CustomeInput
                  label="Password"
                  name="password"
                  value={sshObject.credential_context.password}
                  onChange={handleInputSSHChange}
                  type="password"
                  disable={false}
                  require={true}
                />
                <CustomeInput
                  label="SSH Public Key"
                  name="public_key"
                  value={sshObject.public_key}
                  onChange={handleFieldChange}
                  type="text"
                  disable={false}
                  require={true}
                />
                <CustomeInput
                  label="Paraphrase"
                  name="paraphase"
                  value={sshObject.paraphase}
                  onChange={handleFieldChange}
                  type="text"
                  disable={false}
                  require={true}
                />
              </div>

              <div className="flex justify-end mt-6">
                <div onClick={handleSSHSave}>
                  <CustomeButton title="Save" />
                </div>
                <div onClick={handleClose}>
                  <CustomeButton title="Cancel" />
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </DialogContent>
        {/* <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleClose}>Submit</Button>
            </DialogActions> */}
      </Dialog>
    </div>
  );
};
