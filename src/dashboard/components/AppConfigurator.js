import {Accordion, Card, Col, Collapse, Row, Toast} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React, {useEffect, useState} from "react";
import Collapsable from "../../components/Collapsable";
import Switch from "../../components/Switch";
import '../../css/target-course-list.css'
import Cookies from "js-cookie";
import app from "../../App";
import ClarificationPopover from "../../components/ClarificationPopover";
import {StatusToast, ToastStatus} from "../../components/StatusToast";
import Autosuggest from "react-autosuggest";
import {SearchableInput, getCourseSuggestions} from "../../components/SearchableInput";
import {BuCourse, BuCourseSection} from "../../data/BuCourse";



function AppConfigurator() {

    let [appSettings, setAppSettings] = useState(null)
    let [isEmailValid, setIsEmailValid] = useState(true)
    let [isPhoneValid, setIsPhoneValid] = useState(true)
    let [messageSaveToast, setMessageSaveToast] = useState({
        show: false,
        status: ToastStatus.SUCCESS
    })
    let messageSaveToastHook = [messageSaveToast, setMessageSaveToast]
    let settingsHook = [appSettings, setAppSettings]
    let emailValidHook = [isEmailValid, setIsEmailValid]
    let phoneValidHook = [isPhoneValid, setIsPhoneValid]

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
                        <CourseSelectionForum settingsHook={settingsHook} messageSaveToastHook={messageSaveToastHook}/>
                    </Collapsable>
                    <Collapsable id="4" title="Registration Settings">
                        <RegistrationSettings settingsHook={settingsHook} messageSaveToastHook={messageSaveToastHook}/>
                    </Collapsable>
                    <Collapsable id="5" title="Notification Settings">
                        <NotificationSettings settingsHook={settingsHook} messageSaveToastHook={messageSaveToastHook} emailValidHook={emailValidHook} phoneValidHook={phoneValidHook}/>
                    </Collapsable>
                    <Collapsable id="6" title="Other Settings">
                        <OtherSettings settingsHook={settingsHook} messageSaveToastHook={messageSaveToastHook}/>
                    </Collapsable>
                    <StatusToast messageSaveToastHook={messageSaveToastHook}/>
                </Container>}
        </>
    );
}

function OtherSettings({settingsHook, messageSaveToastHook}) {
    let [appSettings, setAppSettings] = settingsHook

    return ( //todo add form?
        <Row className="g-0 p-2 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4" style={{borderBottom: "1px solid var(--bs-secondary-border-subtle)"}}>
            <Col>
                <Switch
                    label="Console Colors"
                    description="When toggled on, we will print to console using pretty colors. Toggle off if either your console doesn't support colors or you are just a boring person."
                    switched={appSettings["console_colors"]}
                    onClick={() => handleSwitchClick(settingsHook, messageSaveToastHook, "console_colors")}
                />
            </Col>
            <Col>
                <Switch
                    label="Custom Chrome Driver"
                    description={"In most cases, you shouldn't need to touch this option. Only toggle on if Turbo Terrier is unable to automatically detect your chrome drivers and specify the path to your drivers here."}
                    switched={appSettings["custom_driver"]["enabled"]}
                    onClick={() => handleSwitchClick(settingsHook, messageSaveToastHook, "custom_driver", "enabled")}
                />
                <div className="d-xl-flex" style={{width: "80%"}}>
                    <Form.Control
                        type="text"
                        value={appSettings["custom_driver"]["driver_path"] || ""}
                        placeholder="/path/to/driver"
                        className="form-control-sm"
                        onChange={(event) => handleInputBoxUpdate(settingsHook, messageSaveToastHook,"custom_driver", {...appSettings["custom_driver"], "driver_path": event.target.value})}
                    />
                </div>
            </Col>
            <Col>
                <Switch
                    label="Debug"
                    description={"Toggle on to enable debug mode. Debug mode is helpful for reporting bugs with the application."}
                    switched={appSettings["debug_mode"]}
                    onClick={() => handleSwitchClick(settingsHook, messageSaveToastHook,"debug_mode")}
                />
            </Col>
            <Col>

            </Col>
        </Row>
    );
}

