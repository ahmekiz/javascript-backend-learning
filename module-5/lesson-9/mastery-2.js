const courses = [
    { id: 1, title: 'JavaScript', capacity: 5, enrolled: 2 },
    { id: 2, title: 'Node.js', capacity: 4, enrolled: 1 },
    { id: 3, title: 'Databases', capacity: 2, enrolled: 2 }
];

const requests = [
    { studentId: 101, courseId: 1 },
    { studentId: 102, courseId: 1 },
    { studentId: 103, courseId: 2 },
    { studentId: 104, courseId: 3 },
    { studentId: 105, courseId: 1 }
];

function previewCourseEnrollments(courses, requests) {
    if(!Array.isArray(courses)) {
        return null
    }
    if(!Array.isArray(requests)) {
        return null
    }
    for(const course of courses) {
        if(course === null || typeof course !== 'object' || Array.isArray(course)) {
            return null
        }
        if(!Number.isInteger(course.id) || course.id <= 0) {
            return null
        }
        if(!Number.isInteger(course.capacity) || course.capacity < 0) {
            return null
        }
        if(!Number.isInteger(course.enrolled) || course.enrolled < 0) {
            return null
        }
        if(course.enrolled > course.capacity) {
            return null
        }
    }
    const courseById = new Map()
    const enrolledCourse = new Map()
    for(const course of courses) {
        courseById.set(course.id, course)
        enrolledCourse.set(course.id, 0)
    }
    const seenStudentId = new Set()
    const result = {
        accepted: [],
        rejected: [],
        courseSummaries: [],
        totalAccept: 0
    }
    for(const req of requests) {
        if(req === undefined || typeof req !== 'object' || Array.isArray(req)) {
            result.rejected.push(req)
            continue
        }
        if(!Number.isInteger(req.studentId) || req.studentId <= 0) {
            result.rejected.push(req)
            continue
        }
        if(!Number.isInteger(req.courseId) || req.courseId <= 0) {
            result.rejected.push(req)
            continue
        }
        if(!courseById.has(req.courseId)) {
            result.rejected.push(req)
            continue
        }
        if(seenStudentId.has(req.studentId)) {
            result.rejected.push(req)
            continue
        }
        const course = courseById.get(req.courseId)
        const projectedCourse = enrolledCourse.get(req.courseId)
        const projectedState = projectedCourse + course.enrolled
        console.log(projectedState);
        if(projectedState > course.capacity) {
            result.rejected.push(req)
            continue
        }
        seenStudentId.add(req.studentId)
        enrolledCourse.set(req.courseId, projectedState)
        result.accepted.push(req)
    }
    for(const course of courses) {
        if(enrolledCourse.get(course.id) <= 0) {
            continue
        }
        result.courseSummaries.push(course)
        result.totalAccept += enrolledCourse.get(course.id)
    }
    return result
}