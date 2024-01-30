import TokenManagement from "./components/TokenManagement";
import AccessManagement from "./components/AccessManagement";
import DownloadAndInstructions from "./components/DownloadAndInstructions";
import AppConfigurator from "./components/AppConfigurator";
import AppMonitor from "./components/AppMonitor";
import UsageStats from "./components/UsageStats";
import Contact from "./components/Contact";
import {useEffect, useState} from "react";

function Dashboard({loggedInUser, setLoggedInUser}) {

    return (
        <>
            <AccessManagement loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser}/>
            <DownloadAndInstructions/>
            <TokenManagement loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />
            <AppMonitor loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser}/>
            <AppConfigurator/>
            {/*<UsageStats/>*/}
            <Contact/>
        </>
    );
}

export default Dashboard