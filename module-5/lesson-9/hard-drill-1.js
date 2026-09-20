const developers = [
    { id: 1, name: 'Ada',   maxHours: 10, currentHours: 4 },
    { id: 2, name: 'Linus', maxHours: 8,  currentHours: 6 },
    { id: 3, name: 'Grace', maxHours: 12, currentHours: 8 }
];

const projects = [
    { id: 10, name: 'API',       budgetHours: 10, usedHours: 3 },
    { id: 20, name: 'Dashboard', budgetHours: 6,  usedHours: 5 },
    { id: 30, name: 'IoT',       budgetHours: 8,  usedHours: 2 }
];

const requests = [
    { assignmentId: 1001, developerId: 1, projectId: 10, hours: 3 },
    { assignmentId: 1002, developerId: 2, projectId: 10, hours: 3 },
    { assignmentId: 1002, developerId: 3, projectId: 30, hours: 2 },
    { assignmentId: 1003, developerId: 1, projectId: 20, hours: 2 },
    { assignmentId: 1004, developerId: 1, projectId: 10, hours: 3 },
    { assignmentId: 1005, developerId: 3, projectId: 30, hours: 3 },
    { assignmentId: 1006, developerId: 2, projectId: 20, hours: 1 },
    { assignmentId: 1001, developerId: 2, projectId: 30, hours: 1 }
];