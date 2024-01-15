import {Accordion, Card, Col, Collapse, Row} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {useState} from "react";
import Collapsable from "../../components/Collapsable";
import Switch from "../../components/Switch";

function AppConfigurator() {

    let [selectedSemester, setSelectedSemester] = useState()
    let [selectedCourse, setSelectedCourse] = useState()

    return (
        <Container style={{ paddingTop: '24px', paddingBottom: '24px', borderBottom: '1px solid var(--bs-gray-500)' }}>
            <Row className="mb-2">
                <Col md={8} xl={6} className="text-center mx-auto">
                    <h3 className="fw-bold">Application Settings</h3>
                    <p className="text-center text-muted">Control the Turbo Terrier Application settings from here!</p>
                </Col>
            </Row>
            <Collapsable id="3" title="Course Selection">
                <CourseSelectionForum />
            </Collapsable>
            <Collapsable id="4" title="Registration Settings">
                <RegistrationSettings />
            </Collapsable>
            <Collapsable id="5" title="Notification Settings">
                <NotificationSettings />
            </Collapsable>
            <Collapsable id="6" title="Other Settings">
                <OtherSettings />
            </Collapsable>
            {/* ... (Similar structure for other sections) */}
        </Container>
    );
}

function OtherSettings() {
    return ( //todo add form?
        <Row className="g-0 p-2 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4" style={{borderBottom: "1px solid var(--bs-secondary-border-subtle)"}}>
            <Col>
                <Switch id="1" label="Console Colors" description="When toggled on, we will print to console using pretty colors. Toggle off if either your console doesn't support colors or you are just a boring person." />
            </Col>
            <Col>
                <Switch id="2" label="Custom Chrome Driver" description={"In most cases, you shouldn't need to touch this option. Only toggle on if Turbo Terrier is unable to automatically detect your chrome drivers and specify the path to your drivers here."}/>
                <div className="d-xl-flex" style={{width: "80%"}}>
                    <Form.Control type="text" placeholder="/path/to/driver" className="form-control-sm" />
                </div>
            </Col>
            <Col>
                <Switch id="3" label="Debug" description={"Toggle on to enable debug mode. Debug mode is helpful for reporting bugs with the application."}/>
            </Col>
            <Col>

            </Col>
        </Row>
    );
}

function NotificationSettings() {
    return ( //todo add form?
        <>
            <Row className="g-0 p-2 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4" style={{borderBottom: "1px solid var(--bs-secondary-border-subtle)"}}>
                <Col>
                    <Switch id="1" label="Registration Notifications" description="Toggle on if you want to be alerted if/when Turbo Terrier successfully registers you for one or more of your target courses." />
                </Col>
                <Col>
                    <Switch id="2" label="Email Alerts" />
                    <div className="d-xl-flex" style={{width: "80%"}}>
                        <Form.Control type="email" defaultValue="you@bu.edu" placeholder="Your Email" className="form-control-sm" />
                    </div>
                </Col>
                <Col>
                    <Switch id="3" label="Text Alerts" />
                    <div className="d-xl-flex" style={{width: "80%"}}>
                        <Form.Control type="tel" placeholder="Your Phone Number" className="form-control-sm" />
                    </div>
                </Col>
                <Col>
                    <Switch id="4" label="Phone Alerts" />
                    <div className="d-xl-flex" style={{width: "80%"}}>
                        <Form.Control type="tel" placeholder="Your Phone Number" className="form-control-sm" />
                    </div>
                </Col>
            </Row>
            <Row className="g-0 p-2 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
                <Col>
                    <Switch id="1" label="Watchdog Notifications" description="In case your device looses internet, or shuts down, or the Turbo Terrier application simply crashes, when toggled on the watchdog monitoring system will alert you immediately so you can take appropriate action." />
                </Col>
                <Col>
                    <Switch id="2" label="Email Alerts" />
                    <div className="d-xl-flex" style={{width: "80%"}}>
                        <Form.Control type="email" defaultValue="you@bu.edu" placeholder="Your Email" className="form-control-sm" />
                    </div>
                </Col>
                <Col>
                    <Switch id="3" label="Text Alerts" />
                    <div className="d-xl-flex" style={{width: "80%"}}>
                        <Form.Control type="tel" placeholder="Your Phone Number" className="form-control-sm" />
                    </div>
                </Col>
                <Col>
                    <Switch id="4" label="Phone Alerts" />
                    <div className="d-xl-flex" style={{width: "80%"}}>
                        <Form.Control type="tel" placeholder="Your Phone Number" className="form-control-sm" />
                    </div>
                </Col>
            </Row>
        </>
    );
}

