import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { Box, Chip } from "@mui/material";
import { useAppContext } from "@/context/AppContext";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 200,
    },
  },
};

export default function MultiSelect(props: any) {
  const { label, selectData, onChange, require } = props;
  const [personName, setPersonName] = React.useState<string[]>([]);
  const { themeSwitch } = useAppContext();

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <div className="w-[180px] m-2 mb-0">
      <label className="mb-1 text-sm block font-semibold text-black dark:text-white">
        {label} {require == true && <span className="text-danger">*</span>}
      </label>
      <FormControl sx={{ m: 1, width: 300, margin: 0 }}>
        <Select
          className=" h-[37px] z-20 text-sm w-[180px] appearance-none rounded-lg border-2 border-stroke bg-transparent py-1 pr-12 pl-4 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          placeholder={label}
          value={personName}
          onChange={handleChange}
          renderValue={(selected) => (
            <div className="flex flex-wrap">
              {selected.length > 1 ? (
                <p key={selected[0]} className="text-sm">
                  {
                    selectData.find((item: any) => item.id === selected[0])
                      ?.name
                  }
                  ,{"    +" + (selected.length - 1) + ""}
                </p>
              ) : (
                selected.map((value: any) => (
                  <p key={value} className="text-sm">
                    {selectData.find((item: any) => item.id === value)?.name},
                  </p>
                ))
              )}
            </div>
          )}
          MenuProps={MenuProps}
        >
          {selectData.map((item: any, index: any) => (
            <MenuItem
              key={index}
              value={item.id ? item.id : item}
              sx={{
                margin: "0",
                padding: "0",
                backgroundColor: themeSwitch ? "#24303F" : "",
                color: themeSwitch ? "#DEE4EE" : "",
              }}
            >
              <Checkbox
                sx={{ padding: "0 8px" }}
                checked={personName.indexOf(item.id ? item.id : item) > -1}
              />
              <ListItemText
                primary={item.name ? item.name : item}
                className="text-sm"
              />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