function NotificationSettings({settingsHook, messageSaveToastHook}) {
    let [appSettings, setAppSettings] = settingsHook
    return ( //todo add form?
        <>
            <Row className="g-0 p-2 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4" style={{borderBottom: "1px solid var(--bs-secondary-border-subtle)"}}>
                <Col className="d-flex d-sm-flex justify-content-center justify-content-sm-center">
                    <div className="align-items-center">
                        <label className="form-label p-1">
                            Alert Email&nbsp;&nbsp;
                            <ClarificationPopover description={"Enter the email which you would like us to use for all communications in this category."} />
                        </label>
                        <Form.Control
                            type="email"
                            value={appSettings["email"] || ""}
                            placeholder="Your Email"
                            className="form-control-sm form-text-input"
                            onChange={(event) => handleInputBoxUpdate(settingsHook, messageSaveToastHook,"email", event.target.value)}
                        />
                    </div>
                </Col>
                <Col className="d-flex d-sm-flex justify-content-center justify-content-sm-center">
                    <div className="align-items-center">
                        <label className="form-label p-1">
                            Alert Phone&nbsp;&nbsp;
                            <ClarificationPopover description={"Enter the phone number which you would like us to use for communication in this category."} />
                        </label>
                        <Form.Control
                            type="tel"
                            value={appSettings["phone"] || ""}
                            placeholder="Your Phone"
                            className="form-control-sm"
                            onChange={(event) => handleInputBoxUpdate(settingsHook, messageSaveToastHook,"phone", event.target.value)}
                        />
                    </div>
                </Col>
                <Col>
                    <Switch
                        label="Updates & News"
                        description="Toggle on if you allow us to contact you about important updates and news regarding Turbo Terrier via email."
                        switched={appSettings["allow_update_emails"]}
                        onClick={() => handleSwitchClick(settingsHook, messageSaveToastHook,"allow_update_emails")}
                    />
                </Col>
                <Col>
                    <Switch
                        label="Promotion & Marketing"
                        description="Toggle on if you allow us to contact you with offers, discounts and other promotional material regarding Turbo Terrier."
                        switched={appSettings["allow_marketing_emails"]}
                        onClick={() => handleSwitchClick(settingsHook, messageSaveToastHook,"allow_marketing_emails")}
                    />
                </Col>
            </Row>
            <Row className="g-0 p-2 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4" style={{borderBottom: "1px solid var(--bs-secondary-border-subtle)"}}>
                <Col>
                    <Switch
                        label="Registration Notifications"
                        description="Toggle on if you want to be alerted if/when Turbo Terrier successfully registers you for one or more of your target courses."
                        switched={appSettings["registration_notifications"]["enabled"]}
                        onClick={() => handleSwitchClick(settingsHook, messageSaveToastHook,"registration_notifications", "enabled")}
                    />
                </Col>
                <Col>
                    <Switch
                        label="Email Alerts"
                        switched={appSettings["registration_notifications"]["email_alerts"] && appSettings["registration_notifications"]["enabled"]}
                        disabled={!appSettings["registration_notifications"]["enabled"]}
                        onClick={() => handleSwitchClick(settingsHook, messageSaveToastHook,"registration_notifications", "email_alerts")}
                    />
                </Col>
                <Col>
                    <Switch
                        label="Text Alerts"
                        switched={appSettings["registration_notifications"]["text_alerts"] && appSettings["registration_notifications"]["enabled"]}
                        disabled={!appSettings["registration_notifications"]["enabled"]}
                        onClick={() => handleSwitchClick(settingsHook, messageSaveToastHook,"registration_notifications", "text_alerts")}
                    />
                </Col>
                <Col>
                    <Switch
                        label="Phone Alerts"
                        switched={appSettings["registration_notifications"]["call_alerts"] && appSettings["registration_notifications"]["enabled"]}
                        disabled={!appSettings["registration_notifications"]["enabled"]}
                        onClick={() => handleSwitchClick(settingsHook, messageSaveToastHook,"registration_notifications", "call_alerts")}
                    />
                </Col>
            </Row>
            <Row className="g-0 p-2 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
                <Col>
                    <Switch
                        label="Watchdog Notifications"
                        description="In case your device looses internet, or shuts down, or the Turbo Terrier application simply crashes, when toggled on the watchdog monitoring system will alert you immediately so you can take appropriate action."
                        switched={appSettings["watchdog_notifications"]["enabled"]}
                        onClick={() => handleSwitchClick(settingsHook, messageSaveToastHook,"watchdog_notifications", "enabled")}
                    />
                </Col>
                <Col>
                    <Switch
                        label="Email Alerts"
                        switched={appSettings["watchdog_notifications"]["email_alerts"] && appSettings["watchdog_notifications"]["enabled"]}
                        disabled={!appSettings["watchdog_notifications"]["enabled"]}
                        onClick={() => handleSwitchClick(settingsHook, messageSaveToastHook,"watchdog_notifications", "email_alerts")}
                    />
                </Col>
                <Col>
                    <Switch
                        label="Text Alerts"
                        switched={appSettings["watchdog_notifications"]["text_alerts"] && appSettings["watchdog_notifications"]["enabled"]}
                        disabled={!appSettings["watchdog_notifications"]["enabled"]}
                        onClick={() => handleSwitchClick(settingsHook, messageSaveToastHook,"watchdog_notifications", "text_alerts")}
                    />
                </Col>
                <Col>
                    <Switch
                        label="Phone Alerts"
                        switched={appSettings["watchdog_notifications"]["call_alerts"] && appSettings["watchdog_notifications"]["enabled"]}
                        disabled={!appSettings["watchdog_notifications"]["enabled"]}
                        onClick={() => handleSwitchClick(settingsHook, messageSaveToastHook,"watchdog_notifications", "call_alerts")}
                    />
                </Col>
            </Row>
        </>
    );
}

