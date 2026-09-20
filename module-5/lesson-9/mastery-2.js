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
        if(typeof course.title !== 'string') {
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
        totalAccepted: 0
    }
    for(const req of requests) {
        if(req === null || typeof req !== 'object' || Array.isArray(req)) {
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
        const addedSoFar = enrolledCourse.get(req.courseId)
        const projectedEnrolled = addedSoFar + course.enrolled + 1
        const projectedState = course.capacity - projectedEnrolled
        if(projectedState < 0) {
            result.rejected.push(req)
            continue
        }
        seenStudentId.add(req.studentId)
        enrolledCourse.set(req.courseId, addedSoFar + 1)
        result.accepted.push(req)
    }
    for(const course of courses) {
        if(enrolledCourse.get(course.id) <= 0) {
            continue
        }
        const addedEnrollments = enrolledCourse.get(course.id)
        const projectedEnrolled = course.enrolled + addedEnrollments
        result.courseSummaries.push({
            courseId: course.id,
            courseTitle: course.title,
            addedEnrollments: addedEnrollments,
            projectedEnrolled: projectedEnrolled,
            remainingCapacity: course.capacity - projectedEnrolled
        })
        result.totalAccepted += addedEnrollments
    }
    return result
}