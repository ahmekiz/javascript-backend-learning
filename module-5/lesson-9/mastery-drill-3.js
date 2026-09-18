const students = [
    { id: 1, name: 'Ali' },
    { id: 2, name: 'Ayşe' },
    { id: 3, name: 'Can' },
    { id: 4, name: 'Ece' }
];

const courses = [
    { id: 10, name: 'JavaScript', capacity: 2, enrolledCount: 1 },
    { id: 20, name: 'Node.js', capacity: 3, enrolledCount: 1 }
];

const requests = [
    { id: 101, studentId: 1, courseId: 10 },
    { id: 102, studentId: 2, courseId: 10 },
    { id: 103, studentId: 2, courseId: 20 },
    { id: 104, studentId: 1, courseId: 20 },
    { id: 105, studentId: 3, courseId: 999 },
    { id: 106, studentId: 3, courseId: 20 },
    { id: 107, studentId: 4, courseId: 20 }
];

const studentById = new Map()
for(const student of students) {
    studentById.set(student.id,student)
}
const courseById = new Map()
const acceptedCount = new Map()
for(const course of courses) {
    courseById.set(course.id, course)
    acceptedCount.set(course.id, 0)
}

const studentIdSet = new Set()
const result = {
    accepted: [],
    rejected: []
}
for(const req of requests) {
    if(!studentById.has(req.studentId)) {
        result.rejected.push(req)
        continue
    }
    if(!courseById.has(req.courseId)) {
        result.rejected.push(req)
        continue
    }
    if(studentIdSet.has(req.studentId)) {
        result.rejected.push(req)
        continue
    }
    const course = courseById.get(req.courseId)
    const batchAcceptedCount = acceptedCount.get(req.courseId)
    const student = studentById.get(req.studentId)
    if(course.enrolledCount + batchAcceptedCount >= course.capacity) {
        result.rejected.push(req)
        continue
    }
    acceptedCount.set(req.courseId, (batchAcceptedCount + 1))
    studentIdSet.add(req.studentId)
    result.accepted.push({
        request: req,
        student,
        course
    })
}