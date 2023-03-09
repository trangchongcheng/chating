import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'database/entities';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getUsers(): Promise<User[]> {
    return this.userRepository.find({});
  }

  async findById(id: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { id },
      relations: {},
    });
  }

  async findByIdOrFail(id: string): Promise<User> {
    return this.userRepository.findOneByOrFail({ id });
  }

  async update(id: string, data: QueryDeepPartialEntity<User>): Promise<User | null> {
    await this.userRepository.update(id, data);
    return this.findById(id);
  }
}
