import '../css/navbar-centered-dark.css'
import {useState} from "react";
import LoginModal from "./LoginModal";
import Cookies from "js-cookie";
import {Link} from "react-router-dom";
import {scroller} from "react-scroll";
import Button from "react-bootstrap/Button";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Row, Col} from "react-bootstrap";
import Container from "react-bootstrap/Container";

function NavbarHeading({loggedInUser}) {

    let loggedIn = loggedInUser != null
    const [openedModal, setOpenedModal] = useState(false);

    function logout() {
        Cookies.set("jwt-token", "", { expires: 0 })
        window.location.href = "/"
    }

    return (
        <div>
            <LoginModal hook={[openedModal, setOpenedModal]} />
            <Navbar expand="md" bg="dark" variant="dark" style={{ padding: '0px' }}>
                <Navbar.Toggle aria-controls="navcol-6" className="m-3 ml-4" />
                <Navbar.Collapse id="navcol-6">
                    <Container>
                        <Row className="g-0 row-cols-1 row-cols-md-2" style={{ width: '100%' }}>
                            <Col className="d-md-flex justify-content-md-start align-items-md-center">
                                <Nav className="navbar-nav d-xl-flex me-auto justify-content-xl-start align-items-xl-center">
                                    <Nav.Item className="nav-item d-md-flex align-items-md-center" style={{ paddingRight: '16px', paddingLeft: '16px' }}>
                                        <Link className="nav-link active d-flex align-items-center" to="/">
                                            Home
                                        </Link>
                                    </Nav.Item>
                                    <Nav.Item className="nav-item d-md-flex align-items-md-center" style={{ paddingRight: '16px', paddingLeft: '16px' }}>
                                        <Link className="nav-link d-flex align-items-center" to="/" onClick={() => {
                                            setTimeout(() => {
                                                scroller.scrollTo('pricing', {
                                                    smooth: true,
                                                    duration: 200,
                                                });
                                            }, 100)
                                        }}>
                                            Pricing
                                        </Link>
                                    </Nav.Item>
                                    <Nav.Item className="nav-item d-md-flex align-items-md-center" style={{ paddingLeft: '16px' }}>
                                        <Link className="nav-link d-flex align-items-center" to="/" onClick={() => {
                                            setTimeout(() => {
                                                scroller.scrollTo('faq', {
                                                    smooth: true,
                                                    duration: 200,
                                                });
                                            }, 100)
                                        }}>
                                            FAQ
                                        </Link>
                                    </Nav.Item>
                                </Nav>
                            </Col>
                            <Col className="d-md-flex justify-content-md-end align-items-md-center">
                                <Nav className="navbar-nav d-md-flex d-xl-flex align-items-md-center justify-content-xl-end">
                                    {loggedIn && (
                                        <Nav.Item style={{ paddingLeft: '16px' }}>
                                            <Button variant="light" className="me-1 my-3" role="button" style={{ borderRadius: '5px' }}>
                                                <Link className="text-decoration-none text-dark" role="button" to="/dashboard" style={{ borderRadius: '5px' }}>Dashboard</Link>
                                            </Button>
                                        </Nav.Item>
                                    )}
                                    <Nav.Item style={{ paddingLeft: '16px' }}>
                                        <Button variant="secondary" className="me-3 my-3" role="button" style={{ borderRadius: '5px' }} onClick={() => loggedIn ? logout() : setOpenedModal(true)}>
                                            {loggedIn ? 'Logout' : 'Login/Register'}
                                        </Button>
                                    </Nav.Item>
                                    {loggedIn && (
                                        <Nav.Item className="d-flex d-md-flex align-items-center align-items-md-center justify-content-xl-center" style={{ paddingLeft: '16px' }}>
                                            <img src={loggedInUser.profile_image_url} className="rounded me-2 my-3" style={{ width: '48px', height: '48px', border: '1px outset white'}} />
                                            <p className="text-light d-flex d-lg-flex" style={{ maxWidth: '180px', transform: 'translateY(5px)' }}>
                                                Welcome,
                                                <br/>
                                                {loggedInUser.given_name}!
                                            </p>
                                        </Nav.Item>
                                    )}
                                </Nav>
                            </Col>
                        </Row>
                    </Container>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
}

export default NavbarHeading;
