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

function previewAssignments(developers, projects, requests, batchState) {
    if(!Array.isArray(developers)) {
     return null
    }
    if(!Array.isArray(projects)) {
     return null
    }
    if(!Array.isArray(requests)) {
     return null
    }
    if(batchState === null || typeof batchState !== 'object' || Array.isArray(batchState)) {
     return null
    }
    if(!(batchState.seenAssignmentIds instanceof Set)) {
     return null
    }
    if(!(batchState.addedHoursByDeveloper instanceof Map) || !(batchState.addedHoursByProject instanceof Map)) {
     return null
    }
    const developerById = new Map()
    const projectedHoursByDeveloperId = new Map()
    for(const developer of developers) {
     if(developer === null || typeof developer !== 'object' || Array.isArray(developer)) {
      return null
     }
     if(!Number.isInteger(developer.id) || developer.id <= 0) {
      return null
     }
     if(!Number.isInteger(developer.currentHours) || developer.currentHours < 0) {
      return null
     }
     if(!Number.isInteger(developer.maxHours) || developer.maxHours < 0) {
      return null
     }
     if(typeof developer.name !== 'string') {
      return null
     }
     if(developer.currentHours > developer.maxHours) {
      return null
     }
     developerById.set(developer.id, developer)
     projectedHoursByDeveloperId.set(developer.id, 0)
    }
    const projectById = new Map()
    const projectedHoursByProjectId = new Map()
    for(const project of projects) {
     if(project === null || typeof project !== 'object' || Array.isArray(project)) {
      return null
     }
     if(!Number.isInteger(project.id) || project.id <= 0) {
      return null
     }
     if(!Number.isInteger(project.usedHours) || project.usedHours < 0) {
      return null
     }
     if(!Number.isInteger(project.budgetHours) || project.budgetHours < 0) {
      return null
     }
     if(typeof project.name !== 'string') {
      return null
     }
     if(project.usedHours > project.budgetHours) {
      return null
     }
     projectById.set(project.id, project)
     projectedHoursByProjectId.set(project.id, 0)
    }
    const result = {
     accepted: [],
     rejected: [],
     developerSummaries: [],
     projectSummaries: [],
     totalAcceptedAssignments: 0,
     totalAcceptedHours: 0
    }
    for(const req of requests) {
     if(req === null || typeof req !== 'object' || Array.isArray(req)) {
      result.rejected.push(req)
      continue
     }
     if(!Number.isInteger(req.assignmentId) || req.assignmentId <= 0) {
      result.rejected.push(req)
      continue
     }
     if(!Number.isInteger(req.developerId) || req.developerId <= 0) {
      result.rejected.push(req)
      continue
     }
     if(!Number.isInteger(req.projectId) || req.projectId <= 0) {
      result.rejected.push(req)
      continue
     }
     if(!Number.isInteger(req.hours) || req.hours < 0) {
      result.rejected.push(req)
      continue
     }
     if(!batchState.addedHoursByDeveloper.get(req.developerId)) {
      result.rejected.push(req)
      continue
     }
     if(!batchState.addedHoursByProject.get(req.projectId)) {
      result.rejected.push(req)
      continue
     }
     if(batchState.seenAssignmentIds.has(req.assignmentId)) {
      result.rejected.push(req)
      continue
     }
     const developer = developerById.get(req.developerId)
     const project = projectById.get(req.projectId)
     const batchDeveloperHours = batchState.addedHoursByDeveloper.get(developer.id)
     const batchProjectHours = batchState.addedHoursByProject.get(project.id)
     const projectedDeveloperHours = batchDeveloperHours + req.hours + developer.currentHours
     const projectedProjectHours = batchProjectHours + req.hours + project.usedHours
     if(projectedDeveloperHours > developer.maxHours) {
      result.rejected.push(req)
      continue
     }
     if(projectedProjectHours > project.budgetHours) {
      result.rejected.push(req)
      continue
     }
     batchState.seenAssignmentIds.add(req.assignmentId)
     batchState.addedHoursByDeveloper.set(req.developerId, batchDeveloperHours + req.hours)
     batchState.addedHoursByProject.set(req.projectId, batchProjectHours + req.hours)
     projectedHoursByDeveloperId.set(req.developerId, req.hours)
     projectedHoursByProjectId.set(req.projectId, req.hours)
     result.accepted.push(req)
     result.totalAcceptedAssignments += 1
     result.totalAcceptedHours += req.hours
    }
    for(const developer of developers) {
     if(projectedHoursByDeveloperId.get(developer.id) <= 0) {
      continue
     }
     const projectedHours = batchState.addedHoursByDeveloper.get(developer.id) + developer.currentHours
     result.developerSummaries.push({
      developerId: developer.id,
      developerName: developer.name,
      addedHours: projectedHoursByDeveloperId.get(developer.id),
      projectedHours: projectedHours,
      remainingHours: developer.maxHours - projectedHours
     })
    }
    for(const project of projects) {
     if(projectedHoursByProjectId.get(project.id) <= 0) {
      continue
     }
     const projectedUsedHours = batchState.addedHoursByProject.get(project.id)
     result.projectSummaries.push({
      projectId: project.id,
      projectName: project.name,
      addedHours: projectedHoursByProjectId.get(project.id),
      projectedUsedHours: projectedUsedHours,
      remainingBudgetHours: project.budgetHours - projectedUsedHours
     })
    }
    return result
}