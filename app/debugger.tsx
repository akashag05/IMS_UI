import React, { useEffect, useState } from "react";
// import CustomeInput from "../Components/UIComponents/Input";
// import CustomeButtons from "../Components/UIComponents/Buttons";
import { baseURL } from "@/constants";
// import ReactJson from "react-json-view";
import { Grid, TextField } from "@mui/material";
import { useWebSocketContext } from "@/context/WebSocketContext";

interface SocketDebugger2Props {}

const SocketDebugger2: React.FC<SocketDebugger2Props> = (props: any) => {
  const { emit } = useWebSocketContext();
  const [eventBus, setEventBus] = useState<any | null>(null);
  const [eventType, setEventType] = useState("get.all");
  // const [payload, setPayload] = useState("{}");
  const [payload, setPayload] = useState<any>({});
  // '{"name": "rew","description": "sds","widget.type": "chart","granularity": "fifteen_minute","datasource": "snmp_interface","object.type": "interface","plugin.type": "snmp","indicators": [{"indicator": "interface.out.packets","aggregation": "MAX","indicator_type": "metric"}],"group.by": "device","limit": 12,"time.range": "this.year","entity.type": "device","entities": [610691611564624]}'
  const [queryOutput, setQueryOutput] = useState<string>("");

  useEffect(() => {}, []);

  const submit = () => {
    console.log("submitting context: " + payload);
    // emit({
    //   "event.type": eventType,
    //   ...JSON.parse(payload),
    //   userName: "admin",
    // });
    // newEventBus.send("websocket.to.server", {
    //   "event.type": eventType,
    //   ...JSON.parse(payload),
    //   userName: "admin",
    // });
    // newEventBus.send("websocket.to.server", {
    // "event.type": "ws.visualization",
    // payload,
    // ...JSON.parse(payload),
    // "query.id": 12344534535,
    // userName: "admin",
    // });
  };

  const clearBtn = () => {
    setQueryOutput("");
  };

  const handleEvent = (event: any) => {
    setEventType(event.target.value);
  };
  const handlePayload = (event: any) => {
    setPayload(event.target.value);
  };

  return (
    <div className="flex flex-col">
      <div className="flex">
        <input
          type="text"
          //   label="Event Type"
          value={eventType}
          onChange={handleEvent}
          required
          disabled={false}
        />
        <div className="flex">
          <button onClick={submit}>sbmit</button>
          <button onClick={clearBtn}>clear</button>
        </div>
      </div>

      <Grid item xs={12} className="h-full overflow-hidden">
        <Grid container spacing={2}>
          <Grid item lg={6} md={6} sm={6} xs={6}>
            <div>{/* <CustomeButtons title="Get.All" /> */}</div>
            <TextField
              className="bg-white h-full"
              onChange={handlePayload}
              id="paylod-id"
              label="JSON Payload"
              multiline
              fullWidth
              rows={32}
            />
          </Grid>
          <Grid item lg={6} md={6} sm={6} xs={6}>
            <div>
              <h1>Querry Output</h1>
              {payload}
            </div>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};
{
  /* <ReactJson src={recievedData} name={null} displayDataTypes={false} /> */
}

export default SocketDebugger2;
