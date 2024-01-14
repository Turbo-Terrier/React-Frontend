import Header from "./components/Header";
import {Col, Row} from "react-bootstrap";
import Footer from "./components/Footer";
import Container from "react-bootstrap/Container";
import Navbar from "./components/Navbar";

function Privacy() {
    return (
        <>
            <Container>
                <section className="newsletter-subscribe py-4 py-xl-5">
                    <Container fluid>
                        <Row className="mb-2">
                            <Col md={8} xl={6} className="text-center mx-auto">
                                <h3 className="fw-bold">Privacy Policy</h3>
                                <p className="text-start text-muted">
                                    Thank you for choosing Turbo Terrier, a course registration service. At Turbo
                                    Terrier, we are committed to protecting your privacy and ensuring the security of
                                    your personal information. This Privacy Policy outlines the types of data we
                                    collect, how we use it, and the measures we take to safeguard your information.

                                    <br/><br/><br/>

                                    <strong>1. Data Collection</strong>
                                    <br/><br/>
                                    When you use Turbo Terrier, we may collect the following types of data:
                                    <br/><br/>
                                    * IP Addresses of any device you use to access our service
                                    <br/>* Your Boston University email address
                                    <br/>* Your full name
                                    <br/>* Data on your usage of our software, including the courses you register for
                                    <br/>* Information about any errors or crashes in the application
                                    <br/>* User Device Information, such as CPU speed, operating system, and system
                                    architecture

                                    <br/><br/><br/>

                                    <strong>2. Use of Data</strong>
                                    <br/><br/>
                                    We collect this data for the following purposes:
                                    <br/><br/>
                                    * To understand how our product is being used so we can improve its functionality
                                    <br/>* To provide you with customized offers and recommendations
                                    <br/>* To ensure our software is only being used by licensed users
                                    <br/>* To prevent the misuse of our software for malicious purposes and to enforce
                                    our terms of service
                                    <br/>* To process your payments

                                    <br/><br/><br/>

                                    <strong>3. Data Sharing</strong>
                                    <br/><br/>
                                    We do not sell your personal data. However, we may share your data with third
                                    parties strictly for necessary functions, such as processing your payments. These
                                    third parties are required to adhere to strict data protection standards and are
                                    prohibited from using your information for any other purpose.

                                    <br/><br/><br/>

                                    <strong>4. Security Measures</strong>
                                    <br/><br/>
                                    We take the security of your data seriously and employ industry-standard measures to
                                    safeguard it from unauthorized access, disclosure, alteration, and destruction. Our
                                    commitment to security includes regular reviews and updates to our security
                                    protocols.

                                    <br/><br/><br/>

                                    <strong>5. User Privacy</strong>
                                    <br/><br/>
                                    Turbo Terrier values the privacy of our users. We are dedicated to protecting your
                                    personal information and ensuring that your data is handled responsibly. If you have
                                    any concerns or questions regarding your privacy, please contact us at <a
                                    href="mailto:support@turboterrier.com">support@turboterrier.com</a>.

                                    <br/><br/><br/>

                                    <strong>6. Consent</strong>
                                    <br/><br/>
                                    By using Turbo Terrier, you consent to the collection and use of your data as
                                    described in this Privacy Policy. If we make any changes to our privacy practices,
                                    we will update this policy and notify you accordingly.
                                </p>

                            </Col>
                        </Row>
                    </Container>
                </section>
            </Container>
        </>
    )
}

export default Privacy