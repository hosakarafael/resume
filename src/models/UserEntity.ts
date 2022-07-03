export default class UserEntity {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: Date;
  gender: string;
  fileName: string;

  constructor(data: UserEntity) {
    this._id = data._id;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.email = data.email;
    this.fileName = data.fileName;
    this.birthDate = data.birthDate;
    this.gender = data.gender;
  }

  get fullName(): string {
    return this.firstName + " " + this.lastName;
  }
}

export class UserProfileDTO {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: Date;
  gender: string;
  fileName: string;

  constructor(data: UserEntity) {
    this._id = data._id;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.email = data.email;
    this.fileName = data.fileName;
    this.birthDate = data.birthDate;
    this.gender = data.gender;
  }
}
