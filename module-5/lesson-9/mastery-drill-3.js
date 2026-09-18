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