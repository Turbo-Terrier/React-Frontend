import {Accordion, Card, Col, Collapse, Row} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {useEffect, useState} from "react";
import Collapsable from "../../components/Collapsable";
import Switch from "../../components/Switch";
import '../../css/target-course-list.css'
import Cookies from "js-cookie";
import app from "../../App";

function AppConfigurator() {

    let [appSettings, setAppSettings] = useState(null)
    let settingsHook = [appSettings, setAppSettings]

    useEffect(() => {
        // todo: add code to make sure that requests are sent to the backend and that they aren't sent too frequently
        let endpoint = "http://localhost:8080/api/web/v1/user-app-settings"
        let userOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Accept-Encoding": "gzip, deflate, br",
                "Authorization": Cookies.get("jwt-token")
            },
            body: JSON.stringify(appSettings)
        }
        fetch(endpoint, userOptions)
            .then(() => {
                console.log("updated!")
            })
    }, [appSettings])

    useEffect(() => {
        let endpoint = "http://localhost:8080/api/web/v1/user-app-settings"
        let userOptions = {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Accept-Encoding": "gzip, deflate, br",
                "Authorization": Cookies.get("jwt-token")
            },
        }
        fetch(endpoint, userOptions)
            .then(response => response.json())
            .then(data => {
                setAppSettings(data)
            })
            .catch(error => console.log(error))
    }, [])

    // todo: add code to make sure that requests are sent to the backend and that they aren't sent too frequently

    return (
        <>
            {appSettings &&
                <Container
                    style={{paddingTop: '24px', paddingBottom: '24px', borderBottom: '1px solid var(--bs-gray-500)'}}>
                    <Row className="mb-2">
                        <Col md={8} xl={6} className="text-center mx-auto">
                            <h3 className="fw-bold">Application Settings</h3>
                            <p className="text-center text-muted">Control the Turbo Terrier Application settings from
                                here!</p>
                        </Col>
                    </Row>
                    <Collapsable id="3" title="Course Selection">
                        <CourseSelectionForum settingsHook={settingsHook}/>
                    </Collapsable>
                    <Collapsable id="4" title="Registration Settings">
                        <RegistrationSettings settingsHook={settingsHook}/>
                    </Collapsable>
                    <Collapsable id="5" title="Notification Settings">
                        <NotificationSettings settingsHook={settingsHook}/>
                    </Collapsable>
                    <Collapsable id="6" title="Other Settings">
                        <OtherSettings settingsHook={settingsHook}/>
                    </Collapsable>
                    {/* ... (Similar structure for other sections) */}
                </Container>}
        </>
    );
}

function OtherSettings({settingsHook}) {
    let [appSettings, setAppSettings] = settingsHook

    return ( //todo add form?
        <Row className="g-0 p-2 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4" style={{borderBottom: "1px solid var(--bs-secondary-border-subtle)"}}>
            <Col>
                <Switch
                    label="Console Colors"
                    description="When toggled on, we will print to console using pretty colors. Toggle off if either your console doesn't support colors or you are just a boring person."
                    switched={appSettings["console_colors"]}
                    onClick={() => handleSwitchClick(settingsHook, "console_colors")}
                />
            </Col>
            <Col>
                <Switch
                    label="Custom Chrome Driver"
                    description={"In most cases, you shouldn't need to touch this option. Only toggle on if Turbo Terrier is unable to automatically detect your chrome drivers and specify the path to your drivers here."}
                    switched={appSettings["custom_driver"]["enabled"]}
                    onClick={() => handleSwitchClick(settingsHook, "custom_driver", "enabled")}
                />
                <div className="d-xl-flex" style={{width: "80%"}}>
                    <Form.Control
                        type="text"
                        defaultValue={appSettings["custom_driver"]["driver_path"]}
                        placeholder="/path/to/driver"
                        className="form-control-sm"
                        onChange={(event) => setAppSettings({...appSettings, "custom_driver": {...appSettings["custom_driver"], "driver_path": event.target.value}})}
                    />
                </div>
            </Col>
            <Col>
                <Switch
                    label="Debug"
                    description={"Toggle on to enable debug mode. Debug mode is helpful for reporting bugs with the application."}
                    switched={appSettings["debug_mode"]}
                    onClick={() => handleSwitchClick(settingsHook, "debug_mode")}
                />
            </Col>
            <Col>

            </Col>
        </Row>
    );
}

