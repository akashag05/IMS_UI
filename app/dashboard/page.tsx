"use client";
import React, { useEffect, useState } from "react";
// import { WidgetSelection } from "@/pages/Components/UIComponents/Modal2";
import { ToastContainer } from "react-toastify";
import { WidthProvider, Responsive } from "react-grid-layout";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";
import "../../node_modules/react-resizable/css/styles.css";
import "../../node_modules/react-grid-layout/css/styles.css";
import {
  GetDashboardWidgetsData,
  UpdateWidgetsData,
} from "../api/DashboardWidgetsAPI";
import LineChartDashboardComponent from "@/components/DashboardCharts/LineChart";
import PieChartDashboardComponent from "@/components/DashboardCharts/PieChart";
import DashboardGridWidget from "@/components/DashboardCharts/GridWidget";
import DashboardGaugeWidget from "@/components/DashboardCharts/GaugeWidget";
import { useAppContext } from "@/context/AppContext";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const [editable, setEditable] = useState(false);
  const [layouts, setLayouts] = useState<any>([]);
  const [layoutsCurrent, setLayoutsCurrent] = useState<any>([]);
  const [layoutsWholeData, setLayoutsWholeData] = useState<any>({});
  const [addToDashboard, setAddToDashboard] = useState<any>(0);
  // const { Subscribe, emit, unsubscribe } = useWebSocketContext();
  const { sidebarOpen } = useAppContext();
  function renderer(payload: any) {
    // console.log("payload",payload);
  }

  useEffect(() => {
    // Subscribe("1", "get.all", renderer);
    // return () => {
    //   unsubscribe("1", "get.all");
    // };
  }, []);

  useEffect(() => {
    // console.log(addToDashboard)
    async function getWidgetData() {
      let id = "1000000000001";
      return await GetDashboardWidgetsData(id);
    }
    getWidgetData().then((res: any) => {
      setLayouts(res.result?.widgets ?? []);
      setLayoutsCurrent(res.result?.widgets ?? []);
      setLayoutsWholeData(res.result);
    });
  }, [addToDashboard]);

  function onLayoutChange(layout: any, currentLayout: any) {
    setLayouts(currentLayout);
    // console.log("layouts - ", layouts);
  }

  function addNewWidget() {
    let num = Object.keys(layouts).length;
    // saveToLS({
    //   [num]: {
    //     i: `widget-${num + 1}`,
    //     x: 0,
    //     y: 0,
    //     w: 3,
    //     h: 2,
    //     minW: 2,
    //     maxH: 3,
    //     moved: false,
    //     static: false,
    //   },
    // });
  }

  function deleteReport(index: any) {
    let currentLayout = layouts;
    delete currentLayout[index];
    currentLayout = currentLayout.filter(Boolean);
    setLayouts(currentLayout);
    // const { [`${index}`], ...layoutsNewData } = x;
    // const { a, ...newLayouts } = widgets;
    console.log("layouts", currentLayout, index);
    // console.log("newLayouts", newLayouts);
  }

  function saveLayout() {
    setLayoutsCurrent(layouts);
    async function updateWidgetData() {
      let id = "1000000000001";
      let body = { ...layoutsWholeData, widgets: layouts };
      await UpdateWidgetsData(id, body);
    }
    updateWidgetData();
  }

  function discardLayout() {
    setLayouts(layoutsCurrent);
  }

  return (
    <>
      <ToastContainer />
      <div className={` ${sidebarOpen ? "ml-72" : "ml-20"}`}>
        <div className="text-xl border-b-2 border-slate-400 pb-2 px-4 mb-2 flex justify-between w-full items-end">
          <div>Dashboards</div>
          <div>
            {/* <button
              className="bg-blue-500 rounded p-2 ml-2 text-sm text-white"
              onClick={() => emit("get.all", {})}
            >
              Emit
            </button> */}
            {!editable && (
              <button
                className="bg-white rounded p-2 ml-2 text-sm text-black"
                onClick={() => setEditable(!editable)}
              >
                <EditIcon />
              </button>
            )}
            {editable && (
              <button
                className="bg-white rounded p-2 ml-2 text-sm text-black"
                onClick={() => {
                  saveLayout();
                  setEditable(!editable);
                }}
              >
                <DoneIcon />
              </button>
            )}
            {editable && (
              <button
                className="bg-red rounded p-2 ml-2 text-sm text-white"
                onClick={() => {
                  discardLayout();
                  setEditable(!editable);
                }}
              >
                <ClearIcon />
              </button>
            )}
          </div>
        </div>

        {/* Content of your dashboard */}
        <div>
          <ResponsiveReactGridLayout
            className="layout"
            cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
            rowHeight={30}
            isDraggable={editable}
            isResizable={editable}
            layouts={{ layouts }}
            onLayoutChange={(
              currentLayout: any,
              currentLayoutResponsive: any
            ) => onLayoutChange(currentLayout, currentLayout)}
          >
            {/* <div className="w-auto h-auto relative"> */}
            {layouts &&
              layouts?.map((data: any, index: any) => {
                return (
                  <div
                    key={layouts[index]?.i}
                    className="rounded p-2 h-auto border-2 border-sky-500  dark:bg-boxdark dark:drop-shadow-none shadow-lg relative"
                    data-grid={{
                      w: data?.w,
                      h: data?.h,
                      x: data?.x,
                      y: data?.y,
                      minW: 4,
                      minH: 10,
                    }}
                  >
                    {editable && (
                      <span
                        onClick={() => deleteReport(index)}
                        className="bg-slate-900 z-[1000] text-xs cursor-pointer rounded-full absolute -right-2 -top-2 text-white flex justify-center items-center w-5 h-5"
                      >
                        X
                      </span>
                    )}
                    <div className="h-full overflow-auto">
                      {data?.i.split("/")[2] == "chart" && (
                        <LineChartDashboardComponent
                          id={data?.i.split("/")[3]}
                          keys={data?.i}
                        />
                      )}
                      {data?.i.split("/")[2] == "topN" && (
                        <PieChartDashboardComponent
                          id={data?.i.split("/")[3]}
                          keys={data?.i}
                        />
                      )}
                      {data?.i.split("/")[2] == "grid" && (
                        <DashboardGridWidget
                          id={data?.i.split("/")[3]}
                          keys={data?.i}
                        />
                      )}
                      {data?.i.split("/")[2] == "gauge" && (
                        <DashboardGaugeWidget
                          id={data?.i.split("/")[3]}
                          keys={data?.i}
                        />
                      )}
                    </div>
                  </div>
                  // </>
                );
              })}
          </ResponsiveReactGridLayout>
        </div>
        {/* Button at the bottom left corner */}
        <div className="cursor-pointer fixed bottom-4 right-4 bg-white">
          {/* <WidgetSelection
            setAddToDashboard={setAddToDashboard}
            addToDashboard={addToDashboard}
          /> */}
        </div>
      </div>
    </>
  );
}
