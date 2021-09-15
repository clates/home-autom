import Head from "next/head";
import DoorSummary from "../components/DoorSummary";
import LightGroups from "../components/LightGroups";
import { useEffect, useState } from "react";
import { setWS } from "../services/subscriber";
import NavBar from "../components/NavBar";
import { useDoorSensorsContext } from "../hooks/useDoorSensors";
import { useLightGroupsContext } from "../hooks/useLightGroups";

export default function Layout({ children }) {
    const doorSensors = useDoorSensorsContext();
    const lightGroups = useLightGroupsContext();
    useEffect(() => setWS(new WebSocket("ws://10.4.18.8:443/")), []);

    return (
        <div className="flex flex-col min-h-screen">
            <Head>
                <title>🏠🔒⚙️ Home</title>
                <link rel="icon" href="/favicon.ico" />
                <meta name="mobile-web-app-capable" content="yes" />
            </Head>
            <NavBar />
            <div className="flex flex-row flex-grow">
                <div className="bg-secondary-light">
                    <div className="w-64">
                        <DoorSummary doors={doorSensors} />
                        <LightGroups groups={lightGroups} />
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center flex-grow">
                    {children}
                </div>
            </div>
            <footer className="flex items-center justify-center w-full h-10 border-t bg-primary-dark text-secondary-light">
                Home Automation System
            </footer>
        </div>
    );
}
