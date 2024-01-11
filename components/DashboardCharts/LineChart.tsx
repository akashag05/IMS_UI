import React, { useEffect, useRef, useState } from "react";
import Highcharts from "highcharts";
import NoDataToDisplay from "highcharts/modules/no-data-to-display";
import HighchartsExporting from "highcharts/modules/exporting";
import HighchartsExportData from "highcharts/modules/export-data";
import HighchartsAccessibility from "highcharts/modules/accessibility";
import moment from "moment";
import { useWebSocketContext } from "@/context/WebSocketContext";
import { GetWidgetsData } from "@/app/api/DashboardWidgetsAPI";
import useColorMode from "@/hooks/useColorMode";
import { useAppContext } from "@/context/AppContext";

const LineChartDashboardComponent = (props: any) => {
  const { themeSwitch } = useAppContext();

  useEffect(() => {
    HighchartsExporting(Highcharts);
    HighchartsExportData(Highcharts);
    HighchartsAccessibility(Highcharts);
    NoDataToDisplay(Highcharts);
  }, []);

  const options = {
    // Chart configuration options
    // ...
  };
  const eventType = "ws.visualization";
  const [data, setData] = useState<any>();
  const { Subscribe, emit, unsubscribe, connection } = useWebSocketContext();
  // console.log("props.keys", props);
  function renderer(payload: any) {
    if (props.keys.endsWith(`${payload._id}`)) {
      console.log("payload - " + props.keys, payload);
      setData(payload);
    }
  }
  async function getWidgetData() {
    // console.log("props - ",props.id, props.keys);
    return await GetWidgetsData(props.id);
  }
  useEffect(() => {
    // console.log(props.keys, eventType)
    if (!connection) return;
    Subscribe(props.keys, eventType, renderer);

    return () => {
      unsubscribe(props.keys, eventType);
    };
  }, [Subscribe, emit, props.id, props.keys, unsubscribe, connection]);
  useEffect(() => {
    if (!connection) return;

    getWidgetData().then((res: any) => {
      // console.log("line chart res",res, props.keys)
      emit(eventType, res.result);
    });
  }, [connection]);

  const chartContainer = useRef(null);

  // const [colorMode, setColorMode] = useState("none");

  // const handleColorModeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const newColorMode = e.target.value;
  //   setColorMode(newColorMode);

  //   const container = document.getElementById("container");
  //   if (container) {
  //     container.className =
  //       newColorMode === "none" ? "" : `highcharts-${newColorMode}`;
  //   }
  // };

  const morphData = (data: any) => {
    const initialData = data?.result || [];
    const groupBy = data?.["group.by"];
    const totalGroupsKeys: any = {};
    if (groupBy != "device") {
      initialData.filter((item: any) => {
        if (!totalGroupsKeys[item?.event[groupBy]]) {
          totalGroupsKeys[item?.event[groupBy]] = true;
        }
      });
    }
    // console.log("totalGroupsKeys", totalGroupsKeys);
    const devices = Array.from(
      new Set(initialData.map((item: any) => item?.event?.device))
    );
    const firstData = initialData[0]?.event || {};
    const allKeys = Object.keys(firstData);
    const indexes = Array.from(
      new Set(
        allKeys.filter((keys: any) => {
          if (keys != "device" && keys != groupBy) {
            return keys;
          }
        })
      )
    );
    const lines: any[] = [];
    devices.forEach((device: any) => {
      indexes.forEach((index: any, i: any) => {
        if (groupBy != "device") {
          Object.keys(totalGroupsKeys).forEach((key: any, i: any) => {
            const data = initialData
              .filter(
                (item: any) =>
                  item?.event?.device === device && item?.event[groupBy] == key
              )
              .map((item: any) => [
                moment(item?.timestamp).format("lll"),
                parseInt(`${item?.event?.[index]}`),
              ]);
            const legendName =
              groupBy == "device"
                ? device + "-" + index
                : device +
                  "-" +
                  groupBy +
                  `(${initialData[i]?.event[groupBy]})` +
                  "-" +
                  index;
            lines.push({ name: legendName, data: data });
          });
        } else {
          const data = initialData
            .filter((item: any) => item?.event?.device === device)
            .map((item: any) => [
              moment(item?.timestamp).format("lll"),
              parseInt(`${item?.event?.[index]}`),
            ]);
          const legendName =
            groupBy == "device"
              ? device + "-" + index
              : device +
                "-" +
                groupBy +
                `(${initialData[i]?.event[groupBy]})` +
                "-" +
                index;
          lines.push({ name: legendName, data: data });
        }
      });
    });
    // console.log("lines", lines);
    return lines;
  };
  useEffect(() => {
    if (chartContainer.current && data) {
      // console.log(themeSwitch);
      const newData: any = morphData(data);
      const themeBackgroundColor = themeSwitch && "#1D2530";
      const themetextColor = themeSwitch && "white";
      const options: any = {
        chart: {
          animation: false,
          zoomType: "x",
          // backgroundColor: themeBackgroundColor,
          style: {
            borderRadius: "10px", // Set the border radius
          },
        },
        title: {
          text: data.name || "",
          align: "left",
          style: {
            fontWeight: "bold",
            fontSize: "14px",
            // color: themetextColor,
          },
        },
        credits: {
          enabled: false,
        },
        tooltip: {
          crosshairs: true,
          animation: true,
          shared: true,
        },

        yAxis: {
          title: {
            text: "",
          },
          labels: {
            style: {
              // color: themetextColor,
            },
          },
        },

        xAxis: {
          title: {
            text: "",
          },
          labels: {
            style: {
              // color: themetextColor,
            },
          },
          type: "category",
          tickPixelInterval: 55,
        },
        legend: {
          enabled: true,
          layout: "horizontal",
          align: "center",
          verticalAlign: "bottom",
          itemStyle: {
            fontSize: "10px", // Adjust font size of legends
            // color: themetextColor, // Set the text color to white
          },

          itemWidth: 150, // Set the width of each legend item
          itemDistance: 5,
        },

        noData: {
          style: {
            fontWeight: "bold",
            fontSize: "15px",
            color: "#303030",
          },
        },
        lang: {
          noData: "No Data to Display",
        },
        plotOptions: {
          series: {
            label: {
              connectorAllowed: false,
            },
          },
        },

        series: newData,
      };

      Highcharts.chart(chartContainer.current, options);
    }
  }, [data, props.id]);

  return (
    <>
      <div
        id="container"
        className={` ${themeSwitch ? "highcharts-light" : "highcharts-dark"}`}
      ></div>
      <div
        className="p-2"
        // className={`p-2 ${
        //   themeSwitch ? "highcharts-light" : "highcharts-dark"
        // }`}
        id={props.keys}
        ref={chartContainer}
      />
      ;
    </>
  );
};

export default LineChartDashboardComponent;
