import {Col, Row} from "react-bootstrap";
import Container from "react-bootstrap/Container";

function AccessManagement() {
    return (
        <Container className={"py-4 py-xl-5"} style={{ borderBottom: '1px solid var(--bs-gray-500)' }}>
            <Row className="mb-2">
                <Col md={8} xl={6} className="text-center mx-auto">
                    <h3 className="fw-bold">Access Level</h3>
                    <p>You can view and manage your access level to the Turbo Terrier application including purchasing access for additional semesters.</p>
                </Col>
            </Row>
            <Row>
                <Col style={{ minWidth: '250px', paddingBottom: '12px' }}>
                    <h4 className="d-flex d-sm-flex justify-content-center justify-content-sm-center">Current Access</h4>
                    <p className="text-bg-light" style={{ height: '312px', borderWidth: '2px', borderStyle: 'inset', padding: '12px', margin: '12px' }}>You have 1 demo credit</p>
                </Col>
                <Col style={{ minWidth: '350px', paddingLeft: '0px', paddingRight: '0px' }}>
                    <h4 className="d-flex d-sm-flex d-lg-flex justify-content-center justify-content-sm-center justify-content-lg-center">Purchase Access</h4>
                    <div className="simple-slider">
                        {/* Replace the script tags with the appropriate React components or logic */}
                        {/* Add the necessary React components for the pricing tables */}
                        {/* You may need to create a separate component for the pricing table and import it here */}
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default AccessManagement