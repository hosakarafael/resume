import { User } from "@prisma/client";
import { s3downloadFile } from "../utils/s3";

export function fullName(user: User) {
  return `${user.firstName} ${user.lastName}`;
}

//works only on server side
export function getUserImage(user: User | null) {
  if (user?.fileName) {
    return s3downloadFile(`users/${user.id}`, user.fileName);
  } else {
    return "/images/no-picture.jpeg";
  }
}
