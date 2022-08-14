import { UpdateResult, DeleteResult } from 'typeorm';

export function checkAffectedResult(
  moduleName: string,
  res: UpdateResult | DeleteResult,
): void {
  if (res.affected === 0) {
    throw new Error(`No ${moduleName} found by give id`);
  }
}
