import { User } from 'database/entities';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

export default class UserSeed implements Seeder {
  createUser(appDataSource: DataSource): User[] {
    return appDataSource.getRepository(User).create([
      {
        walletAddress: '0xA39632B1621c8De98Dc097720D154bE36C254DEA',
        refreshToken: null,
      },
    ]);
  }

  async run(dataSource: DataSource): Promise<void> {
    const users = this.createUser(dataSource);
    await dataSource.getRepository(User).save(users);
  }
}
