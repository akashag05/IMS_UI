import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import React, { useState } from "react";

const CustomeInput = (props: any) => {
  const { label, type, require, disable, value, name, onChange } = props;
  return (
    <div className=" w-[180px] m-2 mb-0">
      <label className=" mb-1 text-sm block text-black dark:text-white">
        {label}
      </label>
      <input
        type={type ? type : "text"}
        placeholder={label}
        className=" rounded-lg text-sm border-[2px] border-stroke bg-transparent py-1 px-2 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
        required={require ? false : true}
        disabled={disable ? true : false}
        value={value ? value : ""}
        name={name ? name : ""}
        onChange={onChange ? onChange : ""}
      />
    </div>
    // <div className="m-2">
    //   <TextField
    //     className="border-2-[#ffffff]"
    //     id="outlined-basic"
    //     label="Outlined"
    //     variant="outlined"
    //     size="small"
    //   />
    // </div>
  );
};

export default CustomeInput;

export const CheckboxTwo = (props: any) => {
  const { label, checked, onChange } = props;

  return (
    <FormGroup>
      <FormControlLabel className="text-sm"
        control={
          <Checkbox
            required
            defaultChecked
            checked={checked == "yes" ? true : false}
            onChange={onChange}
          />
        }
        label={label}
      />
    </FormGroup>
    // <div className="mx-4 my-2">
    //   <label
    //     // htmlFor="checkboxLabelTwo"
    //     className="flex cursor-pointer select-none items-center"
    //   >
    //     <div className="relative">
    //       <input
    //         type="checkbox"
    //         // id="checkboxLabelTwo"
    //         className="sr-only"
    //         onChange={onChange}
    //       />
    //       <div
    //         className={`mr-4 flex h-5 w-5 items-center justify-center rounded border ${
    //           isChecked && "border-primary bg-gray dark:bg-transparent"
    //         }`}
    //       >
    //         <span className={`opacity-0 ${isChecked && "!opacity-100"}`}>
    //           <svg
    //             width="11"
    //             height="8"
    //             viewBox="0 0 11 8"
    //             fill="none"
    //             xmlns="http://www.w3.org/2000/svg"
    //           >
    //             <path
    //               d="M10.0915 0.951972L10.0867 0.946075L10.0813 0.940568C9.90076 0.753564 9.61034 0.753146 9.42927 0.939309L4.16201 6.22962L1.58507 3.63469C1.40401 3.44841 1.11351 3.44879 0.932892 3.63584C0.755703 3.81933 0.755703 4.10875 0.932892 4.29224L0.932878 4.29225L0.934851 4.29424L3.58046 6.95832C3.73676 7.11955 3.94983 7.2 4.1473 7.2C4.36196 7.2 4.55963 7.11773 4.71406 6.9584L10.0468 1.60234C10.2436 1.4199 10.2421 1.1339 10.0915 0.951972ZM4.2327 6.30081L4.2317 6.2998C4.23206 6.30015 4.23237 6.30049 4.23269 6.30082L4.2327 6.30081Z"
    //               fill="#3056D3"
    //               stroke="#3056D3"
    //               strokeWidth="0.4"
    //             ></path>
    //           </svg>
    //         </span>
    //       </div>
    //     </div>
    //     {label}
    //   </label>
    // </div>
  );
};
export const CustomeTextArea = (props: any) => {
  const { label, require, disable, value, name, onChange, rows } = props;
  return (
    <div className="m-2 mb-0">
      <label className="mb-1 text-sm block text-black dark:text-white">
        {label}
      </label>
      <textarea
        placeholder={label}
        required={require ? false : true}
        disabled={disable ? true : false}
        value={value ? value : ""}
        name={name ? name : ""}
        onChange={onChange ? onChange : ""}
        rows={rows}
        className="w-[380px] text-sm rounded-lg border-[2px] border-stroke bg-transparent py-1 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
      ></textarea>
    </div>
  );
};
