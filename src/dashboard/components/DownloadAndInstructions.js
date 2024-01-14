import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import {Col, Collapse, Row} from "react-bootstrap";

function DownloadAndInstructions() {
    return (
        <Container className="py-4 py-xl-5" style={{borderBottom: '1px solid var(--bs-gray-500)' }}>
            <Row className="mb-2">
                <Col md={8} xl={6} className="text-center mx-auto">
                    <h3 className="fw-bold">Download & Usage Instructions</h3>
                    <p className="text-muted">This token is required to authenticate yourself in the Turbo Terrier Bot application</p>
                </Col>
            </Row>
            <Row style={{ padding: '5px' }}>
                <Col>
                    <div>
                        <Button
                            variant="primary"
                            data-bs-toggle="collapse"
                            aria-expanded="false"
                            aria-controls="collapse-3"
                            href="#collapse-3"
                            role="button"
                            style={{ width: '100%' }}
                        >
                            Installation & Setup Instructions
                        </Button>
                        <Collapse id="collapse-3">
                            <p className="text-bg-light" style={{ borderRight: '1px solid var(--swiper-theme-color)', borderBottom: '1px solid var(--swiper-theme-color)', borderLeft: '1px solid var(--swiper-theme-color)', padding: '3px' }}>
                                Collapse content.
                            </p>
                        </Collapse>
                    </div>
                </Col>
            </Row>
            <Row style={{ padding: '5px' }}>
                <Col>
                    <div>
                        <Button
                            variant="primary"
                            data-bs-toggle="collapse"
                            aria-expanded="false"
                            aria-controls="collapse-2"
                            href="#collapse-2"
                            role="button"
                            style={{ width: '100%' }}
                        >
                            Download Application
                        </Button>
                        <Collapse id="collapse-2">
                            <p className="text-bg-light" style={{ borderRight: '1px solid var(--swiper-theme-color)', borderBottom: '1px solid var(--swiper-theme-color)', borderLeft: '1px solid var(--swiper-theme-color)', padding: '3px' }}>
                                Collapse content.
                            </p>
                        </Collapse>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default DownloadAndInstructions