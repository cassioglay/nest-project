import { PrismaService } from "src/database/prisma.service";
import { randomUUID } from 'node:crypto';
import { RocketMembersRepository } from "../rocket-members-repository";
import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";


@Injectable()
export class PrismaRocketMembersRepository implements RocketMembersRepository {

  constructor(private prisma: PrismaService) { }

  async create(name: string, memberFunction: string): Promise<any> {

    const member = await this.prisma.rocketTeamMember.create({
      data: {
        id: randomUUID(),
        name,
        function: memberFunction
      },
    });

    return member;

  }

  async list(): Promise<any> {
    return await this.prisma.rocketTeamMember.findMany();
  }

  async find(id: Prisma.RocketTeamMemberWhereUniqueInput): Promise<any | null> {
    return await this.prisma.rocketTeamMember.findUnique({
      where: id
    });
  }

  async update(params: { where : Prisma.RocketTeamMemberWhereUniqueInput, data: Prisma.RocketTeamMemberUpdateInput }): Promise<any | null> {
    const { where , data } = params;
    return await this.prisma.rocketTeamMember.update({
      data,
      where
    });
  }
}