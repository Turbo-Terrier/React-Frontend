import JsonSerializable from "./JsonSerializable";

class BuCourse extends JsonSerializable {

    constructor(course_id, semester, college, department, course_code, title, credits) {
        super();
        this.course_id = course_id;
        this.semester = semester;
        this.college = college;
        this.department = department;
        this.course_code = course_code;
        this.title = title;
        this.credits = credits;
    }

}

class CourseSection extends JsonSerializable{
    constructor(section, open_seats, instructor, section_type, location, schedule, dates, notes) {
        super();
        this.section = section;
        this.open_seats = open_seats;
        this.instructor = instructor;
        this.section_type = section_type;
        this.location = location;
        this.schedule = schedule;
        this.dates = dates;
        this.notes = notes;
    }

}

class BuCourseSection extends JsonSerializable {
    constructor(course, section) {
        super();
        this.course = course;
        this.section = section;
    }

    static specialJson(json) {
        let originalData = JsonSerializable.fromJsonArray(json)
        let courseDict = {}
        for (let i = 0; i < originalData.length; i++) {
            let courseName = originalData[i].course.college + " " + originalData[i].course.department + " " + originalData[i].course.course_code
            if (courseName in courseDict) {
                courseDict[courseName].push(originalData[i])
            } else {
                courseDict[courseName] = [originalData[i]]
            }
        }
        let convertedData = []
        for (let courseName in courseDict) {
            convertedData.push({
                courseName: courseName,
                courses: courseDict[courseName],
            })
        }
        return convertedData
    }
}

export { BuCourse, CourseSection, BuCourseSection }