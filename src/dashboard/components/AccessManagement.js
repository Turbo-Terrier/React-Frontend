import {Col, Row} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import {Footnotes, PremiumPricing} from "../../home/components/Pricing";
import {scroller} from "react-scroll";
import {Link} from "react-router-dom";

function AccessManagement({loggedInUser, setLoggedInUser}) {
    const pricingUrl = (
        <Link to="/" onClick={() => {
            setTimeout(() => {
                scroller.scrollTo('pricing', {
                    smooth: true,
                    duration: 200,
                });
            }, 100)
        }}>
            home page
        </Link>
    )

    const isDemo = loggedInUser.demo_expired_at == null

    const premiumNotes = (
        <ul>
            <li>
                You are currently using a premium account since you have previously purchased premium credits.
            </li>
            <li>
                You have access to all of our features as described on our site's {pricingUrl}.
            </li>
        </ul>
    )

    const demoNotes = (
        <ul>
            <li>
                You are currently using a demo account. You get 1 free course registration.
            </li>
            <li>
                Please note that demo accounts come with additional restrictions as described on our site's {pricingUrl}.
            </li>
            <li>
                You can upgrade to a premium account by purchasing additional premium credits.
            </li>
            <li>
                If you purchase premium credits before using your demo credits, your demo credits will be converted to premium credits.
            </li>
        </ul>
    )

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
                    <div className="d-flex">
                        <div
                            className="text-bg-light"
                            style={{
                                minHeight: '100px',
                                borderWidth: '3px',
                                borderStyle: 'inset',
                                width: '100%',
                                padding: '12px',
                                margin: '12px' }}
                        >
                            <b>Access Level:</b> {isDemo ? "Demo" : "Premium"}
                            <br/>
                            <b>Credits:</b> {loggedInUser.current_credits}
                            <br/>
                            <b>Notes:</b>
                            {isDemo ? demoNotes : premiumNotes}

                        </div>
                    </div>
                </Col>
                <Col style={{ minWidth: '380px' }}>
                    <h4 className="d-flex d-sm-flex d-lg-flex justify-content-center justify-content-sm-center justify-content-lg-center">Purchase Access Credits</h4>
                    <PremiumPricing loggedInUser={loggedInUser}/>
                </Col>
            </Row>
        </Container>
    )
}

export default AccessManagement