import '../css/modal.css'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import {useState} from "react";
import GoogleLogo from '../img/google-login-logo.jpg'


function LoginModal(props) {
    const oauth_url = "http://localhost:8080/api/web/v1/oauth-url"
    let [openedModal, setOpenedModal] = props.hook
    let [canOAuth, setCanOAuth] = useState(false)

    function updateSignIn() {
        let box1 = document.getElementById("formCheck-1")
        let box2 = document.getElementById("formCheck-2")
        if (box1.checked && box2.checked) {
            setCanOAuth(true)
        } else {
            setCanOAuth(false)
        }
    }

    function closeModal() {
        setCanOAuth(false)
        setOpenedModal(false)
    }

    return (
        <>
            <Modal show={openedModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Google OAuth Sign In</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex justify-content-center">
                        <Button
                            variant="primary"
                            className={"d-flex justify-content-center align-items-center" + (canOAuth ? "" : " disabled")}
                            disabled={!canOAuth}
                            style={{width: '100%'}}
                            onClick={ () => window.location.assign(oauth_url)}
                        >
                            <img
                                className="d-block"
                                src={GoogleLogo}
                                alt="Google Logo"
                                style={{ width: '36px', height: '36px' }}
                            />
                            &nbsp; &nbsp; Sign in with Google
                        </Button>
                    </div>
                    <p className="fs-6 fw-semibold text-center text-danger-emphasis">
                        * Note: You must sign in with your{' '}
                        <span style={{ color: 'rgb(255, 15, 0)', backgroundColor: 'rgb(255, 255, 255)' }}>@bu.edu</span> email
                        *
                    </p>
                </Modal.Body>
                <Modal.Footer className="d-flex justify-content-center">
                    <form>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="formCheck-1" onClick={updateSignIn}/>
                            <label className="form-check-label" htmlFor="formCheck-1">
                                I agree to abide by the <a href="/tos">Terms of Service</a>.
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="formCheck-2" onClick={updateSignIn}/>
                            <label className="form-check-label" htmlFor="formCheck-2">
                                I have acknowledged the <a href="/privacy">Privacy Policy</a>.
                            </label>
                        </div>
                    </form>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default LoginModal;
