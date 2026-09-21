const developer = {
    id: 1,
    name: 'Ada',
    currentHours: 5,
    maxHours: 12
};

const project = {
    id: 10,
    name: 'API',
    usedHours: 4,
    budgetHours: 10
};

const batchState = {
    seenAssignmentIds: new Set([4000]),

    addedHoursByDeveloper: new Map([
        [1, 2]
    ]),

    addedHoursByProject: new Map([
        [10, 1]
    ])
};

const request = {
    assignmentId: 4001,
    developerId: 1,
    projectId: 10,
    hours: 3
};