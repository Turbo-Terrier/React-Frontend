import '../css/navbar-centered-dark.css'
import {useEffect, useState} from "react";
import LoginModal from "./LoginModal";

function Navbar(props) {

    let loggedIn = props.loggedIn
    const [openedModal, setOpenedModal] = useState(false);

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
                            <li className="nav-item" id="home" style={{ paddingRight: '16px', paddingLeft: '16px' }}>
                                <a className="nav-link active" href="#">
                                    Home
                                </a>
                            </li>
                            <li className="nav-item" style={{ paddingRight: '16px', paddingLeft: '16px' }}>
                                <a className="nav-link" id="pricing" href="#">
                                    Pricing
                                </a>
                            </li>
                            <li className="nav-item" style={{ paddingLeft: '16px' }}>
                                <a className="nav-link" id="faq" href="#">
                                    FAQ
                                </a>
                            </li>
                        </ul>
                        //this button is for mobile
                        <div className="d-md-none my-2">
                            <button className="btn btn-primary" type="button" onClick={() => setOpenedModal(true)}>
                                {loggedIn ? 'Logout' : 'Login'}
                            </button>
                        </div>
                    </div>
                    <div className="d-none d-md-block">
                        {loggedIn ? (<a className="btn btn-light me-2" role="button" href="#" style={{ borderRadius: '5px' }}>Dashboard</a>) : ""}
                        <a className="btn btn-primary" role="button" href="#" style={{ borderRadius: '5px' }} onClick={() => setOpenedModal(true)}>
                            {loggedIn ? 'Logout' : 'Login'}
                        </a>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
