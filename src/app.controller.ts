import { Body, Controller, Post, Get, Put, Param } from '@nestjs/common';
import { CreateTeamMemberBody } from './dtos/create-team-member-body';
import { RocketMembersRepository } from './repositories/rocket-members-repository';

@Controller('app')
export class AppController {
  constructor(
    private rocketMembersRepository: RocketMembersRepository
  ) {}

  @Post('create')
  async create(@Body() body: CreateTeamMemberBody) {
    
    const { name, 'function': memberFunction } = body;

    const member = await this.rocketMembersRepository.create(name, memberFunction);
    return member;

  }

  @Get('all')
  async list() {

    const members = await this.rocketMembersRepository.list();
    return members;
  }

  @Get('member/:id')
  async find(@Param('id') id:string) {

    const member = await this.rocketMembersRepository.find({id:String(id)});
    return member;
  }

  @Post('member/update')
  async update(@Body() dataBody: { id: string, name: string, function: string }) {
    const { id, name, function: memberFunction } = dataBody;

    const member = await this.rocketMembersRepository.update({
      where: { id: String(id) },
      data: {
        name: name,
        function: memberFunction
        }
    });

    return member;
  }
}
