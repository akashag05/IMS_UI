"use client";
import ECommerce from "@/app/dashboard/page";
import { Metadata } from "next";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useWebSocketContext } from "../context/WebSocketContext";
import React from "react";
import SignIn from "./auth/signin/page";
export const metadata: Metadata = {
  title: "TailAdmin | Next.js E-commerce Dashboard Template",
  description: "This is Home Blog page for TailAdmin Next.js",
  // other metadata
};

export default function Home() {
  const { Subscribe, unsubscribe, connection } = useWebSocketContext();
  // Get
  React.useEffect(() => {
    // console.log("out");
    if (connection) {
      Subscribe("global1", "ws.alert.notification", render);
      // console.log("in");
    }
    return () => {
      unsubscribe("global1", "ws.alert.notification");
    };
  }, [connection]);

  function render(payload: any) {
    console.log("Toast content", payload);
    toast.error(payload.context.severity, {
      position: "top-right",
      autoClose: 1000,
    });
  }
  return (
    <>
      {/* <ToastContainer /> */}
      {/* <ECommerce /> */}
      <SignIn />
    </>
  );
}