function NotificationSettings({settingsHook}) {
    let [appSettings, setAppSettings] = settingsHook
    //console.log(appSettings)
    return ( //todo add form?
        <>
            <Row className="g-0 p-2 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4" style={{borderBottom: "1px solid var(--bs-secondary-border-subtle)"}}>
                <Col>
                    <Switch
                        label="Registration Notifications"
                        description="Toggle on if you want to be alerted if/when Turbo Terrier successfully registers you for one or more of your target courses."
                        switched={appSettings["registration_notifications"]["enabled"]}
                        onClick={() => handleSwitchClick(settingsHook, "registration_notifications", "enabled")}
                    />
                </Col>
                <Col>
                    <Switch
                        label="Email Alerts"
                        switched={appSettings["registration_notifications"]["email_alerts"]}
                        onClick={() => handleSwitchClick(settingsHook, "registration_notifications", "email_alerts")}
                    />
                    <div className="d-xl-flex" style={{width: "80%"}}>
                        <Form.Control
                            type="email"
                            defaultValue={appSettings["email"]}
                            placeholder="Your Email"
                            className="form-control-sm"
                            onChange={(event) => setAppSettings({...appSettings, "email": event.target.value})}
                        />
                    </div>
                </Col>
                <Col>
                    <Switch
                        label="Text Alerts"
                        switched={appSettings["registration_notifications"]["text_alerts"]}
                        onClick={() => handleSwitchClick(settingsHook, "registration_notifications", "text_alerts")}
                    />
                    <div className="d-xl-flex" style={{width: "80%"}}>
                        <Form.Control
                            type="tel"
                            placeholder="Your Phone Number"
                            className="form-control-sm"
                            defaultValue={appSettings["phone"]}
                            onChange={(event) => setAppSettings({...appSettings, "phone": event.target.value})}
                        />
                    </div>
                </Col>
                <Col>
                    <Switch
                        label="Phone Alerts"
                        switched={appSettings["registration_notifications"]["call_alerts"]}
                        onClick={() => handleSwitchClick(settingsHook, "registration_notifications", "call_alerts")}
                    />
                    <div className="d-xl-flex" style={{width: "80%"}}>
                        <Form.Control
                            type="tel"
                            defaultValue={appSettings["phone"]}
                            placeholder="Your Phone Number"
                            className="form-control-sm"
                            onChange={(event) => setAppSettings({...appSettings, "phone": event.target.value})}
                        />
                    </div>
                </Col>
            </Row>
            <Row className="g-0 p-2 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
                <Col>
                    <Switch
                        label="Watchdog Notifications"
                        description="In case your device looses internet, or shuts down, or the Turbo Terrier application simply crashes, when toggled on the watchdog monitoring system will alert you immediately so you can take appropriate action."
                        switched={appSettings["watchdog_notifications"]["enabled"]}
                        onClick={() => handleSwitchClick(settingsHook, "watchdog_notifications", "enabled")}
                    />
                </Col>
                <Col>
                    <Switch
                        label="Email Alerts"
                        switched={appSettings["watchdog_notifications"]["email_alerts"]}
                        onClick={() => handleSwitchClick(settingsHook, "watchdog_notifications", "email_alerts")}
                    />
                    <div className="d-xl-flex" style={{width: "80%"}}>
                        <Form.Control
                            type="email"
                            defaultValue={appSettings["email"]}
                            placeholder="Your Email"
                            className="form-control-sm"
                            onChange={(event) => setAppSettings({...appSettings, "email": event.target.value})}
                        />
                    </div>
                </Col>
                <Col>
                    <Switch
                        label="Text Alerts"
                        switched={appSettings["watchdog_notifications"]["text_alerts"]}
                        onClick={() => handleSwitchClick(settingsHook, "watchdog_notifications", "text_alerts")}
                    />
                    <div className="d-xl-flex" style={{width: "80%"}}>
                        <Form.Control
                            type="tel"
                            defaultValue={appSettings["phone"]}
                            placeholder="Your Phone Number"
                            className="form-control-sm"
                            onChange={(event) => setAppSettings({...appSettings, "phone": event.target.value})}
                        />
                    </div>
                </Col>
                <Col>
                    <Switch
                        label="Phone Alerts"
                        switched={appSettings["watchdog_notifications"]["call_alerts"]}
                        onClick={() => handleSwitchClick(settingsHook, "watchdog_notifications", "call_alerts")}
                    />
                    <div className="d-xl-flex" style={{width: "80%"}}>
                        <Form.Control
                            type="tel"
                            defaultValue={appSettings["phone"]}
                            placeholder="Your Phone Number"
                            className="form-control-sm"
                            onChange={(event) => setAppSettings({...appSettings, "phone": event.target.value})}
                        />
                    </div>
                </Col>
            </Row>
        </>
    );
}

