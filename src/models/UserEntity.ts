export default interface UserEntity {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: Date;
  gender: string;
  fileName: string;
}

export function fullName(user: UserEntity) {
  return `${user.firstName} ${user.lastName}`;
}
