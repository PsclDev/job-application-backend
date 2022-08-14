import { Logger } from '@nestjs/common';

export function prettyPrintObject(logger: Logger, msg: string, obj: any) {
  logger.debug(msg, JSON.stringify(obj, null, 2));
}
