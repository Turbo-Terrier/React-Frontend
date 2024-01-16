import TokenManagement from "./components/TokenManagement";
import AccessManagement from "./components/AccessManagement";
import DownloadAndInstructions from "./components/DownloadAndInstructions";
import AppConfigurator from "./components/AppConfigurator";
import UsageStats from "./components/UsageStats";
import Contact from "./components/Contact";
import {useEffect, useState} from "react";

function Dashboard({loggedInUser, setLoggedInUser}) {

    return (
        <>
            <TokenManagement loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />
            <AccessManagement loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser}/>
            <DownloadAndInstructions/>
            <AppConfigurator/>
            {/*<AppMonitoring/>*/}
            {/*<UsageStats/>*/}
            <Contact/>
        </>
    );
}

export default Dashboard