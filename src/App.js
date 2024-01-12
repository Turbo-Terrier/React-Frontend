import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import HomeIntro from "./home/HomeIntro";
import TurboTerrierFeatures from "./home/TurboTerrierFeatures";
import ImageSlides from "./home/ImageSlides";
import Cookies from 'js-cookie';
import {useEffect, useState} from "react";

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    useEffect(() => {
        async function checkLoggedInStatus() {
            const result = await isLoggedIn();
            setLoggedIn(result);
        }
        checkLoggedInStatus();
    }, []);

    return (
        <div>
            <Header />
            <Navbar loggedIn={loggedIn} />
            <HomeIntro />
            <TurboTerrierFeatures />
            <ImageSlides />
            <Footer />
        </div>
    );
}

/**
 * @return Promise<boolean>
 */
async function isLoggedIn() {
    try {
        let access_token = Cookies.get("jwt-token");

        if (!access_token) {
            return false
        }

        let endpoint = "http://localhost:8080/api/web/v1";
        let queryUrl = endpoint + "/test-web-auth";
        const userOptions = {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${access_token}`,
            },
        };
        let result = await fetch(queryUrl, userOptions);

        return result.ok;
    } catch (error) {
        return false;
    }
}

export default App;
