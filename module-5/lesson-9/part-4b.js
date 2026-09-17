const allowedPlanIds = [10, 20, 30, 40];

const requestedPlanIds = [20, 40, 50, 60];

const allowedPlanIdsSet = new Set(allowedPlanIds);

const commonPlanIds = requestedPlanIds.filter(req => {
    return allowedPlanIdsSet.has(req)
})

const differancePlanIds = requestedPlanIds.filter(req => {
    return !allowedPlanIdsSet.has(req)
})

const targetDTO = {
    acceptedPlanIds: commonPlanIds,
    rejectedPlanIds: differancePlanIds,
    canProceed: (differancePlanIds.length === 0) ? true : false
}