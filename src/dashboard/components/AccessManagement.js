import {Col, Row} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import {Footnotes, PremiumPricing} from "../../home/components/Pricing";

function AccessManagement({loggedInUser, setLoggedInUser}) {
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
                    <h4 className="d-flex d-sm-flex justify-content-center justify-content-sm-center">Current Access Currents</h4>
                    <div className="d-flex align-items-md-center">
                        <p className="text-bg-light" style={{ "minHeight": '100px', borderWidth: '2px', borderStyle: 'inset', padding: '12px', margin: '12px' }}>You have 1 demo credit</p>
                        TODO ADD HOVER FOOTNOTES
                    </div>
                </Col>
                <Col style={{ minWidth: '350px', paddingLeft: '0px', paddingRight: '0px' }}>
                    <h4 className="d-flex d-sm-flex d-lg-flex justify-content-center justify-content-sm-center justify-content-lg-center">Purchase Access Credits</h4>
                    <PremiumPricing loggedInUser={loggedInUser}/>
                </Col>
            </Row>
        </Container>
    )
}

export default AccessManagement