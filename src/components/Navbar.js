import '../css/navbar-centered-dark.css'
import {useEffect, useState} from "react";
import LoginModal from "./LoginModal";
import Cookies from "js-cookie";
import {Link} from "react-router-dom";
import {scroller} from "react-scroll";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

function Navbar(props) {

    let loggedIn = props.loggedIn
    const [openedModal, setOpenedModal] = useState(false);

    function logout() {
        Cookies.set("jwt-token", "", { expires: 0, path: '/' })
        window.location.href = "/"
    }

    return (
        <div>
            <LoginModal hook={[openedModal, setOpenedModal]} />
            <nav className="navbar navbar-expand-md bg-dark py-3" data-bs-theme="dark">
                <div className="container">
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navcol-6"
                    >
                        <span className="visually-hidden">Toggle navigation</span>
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse flex-grow-0 order-md-first" id="navcol-6">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item" style={{ paddingRight: '16px', paddingLeft: '16px' }}>
                                <Link className="nav-link active" to="/">
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item" style={{ paddingRight: '16px', paddingLeft: '16px' }}>
                                <Link className="nav-link" to="/" onClick={() => {
                                    setTimeout(() => {
                                        scroller.scrollTo('pricing', {
                                            smooth: true,
                                            duration: 200,
                                        });
                                    }, 100)
                                }}>
                                    Pricing
                                </Link>
                            </li>
                            <li className="nav-item" style={{ paddingLeft: '16px' }}>
                                <Link className="nav-link" to="/" onClick={() => {
                                    setTimeout(() => {
                                        scroller.scrollTo('faq', {
                                            smooth: true,
                                            duration: 200,
                                        });
                                    }, 100)
                                }}>
                                    FAQ
                                </Link>
                            </li>
                        </ul>
                        <div className="d-md-none my-2">
                            {loggedIn ? (<Link className="btn btn-light me-2" role="button" to="/dashboard" style={{ borderRadius: '5px' }}>Dashboard</Link>) : ""}
                            <button className="btn btn-secondary" type="button" onClick={() => loggedIn ? logout() : setOpenedModal(true)}>
                                {loggedIn ? 'Logout' : 'Login/Register'}
                            </button>
                        </div>
                    </div>
                    <div className="d-none d-md-block">
                        {loggedIn ? (<Link className="btn btn-light me-2" role="button" to="/dashboard" style={{ borderRadius: '5px' }}>Dashboard</Link>) : ""}
                        <a className="btn btn-secondary" role="button" href="#" style={{ borderRadius: '5px' }} onClick={() => loggedIn ? logout() : setOpenedModal(true)}>
                            {loggedIn ? 'Logout' : 'Login/Register'}
                        </a>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
