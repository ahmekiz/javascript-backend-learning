const users = [
  { id: 1, name: 'Ali' },
  { id: 2, name: 'Ayşe' },
  { id: 3, name: 'Can' }
];

const roles = [
  { id: 10, name: 'admin' },
  { id: 20, name: 'editor' }
];

const invites = [
  { id: 101, userId: 1, roleId: 10 },
  { id: 102, userId: 2, roleId: 999 },
  { id: 103, userId: 2, roleId: 20 },
  { id: 104, userId: 1, roleId: 20 },
  { id: 105, userId: 999, roleId: 10 },
  { id: 106, userId: 3, roleId: 20 }
];

const userById = new Map();
for(const user of users) {
    userById.set(user.id, user)
}

const roleById = new Map();
for(const role of roles) {
    roleById.set(role.id, role)
}

const userIdSet = new Set();
const result = {
    accepted: [],
    rejected: []
}

for(const invite of invites) {
    if(!userById.has(invite.userId)) {
        result.rejected.push(invite)
        continue
    }
    if(!roleById.has(invite.roleId)) {
        result.rejected.push(invite)
        continue
    }
    if(userIdSet.has(invite.userId)) {
        result.rejected.push(invite)
        continue
    }
    const user = userById.get(invite.userId)
    const role = roleById.get(invite.roleId)
    result.accepted.push({invite, user, role})
    userIdSet.add(invite.userId)
}