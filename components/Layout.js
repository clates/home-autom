import Head from "next/head";
import DoorSummary from "../components/DoorSummary";
import LightGroups from "../components/LightGroups";
import { useEffect } from "react";
import { setWS } from "../services/subscriber";
import NavBar from "../components/NavBar";
import { useDoorSensorsContext } from "../hooks/useDoorSensors";
import { useLightGroupsContext } from "../hooks/useLightGroups";
import constants from "../constants/constants";

export default function Layout({ children }) {
  const doorSensors = useDoorSensorsContext();
  const lightGroups = useLightGroupsContext();
  useEffect(() => setWS(new WebSocket("ws://" + constants.CAMERA_WS_URI)), []);

  return (
    <div className="flex flex-col min-h-screen max-h-screen">
      <Head>
        <title>🏠🔒⚙️ Home</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta httpEquiv="refresh" content="600"></meta>
      </Head>
      <NavBar />
      <div className="flex flex-row flex-grow max-h-full overflow-y-hidden">
        {(doorSensors.length || lightGroups.length) ? (
          <div className="hidden md:inline bg-primary-light">
            <div className="w-60">
              {doorSensors.length && <DoorSummary doors={doorSensors} />}
              {lightGroups.length && <LightGroups groups={lightGroups} />}
            </div>
          </div>
        ) : null}
        <div className="flex flex-col items-center flex-grow overflow-y-scroll">
          {children}
        </div>
      </div>
      <footer className="flex items-center justify-center w-full h-10 border-t bg-secondary-dark text-secondary-light">
        Home Automation System
      </footer>
    </div>
  );
}
