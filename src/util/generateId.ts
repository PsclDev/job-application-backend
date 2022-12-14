import { customAlphabet } from 'nanoid';
import { FindManyOptions, Repository } from 'typeorm';
import { AppTypes } from './types';

export function generateId<T = AppTypes>(repository: Repository<T>): string {
  const alphabet = '0123456789abcdefghijklmnopqrstuvwxyz';
  let id = '';
  let exists = false;
  do {
    id = customAlphabet(alphabet, 8)();
    const conditions: FindManyOptions<T> = {
      where: {
        id,
      },
    };

    const entry = repository.find(conditions);
    entry ? (exists = true) : (exists = false);
  } while (!exists);

  return id;
}
