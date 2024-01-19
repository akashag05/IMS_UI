"use client";
import { Metadata } from "next";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useWebSocketContext } from "../context/WebSocketContext";
import React from "react";
import SignIn from "./auth/signin/page";
import Head from "next/head";
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
      {/* <Head>
        <style>
          @import
          url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap')
        </style>
      </Head> */}
      <ToastContainer />
      {/* <ECommerce /> */}
      <SignIn />
    </>
  );
}
