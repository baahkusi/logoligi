# logoligi

Ties chalk, boxen & ora behind a simple logging api. Wrapps around `console.log`. This allows you to do the following;

- Log in different colors to the terminal, supported colors https://github.com/chalk/chalk/tree/main#colors.
- Have a spinner on terminal logs for async operations.
- Have boxes around your logs, supported boxes https://github.com/sindresorhus/boxen/tree/main#borderstyle.

## Install

`npm i logoligi`

## Usage

```typescript
import Logger from 'logoligi';

// start logging 
Logger.log('Hi');

// log with config
Logger.log('Hello', {
   color: 'blue', // https://github.com/chalk/chalk/tree/main#colors
   bgColor: 'white', // https://github.com/chalk/chalk/tree/main#background-colors
   box: 'double' // https://github.com/sindresorhus/boxen/tree/main#borderstyle
});

// full config interface
/*
interface LoggerConfigI {
  color?: string;
  bgColor?: string;
  box?: string;
  title?: string;
  status?: "warn" | "success" | "fail" | "info" | "end"; // only for Logger.endLog ...
}
*/

// default configs for different log levels have been set
Logger.info('H');
Logger.debug('E');
Logger.warn('LL');
Logger.error('O');

// you can pass config for each of these
Logger.info('Okay!', {
   color: 'yello'
});

// show loader whilst asyn process is running
const logger = Logger.startLog('Downloading ...');
await new Promise(r => setTimeout(r, 2000));
Logger.endLog(logger, 'Finished Downloading!');
Logger.endLog(logger, 'Finished Downloading!', { status: 'success' }); // indicate success check mark in console
// indicate failure
Logger.endLog(logger, 'failed Downloading!', { status: 'fail' }); 
// you can indicate error, info, and warning as well.
```