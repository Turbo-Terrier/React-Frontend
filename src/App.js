import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./home/Home";
import {Routes, Route, useSearchParams} from "react-router-dom";
import Dashboard from "./dashboard/Dashboard";
import TOS from "./TOS";
import Privacy from "./Privacy";
import Refunds from "./Refunds";
import {ErrorPage, ErrorType} from "./ErrorPage";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import {useEffect, useState} from "react";
import Cookies from "js-cookie";


function App() {
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams()

    const authCode = new UserAuth(
        searchParams.get("code"),
        searchParams.get("scope"),
        searchParams.get("authuser"),
        searchParams.get("prompt")
    )

    useEffect(() => {
        async function checkLoggedInStatus() {
            const result = await isLoggedIn();
            if (result.ok) {
                let json_resp = await result.json()
                setLoggedInUser(json_resp)
            } else {
                setLoggedInUser(null);
            }
        }
        async function doRegisteration() {
            const result = await register(authCode)
            if (result.ok) {
                let json_resp = await result.json()
                const expirationDate = new Date();
                expirationDate.setDate(expirationDate.getDate() + 30);
                Cookies.set("jwt-token", json_resp['jwt_cookie'], { expires: expirationDate, path: '/' })
                // todo reroute to DashBoard
                window.location.href = "/"
            } else {
                window.location.href = "/"
            }
        }

        if (authCode.code && authCode.scope && authCode.authuser && authCode.prompt) {
            doRegisteration();
        } else {
            checkLoggedInStatus();
        }

    }, []);

    return (
        <>
            <Header />
            <Navbar loggedIn={loggedInUser != null} />
            <Routes path={"/"}>
                <Route index element={<Home/>} />
                <Route path={'/dashboard'} element={loggedInUser != null ? <Dashboard loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser}/> : <ErrorPage error_type={ErrorType.UNAUTHORIZED}/>} />
                <Route path={'/tos'} element={<TOS/>} />
                <Route path={'/privacy'} element={<Privacy/>} />
                <Route path={'/refunds'} element={<Refunds/>} />
                <Route path="*" element={<ErrorPage error_type={ErrorType.NOT_FOUND} />} />
            </Routes>
            <Footer />
        </>
    )
}

class UserAuth {
    constructor(code, scope, authuser, prompt) {
        this.code = code
        this.scope = scope
        this.authuser = authuser
        this.prompt = prompt
    }
}

async function register(userAuth) {
    const userOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Accept-Encoding": "gzip, deflate, br"
        },
        body: JSON.stringify(userAuth)
    };
    let result = await fetch("http://localhost:8080/api/web/v1/register", userOptions);

    return result;
}

async function isLoggedIn() {
    let access_token = Cookies.get("jwt-token");

    if (!access_token) {
        return false
    }

    let endpoint = "http://localhost:8080/api/web/v1";
    let queryUrl = endpoint + "/profile-info";
    const userOptions = {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: access_token,
        },
    };
    let result = await fetch(queryUrl, userOptions);

    return result;
}

export default App;
