import TokenManagement from "./components/TokenManagement";
import AccessManagement from "./components/AccessManagement";
import DownloadAndInstructions from "./components/DownloadAndInstructions";
import Watchdog from "./components/Watchdog";
import UsageStats from "./components/UsageStats";
import Contact from "./components/Contact";

function Dashboard({loggedInUser, setLoggedInUser}) {
    return (
        <>
            <TokenManagement loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />
            <AccessManagement/>
            <DownloadAndInstructions/>
            <Watchdog/>
            <UsageStats/>
            <Contact/>
        </>
    );
}

export default Dashboard