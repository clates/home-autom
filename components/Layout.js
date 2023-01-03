import Head from "next/head";
import DoorSummary from "../components/DoorSummary";
import DoorSummaryHoriz from "../components/DoorSummaryHoriz";
import LightGroups from "../components/LightGroups";
import NavBar from "../components/NavBar";
import { useDoorSensorsContext } from "../hooks/useDoorSensors";
import { useLightGroupsContext } from "../hooks/useLightGroups";

const HORIZ_DOORS = true;

export default function Layout({ children }) {
  const doorSensors = useDoorSensorsContext();
  const lightGroups = useLightGroupsContext();

  return (
    <div className="flex max-h-screen min-h-screen flex-col">
      <Head>
        <title>🏠🔒⚙️ Home</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="mobile-web-app-capable" content="yes" />
        {/* <meta httpEquiv="refresh" content="600"></meta> */}
      </Head>
      <NavBar />
      {HORIZ_DOORS ? <DoorSummaryHoriz doors={doorSensors} /> : null}

      <div className="flex max-h-full flex-grow flex-row overflow-y-hidden">
        {!HORIZ_DOORS && (doorSensors.length || lightGroups.length) ? (
          <div className="hidden bg-primary-light md:inline">
            <div className="w-60">
              <DoorSummary doors={doorSensors} />
              <LightGroups groups={lightGroups} />
            </div>
          </div>
        ) : null}
        <div className="flex flex-grow flex-col items-center overflow-y-scroll">
          {children}
        </div>
      </div>
      <footer className="flex h-10 w-full items-center justify-center border-t bg-secondary-dark text-secondary-light">
        Home Automation System
      </footer>
    </div>
  );
}
