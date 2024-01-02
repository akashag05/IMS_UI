import React, { createContext, useEffect, useState } from "react";

const AppContext = createContext<{
  sidebarOpen: boolean;
  toggleSideBarState: () => void;
  sidebarClick: boolean;
  toggleSideBarClickState: () => void;
  estimateCalc: boolean;
  toggleEstimateCalc: () => void;
  getTableApiState: boolean;
  togglegetTableApiState: () => void;
  getCredProfileApiState: boolean;
  togglegetCredProfileApiState: () => void;
  getDisSchedApiState: boolean;
  togglegetDisSchedApiState: () => void;
  getSNMPCatApiState: boolean;
  toggleGetSNMPCatApiState: () => void;
  getSNMPTempApiState: boolean;
  toggleGetSNMPTempApiState: () => void;
  getRoleApiState: boolean;
  toggleGetRoleApiState: () => void;
  getWidgetApiState: boolean;
  toggleWidgetApiState: () => void;
}>({
  sidebarOpen: false,
  toggleSideBarState: () => {},
  sidebarClick: false,
  toggleSideBarClickState: () => {},
  estimateCalc: false,
  toggleEstimateCalc: () => {},
  getTableApiState: false,
  togglegetTableApiState: () => {},
  getCredProfileApiState: false,
  togglegetCredProfileApiState: () => {},
  getDisSchedApiState: false,
  togglegetDisSchedApiState: () => {},
  getSNMPCatApiState: false,
  toggleGetSNMPCatApiState: () => {},
  getSNMPTempApiState: false,
  toggleGetSNMPTempApiState: () => {},
  getRoleApiState: false,
  toggleGetRoleApiState: () => {},
  getWidgetApiState: false,
  toggleWidgetApiState: () => {},
});

export const AppContextProvider: React.FC<any> = ({ children }: any) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarClick, setSidebarClick] = useState(false);
  const [estimateCalc, setEstimateCalc] = useState(false);
  const [getTableApiState, setGetTableApiState] = useState(false);
  const [getCredProfileApiState, setGetCredProfileApiState] = useState(false);
  const [getDisSchedApiState, setGetDisSchedApiState] = useState(false);
  const [getSNMPCatApiState, setGetSNMPCatApiState] = useState(false);
  const [getSNMPTempApiState, setGetSNMPTempApiState] = useState(false);
  const [getRoleApiState, setRoleApiState] = useState(false);
  const [getWidgetApiState, setGetWidgetApiState] = useState(false);

  const toggleSideBarState = () => {
    setSidebarOpen((prevState) => !prevState);
  };
  const toggleSideBarClickState = () => {
    setSidebarClick((prevState) => !prevState);
  };
  const toggleEstimateCalc = () => {
    setEstimateCalc((prevState) => !prevState);
  };
  const togglegetTableApiState = () => {
    setGetTableApiState((prevState) => !prevState);
  };
  const togglegetCredProfileApiState = () => {
    setGetCredProfileApiState((prevState) => !prevState);
  };
  const togglegetDisSchedApiState = () => {
    setGetDisSchedApiState((prevState) => !prevState);
  };
  const toggleGetSNMPCatApiState = () => {
    setGetSNMPCatApiState((prevState) => !prevState);
  };
  const toggleGetSNMPTempApiState = () => {
    setGetSNMPTempApiState((prevState) => !prevState);
  };
  const toggleGetRoleApiState = () => {
    setRoleApiState((prevState) => !prevState);
  };
  const toggleWidgetApiState = () => {
    setGetWidgetApiState((prevState) => !prevState);
  };
  // console.log("est in app",estimateCalc)

  return (
    <AppContext.Provider
      value={{
        sidebarOpen,
        toggleSideBarState,
        sidebarClick,
        toggleSideBarClickState,
        estimateCalc,
        toggleEstimateCalc,
        getTableApiState,
        togglegetTableApiState,
        getCredProfileApiState,
        togglegetCredProfileApiState,
        getDisSchedApiState,
        togglegetDisSchedApiState,
        getSNMPCatApiState,
        toggleGetSNMPCatApiState,
        getSNMPTempApiState,
        toggleGetSNMPTempApiState,
        getRoleApiState,
        toggleGetRoleApiState,
        getWidgetApiState,
        toggleWidgetApiState,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => React.useContext(AppContext);
export default function fun() {
  return null;
}
