import { createLogger, format, transports } from 'winston';

const errorFormat = format(info => {
  if (info && info instanceof Error) {
      info.message = info.stack || '';  // This includes the message.
  }
  return info;
});

const prefixFormat = format(info => {
  info.message = [
    new Date().toISOString(),
    info.level.padEnd(5, ' '),
    info.message || ''
  ]
    .filter(v => v)
    .join(' | ');

  return info;
});

const finalizeFormat = format(info => {
  // We need to define a formatter as a finalizer formatter - i.e. by setting
  // info[Symbol.for('message')] = info.message as info[Symbol.for('message')] is what's actually
  // printed, info.message is what's passed by the log call. If it isn't set, you'll just print
  // 'undefined'.

  // The type declaration for info isn't correct, as we have to use a Symbol here, so
  // we'll silence the TypeScript error here.
  // @ts-ignore
  info[Symbol.for('message')] = `${info.message}`;
  return info;
});

const consoleTransport = new transports.Console({
  // We only want to apply colorize to the console, not to the file transport
  format: format.colorize({ all: true })
});

const logger = createLogger({
  format: format.combine(
    errorFormat(),
    prefixFormat(),
    finalizeFormat()    // This one *has* to come last!
  ),
  transports: [
    consoleTransport,
    new transports.File({
      filename: 'combined.log',
      maxsize: 10_000_000,
      maxFiles: 7,
      tailable: true
    }),
  ]
});

const silenceConsoleTransport = (silent: boolean) => consoleTransport.silent = silent;

if (process.env.NODE_ENV === 'production') {
  silenceConsoleTransport(true);
}

export { silenceConsoleTransport };

export default logger;