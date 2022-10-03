import { Repository } from 'typeorm';

export function excludeColumns<T>(
  repository: Repository<T>,
  columnsToExclude: string[],
): (keyof T)[] {
  return repository.metadata.columns
    .map((column) => column.propertyName)
    .filter(
      (columnName) => !columnsToExclude.includes(columnName),
    ) as (keyof T)[];
}
