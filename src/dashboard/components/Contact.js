import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import {Col, Form, Row} from "react-bootstrap";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {useState} from "react"; // Import the styles

function Contact() {

    const [supportType, setSupportType] = useState('')
    const [attachments, setAttachments] = useState([]);
    const [message, setMessage] = useState('');

    function handleSubmit(e) {
        e.preventDefault()
        let form = e.target
        let formData = new FormData()
        formData.append("support-type", supportType)
        formData.append("attachments", attachments)
        formData.append("message", message)

        let endpoint = "http://localhost:8080/api/web/v1/contact-request"
        let userOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Accept-Encoding": "gzip, deflate, br"
            },
        }
        userOptions.body = JSON.stringify(Object.fromEntries(formData.entries()))
        fetch(endpoint, userOptions).then((response) => {
            if (response.ok) {
                //todo display success message
                form.reset()
            }
        })
    }

    return (
        <Container className="py-4 py-xl-5">
            <Row className="d-flex justify-content-center">
                <Col md={6} lg={4} xl={4}>
                    <div className="d-flex flex-column justify-content-center align-items-start h-100">
                        <h2>Contact us</h2>
                        <p className="w-lg-50">
                            For your convenience, you may contact us either via email or through the attached support form on this page. For faster service, we suggest using the attached support form instead of an email.
                        </p>
                        <div className="d-flex align-items-center p-3">
                            <div className="bs-icon-md bs-icon-rounded bs-icon-primary d-flex flex-shrink-0 justify-content-center align-items-center d-inline-block bs-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-envelope">
                                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z"></path>
                                </svg>
                            </div>
                            <div className="px-2">
                                <h6 className="mb-0">Email</h6>
                                <p className="mb-0">support@turboterrier.com</p>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col md={8}>
                    <Form className="p-3 p-xl-4" onSubmit={handleSubmit}>
                        <div className="mb-3"></div>
                        <Form.Label className="form-label fw-semibold">What is the reason for your message?</Form.Label>
                        <Form.Select name="support-type" id="support-type" style={{ padding: '6px 12px', margin: '0px 0px 16px' }} onChange={(e) => setSupportType(e.target.value)}>
                            <option value="" selected></option>
                            <option value="bug">Bug Report</option>
                            <option value="billing">Billing Concern</option>
                            <option value="feature">Feature Request</option>
                            <option value="other">Other Support</option>
                        </Form.Select>
                        <Form.Label className="form-label fw-semibold">Leave your message here:</Form.Label>
                        <ReactQuill
                            placeholder="Message"
                            modules={{ toolbar: true }}
                            style={{ marginBottom: '16px' }}
                            value={message}
                            onChange={setMessage}
                        />
                        <Form.Label className="form-label fw-semibold">Attachment(s):</Form.Label>
                        <Form.Control name="attachments" id="attachments" type="file" multiple style={{ marginBottom: '16px' }} onChange={(e) => setAttachments(e.target.files)} />
                        <div>
                            <Button className="btn btn-primary d-block w-100" type="submit">Send</Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default Contact