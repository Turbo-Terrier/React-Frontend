import TokenManagement from "./components/TokenManagement";
import AccessManagement from "./components/AccessManagement";
import DownloadAndInstructions from "./components/DownloadAndInstructions";
import AppConfigurator from "./components/AppConfigurator";
import AppMonitor from "./components/AppMonitor";
import UsageStats from "./components/UsageStats";
import Contact from "./components/Contact";
import {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import '../css/fireworks.css'

function Dashboard({loggedInUser, setLoggedInUser}) {

    const [searchParams, setSearchParams] = useSearchParams()
    const [fireworks, setFireworks] = useState(false)

    const paymentStatus = searchParams.get("payment_status")

    useEffect(() => {
        if (paymentStatus === "success") {
            setFireworks(true)
            // todo display success message
        }
        const timer = setTimeout(() => {
            setFireworks(false)
        }, 6000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {fireworks && <div className="firework"></div>}
            {fireworks && <div className="firework"></div>}
            <AccessManagement loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser}/>
            {fireworks && <div className="firework"></div>}
            {fireworks && <div className="firework"></div>}
            <DownloadAndInstructions/>
            <TokenManagement loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />
            <AppConfigurator/>
            <AppMonitor loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser}/>
            {/*<UsageStats/>*/}
            <Contact/>
        </>
    );
}

export default Dashboard