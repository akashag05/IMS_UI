import React, { useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  MRT_RowSelectionState,
  type MRT_ColumnDef,
  MRT_Row,
} from "material-react-table";
import { makeStyles } from "@mui/styles";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { mkConfig, generateCsv, download } from "export-to-csv";
import { useAppContext } from "@/context/AppContext";
import { useWebSocketContext } from "@/context/WebSocketContext";
import { GetWidgetsData } from "@/app/api/DashboardWidgetsAPI";
import { colors, createTheme, ThemeProvider, useTheme } from "@mui/material";
const DashboardGridWidget = (props: any) => {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [data, setData] = useState<any>();
  const [columns, setColumns] = useState<any>();
  const [id, setId] = useState<any>("");
  const [title, setTitle] = useState<any>("");
  const { getTableApiState, togglegetTableApiState, themeSwitch } =
    useAppContext();
  const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});
  const eventType = "ws.visualization";
  const { Subscribe, emit, unsubscribe, connection } = useWebSocketContext();
  // console.log("props.keys", props);
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
      // size: 150,
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
        // size: 150,
      });
    }
    const firstData = initialData[0]?.event || 0;
    const allKeys = Object.keys(firstData);
    allKeys.filter((keys: any) => {
      if (keys != "device" && keys != groupBy) {
        cols.push({
          field: keys.replace(/\./g, "_"),
          headerName: keys.replace(/\./g, " "),
          width: 150,
        });
      }
    });
    // console.log("index", indexes);
    const lines: any[] = [];
    initialData.forEach((data: any, i: any) => {
      let modifiedData: any = {};
      Object.keys(data.event).map((x: any, i: any) => {
        modifiedData[`${x.replace(/\./g, "_")}`] = data.event[x];
      });
      modifiedData.id = i + data.event.device + props.keys;
      lines.push(modifiedData);
    });
    setColumns(cols);
    setData(lines);
    // return lines;
  }

  // useEffect(() => {
  //   let response = morphData(props.data);
  //   setData(response);
  // }, [props.data]);

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

  const csvConfig = mkConfig({
    fieldSeparator: ",",
    decimalSeparator: ".",
    useKeysAsHeaders: true,
  });
  const handleExportData = () => {
    const csv = generateCsv(csvConfig)(data);
    download(csvConfig)(csv);
  };
  const handleExportRows = (rows: MRT_Row<any>[]) => {
    const rowData = rows.map((row) => row.original);
    const csv = generateCsv(csvConfig)(rowData);
    download(csvConfig)(csv);
  };
  const useStyles = makeStyles((theme: any) => ({
    paginationText: {
      color: themeSwitch ? "white" : "black",
    },
  }));
  const classes = useStyles();
  // console.log("DATA JHADU","keys",props.keys, columns, data);
  return (
    <>
      {data && (
        <div className="">
          <h6 className="my-2">{title}</h6>
          {/* <MaterialReactTable
            columns={columns}
            data={data}
            getRowId={(row: any) => row.id}
          /> */}
          <DataGrid
            rows={data}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            className={classes.paginationText}
            style={{ color: themeSwitch ? "white" : "" }}
            pageSizeOptions={[5, 10]}
            // checkboxSelection
          />
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