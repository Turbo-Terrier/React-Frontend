import {useEffect, useState} from "react";
import Form from "react-bootstrap/Form";
import Autosuggest from "react-autosuggest";
import "../css/searchable-input.css";
import Cookies from "js-cookie";
import {BuCourseSection} from "../data/BuCourse";
import {Col, Row} from "react-bootstrap";


const courseSemesterCache = {} // holds the course list for each semester

const SearchableInput = ({validCourseFormat, rawCourseValueHook, courseSuggestionsHook, selectedCourseHook, selectedSemesterHook, courseListHook}) => {
    const [rawCourseValue, setRawCourseValue] = rawCourseValueHook;
    const [courseSuggestions, setCourseSuggestions] = courseSuggestionsHook;
    const [courseList, setCourseList] = courseListHook;
    const [selectedCourse, setSelectedCourse] = selectedCourseHook;
    const [selectedSemester, setSelectedSemester] = selectedSemesterHook;

    let boxColorClass = "";
    if (rawCourseValue === '') {
        boxColorClass = ''
    } else if (getCourseSuggestions(courseList, selectedCourse, true).length !== 0) {
        boxColorClass = "input-valid"
    } else if (validCourseFormat) {
        boxColorClass = "input-unknown"
    } else {
        boxColorClass = "input-invalid"
    }

    useEffect(() => {
        if (selectedSemester === null) {
            return
        }
        setCourseList([])
        setCourseSuggestions([])

        let semesterCacheKey = selectedSemester.semester_season + selectedSemester.semester_year
        if (courseSemesterCache[semesterCacheKey] != null) {
            setCourseList(courseSemesterCache[semesterCacheKey])
        } else {
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
                    let result = BuCourseSection.specialJson(data)
                    courseSemesterCache[semesterCacheKey] = result
                    setCourseList(result)
                }
            });
        }
    }, [selectedSemester]);

    const onSuggestionsFetchRequested = ({ value, reason }) => {
        if (reason !== "suggestion-selected") {
            setCourseSuggestions(getCourseSuggestions(courseList, value, false));
        }
        setSelectedCourse(value)
    };

    const onSuggestionSelected = (_, { suggestionValue }) => {
        setCourseSuggestions([]);
    };

    const onChange = (_, { newValue }) => {
        setRawCourseValue(newValue);
    };

    const inputProps = {
        placeholder: 'Example: CAS CS 111 A1',
        value: rawCourseValue,
        onChange,
    };

    const renderSuggestion = (suggestion) => (
        <>
            <h6>{suggestion.course.college + ' ' + suggestion.course.department + ' ' + suggestion.course.course_code + ' ' + suggestion.section.section}</h6>
            <Row style={{fontSize: '12px'}}>
                <Col className={""}>{suggestion.section.instructor}</Col>
                <Col className={""}>{suggestion.section.section_type}</Col>
                <Col>{suggestion.section.location}</Col>
                <Col>{suggestion.section.schedule}</Col>
            </Row>
        </>
    );

    return (
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
                    className={"autosuggest-input " + boxColorClass}
                    value={selectedCourse || ""}
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
    );
};

function getCourseSuggestions(courseList, inputValue, exactMatch) {
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
        if (filteredSuggestions[0].courses.length === 0) {
            filteredSuggestions = []
        }
    } else if (exactMatch) {
        filteredSuggestions = []
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