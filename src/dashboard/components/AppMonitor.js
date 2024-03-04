import {Card, Col, Row} from "react-bootstrap";
import Container from "react-bootstrap/Container";

const APP_STATUS = {
    RUNNING: {
        status: "Running",
        className: "bg-success"
    },
    STOPPED: {
        status: "Stopped",
        className: "bg-secondary"
    },
    UNKNOWN: {
        status: "Unknown (Contact Lost)",
        className: "bg-warning"
    },
    CRASHED: {
        status: "Crashed",
        className: "bg-danger"
    }
}
class AppStatusData {
    constructor(status, runtime, lastContact, registrationStatus) {
        this.status = status;
        this.runtime = runtime;
        this.lastContact = lastContact;
        this.registrationStatus = registrationStatus;
    }
}

function AppMonitor() {
    return (
        <Container style={{ paddingTop: '24px', paddingBottom: '24px', borderBottom: '1px solid var(--bs-gray-500)' }}>
            <Row className="mb-2">
                <Col md={8} xl={6} className="text-center mx-auto">
                    <h3 className="fw-bold">Application Status</h3>
                    <p className="text-muted">Monitor the status of the Turbo Terrier Application from anywhere in the world!</p>
                </Col>
            </Row>
            <Card className="text-center text-white-50 bg-secondary border rounded border-0 p-3">
                <Row className="row-cols-1 row-cols-md-3 row-cols-xl-4">
                    <Col>
                        <Card.Body className="p-3">
                            <Card.Title className="fw-bold text-white mb-0">Status</Card.Title>
                            <Card.Text className="mb-0">Stopped</Card.Text>
                        </Card.Body>
                    </Col>
                    <Col>
                        <Card.Body className="p-3">
                            <Card.Title className="fw-bold text-white mb-0">Last Contact</Card.Title>
                            <Card.Text className="mb-0">Never</Card.Text>
                        </Card.Body>
                    </Col>
                    <Col>
                        <Card.Body className="p-3">
                            <Card.Title className="fw-bold text-white mb-0">Current Runtime</Card.Title>
                            <Card.Text className="mb-0">0 seconds</Card.Text>
                        </Card.Body>
                    </Col>
                    <Col>
                        <Card.Body className="p-3">
                            <Card.Title className="fw-bold text-white mb-0">Per-Course Throughput</Card.Title>
                            <Card.Text className="mb-0">0 requests/sec</Card.Text>
                        </Card.Body>
                    </Col>
                    <Col>
                        <Card.Body className="p-3">
                            <Card.Title className="fw-bold text-white mb-0">Total Throughput</Card.Title>
                            <Card.Text className="mb-0">0 requests/sec</Card.Text>
                        </Card.Body>
                    </Col>
                    <Col>
                        <Card.Body className="p-3">
                            <Card.Title className="fw-bold text-white mb-0">Registration Status</Card.Title>
                            <Card.Text className="mb-0">0 of the 0 courses registered</Card.Text>
                        </Card.Body>
                    </Col>
                    <Col>
                        <Card.Body className="p-3">
                            <Card.Title className="fw-bold text-white mb-0">Running Device</Card.Title>
                            <Card.Text className="mb-0">None</Card.Text>
                        </Card.Body>
                    </Col>
                </Row>
            </Card>
        </Container>
    );
}

export default AppMonitor;