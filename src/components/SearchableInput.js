import {useEffect, useState} from "react";
import Form from "react-bootstrap/Form";
import Autosuggest from "react-autosuggest";
import "../css/searchable-input.css";
import Cookies from "js-cookie";
import {BuCourseSection} from "../data/BuCourse";
import {Col, Row} from "react-bootstrap";



const SearchableInput = ({courseSuggestionsHook, selectedCourseHook, selectedSemesterHook, courseListHook}) => {
    const [value, setValue] = useState('');
    const [courseSuggestions, setCourseSuggestions] = courseSuggestionsHook;
    const [courseList, setCourseList] = courseListHook;
    const [selectedCourse, setSelectedCourse] = selectedCourseHook;
    const [selectedSemester, setSelectedSemester] = selectedSemesterHook;

    useEffect(() => {
        if (selectedSemester === null) {
            return
        }
        setCourseList([])
        setCourseSuggestions([])
        getAllCourses(selectedSemester).then(resp => {
            if (resp.ok) {
                return resp.json()
            } else {
                return null;
            }
        }).then(data => {
            if (data === null) {
                setCourseList(null)
            } else {
                setCourseList(BuCourseSection.specialJson(data))
            }
        });
    }, [selectedSemester]);

    const onSuggestionsFetchRequested = ({ value, reason }) => {
        if (reason !== "suggestion-selected") {
            setCourseSuggestions(getCourseSuggestions(courseList, value));
        }
        setSelectedCourse(value)
    };

    const onSuggestionSelected = (_, { suggestionValue }) => {
        setCourseSuggestions([]);
    };

    const onChange = (_, { newValue }) => {
        setValue(newValue);
    };

    const inputProps = {
        placeholder: 'Course Name & Section (i.e. CAS CS 111 A1)',
        value,
        onChange,
    };

    const renderSuggestion = (suggestion) => (
        <>
            <h6>{suggestion.course.college + ' ' + suggestion.course.department + ' ' + suggestion.course.course_code + ' ' + suggestion.section.section}</h6>
            <Row style={{fontSize: '12px'}}>
                <Col className={""}>{suggestion.section.instructor}</Col>
                <Col>{suggestion.section.location}</Col>
                <Col>{suggestion.section.schedule}</Col>
            </Row>
        </>
    );

    return (
        <Form>
            <Autosuggest
                suggestions={courseSuggestions}
                onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                alwaysRenderSuggestions={true}
                onSuggestionSelected={onSuggestionSelected}
                getSuggestionValue={(suggestion) =>
                    suggestion.course.college +
                    ' ' +
                    suggestion.course.department +
                    ' ' +
                    suggestion.course.course_code +
                    ' ' +
                    suggestion.section.section
                }
                renderSuggestion={(suggestion) => {
                    return renderSuggestion(suggestion)
                }}
                renderInputComponent={(inputProps) => (
                    <Form.Control
                        {...inputProps}
                        type="text"
                        className="autosuggest-input"
                        disabled={selectedSemester === null}
                    />
                )}
                inputProps={inputProps}
                renderSuggestionsContainer={({ containerProps, children, query }) => (
                    <div {...containerProps} className={"autosuggest-suggestions-container"}>
                        {children}
                    </div>
                )}
                multiSection={true}
                renderSectionTitle={(suggestion) => {
                    let courseTitle = suggestion.courses[0].course.title
                    return <strong>
                        {
                            suggestion.courseName + " - " + courseTitle
                        }
                    </strong>
                }}
                getSectionSuggestions={(suggestion) => {
                    return suggestion.courses
                }}
                scrollBar={true}
            />

        </Form>
    );
};

function getCourseSuggestions(courseList, inputValue, exactMatch = false) {
    inputValue = inputValue.toLowerCase().trim();
    let searchedCourse = inputValue.split(" ").splice(0, 3).join(" ").toString().trim()

    let filteredSuggestions = courseList.filter(
        (course) => {
            if (exactMatch) {
                return searchedCourse.startsWith(course.courseName.toLowerCase())
            } else {
                return (course.courseName)
                    .toLowerCase()
                    .includes(searchedCourse)
            }
        }
    );


    let splitInput = inputValue.split(" ")
    if (splitInput.length === 4 && filteredSuggestions.length === 1) {
        filteredSuggestions = [{courseName: filteredSuggestions[0].courseName, courses: filteredSuggestions[0].courses.filter(
                course => {
                    if (exactMatch) {
                        return course.section.section.toLowerCase() === splitInput[3]
                    } else {
                        return course.section.section.toLowerCase().startsWith(splitInput[3])
                    }
                }
            )}]
    }

    return filteredSuggestions.slice(0, 30)
};

async function getAllCourses(semester) {
    let endpoint = "http://localhost:8080/api/web/v1/get-available-courses"
    let userOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Accept-Encoding": "gzip, deflate, br",
            "Authorization": Cookies.get("jwt-token")
        },
    }
    return await fetch(`${endpoint}?semester_season=${semester.semester_season}&semester_year=${semester.semester_year}`, userOptions)
}

export {SearchableInput, getCourseSuggestions};