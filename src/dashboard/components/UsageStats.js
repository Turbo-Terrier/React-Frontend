import {Col, Row} from "react-bootstrap";
import Container from "react-bootstrap/Container";

function UsageStats() {
    return (
        <Container className="py-4 py-xl-5" style={{ borderBottom: '1px solid var(--bs-gray-500)' }}>
            <Row className="mb-2">
                <Col md={8} xl={6} className="text-center mx-auto">
                    <h3 className="fw-bold">Your Usage Statistics</h3>
                    <p className="text-muted">See how you have used the Turbo Terrier app to race ahead in registrations!</p>
                </Col>
            </Row>
            <div className="text-center text-white-50 bg-primary border rounded border-0 p-3">
                <Row className="row-cols-1 row-cols-sm-3">
                    <Col>
                        <div className="p-3">
                            <h4 className="display-5 fw-bold text-white mb-0">3+</h4>
                            <p className="mb-0">total courses registered!</p>
                        </div>
                    </Col>
                    <Col>
                        <div className="p-3">
                            <p className="mb-0">Checked</p>
                            <h4 className="display-5 fw-bold text-white mb-0">1245+</h4>
                            <p className="mb-0">times to see if a course was open!</p>
                        </div>
                    </Col>
                    <Col>
                        <div className="p-3">
                            <p className="mb-0">Spent</p>
                            <h4 className="display-5 fw-bold text-white mb-0">67+</h4>
                            <p className="mb-0">hours running!</p>
                        </div>
                    </Col>
                </Row>
            </div>
        </Container>
    )
}

export default UsageStats