function RegistrationSettings({settingsHook}) {
    let [appSettings, setAppSettings] = settingsHook
    return (
        <Row className="g-0 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
            <Col>
                <Switch
                    label="Real Registration"
                    description="When toggled off, registers to the course planner for testing purposes. When toggled on, performs real registerations on your target courses."
                    switched={appSettings["real_registrations"]}
                    onClick={() => handleSwitchClick(settingsHook, "real_registrations")}
                />
            </Col>
            <Col>
                <Switch
                    label="Never Give Up"
                    description="When toggled off, if the application encounters too many successive errors, it will give up and shut off. When toggled on, the application will keep trying to register to the course until it succeeds discarding all errors."
                    switched={appSettings["keep_trying"]}
                    onClick={() => handleSwitchClick(settingsHook, "keep_trying")}
                />
            </Col>
            <Col>
                <Switch
                    label="Save Password"
                    description="When toggled off, you will be required to enter your password anytime you start the app. When toggled on, the password will be encrypted and securely stored on your device for conveniance. Either way, your passwords never leave your computer except to log into BU."
                    switched={appSettings["save_password"]}
                    onClick={() => handleSwitchClick(settingsHook, "save_password")}
                />
            </Col>
            <Col>
                <Switch
                    label="Save Duo Cookies"
                    description="When toggled off, you will be required to do your Duo authentication on every restart. When toggled on, Duo authentication cookies will be encrypted and securely stored on your device for conveniance. Either way, these cookies never leave your computer except to log into BU."
                    switched={appSettings["save_duo_cookies"]}
                    onClick={() => handleSwitchClick(settingsHook, "save_duo_cookies")}
                />
            </Col>
        </Row>
    );
}

function CourseSelectionForum({settingsHook}) {
    let [appSettings, setAppSettings] = settingsHook

    const deleteHandler = (course) => {
        // todo
    }

    return (
        <Form>
            {appSettings.target_courses.length > 0 &&
                <>
                    <Row className="g-0 m-2">
                        <Col md={{ span: 6, offset: 3 }} className="d-md-flex justify-content-md-center">
                            <h5>Target Courses</h5>
                        </Col>
                    </Row>
                    <Row className="g-0 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 text-center text-bg-light m-2"
                         style={{borderStyle: 'inset'}}>
                        {/* Replace the hardcoded courses with your actual courses */}
                        {appSettings.target_courses.map((course) => {
                            return <AddedCourse courseName={course} deleteHandler={() => deleteHandler(course)}/>
                        })}
                    </Row>
                </>
            }
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
                                <option value="12">This is item 1</option>
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
                                <option value="12">This is item 1</option>
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



function AddedCourse({courseName, deleteHandler}) {

    return (
        <Col>
            <p className="target-course">
                {courseName}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 24 24"
                    width="1em"
                    fill="currentColor"
                    className="delete-icon"
                    onClick={deleteHandler}
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

function handleSwitchClick(settingsHook, ...keys) {
    let [appSettings, setAppSettings] = settingsHook
    if (keys.length === 1) {
        setAppSettings({...appSettings, [keys[0]]: !appSettings[keys[0]]})
    } else if (keys.length === 2) {
        setAppSettings({...appSettings, [keys[0]]: {...appSettings[keys[0]], [keys[1]]: !appSettings[keys[0]][keys[1]]}})
    }
}

export default AppConfigurator