function RegistrationSettings({settingsHook, messageSaveToastHook}) {
    let [appSettings, setAppSettings] = settingsHook
    return (
        <Row className="g-0 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
            <Col>
                <Switch
                    label="Real Registration"
                    description="When toggled off, registers to the course planner for testing purposes. When toggled on, performs real registerations on your target courses."
                    switched={appSettings["real_registrations"]}
                    onClick={() => handleSwitchClick(settingsHook, messageSaveToastHook,"real_registrations")}
                />
            </Col>
            <Col>
                <Switch
                    label="Keep Trying"
                    description="When toggled off, if the application encounters too many successive errors, it will give up and shut off. When toggled on, the application will keep trying to register to the course until it succeeds discarding all errors."
                    switched={appSettings["keep_trying"]}
                    onClick={() => handleSwitchClick(settingsHook, messageSaveToastHook,"keep_trying")}
                />
            </Col>
            <Col>
                <Switch
                    label="Save Password"
                    description="When toggled off, you will be required to enter your password anytime you start the app. When toggled on, the password will be encrypted and securely stored on your device for conveniance. Either way, your passwords never leave your computer except to log into BU."
                    switched={appSettings["save_password"]}
                    onClick={() => handleSwitchClick(settingsHook, messageSaveToastHook,"save_password")}
                />
            </Col>
            <Col>
                <Switch
                    label="Save Duo Cookies"
                    description="When toggled off, you will be required to do your Duo authentication on every restart. When toggled on, Duo authentication cookies will be encrypted and securely stored on your device for conveniance. Either way, these cookies never leave your computer except to log into BU."
                    switched={appSettings["save_duo_cookies"]}
                    onClick={() => handleSwitchClick(settingsHook, messageSaveToastHook,"save_duo_cookies")}
                />
            </Col>
        </Row>
    );
}

async function updateCourse(courseObject, insert) {
    let endpoint = "http://localhost:8080/api/web/v1/course-update"

    let userOptions = {
        method: insert ? "POST" : "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Accept-Encoding": "gzip, deflate, br",
            "Authorization": Cookies.get("jwt-token")
        },
        body: JSON.stringify({
            course_id: courseObject.course.course_id,
            section_id: courseObject.section.section
        })
    }
    return await fetch(endpoint, userOptions)
}

