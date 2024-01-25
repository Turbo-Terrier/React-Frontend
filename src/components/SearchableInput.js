import {useEffect, useState} from "react";
import Form from "react-bootstrap/Form";
import Autosuggest from "react-autosuggest";
import "../css/searchable-input.css";
import Cookies from "js-cookie";
import {BuCourseSection} from "../data/BuCourse";



const SearchableInput = ({courseSuggestionsHook}) => {
    const [value, setValue] = useState('');
    const [courseSuggestions, setCourseSuggestions] = courseSuggestionsHook;
    const [courseList, setCourseList] = useState([]);

    useEffect(() => {
        getAllCourses("2021F").then(resp => {
            if (resp.ok) {
                return resp.json()
            } else {
                return null;
            }
        }).then(data => {
            if (data === null) {
                setCourseList(null)
            } else {
                setCourseList(BuCourseSection.fromJsonArray(data))
                console.log(courseList)
            }
        });
    }, []);

    let timerId = null //todo finish
    const updateCourseSuggestions = (inputValue) => {
        timerId && clearTimeout(timerId)
        inputValue = inputValue.toLowerCase().trim();

        timerId = setTimeout(() => {
            const filteredSuggestions = courseList.filter(
                (course) => {
                    return (course.course.college + ' ' + course.course.department + ' ' + course.course.course_code + ' ' + course.section.section)
                        .toLowerCase()
                        .includes(inputValue.toLowerCase())
                }
            );

            setCourseSuggestions(filteredSuggestions);
        }, 250);
    };

    const onSuggestionsFetchRequested = ({ value }) => {
        updateCourseSuggestions(value);
    };

    const onSuggestionsClearRequested = () => {
        setCourseSuggestions([]);
    };

    const onSuggestionSelected = (_, { suggestionValue }) => {
        // Handle the selection of a suggestion, e.g., update state or perform an action
        console.log(`Selected suggestion: ${suggestionValue}`);
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
            {suggestion.course.college} {suggestion.course.department} {suggestion.course.course_code} {suggestion.section.section}
        </>
    );

    return (
        <Form>
            <Autosuggest
                suggestions={courseSuggestions}
                onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                onSuggestionsClearRequested={onSuggestionsClearRequested}
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
                renderSuggestion={(suggestion) => renderSuggestion(suggestion)}
                renderInputComponent={(inputProps) => (
                    <Form.Control
                        {...inputProps}
                        type="text"
                        className="autosuggest-input"
                    />
                )}
                inputProps={inputProps}
                renderSuggestionsContainer={({ containerProps, children, query }) => (
                    <div {...containerProps} className={"autosuggest-suggestions-container"}>
                        {children}
                    </div>
                )}
                multiSection={false}
                renderSectionTitle={(suggestion) => {
                    return <strong>{suggestion.course.college + " " + suggestion.course.department + " " + suggestion.course.course_code}</strong>
                }}
                getSectionSuggestions={(suggestion) => {
                    return suggestion.section.section
                }}
                scrollBar={true}
            />

        </Form>
    );
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
    return await fetch(`${endpoint}?semester=${semester}`, userOptions)
}

export default SearchableInput;