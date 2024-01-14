import {Col, Row} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import '../../css/toggle-switch.css'

function Watchdog() {
    return (
        <Container className="py-4 py-xl-5" style={{ borderBottom: '1px solid var(--bs-gray-500)' }}>
            <Row className="mb-2">
                <Col md={8} xl={6} className="text-center mx-auto">
                    <h3 className="fw-bold">Watchdog Monitoring</h3>
                    <p className="text-center text-muted">If for any reason, we detect Turbo Terrier is no longer running on your device, Watchdog can alert you via text, email, or a phone call so you can act accordingly from there</p>
                </Col>
            </Row>
            <Row className="d-xl-flex">
                <Col className="d-flex d-lg-flex d-xl-flex justify-content-end align-items-center">
                    <p className="text-nowrap fw-semibold d-xl-flex" style={{ transform: 'translate(7px) translateY(7px)' }}>Enable Watchdog</p>
                </Col>
                <Col className="d-flex d-xl-flex justify-content-start align-items-center justify-content-xl-start align-items-xl-center">
                    <label className="switch">
                        <input type="checkbox"></input>
                        <span className="slider round"></span>
                    </label>
                </Col>
            </Row>
        </Container>
    );
}

export default Watchdog