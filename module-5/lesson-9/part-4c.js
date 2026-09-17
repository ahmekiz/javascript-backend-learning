const allowedPlanIds = [10, 20, 30, 40];

const requestedPlanIds = [20, 40, 50, 60];

const allowedPlanIdsSet = new Set(allowedPlanIds);

const requestedPlanIdsDTO = requestedPlanIds.reduce((acc, planId) => {

    if (allowedPlanIdsSet.has(planId)) {
        acc.acceptedPlanIds.push(planId);
    } else {
        acc.rejectedPlanIds.push(planId);
    }

    return acc;

}, {
    acceptedPlanIds: [],
    rejectedPlanIds: []
});