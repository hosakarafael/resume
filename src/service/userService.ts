import { PrismaClient, User } from "@prisma/client";

abstract class BaseUserService {
  protected prisma;
  protected select;
  constructor(select: UserSelector) {
    this.prisma = new PrismaClient();
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

interface UserSelector {
  id: boolean;
  email: boolean;
  firstName: boolean;
  lastName: boolean;
  password: boolean;
  fileName: boolean;
}

class UserAllDataService extends BaseUserService {
  constructor(
    select: UserSelector = {
      id: true,
      email: true,
      password: true,
      firstName: true,
      lastName: true,
      fileName: true,
    }
  ) {
    super(select);
  }
}

class UserPersonalDataService extends BaseUserService {
  constructor(
    select: UserSelector = {
      id: true,
      email: true,
      password: false,
      firstName: true,
      lastName: true,
      fileName: true,
    }
  ) {
    super(select);
  }
}

const us = new UserAllDataService();
const upds = new UserPersonalDataService();

export { us as UserAllDataService };
export { upds as UserPersonalDataService };
