import {Container, Form, Button, Row, Col, Tooltip, Overlay, OverlayTrigger} from 'react-bootstrap';
import {useEffect, useRef, useState} from "react";
import Cookies from "js-cookie";

function TokenManagement({loggedInUser, setLoggedInUser}) {

    const [token, setToken] = useState(loggedInUser.authentication_key)
    const [showTooltip1, setShowTooltip1] = useState(false);
    const [showTooltip2, setShowTooltip2] = useState(false);
    const target1 = useRef(null);
    const target2 = useRef(null);

    useEffect(() => {
        setToken(loggedInUser.authentication_key)
    }, [loggedInUser])

    function copyToken() {
        document.getElementById("app-token").select()
        navigator.clipboard.writeText(document.getElementById("app-token").value)
        setShowTooltip1(true)
        setTimeout(() => {
            setShowTooltip1(false)
        }, 1200)
    }

    function resetToken() {
        let endpoint = "http://localhost:8080/api/web/v1/reset-app-token"
        let userOptions = {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Accept-Encoding": "gzip, deflate, br",
                "Authorization": Cookies.get("jwt-token")
            }
        }
        fetch(endpoint, userOptions)
            .then(resp => {
                if (resp.ok) {
                    return resp.json()
                } else {
                    return null;
                }
            }).then(user => {
                setLoggedInUser(user)
                setShowTooltip2(true)
                setTimeout(() => {
                    setShowTooltip2(false)
                }, 1200)
            }).catch(err => {
                console.log(err)
            })
    }

    return (
        <Container className="py-4 py-xl-5" style={{ borderBottom: '1px solid var(--bs-gray-500)' }}>
            <Row className="mb-2">
                <Col md={8} xl={6} className="text-center mx-auto">
                    <h3 className="fw-bold">Application Token</h3>
                    <p className="text-muted">This token is required to authenticate yourself in the Turbo Terrier Bot application. See the download and usage instructions above for details.</p>
                </Col>
            </Row>
            <Row className="mb-2">
                <Col className="d-flex justify-content-center flex-wrap">
                    <div className="mb-3">
                        <Form.Control id={"app-token"} type="email" name="email" value={token} readOnly />
                    </div>
                    <div className="mb-3">
                        <Button variant="success" className="ms-2" style={{ borderRadius: '5px' }} ref={target1} onClick={copyToken}>
                            Copy Token
                        </Button>
                        <Overlay target={target1.current} show={showTooltip1} placement="top">
                            {(props) => (
                                <Tooltip id="overlay-example-1" {...props}>
                                    Copied!
                                </Tooltip>
                            )}
                        </Overlay>
                        <Button variant="danger" className="ms-2" style={{ borderRadius: '5px', boxShadow: '0px 0px rgb(0,0,0)' }} ref={target2} onClick={resetToken}>
                            Reset Token
                        </Button>
                        <Overlay target={target2.current} show={showTooltip2} placement="top">
                            {(props) => (
                                <Tooltip id="overlay-example-2" {...props}>
                                    Token Reset!
                                </Tooltip>
                            )}
                        </Overlay>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default TokenManagement