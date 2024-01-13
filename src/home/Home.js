import {useEffect, useState} from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HomeIntro from "./components/HomeIntro";
import TurboTerrierFeatures from "./components/TurboTerrierFeatures";
import ImageSlides from "./components/ImageSlides";
import Pricing from './components/Pricing'
import Faq from "./components/FAQ";
import Cookies from 'js-cookie';
import {useSearchParams} from "react-router-dom";

function Home() {
    const [searchParams, setSearchParams] = useSearchParams()

    searchParams.get()

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
            <Pricing />
            <Faq />
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

export default Home