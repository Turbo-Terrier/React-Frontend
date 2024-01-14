import Container from "react-bootstrap/Container";
import {Col, Row} from "react-bootstrap";

function Refunds() {
    return (
        <>
            <Container>
                <section className="newsletter-subscribe py-4 py-xl-5">
                    <Container fluid>
                        <Row className="mb-2">
                            <Col md={8} xl={6} className="text-center mx-auto">
                                <h3 className="fw-bold">Refund Policy</h3>
                                <p className="text-start text-muted">
                                    Thank you for choosing Turbo Terrier, a course registration service. We aim to provide you with an exceptional user experience, and our Refund Policy is designed to ensure fair and transparent practices regarding refunds for our services.
                                    <br /><br /><br />

                                    <strong>1. Refund Eligibility</strong>
                                    <br /><br />
                                    Full refunds are allowed for any reason, provided that you have not used our application to successfully register for a course. In the case you use our application in "alert only" mode where the application only alerts you about open courses (instead of also registering for it), your refund eligibility is void in the first instance the application detects an open course slot.
                                    <br /><br />
                                    Additional refund requests may be considered under the following conditions:
                                    <br /><br />
                                    <span style={{ textDecoration: 'underline' }}>Technical Issues</span>: If you experience technical issues preventing you from accessing Turbo Terrier or utilizing our services as intended, and our support team is unable to resolve the problem within a reasonable timeframe.
                                    <br /><br />
                                    <span style={{ textDecoration: 'underline' }}>Unauthorized Charges</span>: In the event of unauthorized charges or billing errors related to your Turbo Terrier account.
                                    <br /><br /><br />

                                    <strong>2. Refund Process</strong>
                                    <br /><br />
                                    To request a refund, please contact our customer support team at <a href="mailto:support@turboterrier.com">support@turboterrier.com</a>. Provide detailed information regarding the issue and the reason for your refund request. Our support team will review your request and, if eligible, process the refund.
                                    <br /><br /><br />

                                    <strong>3. Refund Limitations</strong>
                                    <br /><br />
                                    Please be aware of the following limitations to our refund policy:
                                    <br /><br />
                                    <span style={{ textDecoration: 'underline' }}>Service Usage:</span> Refunds are generally not provided based on dissatisfaction with service usage, including changes to your course schedule, preferences, or any other non-technical reasons. We encourage users to take advantage of our demo period to thoroughly evaluate the application and ensure satisfaction before committing to a purchase.
                                    <br /><br />
                                    <span style={{ textDecoration: 'underline' }}>License Violations:</span> If your access to Turbo Terrier is terminated due to violations of our <a href={"/tos"}>Terms of Service</a>, you may not be eligible for a refund.
                                    <br /><br /><br />

                                    <strong>4. Processing Time</strong>
                                    <br /><br />
                                    Refund processing times may vary but generally take 7-14 business days. Your patience during this period is appreciated.
                                    <br /><br /><br />

                                    <strong>5. Changes to Refund Policy</strong>
                                    <br /><br />
                                    Turbo Terrier reserves the right to update or modify this Refund Policy at any time without prior notice. In such case, however, customers who purchased our services under the old policy are still eligible for the concessions granted to them under the previous refund policy. In other words, we will never subject you to a less favorable refund policy in the case we are to modify our Refund Policy after your purchase.
                                    <br /><br /><br />

                                    <strong>6. Contact Information</strong>
                                    <br /><br />
                                    If you have any questions or concerns about this Refund Policy, please contact us at <a href="mailto:support@turboterrier.com">support@turboterrier.com</a>.
                                </p>
                            </Col>
                        </Row>
                    </Container>
                </section>
            </Container>
        </>
    )
}

export default Refunds