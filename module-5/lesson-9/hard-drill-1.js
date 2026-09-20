const developers = [
    { id: 1, name: 'Ada',   currentHours: 5, maxHours: 10 },
    { id: 2, name: 'Linus', currentHours: 7, maxHours: 9 },
    { id: 3, name: 'Grace', currentHours: 1, maxHours: 10 }
];

const projects = [
    { id: 10, name: 'API',  usedHours: 4, budgetHours: 8 },
    { id: 20, name: 'Auth', usedHours: 6, budgetHours: 10 }
];

const requests = [
    { assignmentId: 4001, developerId: 1, projectId: 10, hours: 2 },
    { assignmentId: 4002, developerId: 2, projectId: 20, hours: 3 },
    { assignmentId: 4003, developerId: 3, projectId: 10, hours: 2 },
    { assignmentId: 4000, developerId: 3, projectId: 20, hours: 1 },
    { assignmentId: 4004, developerId: 3, projectId: 20, hours: 2 }
];

const batchState = {
    seenAssignmentIds: new Set([4000]),

    addedHoursByDeveloper: new Map([
        [1, 2],
        [2, 0],
        [3, 1]
    ]),

    addedHoursByProject: new Map([
        [10, 1],
        [20, 1]
    ])
};