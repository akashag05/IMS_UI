"use client";
import "./globals.css";
import "./data-tables-css.css";
import "./satoshi.css";
import { useState, useEffect } from "react";
import Loader from "@/components/common/Loader";
import "react-toastify/dist/ReactToastify.css";
import WebSocketContextProvider from "../context/WebSocketContext";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import SignIn from "./auth/signin/page";
import { AppContextProvider } from "@/context/AppContext";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const isRootPath = pathname === "/";
  const [loading, setLoading] = useState<boolean>(true);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <AppContextProvider>
      <WebSocketContextProvider>
        <html lang="en">
          <body suppressHydrationWarning={true}>
            {/* {loggedIn ? ( */}
            <div className="dark:bg-boxdark-2 dark:text-bodydark">
              {loading ? (
                <Loader />
              ) : (
                <div className="flex h-screen overflow-hidden">
                  {/* <!-- ===== Sidebar Start ===== --> */}
                  {!isRootPath && <Sidebar />}
                  {/* <!-- ===== Sidebar End ===== --> */}

                  {/* <!-- ===== Content Area Start ===== --> */}
                  <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                    {/* <!-- ===== Header Start ===== --> */}
                    {!isRootPath && <Header />}
                    {/* <!-- ===== Header End ===== --> */}

                    {/* <!-- ===== Main Content Start ===== --> */}
                    <main>
                      <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                        {children}
                      </div>
                    </main>
                    {/* <!-- ===== Main Content End ===== --> */}
                  </div>
                  {/* <!-- ===== Content Area End ===== --> */}
                </div>
              )}
            </div>
            {/* // ) : (
          //   <SignIn />
          // )} */}
          </body>
        </html>
      </WebSocketContextProvider>
    </AppContextProvider>
  );
}
