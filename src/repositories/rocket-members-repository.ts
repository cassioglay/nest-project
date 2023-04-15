export abstract class RocketMembersRepository {
  abstract create(name: string, memberFunction: string): Promise<void>;
  abstract list(): Promise<void>;
  abstract find(id: any): Promise<void>;
  abstract update({ id, data }: any): Promise<void>;
}