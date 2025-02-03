import { Repository } from 'typeorm';
import { UsersEntity } from '../';

export type UsersRepository = Repository<UsersEntity>;
