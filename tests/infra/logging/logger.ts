import { ILogger } from "../../../src/domain/logger";

export class LoggerSpy implements ILogger {
  private messages: { [key: string]: string } = {};

  info(message: string): void {
    this.messages.info = message;
  }

  warn(message: string): void {
    this.messages.warn = message;
  }

  debug(message: string): void {
    this.messages.debug = message;
  }

  log(level: string, message: string): void {
    this.messages.log = message;
    this.messages.logLevel = level;
  }

  error(message: string): void {
    this.messages.error = message;
  }

  getMessages() {
    return this.messages;
  }
}
