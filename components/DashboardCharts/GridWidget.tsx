import React, { useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  MRT_RowSelectionState,
  type MRT_ColumnDef,
  MRT_Row,
} from "material-react-table";
import { makeStyles } from "@mui/styles";
import { mkConfig, generateCsv, download } from "export-to-csv";
import { useAppContext } from "@/context/AppContext";
import { useWebSocketContext } from "@/context/WebSocketContext";
import { GetWidgetsData } from "@/app/api/DashboardWidgetsAPI";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";
import {
  Checkbox,
  IconButton,
  InputBase,
  InputLabel,
  MenuItem,
  TableSortLabel,
} from "@mui/material";
import Menu from "@mui/material/Menu";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";

const DashboardGridWidget = (props: any) => {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [data, setData] = useState<any>();
  const [columns, setColumns] = useState<any>();
  const [id, setId] = useState<any>("");
  const [title, setTitle] = useState<any>("");
  const { themeSwitch } = useAppContext();
  const [rowSelection] = useState<MRT_RowSelectionState>({});
  const eventType = "ws.visualization";
  const { Subscribe, emit, unsubscribe, connection } = useWebSocketContext();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");
  const [search, setSearch] = useState("");
  const [visibleColumns, setVisibleColumns] = useState<any>([]);
  const [anchorEl, setAnchorEl] = useState(null);
  // const handleChangePage = (event: unknown, newPage: number) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   setRowsPerPage(+event.target.value);
  //   setPage(0);
  // };
  function renderer(payload: any) {
    if (props.keys.endsWith(`${payload._id}`)) {
      // console.log("payload lambda - " + props.keys, payload);
      morphData(payload);
    }
  }

  async function getWidgetData() {
    // console.log("props - ",props.id, props.keys);
    return await GetWidgetsData(props.id);
  }
  useEffect(() => {
    if (!connection) return;
    Subscribe(props.keys, eventType, renderer);
    // console.log("har kuch",props.keys, eventType);

    return () => {
      unsubscribe(props.keys, eventType);
    };
  }, [Subscribe, emit, props.id, props.keys, unsubscribe, connection]);
  useEffect(() => {
    if (!connection) return;
    getWidgetData().then((res: any) => {
      // console.log("line chart res",res, props.keys)
      setTimeout(() => {
        emit(eventType, res.result);
      }, 2000);
    });
  }, [connection]);

  // let columns: any = [];
  function morphData(data: any) {
    setTitle(data.name);
    const initialData = data?.result || [];
    const groupBy = data?.["group.by"];
    const totalGroupsKeys: any = {};
    let cols: any = [];
    cols.push({
      field: "device",
      headerName: "Device",
      minWidth: 170,
    });
    if (groupBy != "device") {
      initialData.forEach((item: any) => {
        if (!totalGroupsKeys[item?.event[groupBy]]) {
          totalGroupsKeys[item?.event[groupBy]] = true;
        }
      });
      cols.push({
        field: groupBy,
        headerName: groupBy,
        minWidth: 170,
      });
    }
    const firstData = initialData[0]?.event || 0;
    const allKeys = Object.keys(firstData);
    allKeys.filter((keys: any) => {
      if (keys != "device" && keys != groupBy) {
        cols.push({
          field: keys.replace(/\./g, "_"),
          headerName: keys.replace(/\./g, " "),
          minWidth: 170,
        });
      }
    });
    const lines: any[] = [];
    initialData.forEach((data: any, i: any) => {
      let modifiedData: any = {};
      Object.keys(data.event).map((x: any, i: any) => {
        modifiedData[`${x.replace(/\./g, "_")}`] = data.event[x];
      });
      modifiedData.id = i + data.event.device + props.keys;
      lines.push(modifiedData);
    });
    console.log("cols--", cols);
    setColumns(cols);
    setVisibleColumns(cols.map((column: any) => column.field));
    console.log("lines--", lines);
    setData(lines);
    // return lines;
  }

  const handleDialogClose = () => {
    setDialogOpen(false); // Close the dialog
  };
  useEffect(() => {
    // console.info({ rowSelection });
    // props.setBulkActionDelete(rowSelection);
  }, [props, rowSelection]);

  const handleClick = (value: string) => {
    setDialogOpen(true);
    setId(value);

    // Add your logic here
  };
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

  return (
    <>
      {data && (
        <div className="">
          <div className="flex justify-between">
            <h6
              style={{
                color: themeSwitch ? "#DEE4EE" : "",
                fontSize: "21px",
                fontWeight: "bolder",
              }}
            >
              {title}
            </h6>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                // padding: "4px",
                backgroundColor: themeSwitch ? "#24303F" : "",
                color: themeSwitch ? "white" : "",
              }}
            >
              <div className="border-b border-[#CCCFD9] flex justify-end w-fit m-2 px-2">
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
                <ViewColumnIcon onClick={handleMenuOpen} />
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
                  {columns &&
                    columns.map((column: any) => (
                      <MenuItem
                        style={{
                          backgroundColor: themeSwitch ? "#24303F" : "",
                        color: themeSwitch ? "#DEE4EE" : "",
                        fontFamily: `"Poppins", sans-serif`,
                        padding: "0px .5rem",
                        }}
                        key={column.field}
                        onClick={() => handleMenuItemClick(column.field)}
                      >
                        <Checkbox
                        style={{
                          padding: "0 .5rem",
                          color: themeSwitch ? "#DEE4EE" : "",
                        }}
                          checked={visibleColumns.includes(column.field)}
                          onChange={() => handleMenuItemClick(column.field)}
                        />
                        {column.headerName}
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
                    {columns &&
                      columns
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
                                padding : "8px",
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
                                  .map(
                                    (word: any) =>
                                      word.charAt(0).toUpperCase() +
                                      word.slice(1)
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
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.code}
                      >
                        {columns &&
                          columns
                            .filter((column: any) =>
                              visibleColumns.includes(column.field)
                            )
                            .map((column: any) => {
                              const value = row[column.field];
                              return (
                                <TableCell
                                  key={column.id}
                                  align={column.align}
                                  style={{
                                    color: themeSwitch ? "#DEE4EE" : "",
                                    backgroundColor: themeSwitch
                                      ? "#1A222C"
                                      : "",
                                    fontSize: "11px",
                                    fontWeight: "normal",
                                    padding: "8px"
                                  }}
                                >
                                  {column.format && typeof value === "number"
                                    ? column.format(value)
                                    : value}
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
      {/* <DeviceDetilsModal
    handleDialogClose={handleDialogClose}
    open={dialogOpen}
    id={id}
  /> */}
    </>
  );
};

export default DashboardGridWidget;