function CourseSelectionForum({settingsHook, messageSaveToastHook}) {
    let [appSettings, setAppSettings] = settingsHook
    let [messageSaveToast, setMessageSaveToast] = messageSaveToastHook

    let [courseSuggestions, setCourseSuggestions] = useState([])
    const [rawCourseValue, setRawCourseValue] = useState('');
    let [activeSemesters, setActiveSemesters] = useState([])
    const [courseList, setCourseList] = useState([]);
    let [selectedSemester, setSelectedSemester] = useState(null)
    let courseSuggestionsHook = [courseSuggestions, setCourseSuggestions]
    let [selectedCourse, setSelectedCourse] = useState(null)
    let rawCourseValueHook = [rawCourseValue, setRawCourseValue]
    let selectedCourseHook = [selectedCourse, setSelectedCourse]
    let selectedSemesterHook = [selectedSemester, setSelectedSemester];
    let courseListHook = [courseList, setCourseList]

    const deleteHandler = (course) => {
        updateCourse(course, false)
            .then(response => {
                if (response.ok) {
                    let newSettings = {
                        ...appSettings,
                    };
                    newSettings.target_courses = newSettings.target_courses.filter(c => c.course.course_id !== course.course.course_id || c.section.section !== course.section.section)
                    setAppSettings(newSettings)
                    setMessageSaveToast({
                        show: true,
                        message: "Your changes have been saved!",
                        status: ToastStatus.SUCCESS
                    })

                } else {
                    setMessageSaveToast({
                        show: true,
                        message: "Error, we were unable to save your changes!",
                        status: ToastStatus.ERROR
                    })
                }
            })
            .catch(error => console.log(error))
    }

    // todo
    function addCourse() {
        let selectedCourseObject = getCourseSuggestions(courseList, selectedCourse, true)
        if (selectedCourseObject.length === 0) {
            console.log("TODO") //todo warn about unknown course being added
            return
        } else {
            selectedCourseObject = selectedCourseObject[0].courses[0]
        }
        updateCourse(selectedCourseObject, true)
            .then(response => {
                if (response.ok) {
                    // prevent duplicates
                    if (appSettings.target_courses.filter(c => c.course.course_id === selectedCourseObject.course.course_id && c.section.section === selectedCourseObject.section.section).length === 0) {
                        setAppSettings({
                            ...appSettings,
                            target_courses: [...appSettings.target_courses, selectedCourseObject]
                        })
                        setMessageSaveToast({
                            show: true,
                            message: "Your changes have been saved!",
                            status: ToastStatus.SUCCESS
                        })
                    } else {
                        setMessageSaveToast({
                            show: true,
                            message: "You already have that course added!",
                            status: ToastStatus.ERROR
                        })
                    }
                    setSelectedCourse(null)
                    setRawCourseValue("")
                    setSelectedSemester(null)

                } else {
                    setMessageSaveToast({
                        show: true,
                        message: "Error, we were unable to save your changes!",
                        status: ToastStatus.ERROR
                    })
                }
            })
            .catch(error => console.log(error))
    }

    function updateSelectedSemester(event) {
        if (event.target.value === '0') {
            return
        }
        let parts = event.target.value.split(" ")
        let semesterSeason = parts[0]
        let semesterYear = parseInt(parts[1])
        setSelectedSemester({
            semester_season: semesterSeason,
            semester_year: semesterYear
        })
        setSelectedCourse(null)
    }

    async function fetchActiveSemesters(){
        let endpoint = "http://localhost:8080/api/web/v1/active-semesters"
        let userOptions = {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Accept-Encoding": "gzip, deflate, br",
                "Authorization": Cookies.get("jwt-token")
            },
        }
        return await fetch(endpoint, userOptions)
    }

    useEffect(() => {
        fetchActiveSemesters()
            .then(response => response.json())
            .then(data => {
                setActiveSemesters(data)
            })
            .catch(error => console.log(error))
    }, [])

    // convert appSettings.target_courses into a dictionary of semesters to courses
    let coursesBySemester = {}
    appSettings.target_courses.forEach(courseInfo => {
        let key = courseInfo.course.semester.semester_season + " " + courseInfo.course.semester.semester_year
        if (key in coursesBySemester) {
            coursesBySemester[key].push(courseInfo)
        } else {
            coursesBySemester[key] = [courseInfo]
        }
    })

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
                        {/* TODO: I rather add sections for the semesters */}
                        <Col style={{width: '100%'}} className={"p-1"}>
                            {
                                Object.entries(coursesBySemester).map(([semester, targetCourses]) =>
                                    (<>
                                        <Row>
                                            <h6>
                                                [{semester} Semester]
                                            </h6>
                                        </Row>
                                        <Row>
                                            {targetCourses.map((courseInfo) => {
                                                return <AddedCourse
                                                    key={
                                                        courseInfo.course.semester_season + " " +
                                                        courseInfo.course.semester_year + " " +
                                                        courseInfo.course.course_id + " " +
                                                        courseInfo.section.section
                                                    }
                                                    courseInfo={courseInfo} deleteHandler={() => deleteHandler(courseInfo)}/>
                                            })}
                                        </Row>
                                    </>)
                                )
                            }
                        </Col>
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
                        <Form.Select value={selectedSemester ? `${selectedSemester.semester_season} ${selectedSemester.semester_year}` : "0"} required onChange={updateSelectedSemester}>
                            <option value="0" disabled>Select the target semester</option>
                            {activeSemesters.map((semester) => {
                                return <option
                                    key={semester.semester_season + " " + semester.semester_year}
                                    value={semester.semester_season + " " + semester.semester_year}
                                >
                                    {semester.semester_season + " " + semester.semester_year}
                                </option>
                            })}
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col md className="m-2">
                    <Form.Group className="mb-3">
                        <Form.Label className="form-label fw-semibold d-md-flex justify-content-md-center">Course</Form.Label>
                        <SearchableInput rawCourseValueHook={rawCourseValueHook} courseSuggestionsHook={courseSuggestionsHook} selectedCourseHook={selectedCourseHook} selectedSemesterHook={selectedSemesterHook} courseListHook={courseListHook}/>
                    </Form.Group>
                </Col>
            </Row>
            <Row className="g-0">
                <Col className="d-flex d-md-flex justify-content-center justify-content-md-center">
                    <Button variant="danger"
                            className="border rounded border-1"
                            type="button"
                            onClick={() => addCourse()}
                            style={{ width: '25%' }}>
                        Add
                    </Button>
                </Col>
            </Row>
        </Form>
    )
}

