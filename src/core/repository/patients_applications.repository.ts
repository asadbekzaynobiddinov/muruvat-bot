import { Repository } from 'typeorm';
import { PatientsEntity } from '../';

export type PatientsRepository = Repository<PatientsEntity>;
