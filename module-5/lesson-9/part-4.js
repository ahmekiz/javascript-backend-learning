const allowedPlanIds = [10, 20, 30];

const requests = [
    { planId: 10 },
    { planId: 30 },
    { planId: 40 }
];

const allowedPlanIdSet = new Set(allowedPlanIds);

const hasInvalidPlan = requests.some(request => {
    return !allowedPlanIdSet.has(request.planId)
});

if (hasInvalidPlan) {
    return null;
}