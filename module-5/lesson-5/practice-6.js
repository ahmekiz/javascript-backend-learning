function buildTeamSummaries(teams) {
  return teams
    .filter(team => team.isActive)
    .map(team => {
      const tasksFromActiveProjects = team.projects
        .filter(project => project.status === 'active')
        .flatMap(project => project.tasks);

      return {
        teamId: team.id,

        activeTaskTitles: tasksFromActiveProjects
                        .filter(task => task.status === 'active')
                        .map(task => task.title),

        totalActiveTaskHours: tasksFromActiveProjects
                        .filter(task => task.status === 'active')
                        .reduce((acc, task) => acc + task.hours, 0),

        completedTaskCount: tasksFromActiveProjects
                        .filter(task => task.status === 'completed')
                        .length,

        hasBlockedTask: tasksFromActiveProjects.some(task => task.isBlocked)
      };
    });
}

function buildCustomerSummaries(customers) {
    return customers
        .filter(customer => customer.isActive)
        .map(customer => {
            const activePlans = customer.subscriptions
                .filter(subscription => subscription.status === 'active')
                .flatMap(subscription => subscription.plans)
            return {
                customerId: customer.id,
                customerName: customer.name,
                activePlanNames: activePlans.map(plan => plan.name),
                totalActivePlanPrice: activePlans.reduce((acc,plan) => acc + plan.price,0),
                premiumPlanCount: activePlans.filter(plan => plan.price > 3000).length,
                hasVeryExpensivePlan: activePlans.some(plan => plan.price > 5000)
            }
        })
}

function buildCustomerSummaries(customers) {
    return customers
        .filter(customer => customer.isActive)
        .map(customer => {
            const itemsFromPaidOrders = customer.orders
                .filter(order => order.status === 'paid')
                .flatMap(order => order.items)
            return {
                customerId: customer.id,
                customerName: customer.name,
                purchasedItemNames: itemsFromPaidOrders.map(item => item.name),
                totalSpent: itemsFromPaidOrders.reduce((acc, item) => acc + (item.quantity * item.price),0),
                expensiveItemCount: itemsFromPaidOrders.filter(item => item.price > 2000).length,
                hasUnavailableItem: itemsFromPaidOrders.some(item => !item.isAvailable)
            }
        })
}
