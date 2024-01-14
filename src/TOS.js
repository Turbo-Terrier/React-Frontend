import Header from "./components/Header";
import Footer from "./components/Footer";
import {Col, Row} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Navbar from "./components/Navbar";

function TOS() {
    return (
        <>
            <Container>
                <section className="newsletter-subscribe py-4 py-xl-5">
                    <Container fluid>
                        <Row className="mb-2">
                            <Col md={8} xl={6} className="text-center mx-auto">
                                <h3 className="fw-bold">Terms of Service</h3>
                                <p className="text-start text-muted">
                                    Welcome to Turbo Terrier, a course registration service. By accessing or using Turbo
                                    Terrier's website or application, you agree to comply with and be bound by the
                                    following Terms of Service. Please read these terms carefully before using our
                                    services.

                                    <br/><br/><br/>

                                    <strong>1. Acceptance of Terms</strong>
                                    <br/><br/>
                                    By accessing or using Turbo Terrier, you agree to be bound by these Terms of
                                    Service. If you do not agree to these terms, please refrain from using our services.

                                    <br/><br/><br/>

                                    <strong>2. Unauthorized Access</strong>
                                    <br/>
                                    Attempting to gain unauthorized access to any part of our website or application is
                                    strictly forbidden. Unauthorized access includes but is not limited to attempting to
                                    access accounts, data, or features for which you do not have explicit permission.

                                    <br/><br/><br/>

                                    <strong>3. Compliance with University Policies</strong>
                                    <br/><br/>
                                    You agree not to use Turbo Terrier's products to violate any policies of Boston
                                    University or any other educational institution. This includes, but is not limited
                                    to, registering for classes that you do not intend to take, and any other actions
                                    that go against the policies of the educational institutions served by Turbo
                                    Terrier.

                                    <br/><br/><br/>

                                    <strong>4. Limitation of Liability</strong>
                                    <br/><br/>
                                    We are not responsible for any damages that may occur as a result of your use of our
                                    software. This includes, but is not limited to, direct, indirect, incidental,
                                    consequential, or punitive damages.

                                    <br/><br/><br/>

                                    <strong>5. Termination of Access</strong>
                                    <br/><br/>
                                    We reserve the right to terminate your access to our services without notice if you
                                    violate these Terms of Service. We may also take legal action if necessary.
                                    Termination of access includes the disabling or deletion of your account and any
                                    associated data.

                                    <br/><br/><br/>

                                    <strong>6. Changes to Terms</strong>
                                    <br/><br/>
                                    Turbo Terrier reserves the right to update or modify these Terms of Service at any
                                    time without prior notice. In such a case, we will notify you of any changes
                                    accordingly. Continued use of Turbo Terrier after any changes constitute your
                                    acceptance of those changes.

                                    <br/><br/><br/>

                                    <strong>7. Governing Law</strong>
                                    <br/><br/>
                                    These Terms of Service are governed by and construed in accordance with the laws of
                                    the Commonwealth of Massachusetts, without regard to its conflict of law principles.

                                    <br/><br/><br/>

                                    <strong>8. Uninterrupted Product Usage Disclaimer</strong>
                                    <br/><br/>
                                    Turbo Terrier cannot guarantee uninterrupted operation of our product due to the
                                    nature of the service. While we strive to provide a reliable and seamless
                                    experience, factors beyond our control may impact the continuous functionality of
                                    the product.

                                    <br/><br/><br/>

                                    <strong>9. Contact Information</strong>
                                    <br/><br/>
                                    If you have any questions or concerns about these Terms of Service, please contact
                                    us at <a href="mailto:support@turboterrier.com">support@turboterrier.com</a>.

                                    <br/><br/>
                                </p>
                            </Col>
                        </Row>
                    </Container>
                </section>
            </Container>
        </>
    )
}

export default TOS