export function canAdminister(userRole, role) {
  if (role === Role.moderator) {
    return userRole === Role.moderator || userRole === Role.admin;
  }

  return userRole === Role.admin;
}

export const Role = {
  user: "user",
  moderator: "moderator",
  admin: "admin",
};
