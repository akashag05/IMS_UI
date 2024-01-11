import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SidebarLinkGroup from "./SidebarLinkGroup";
import Image from "next/image";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DataSaverOffIcon from "@mui/icons-material/DataSaverOff";
import Person2Icon from "@mui/icons-material/Person2";
import DynamicFormIcon from "@mui/icons-material/DynamicForm";
import SettingsIcon from "@mui/icons-material/Settings";
import AssignmentIcon from "@mui/icons-material/Assignment";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import DevicesIcon from "@mui/icons-material/Devices";
import { useAppContext } from "@/context/AppContext";
// interface SidebarProps {
//   sidebarOpen: boolean;

//   setSidebarOpen: (arg: boolean) => void;
// }

const Sidebar = () => {
  const pathname = usePathname();
  const { sidebarClick, sidebarOpen, toggleSideBarState } = useAppContext();
  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  let storedSidebarExpanded = "true";
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      // setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      // setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);
  console.log(open);
  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark  lg:translate-x-0 ${
        sidebarOpen ? "w-72" : "w-20"
      }`}
      // onMouseEnter={() => setSidebarOpen(true)}
      // onMouseLeave={() => setSidebarOpen(false)}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 pt-1.3 border-b-2">
        <Link href="/" className="flex">
          <Image
            width={32}
            height={32}
            src={"/images/logo/logo-icon.svg"}
            alt="Logo"
            className={`${!sidebarOpen && " my-6"}`}
          />
          {sidebarOpen && (
            <div className="flex">
              <p
                className="mx-4 my-6 font-semibold text-2xl text-white"
                style={{
                  // background: "#0BBCB2",
                  background:
                    "linear-gradient(to right, #0BBCB2 0%, #BCFB40 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                IMS
              </p>

              {/* <div className=" my-6 justify-end">
                <MenuIcon />
              </div> */}
            </div>
          )}
        </Link>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div
        className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear"
        onMouseEnter={() => !sidebarClick && toggleSideBarState()}
        onMouseLeave={() => !sidebarClick && toggleSideBarState()}
      >
        {/* <!-- Sidebar Menu --> */}
        <nav className="pb-4 px-4 lg:mt-3 lg:px-4 lg:mx-2">
          {/* <!-- Menu Group --> */}
          <div>
            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Menu Item Dashboard --> */}
              <SidebarLinkGroup
                activeCondition={pathname.includes("dashboard")}
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <Link
                        href="/dashboard"
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-1 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                          pathname.includes("dashboard") &&
                          "bg-graydark dark:bg-meta-4"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <DashboardIcon />
                        {sidebarOpen && (
                          <>
                            Dashboard
                            {/* <svg
                              className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                                open && "rotate-180"
                              }`}
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                                fill=""
                              />
                            </svg> */}
                          </>
                        )}
                      </Link>
                      {/* <!-- Dropdown Menu Start --> */}
                      {/* <div
                        className={`translate transform overflow-hidden ${
                          !open && "hidden"
                        }`}
                      >
                        <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                          <li>
                            <Link
                              href="/"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "/" && "text-white"
                              } `}
                            >
                              Dashboard 1
                            </Link>
                          </li>
                        </ul>
                      </div> */}
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* <!-- Menu Item Dashboard --> */}

              {/* <!-- Menu Item Calendar --> */}
              <li>
                <Link
                  href="/calendar"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-1 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("calendar") &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <EqualizerIcon />
                  {sidebarOpen && <>Metric Explorer</>}
                </Link>
              </li>
              {/* <!-- Menu Item Calendar --> */}

              {/* <!-- Menu Item Profile --> */}
              <li>
                <Link
                  href="/profile"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-1 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("profile") && "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <DataSaverOffIcon />
                  {sidebarOpen && <>Flow Explorer</>}
                </Link>
              </li>
              {/* <!-- Menu Item Profile --> */}

              {/* <!-- Menu Item Profile --> */}
              <li>
                <Link
                  href="/deviceManager"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-1 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("deviceManager") && "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <DevicesIcon />
                  {sidebarOpen && <>Device Manager</>}
                </Link>
              </li>
              {/* <!-- Menu Item Profile --> */}

              {/* <!-- Menu Item Alerting --> */}
              <SidebarLinkGroup
                activeCondition={
                  pathname === "/forms" || pathname.includes("forms")
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <Link
                        href="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-1 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                          (pathname === "/forms" ||
                            pathname.includes("forms")) &&
                          "bg-graydark dark:bg-meta-4"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <NotificationsActiveIcon />
                        {sidebarOpen && (
                          <>
                            Alerting
                            <svg
                              className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                                open && "rotate-180"
                              }`}
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                                fill=""
                              />
                            </svg>
                          </>
                        )}
                      </Link>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && "hidden"
                        }`}
                      >
                        <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                          <li>
                            <Link
                              href="#"
                              className={`first-letter:group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "#" && "text-white"
                              }`}
                            >
                              Live
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/forms/form-layout"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "/forms/form-layout" &&
                                "text-white"
                              }`}
                            >
                              Explorer
                            </Link>
                          </li>
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* <!-- Menu Item Alerting --> */}

              {/* <!-- Menu Item Audit --> */}
              <li>
                <Link
                  href="/profile"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-1 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("profile") && "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <AssignmentIcon />
                  {sidebarOpen && <>Audit</>}
                </Link>
              </li>
              <li>
                <Link
                  href="/settings"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-1 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("settings") &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <ManageAccountsIcon />
                  {sidebarOpen && <>Settings</>}
                </Link>
              </li>
              {/* <!-- Menu Item Audit --> */}
            </ul>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;
