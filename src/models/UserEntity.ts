import { User } from "@prisma/client";

export function fullName(user: User) {
  return `${user.firstName} ${user.lastName}`;
}
