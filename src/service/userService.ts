import { User } from "@prisma/client";
import { prisma } from "../utils/getPrisma";

interface UserSelector {
  id: boolean;
  email: boolean;
  firstName: boolean;
  lastName: boolean;
  password: boolean;
  fileName: boolean;
  phone: boolean;
  gender: boolean;
  title: boolean;
  address: boolean;
  careerObjective: boolean;
  interests: boolean;
  skills: boolean;
}

const commonSelector = {
  id: true,
  email: true,
  firstName: true,
  lastName: true,
  fileName: true,
  phone: true,
  gender: true,
  title: true,
  address: true,
  careerObjective: true,
  interests: true,
  skills : true
};

abstract class BaseUserService {
  protected prisma;
  protected select;
  constructor(select: UserSelector) {
    this.prisma = prisma;
    this.select = select;
  }

  findAll() {
    return this.prisma.user.findMany({ select: this.select });
  }

  findById(id: string) {
    return this.prisma.user.findUnique({
      select: this.select,
      where: { id },
    });
  }

  findByEmail(email: string) {
    return this.prisma.user.findUnique({
      select: this.select,
      where: { email },
    });
  }
  create(user: User) {
    return this.prisma.user.create({ select: this.select, data: user });
  }
  update(id: string, data: any) {
    return this.prisma.user.update({
      select: this.select,
      where: { id },
      data: data,
    });
  }
  delete(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }
}

class UserAllDataService extends BaseUserService {
  constructor(select: UserSelector = { ...commonSelector, password: true }) {
    super(select);
  }
}

class UserPersonalDataService extends BaseUserService {
  constructor(select: UserSelector = { ...commonSelector, password: false }) {
    super(select);
  }
}

const us = new UserAllDataService();
const upds = new UserPersonalDataService();

export { us as UserAllDataService };
export { upds as UserPersonalDataService };
