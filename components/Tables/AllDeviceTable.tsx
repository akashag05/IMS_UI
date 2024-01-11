import React, { useState, useEffect } from "react";
import {
  InputBase,
  IconButton,
  Menu,
  MenuItem,
  Checkbox,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  TableBody,
  TablePagination,
} from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SearchIcon from "@mui/icons-material/Search";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";
import { toast } from "react-toastify";
import { useAppContext } from "@/context/AppContext";
import {
  deleteSingleDevice,
  getAllDevice,
} from "@/app/api/DeviceManagementAPI";
import { replacePeriodsWithUnderscores } from "@/functions/genericFunction";

const AllDeviceTable = () => {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [data, setData] = useState<any>();
  const [columns, setColumns] = useState<any>();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");
  const [search, setSearch] = useState("");
  const [visibleColumns, setVisibleColumns] = useState<any>([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRows, setSelectedRows] = useState<any>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selected, setSelected] = useState(false);
  const { themeSwitch, getTableApiState, togglegetTableApiState } =
    useAppContext();

  useEffect(() => {
    try {
      const getData = async () => {
        let cols: any = [];
        let response = await getAllDevice();
        const modifiedData = replacePeriodsWithUnderscores(response.result);
        // console.log("modifidData", modifiedData);
        const col = Object.keys(modifiedData[0]);
        const filteredCols = col.filter((key: any) => !key.startsWith("_"));
        filteredCols.filter((key: any) => {
          if (!key.startsWith("_")) {
            cols.push({
              field: key.replace(/\./g, "_"),
              headerName: key.replace(/\./g, " "),
              minWidth: 150,
            });
          }
        });
        console.log("cols", cols);
        setColumns(cols);
        console.log("rows", modifiedData);
        setVisibleColumns(cols.map((column: any) => column.field));
        setData(modifiedData);
      };
      getData();
    } catch (error) {
      console.log(error);
    }
  }, [getTableApiState]);

  const handleRequestSort = (property: any) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSearchChange = (event: any) => {
    setSearch(event.target.value);
  };

  const handleColumnToggle = (columnField: any) => {
    setVisibleColumns((prevVisibleColumns: any) => {
      if (prevVisibleColumns.includes(columnField)) {
        return prevVisibleColumns.filter((field: any) => field !== columnField);
      } else {
        return [...prevVisibleColumns, columnField];
      }
    });
  };

  const handleRowCheckboxToggle = (rowId: any) => {
    setSelectedRows((prevSelectedRows: any) => {
      if (prevSelectedRows.includes(rowId)) {
        return prevSelectedRows.filter((id: any) => id !== rowId);
      } else {
        return [...prevSelectedRows, rowId];
      }
    });
  };

  const handleSelectAllCheckboxToggle = () => {
    if (selectAll) {
      setSelectedRows([]);
    } else {
      const allRowIds = data.map((row: any) => row._id);
      setSelectedRows(allRowIds);
    }
    setSelectAll(!selectAll);
  };

  useEffect(() => {
    if (selectedRows.length != 0) {
      setSelected(true);
    } else {
      setSelected(false);
    }
  }, [selectedRows]);

  const deleteDevice = async () => {
    console.log("delete array", selectedRows);
    try {
      let response = await deleteSingleDevice(selectedRows);
      // console.log(response);
      // window.alert(response.status);
      if (response.status == "success") {
        togglegetTableApiState();
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
      // setIsPopupOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const downloadCSV = () => {
    const selectedRowsData = data.filter((row: any) =>
      selectedRows.includes(row._id)
    );

    const csvData = [Object.keys(selectedRowsData[0])]; // Header

    selectedRowsData.forEach((row: any) => {
      const rowData: any = Object.values(row);
      csvData.push(rowData);
    });

    const csvContent = csvData.map((row) => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "data.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const filteredData =
    data &&
    data.filter((row: any) => {
      return visibleColumns.some(
        (columnField: any) =>
          typeof row[columnField] === "string" &&
          row[columnField].toLowerCase().includes(search.toLowerCase())
      );
    });

  const stableSort = (array: any, comparator: any) => {
    const stabilizedThis = array.map((el: any, index: any) => [el, index]);
    stabilizedThis.sort((a: any, b: any) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el: any) => el[0]);
  };

  const getComparator = (order: any, orderBy: any) => {
    return order === "desc"
      ? (a: any, b: any) => descendingComparator(a, b, orderBy)
      : (a: any, b: any) => -descendingComparator(a, b, orderBy);
  };

  const descendingComparator = (
    a: { [x: string]: number },
    b: { [x: string]: number },
    orderBy: string | number
  ) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };

  const handleChangePage = (
    event: any,
    newPage: React.SetStateAction<number>
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: { target: { value: string } }) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleMenuOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (columnField: any) => {
    handleColumnToggle(columnField);
    // handleMenuClose();
  };

  const isMenuOpen = Boolean(anchorEl);

  const processColumnData = (column: any, row: any) => {
    // Perform operations based on the column and row data
    if (column.field === "someField") {
      // Example: Convert someField to uppercase
      return row[column.field].toUpperCase();
    }

    // If no specific processing needed, return the original value
    return row[column.field];
  };

  return (
    <>
      {data && (
        <div className="">
          <div className="flex justify-between">
            <div>
              <p>All Devices</p>
            </div>
            <div
              className="flex justify-end"
              style={{
                color: themeSwitch ? "white" : "",
              }}
            >
              <div className="border-b-2 border-[#CCCFD9] flex justify-end w-fit m-2 px-2">
                <InputBase
                  style={{ color: themeSwitch ? "white" : "" }}
                  placeholder=""
                  value={search}
                  onChange={handleSearchChange}
                />
                <IconButton>
                  <SearchIcon style={{ color: themeSwitch ? "white" : "" }} />
                </IconButton>
              </div>
              <div className="m-4">
                {selected ? (
                  <>
                    <DeleteForeverIcon
                      onClick={deleteDevice}
                      className="cursor-pointer"
                      style={{
                        margin: "0 5px",
                      }}
                    />

                    <FileDownloadIcon
                      onClick={downloadCSV}
                      className="cursor-pointer"
                      style={{
                        margin: "0 5px",
                      }}
                    />
                  </>
                ) : (
                  <>
                    <DeleteForeverIcon
                      style={{
                        margin: "0 5px",
                      }}
                      color="disabled"
                    />

                    <FileDownloadIcon
                      style={{
                        margin: "0 5px",
                      }}
                      color="disabled"
                    />
                  </>
                )}
                <ViewColumnIcon
                  style={{ margin: "0 0 0 5px" }}
                  onClick={handleMenuOpen}
                />
                <Menu
                  anchorEl={anchorEl}
                  open={isMenuOpen}
                  onClose={handleMenuClose}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
                  {columns.map((column: any) => (
                    <MenuItem
                      style={{
                        backgroundColor: themeSwitch ? "#24303F" : "",
                        color: themeSwitch ? "#DEE4EE" : "",
                      }}
                      key={column.field}
                      onClick={() => handleMenuItemClick(column.field)}
                    >
                      <Checkbox
                        checked={visibleColumns.includes(column.field)}
                        onChange={() => handleMenuItemClick(column.field)}
                      />
                      {column.headerName
                        .split(" ")
                        .map((word: any) =>
                          word
                            .split("_")
                            .map(
                              (subWord: any) =>
                                subWord.charAt(0).toUpperCase() +
                                subWord.slice(1)
                            )
                            .join(" ")
                        )
                        .join(" ")}
                    </MenuItem>
                  ))}
                </Menu>
              </div>
            </div>
          </div>
          <Paper
            sx={{
              width: "100%",
              overflow: "hidden",
              borderRadius: ".5rem",
            }}
          >
            <TableContainer
              sx={{
                backgroundColor: themeSwitch ? "#24303F" : "",
                maxHeight: 440,
                // border: "2px solid grey",
                // borderRadius: ".5rem",
              }}
            >
              <Table
                stickyHeader
                aria-label="sticky table"
                style={{ overflow: "hidden", borderRadius: ".5rem" }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell
                      style={{
                        color: themeSwitch ? "#24303F" : "",
                        backgroundColor: themeSwitch ? "#CCCFD9" : "",
                        fontSize: "11px",
                        fontWeight: "bolder",
                      }}
                    >
                      <Checkbox
                        checked={selectAll}
                        onChange={handleSelectAllCheckboxToggle}
                      />
                    </TableCell>
                    {columns
                      .filter((column: any) =>
                        visibleColumns.includes(column.field)
                      )
                      .map((column: any) => {
                        const iconDirection = column.field ? order : "asc";
                        return (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            style={{
                              padding: "0px 4px !important",
                              minWidth: column.minWidth,
                              color: themeSwitch ? "#24303F" : "",
                              backgroundColor: themeSwitch ? "#CCCFD9" : "",
                              fontSize: "11px",
                              fontWeight: "bolder",
                            }}
                          >
                            <TableSortLabel
                              active={orderBy === column.field}
                              direction={
                                iconDirection as "asc" | "desc" | undefined
                              }
                              onClick={() => handleRequestSort(column.field)}
                            >
                              {column.headerName
                                .split(" ")
                                .map((word: any) =>
                                  word
                                    .split("_")
                                    .map(
                                      (subWord: any) =>
                                        subWord.charAt(0).toUpperCase() +
                                        subWord.slice(1)
                                    )
                                    .join(" ")
                                )
                                .join(" ")}
                            </TableSortLabel>
                          </TableCell>
                        );
                      })}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {stableSort(filteredData, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row: any) => (
                      // console.log("row data", row)
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row._id}
                      >
                        <TableCell>
                          <Checkbox
                            checked={selectedRows.includes(row._id)}
                            onChange={() => handleRowCheckboxToggle(row._id)}
                          />
                        </TableCell>
                        {columns
                          .filter((column: any) =>
                            visibleColumns.includes(column.field)
                          )
                          .map((column: any) => {
                            const value = row[column.field];
                            const processedValue = processColumnData(
                              column,
                              row
                            );
                            return (
                              <TableCell
                                key={column.id}
                                align={column.align}
                                style={{
                                  color: themeSwitch ? "#DEE4EE" : "",
                                  backgroundColor: themeSwitch ? "#1A222C" : "",
                                  fontSize: "11px",
                                  fontWeight: "normal",
                                  padding: "4px 8px",
                                }}
                              >
                                {column.format &&
                                typeof processedValue === "number"
                                  ? column.format(processedValue)
                                  : processedValue}
                              </TableCell>
                            );
                          })}
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              style={{
                color: themeSwitch ? "white" : "",
                backgroundColor: themeSwitch ? "#1A222C" : "",
              }}
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
          {/* <MaterialReactTable
            columns={columns}
            data={data}
            getRowId={(row: any) => row.id}
          /> */}
        </div>
      )}
    </>
  );
};

export default AllDeviceTable;