function RegistrationSettings() {
    return (
        <Row className="g-0 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
            <Col>
                <Switch id="1" label="Real Registration" description="When toggled off, registers to the course planner for testing purposes. When toggled on, performs real registerations on the course." />
            </Col>
            <Col>
                <Switch id="2" label="Never Give Up" description="When toggled off, if the application encounters too many successive errors, it will give up and shut off. When toggled on, the application will keep trying to register to the course until it succeeds discarding all errors." />
            </Col>
            <Col>
                <Switch id="3" label="Save Password" description="When toggled off, you will be required to enter your password anytime you start the app. When toggled on, the password will be encrypted and securely stored on your device for conveniance. Either way, your passwords never leave your computer except to log into BU." />
            </Col>
            <Col>
                <Switch id="4" label="Save Duo Cookies" description="When toggled off, you will be required to do your Duo authentication on every restart. When toggled on, Duo authentication cookies will be encrypted and securely stored on your device for conveniance. Either way, these cookies never leave your computer except to log into BU." />
            </Col>
        </Row>
    );
}

function CourseSelectionForum() {
    return (
        <Form>
            <Row className="g-0 m-2">
                <Col md={{ span: 6, offset: 3 }} className="d-md-flex justify-content-md-center">
                    <h5>Target Courses</h5>
                </Col>
            </Row>
            <Row className="g-0 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 text-center text-bg-light m-2" style={{ borderStyle: 'inset' }}>
                {/* Replace the hardcoded courses with your actual courses */}
                <AddedCourse />
                <AddedCourse />
                <AddedCourse />
                <AddedCourse />
            </Row>
            <Row className="g-0 p-2">
                <Col className="d-md-flex justify-content-md-center">
                    <h5>Add Courses</h5>
                </Col>
            </Row>
            <Row className="g-0 p-1">
                <Col md className="m-2">
                    <Form.Group className="mb-3">
                        <Form.Label className="form-label fw-semibold d-md-flex justify-content-md-center">Semester</Form.Label>
                        <Form.Select>
                            <optgroup label="This is a group">
                                <option value="12" selected>This is item 1</option>
                                <option value="13">This is item 2</option>
                                <option value="14">This is item 3</option>
                            </optgroup>
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col md className="m-2">
                    <Form.Group className="mb-3">
                        <Form.Label className="form-label fw-semibold d-md-flex justify-content-md-center">Course</Form.Label>
                        <Form.Select>
                            <optgroup label="This is a group">
                                <option value="12" selected>This is item 1</option>
                                <option value="13">This is item 2</option>
                                <option value="14">This is item 3</option>
                            </optgroup>
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>
            <Row className="g-0">
                <Col className="d-flex d-md-flex justify-content-center justify-content-md-center">
                    <Button variant="danger" className="border rounded border-1" type="button" style={{ width: '25%' }}>
                        Add
                    </Button>
                </Col>
            </Row>
        </Form>
    )
}



function AddedCourse() {
    return (
        <Col>
            <p>
                CAS CS 237
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 24 24"
                    width="1em"
                    fill="currentColor"
                    style={{ fontSize: '24px', color: 'var(--bs-form-invalid-color)' }}
                >
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path d="M0 0h24v24H0V0z" fill="none" />
                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"></path>
                </svg>
                &nbsp;
            </p>
        </Col>
    );
}

export default AppConfigurator