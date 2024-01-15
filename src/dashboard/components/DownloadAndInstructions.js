import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import {Col, Collapse, Row, useAccordionButton} from "react-bootstrap";
import Collapsable from "../../components/Collapsable";

function DownloadAndInstructions() {

    return (
        <Container className="py-4 py-xl-5" style={{borderBottom: '1px solid var(--bs-gray-500)' }}>
            <Row className="mb-2">
                <Col md={8} xl={6} className="text-center mx-auto">
                    <h3 className="fw-bold">Download & Usage Instructions</h3>
                    <p className="text-muted">This token is required to authenticate yourself in the Turbo Terrier Bot application</p>
                </Col>
            </Row>
            <Collapsable id="1" title="Installation & Setup Instructions">
                <p className="text-bg-light" style={{ borderRight: '1px solid var(--swiper-theme-color)', borderBottom: '1px solid var(--swiper-theme-color)', borderLeft: '1px solid var(--swiper-theme-color)', padding: '3px' }}>
                    Collapse content.
                </p>
            </Collapsable>
            <Collapsable id="2" title="Download Application">
                <p className="text-bg-light" style={{ borderRight: '1px solid var(--swiper-theme-color)', borderBottom: '1px solid var(--swiper-theme-color)', borderLeft: '1px solid var(--swiper-theme-color)', padding: '3px' }}>
                    Collapse content.
                </p>
            </Collapsable>
        </Container>
    );
}

export default DownloadAndInstructions