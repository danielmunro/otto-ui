export function canAdminister(userRole, role) {
  if (role === "moderator") {
    return userRole === "moderator" || userRole === "admin";
  }

  return userRole === "admin";
}
