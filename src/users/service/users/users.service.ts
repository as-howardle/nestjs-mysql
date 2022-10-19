import { User } from './../../../typeorm/entities/User';
import { Injectable } from '@nestjs/common';
import {
  InjectConnection,
  InjectDataSource,
  InjectRepository,
} from '@nestjs/typeorm';
import { EntityManager, getManager, Repository } from 'typeorm';
import { Connection } from 'mysql2';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectDataSource() private connection: Connection,
  ) {}

  async getUsers() {
    return this.connection.query('SELECT * FROM USERS');
  }

  createUser(username: string, password: string) {
    const sql = `INSERT INTO USERS (username, password) values (?,?)`;
    return this.connection.query(sql, [username, password]);
    // const user = this.userRepository.create({ username, password });
    // return this.userRepository.save(user);
  }

  updateUser(id: number, username: string, password: string) {
    return this.userRepository.update({ id }, { username, password });
  }
}
