import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class CatalogLogger extends Logger {
  error(message: string, trace: string) {
    super.error(message, trace);
    // Add your custom error logging logic here, such as saving errors to a log file or sending them to a monitoring service
  }
}