function isValidPlan(plan) {
    if(plan === null || typeof plan !== 'object' || Array.isArray(plan)) {
        return false
    }
    if(!Number.isInteger(plan.id) || plan.id <= 0) {
        return false
    }
    if(typeof plan.name !== 'string' || plan.name.trim().length === 0) {
        return false
    }
    if(!Number.isFinite(plan.price) || plan.price < 0) {
        return false
    }
    return true
}

function isValidSubscription(sub) {
  return (
    sub !== null &&
    typeof sub === "object" &&
    !Array.isArray(sub) &&
    typeof sub.status === "string" &&
    Array.isArray(sub.plans)
  );
}

const subscriptions = [
  {
    status: "active",
    plans: [
      { id: 12, name: "Pro", price: 1200 },
      null,
      { id: 15, name: "", price: 800 }
    ]
  },
  {
    status: "paused",
    plans: [
      { id: 20, name: "Business", price: 2500 }
    ]
  }
];

const planId = 12;

const targetPlan = subscriptions
    .filter(isValidSubscription)
    .filter(sub => sub.status === 'active')
    .flatMap(sub => sub.plans)
    .filter(isValidPlan)
    .find(plan => plan.id === planId)