function AddedCourse({courseInfo, deleteHandler}) {
    return (
        <Col>
            <p className="target-course">
                {courseInfo.course.college + " " + courseInfo.course.department + " " + courseInfo.course.course_code + " " + courseInfo.section.section}
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


let timerId1 = null //todo finish
let queued_updates = {}
// update settings using a delay (to prevent too many requests from being sent to the backend)
function updateSetting(messageSaveToastHook, settingKey, newValue) {
    timerId1 && clearTimeout(timerId1)
    let [messageSaveToast, setMessageSaveToast] = messageSaveToastHook
    queued_updates[settingKey] = newValue
    timerId1 = setTimeout(() => {
        let endpoint = "http://localhost:8080/api/web/v1/user-app-settings"
        let userOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Accept-Encoding": "gzip, deflate, br",
                "Authorization": Cookies.get("jwt-token")
            },
            body: JSON.stringify(queued_updates)
        }
        fetch(endpoint, userOptions)
            .then(() => {
                queued_updates = {}
                setMessageSaveToast({
                    show: true,
                    message: "Your changes have been saved!",
                    status: ToastStatus.SUCCESS
                })
            }).catch(() => {
                setMessageSaveToast({
                    show: true,
                    message: "Error, we were unable to save your changes!",
                    status: ToastStatus.ERROR
                })
            })

    }, 1500)
}

function handleSwitchClick(settingsHook, messageSaveToastHook, ...keys) {
    let [appSettings, setAppSettings] = settingsHook
    if (keys.length === 1) {
        setAppSettings({...appSettings, [keys[0]]: !appSettings[keys[0]]})
        updateSetting(messageSaveToastHook, keys[0], !appSettings[keys[0]])
    } else if (keys.length === 2) {
        setAppSettings({...appSettings, [keys[0]]: {...appSettings[keys[0]], [keys[1]]: !appSettings[keys[0]][keys[1]]}})
        updateSetting(messageSaveToastHook, keys[0], {...appSettings[keys[0]], [keys[1]]: !appSettings[keys[0]][keys[1]]})
    }
}

function handleInputBoxUpdate(settingsHook, messageSaveToastHook, key, value) {
    let [appSettings, setAppSettings] = settingsHook
    setAppSettings({...appSettings, [key]: value})
    updateSetting(messageSaveToastHook, key, value)
}

export default AppConfigurator